---
slug: /dev/protocol
title: 通信协议：MQTT+UDP 和 WebSocket
sidebar_label: 通信协议
---

## 1. 一句话理解

**奶龙和服务器聊天，要传两样东西：「指令」和「声音」。MQTT+UDP 是两条路分开走，WebSocket 是一条路一起走。**

- **指令**：比如「开始听」「你说的是：跳个舞」「去调用跳舞工具」。量小，一条都不能丢。
- **声音**：你的说话声和奶龙的回答。量大，要快，丢一点点听不出来。

奶龙固件两种方式都支持，**可以选**。

<figure>
  <img className="board-svg" src="/img/dev/protocol-compare.svg" alt="左边是 MQTT 加 UDP：奶龙和服务器之间，MQTT 传 JSON 控制消息，UDP 传加密的 Opus 声音，UDP 的地址和密钥在 hello 时下发；右边是 WebSocket：文本帧传 JSON 控制消息，二进制帧传 Opus 声音，同一条连接，wss 走 TLS" />
  <figcaption>左：两条路分开走；右：一条路一起走（示意图）</figcaption>
</figure>

:::nailong
UDP 像**扔纸飞机**：快，偶尔丢一架也没关系。TCP 像**寄挂号信**：一定送到，但前面一封没到，后面的都得排队等。

MQTT+UDP = 指令寄挂号信，声音扔纸飞机。WebSocket = 全都寄挂号信。
:::

## 2. 区别

| | MQTT + UDP | WebSocket |
|---|---|---|
| 说话跟不跟手 | **更跟手**，网络差时偶尔缺一小段 | 稍慢一点，网络差时会停顿一下再追上来 |
| 网络兼容性 | 有的学校、公司、展会网络会拦 UDP，可能**听不到奶龙说话** | 和打开网页一样，**几乎哪里都能用** |
| 待机时 | 一直连着服务器，服务器能随时找奶龙 | 不说话时断开，服务器找不到奶龙 |
| 安全 | 声音用 AES 加密 | 整条连接加密（`wss://`），和 HTTPS 一样 |
| 自己搭服务器 | 要搭三样东西，比较难 | 搭一样就行，**简单** |
| 调试 | 两路数据，声音还加密了，不好抓 | 一个 WebSocket 工具就能看全部消息 |

## 3. 怎么选

| 你的情况 | 选 |
|---|---|
| 用 xiaozhi.me，家里 Wi-Fi 正常 | **MQTT + UDP**，说话最跟手 |
| 在学校、公司、展会，能看到字幕但听不到奶龙说话 | **WebSocket**，多半是 UDP 被网络拦了 |
| 自己搭服务端 | 先用 **WebSocket** 跑通，再考虑 MQTT + UDP |
| 只是想学协议、抓包看看 | **WebSocket**，好调试 |

## 4. 怎么切换、怎么看现在用的是哪种

**看当前用的是哪种**：打开 [串口日志](/docs/debug/serial)，开机后：

- 出现 `MqttProtocol` 开头的日志 → MQTT + UDP
- 出现 `Connecting to websocket server` → WebSocket

**切换**：奶龙用哪种，取决于两件事：

1. **服务器给了哪套配置**。开机时奶龙会向服务器要配置，服务器可以给 MQTT 的、WebSocket 的，或者两个都给。自己搭服务端时，改服务端返回的内容就行。
2. **奶龙自己的偏好**。两套配置都有时，奶龙按自己存的偏好选，默认是 MQTT。这个偏好可以通过 [Otto Master 本地联调](/docs/debug/otto-master) 改成 WebSocket，重启后生效。偏好 WebSocket 但配置不完整时，会自动退回 MQTT。

:::info 待补充
xiaozhi.me 控制台里切换协议的具体入口和截图。
:::

## 5. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 唤醒后提示「服务器超时」 | 10 秒内没连上服务器 | 检查 Wi-Fi；看串口日志是哪一步失败 |
| 能看到字幕，听不到奶龙说话 | 指令通了，声音（UDP）被网络拦了 | 换手机热点试试；确认是这个原因就切到 WebSocket |
| 聊着聊着自己断了 | 两分钟没收到服务器任何数据，自动断开 | 正常现象，再叫一声「你好奶龙」 |

:::danger
服务器下发的 `token`、MQTT `password` 是你设备的登录凭证。截图、贴日志之前记得打码。
:::

## 6. 想深入再看

<details>
<summary>固件里选择协议的代码</summary>

`main/application.cc`：

```cpp
Settings local_identity("otto", false);
const std::string preferred_transport =
    local_identity.GetString("transport", "mqtt");
if (preferred_transport == "websocket" && ota.HasWebsocketConfig()) {
    protocol_ = std::make_unique<WebsocketProtocol>();
} else if (ota.HasMqttConfig()) {
    protocol_ = std::make_unique<MqttProtocol>();
} else if (ota.HasWebsocketConfig()) {
    protocol_ = std::make_unique<WebsocketProtocol>();
} else {
    protocol_ = std::make_unique<MqttProtocol>();
}
```

- 配置来自 OTA 接口（xiaozhi.me 是 `https://api.tenclass.net/xiaozhi/ota/`）返回 JSON 里的 `mqtt` 和 `websocket` 字段。
- 偏好存在 NVS 的 `otto` 命名空间、`transport` 键里，由 Otto Master 链路的配置消息（字段 `preferred_transport`，见 `main/otto_master_link.cc`）写入。上游小智固件没有这个偏好。
- 两种方式都继承基类 `Protocol`（`main/protocols/protocol.h`），上层只调用 `OpenAudioChannel()`、`SendAudio()` 这些统一接口。

</details>

<details>
<summary>MQTT + UDP 的握手过程</summary>

1. 用服务器给的 `endpoint`、`client_id`、`username`、`password` 连上 MQTT，心跳 240 秒。
2. 唤醒后，通过 MQTT 发 `hello` 申请声音通道：

   ```json
   {"type":"hello","version":3,"transport":"udp","features":{"mcp":true},
    "audio_params":{"format":"opus","sample_rate":16000,"channels":1,"frame_duration":60}}
   ```

3. 服务器回 `hello`，带上 UDP 地址和这次对话的密钥（上游文档示例）：

   ```json
   {"type":"hello","transport":"udp","session_id":"xxx",
    "audio_params":{"format":"opus","sample_rate":24000,"channels":1,"frame_duration":60},
    "udp":{"server":"192.168.1.100","port":8888,
           "key":"0123456789ABCDEF0123456789ABCDEF","nonce":"0123456789ABCDEF0123456789ABCDEF"}}
   ```

4. 奶龙连上 UDP，之后声音走 UDP，指令仍走 MQTT。上行 16 kHz，下行 24 kHz。
5. 结束时发 `goodbye`，关掉 UDP，MQTT 保持连接。

</details>

<details>
<summary>UDP 声音包结构和 AES-CTR 加密</summary>

<figure>
  <img className="board-svg" src="/img/dev/udp-packet.svg" alt="UDP 声音包结构：前 16 字节依次是 type 1 字节、flags 1 字节、payload_len 2 字节、ssrc 4 字节、timestamp 4 字节、sequence 4 字节，后面是 Opus 密文；这 16 字节同时是 AES-CTR 的计数器" />
  <figcaption>每个 UDP 包 = 16 字节头 + 加密后的 Opus 数据（示意图）</figcaption>
</figure>

```cpp
std::string nonce(aes_nonce_);                          // 服务器给的 16 字节 nonce
*(uint16_t*)&nonce[2] = htons(packet->payload.size());  // 写入长度
*(uint32_t*)&nonce[8] = htonl(packet->timestamp);       // 写入时间戳
*(uint32_t*)&nonce[12] = htonl(++local_sequence_);      // 写入自增序号
// 这 16 字节既是包头，也是 AES-CTR 的计数器
```

- AES-CTR 是流加密，密文和明文一样长，适合一帧帧的小包。
- 接收端检查 `sequence`，比期望值小的包直接丢掉，防止重放。

</details>

<details>
<summary>WebSocket 的请求头和二进制帧格式</summary>

连接时带的请求头：

| 请求头 | 内容 |
|---|---|
| `Authorization` | `Bearer <token>` |
| `Protocol-Version` | 1 / 2 / 3 |
| `Device-Id` | MAC 地址 |
| `Client-Id` | 设备 UUID |

二进制帧（放声音）三个版本：

| 版本 | 格式 |
|---|---|
| 1（默认） | 直接是 Opus 数据 |
| 2 | 16 字节头（版本、类型、保留、时间戳、长度）+ 数据，时间戳给服务端回声消除用 |
| 3 | 4 字节头（类型、保留、长度）+ 数据 |

奶龙固件的 `hello` 里还多声明了 `otto_state`、`otto_actions`、`otto_stop`，并附上设备名、MAC、固件版本。

</details>

<details>
<summary>所有 JSON 消息类型</summary>

**奶龙 → 服务器**

| type | 例子 | 用途 |
|---|---|---|
| `hello` | 见上文 | 打开声音通道 |
| `listen` | `{"type":"listen","state":"detect","text":"你好奶龙"}` | 唤醒词触发 |
| `listen` | `{"type":"listen","state":"start","mode":"auto"}` | 开始听（`auto` / `manual` / `realtime`） |
| `listen` | `{"type":"listen","state":"stop"}` | 停止听 |
| `abort` | `{"type":"abort","reason":"wake_word_detected"}` | 打断奶龙说话 |
| `mcp` | `{"type":"mcp","payload":{…}}` | 回复工具调用结果 |
| `goodbye` | `{"type":"goodbye"}` | 结束对话（MQTT 方式） |

**服务器 → 奶龙**

| type | 奶龙收到后 |
|---|---|
| `stt` | 屏幕显示你说的话 |
| `llm` | 按 `emotion` 切换表情 |
| `tts` | `start` 开始说 / `sentence_start` 显示这句字幕 / `stop` 说完 |
| `mcp` | 执行工具，比如 `self.otto.swing` |
| `system` / `alert` | 系统指令 / 弹出提醒 |

**奶龙固件的扩展**（给 Otto Master 用，xiaozhi.me 不用）：`otto_action`、`otto_stop`、`otto_query`、`otto_actions`、`otto_conversation`。连上 MQTT 后还会先发一条 `"protocol":"otto-mqtt/1"` 的自我介绍。

</details>

<details>
<summary>一次对话完整的消息顺序</summary>

以 MQTT + UDP 为例，你说「你好奶龙，跳个舞」：

```text
奶龙 → MQTT   hello（申请声音通道）
MQTT → 奶龙   hello（UDP 地址、密钥、session_id）
奶龙 → UDP    「你好奶龙」这段声音
奶龙 → MQTT   listen state=detect text=你好奶龙
奶龙 → MQTT   listen state=start mode=auto
奶龙 → UDP    你说「跳个舞」的声音
MQTT → 奶龙   stt  text=跳个舞
MQTT → 奶龙   llm  emotion=happy
MQTT → 奶龙   mcp  调用 self.otto.swing
奶龙 → MQTT   mcp  调用结果
MQTT → 奶龙   tts  state=start
MQTT → 奶龙   tts  state=sentence_start text=好嘞，看我扭一扭！
UDP  → 奶龙   奶龙回答的声音
MQTT → 奶龙   tts  state=stop
```

`happy` 和回答文字只是举例，实际看大模型和 [人设](/docs/xiaozhi/role)。

</details>

## 7. 参考资料

- 小智仓库自带的协议文档（`~/otto/docs/` 下也有）：[mqtt-udp.md](https://github.com/78/xiaozhi-esp32/blob/main/docs/mqtt-udp.md)、[websocket.md](https://github.com/78/xiaozhi-esp32/blob/main/docs/websocket.md)、[mcp-protocol.md](https://github.com/78/xiaozhi-esp32/blob/main/docs/mcp-protocol.md)
- 奶龙固件源码：`main/protocols/`、`main/application.cc`、`main/otto_master_link.cc`

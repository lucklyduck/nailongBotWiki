---
slug: /dev/protocol
title: 通信协议
sidebar_label: 通信协议
---

## 1. 一句话理解

**机器人和语音服务器要传两样东西：指令和声音。MQTT+UDP 分开传，WebSocket 在同一条连接上传。**

<figure>
  <img className="board-svg" src="/img/dev/protocol-compare.svg" alt="MQTT 传控制消息、UDP 传音频；WebSocket 用文本帧传控制消息、二进制帧传音频" />
  <figcaption>两种语音服务端传输方式</figcaption>
</figure>

| | MQTT + UDP | WebSocket |
|---|---|---|
| 控制消息 | MQTT，JSON | 文本帧，JSON |
| 音频 | UDP，Opus | 二进制帧，Opus |
| 网络排查 | 分别检查控制与音频通路 | 检查同一连接和音频处理 |
| 配置来源 | OTA 响应的 MQTT 配置 | OTA 响应的 WebSocket 配置 |

网络效果取决于实际服务端和网络条件，不能只按协议名称判断快慢或是否可用。

## 2. 当前固件怎么选

`main/application.cc` 读取 OTA 配置：**有 MQTT 配置先选 MQTT，否则选 WebSocket；都没有时使用 MQTT 路径尝试初始化。**

当前没有设备端“偏好协议”切换设置。自建服务时应检查 OTA 返回的配置，见 [更换服务端](/docs/dev/server)。

看串口日志中的 `MqttProtocol` 或 WebSocket 连接信息，可确认实际路径。两种协议参与构建，不等于都已通过端到端实测。

## 3. 一次对话

| 消息 | 用途 |
|---|---|
| `hello` | 协商会话、音频参数与连接 |
| `listen` | 唤醒、开始听取或停止听取 |
| `stt` | 语音识别文字 |
| `llm` | 情绪等模型消息；当前奶龙场景图有自己的显示规则 |
| `tts` | 回答开始、字幕与结束 |
| `mcp` | 工具发现、调用和结果 |
| `abort` | 请求打断回答 |

例如模型调用 `self.otto.action`，参数 `action="swing"`，固件把动作排队；调用 `self.otto.laugh` 时则等待本地播放完成或中断再返回。

## 4. 设备端局域网控制

NaiFirmware 另有 `websocket_control_server.cc`，联网后启动 **`8080` 端口、`/ws` 路径**，接收 MCP 控制消息并返回结果。

这与连接语音服务端的 WebSocket 是不同方向：

| 接口 | 谁连谁 | 做什么 |
|---|---|---|
| 语音服务端 WebSocket | 机器人连接服务端 | 语音对话和云端工具调用 |
| `ws://设备IP:8080/ws` | 局域网客户端连接机器人 | 设备控制；不提供语音识别、大模型或语音合成 |

本接口的客户端兼容性与控制效果仍待实测。它不能当作一套完整的本地对话服务；不要在路由器上将控制端口映射到公网。

## 5. 常见问题

| 现象 | 检查 |
|---|---|
| 有字幕没声音 | 音频通路、解码、音量和功放；MQTT 路线也检查 UDP |
| 自建服务连不上 | OTA 地址是否可达、下发的连接地址是否正确 |
| 局域网控制连不上 | 设备 IP、同网段、8080 端口和客户端协议 |
| 工具调用后等待 | 是否为等待播放完成的延迟工具，查看完成 / 中断日志 |

截图和公开日志应遮蔽设备 token、MQTT 密码、API Key 和个人设备标识。

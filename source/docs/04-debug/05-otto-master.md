---
slug: /debug/otto-master
title: 本地联调 Otto Master
sidebar_label: 本地联调 Otto Master
---

## 1. 简介

Otto Master 是奶龙固件自带的一个**电脑端调试工具**，不经过 xiaozhi.me，直接在局域网里和机器人通信。用来验证：机器人有没有连上 Wi-Fi、能不能被电脑找到、能不能收发消息。

:::info
这是进阶内容，只有奶龙固件支持。只用 xiaozhi.me 聊天的话可以跳过这一页。
:::

原理：

- 电脑运行 `scripts/otto_master.py`，在局域网里把自己注册成 **`master.local`**。
- 机器人连上 Wi-Fi 后，用 mDNS 查找 `master.local`，连上它的 TCP **8765** 端口，发送一行一条的 JSON。
- 机器人每 5 秒发一次心跳，里面带设备名（默认 `EVA1`）、Wi-Fi MAC 地址和当前 IP。

这条连接和语音对话是分开的，不影响 xiaozhi.me 的使用。

## 2. 启动

需要 macOS（脚本用系统自带的 `dns-sd` 注册 `master.local`），电脑和机器人在同一个 Wi-Fi 下。在奶龙源码根目录执行：

```bash
python3 scripts/otto_master.py
```

浏览器打开 [http://127.0.0.1:8080](http://127.0.0.1:8080)。

电脑有多块网卡（比如同时连着有线和 Wi-Fi）时，指定局域网 IP，把 `192.168.1.20` 换成电脑在这个 Wi-Fi 下的地址：

```bash
python3 scripts/otto_master.py --advertise-ip 192.168.1.20
```

## 3. 能做什么

| 操作 | 说明 |
|---|---|
| 查看设备 | 设备的 `hello`、`heartbeat` 和 IP |
| `ping` | 测试双向通信 |
| `status` | 查询运行状态，包括是否在动、当前表情图、是否在播放音效、音量 |
| `echo` | 原样返回 |
| 任意 JSON | 发送自定义命令 |

多台机器人同时在线时，即使设备名都是 `EVA1`，Otto Master 也会按 Wi-Fi MAC 区分。

## 4. 更进一步

奶龙固件还支持把语音对话也切到本地 Otto Master（MQTT `mqtt://master.local:1883` 或 WebSocket），由电脑上的服务完成识别、大模型和语音合成。这部分涉及设备凭据和认证，见 [更换服务端](/docs/dev/server)。

:::warning
`localhost` / `127.0.0.1` 只指运行脚本的那台电脑。在手机或别的电脑上打开要用这台电脑的局域网 IP。
:::

---
slug: /dev/server
title: 更换服务端
sidebar_label: 更换服务端
---

## 1. 简介

默认通过 OTA 地址获取 xiaozhi.me 的连接配置。想换模型、音色或自己部署语音服务，可以使用 [配套 server](https://github.com/cccatnipent/NaiLongFirmware/tree/main/xiaozhi-esp32-server)。它与固件在同一仓库，单独运行。

| 想做什么 | 路线 |
|---|---|
| 给现有对话加工具 | [云端 MCP](/docs/xiaozhi/mcp) |
| 自己选择语音识别、模型、语音合成 | 部署小智服务端，修改 OTA 地址 |
| 在局域网发设备控制消息 | 固件的 `8080/ws` 接口，见 [通信协议](/docs/dev/protocol) |

## 2. 部署服务端

先按仓库的 [快速开始](https://github.com/cccatnipent/NaiLongFirmware/blob/main/docs/01-快速开始.md) 部署 Python 单服务。准备独立的 Python 3.10 环境、模型权重、ffmpeg 和 libopus，生成自己的配置并填写模型凭据；详细依赖见随包 [部署说明](https://github.com/cccatnipent/NaiLongFirmware/blob/main/xiaozhi-esp32-server/docs/Deployment.md)。

课程默认 HTTP OTA 端口为 `8003`，语音 WebSocket 端口为 `8000`，不要与设备端的 `8080/ws` 控制接口混用。启动后，在仓库根目录检查：

~~~bash
python scripts/probe_ota.py http://192.168.1.20:8003/xiaozhi/ota/
~~~

将示例 IP 换成电脑的实际局域网地址。服务端地址必须能被机器人访问；电脑上的 `localhost` 只代表电脑自己，不能填进机器人的连接配置。含密钥的 `data/.config.yaml` 只保留在本机。

:::info 验证范围
公开版已有配置测试和构建记录，尚未完成真实设备与 server 的 OTA、语音和 MCP 端到端验收，见 [验证记录](https://github.com/cccatnipent/NaiLongFirmware/blob/main/VALIDATION.md)。
:::

## 3. 修改 OTA 地址

在 `nailong-firmware/` 下执行，替换示例 IP 和串口：

~~~bash
python scripts/build_nailong.py --ota-url http://192.168.1.20:8003/xiaozhi/ota/
idf.py -p COM5 flash monitor
~~~

核对启动日志中的 OTA 请求、下发配置和实际连接目标。配网页曾保存过自定义 OTA 地址时，NVS 中的 `wifi/ota_url` 优先于编译默认值，需在配网页同步修改，不必整片擦除。

不带 `--ota-url` 重新构建时，默认值为 `https://api.tenclass.net/xiaozhi/ota/`。要切回 xiaozhi.me，也需核对配网页保存的地址，再按云端流程绑定设备。

## 4. 逐项验证

| 检查 | 通过标志 |
|---|---|
| OTA | 设备能获取配置，没有超时或地址错误 |
| 语音 | 能上传说话声并播放回答 |
| MCP | 后台发现并调用 `self.otto.action`、`self.otto.laugh` |
| 图片与动作 | 字幕、场景图和实际动作对应 |
| 重连 | 断网恢复、设备重启后能再次连接 |

两种协议参与构建不等于自建服务已经联通。发布教程前保留完整实测记录，并遮蔽 token、密码和个人设备标识。

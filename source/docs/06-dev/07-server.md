---
slug: /dev/server
title: 更换服务端
sidebar_label: 更换服务端
---

## 1. 简介

默认通过 OTA 地址获取 xiaozhi.me 的连接配置。想换模型、音色或自己部署语音服务，可以使用配套的 `xiaozhi-esp32-server`；它是独立服务端项目，不是固件的一部分。

| 想做什么 | 路线 |
|---|---|
| 给现有对话加工具 | [云端 MCP](/docs/xiaozhi/mcp) |
| 自己选择语音识别、模型、语音合成 | 部署小智服务端，修改 OTA 地址 |
| 在局域网发设备控制消息 | 固件的 `8080/ws` 接口，见 [通信协议](/docs/dev/protocol) |

## 2. 部署服务端

按正式交付的 server README 选择部署方式，配置自己的模型凭据，启动后核对 OTA 与 WebSocket 地址。

服务端地址必须能被机器人访问。电脑上的 `localhost` 只代表电脑自己，不能填进机器人的连接配置；局域网测试用电脑的实际 IP。

:::info 待补充
公司 server 仓库地址、选定的部署步骤，以及 NaiFirmware 配合该服务端的端到端实测记录。
:::

## 3. 修改 OTA 地址

1. 先用 `python scripts/build_nailong.py` 建立公开配置。
2. 执行 `idf.py menuconfig`，在 Xiaozhi Assistant 中修改 Default OTA URL。
3. 执行 `idf.py build`，构建成功后烧录。
4. 核对启动日志中的 OTA 请求、下发配置和实际连接目标。

默认值是 `https://api.tenclass.net/xiaozhi/ota/`。自建地址以服务端实际配置为准。

再次运行专用构建脚本后要重新核对 `sdkconfig`，避免生成配置覆盖自己的设置。不要启用个人身份构建来配置公开设备。

## 4. 逐项验证

| 检查 | 通过标志 |
|---|---|
| OTA | 设备能获取配置，没有超时或地址错误 |
| 语音 | 能上传说话声并播放回答 |
| MCP | 后台发现并调用 `self.otto.action`、`self.otto.laugh` |
| 图片与动作 | 字幕、场景图和实际动作对应 |
| 重连 | 断网恢复、设备重启后能再次连接 |

两种协议参与构建不等于自建服务已经联通。发布教程前保留完整实测记录，并遮蔽 token、密码和个人设备标识。

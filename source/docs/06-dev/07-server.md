---
slug: /dev/server
title: 更换服务端
sidebar_label: 更换服务端
---

## 1. 简介

默认情况下，奶龙通过 OTA 地址找到 xiaozhi.me，所有语音识别、大模型、语音合成都在云端完成。想用自己的大模型、自己的语音、或者完全在局域网里运行，有三条路：

| 方案 | 改动 | 适合 |
|---|---|---|
| 云端 MCP | 不改固件 | 只想加新能力，见 [接入云端 MCP](/docs/xiaozhi/mcp) |
| 自建小智服务端 | 改 OTA 地址 | 想换模型、换语音、数据不出本地 |
| 本地 Otto Master | 奶龙固件已内置 | 局域网联调、多机编排 |

## 2. 自建小智服务端

社区有开源的小智服务端实现（例如 xiaozhi-esp32-server），部署后会提供一个 OTA 地址和 WebSocket 地址。

1. 按服务端项目的文档部署，拿到 OTA 地址，例如 `http://192.168.1.20:8003/xiaozhi/ota/`。
2. 修改固件里的 OTA 地址：

   ```bash
   idf.py menuconfig
   ```

   **Xiaozhi Assistant → Default OTA URL**，默认值是 `https://api.tenclass.net/xiaozhi/ota/`，改成你的地址。
3. 编译烧录。开机后机器人会去你的服务器检查固件和获取连接地址。

:::info 待补充
奶龙固件配合自建服务端的实测步骤。作者本地有服务端目录，但没有放进固件仓库。
:::

## 3. 本地 Otto Master

奶龙固件内置了和电脑端 Otto Master 通信的能力（见 [本地联调](/docs/debug/otto-master)），还可以把语音对话切换到 Otto Master：

- 设备在局域网里用 mDNS 查找 `master.local`，支持 MQTT（`mqtt://master.local:1883`）和 WebSocket 两种连接方式，通过 `preferred_transport` 切换。
- 切换和配置需要认证（设备 token），设备的 IP 不会写死，换路由器、换电脑都不用改固件，只要新电脑接管 `master.local`。
- 在这种模式下，Otto Master 会做「本地大笑 → 听 → 识别 → 大模型 → 语音合成 → 再大笑」的循环对话，8 秒没人说话自动结束。

:::warning
这部分依赖作者本地的 Otto Master 服务端（不在固件仓库中），协议还在迭代，适合有经验的开发者参考 `BUILD_OTTO.md` 和 `NAILONG.md` 自行实现。
:::

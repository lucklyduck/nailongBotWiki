---
slug: /dev
title: 二次开发
sidebar_label: 二次开发
---

## 1. 简介

奶龙固件就是一份普通的 [xiaozhi-esp32](https://github.com/78/xiaozhi-esp32) 源码，加上一个 `otto-robot` 板型目录。你想让奶龙学新动作、换表情、换声音、换唤醒词，都只需要改这个目录和几个配置文件，然后重新 [编译烧录](/docs/flash/build)。

每一节都是「改哪个文件 → 怎么改 → 编译烧录 → 怎么验证」的结构，可以单独看。

| 想做什么 | 页面 | 难度 |
|---|---|---|
| 先搞清楚代码在哪 | [源码结构](/docs/dev/source) | ★ |
| 让大模型能调用一个新功能 | [添加 MCP 工具](/docs/dev/mcp-tool) | ★★ |
| 写一个全新的舞步 | [添加新动作](/docs/dev/action) | ★★★ |
| 把「你好奶龙」换成别的 | [修改唤醒词](/docs/dev/wake-word) | ★ |
| 换屏幕上的表情 | [更换表情](/docs/dev/emotion) | ★★ |
| 换本地音效 | [更换音效](/docs/dev/sound) | ★ |
| 不用 xiaozhi.me，接自己的服务器 | [更换服务端](/docs/dev/server) | ★★★ |

想弄懂固件是怎么运转的，可以看这三篇原理篇：

| 原理 | 页面 |
|---|---|
| `idf.py build` 背后的 CMake 和 Ninja | [编译系统](/docs/dev/build-system) |
| 奶龙怎么同时听、说、动 | [FreeRTOS 多任务](/docs/dev/freertos) |
| 奶龙和服务器怎么说话 | [通信协议：MQTT+UDP 和 WebSocket](/docs/dev/protocol) |

## 2. 开始之前

1. 按 [编译奶龙固件](/docs/flash/build) 装好 ESP-IDF v5.5.5，能成功编译、烧录一次原版。
2. 用 git 管理你的改动：

   ```bash
   git checkout -b my-nailong
   ```

   改坏了随时可以 `git checkout .` 回到原样。
3. 开着 [串口日志](/docs/debug/serial) 调试，`idf.py -p 串口 flash monitor` 一条命令烧录加看日志。

:::nailong
改坏了也不怕，`git checkout .` 一下我就变回原样。大胆改，我抗摔（大概）。
:::

:::tip
不想自己写 C++ 的话，可以试试 ZhiForge 的思路：把你想要的效果用一句话告诉 AI，让它改 `otto_controller.cc`，你负责编译、烧录、看实机效果。
:::

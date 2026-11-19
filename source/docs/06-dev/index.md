---
slug: /dev
title: 二次开发
sidebar_label: 二次开发
---

## 1. 简介

本章按 **NaiFirmware** 讲解：基于小智 / Otto 2.4.2，选择 `nailong-otto` 变体，使用 ESP-IDF v5.5.5。先跑通构建，再一次只改一件事。

| 想做什么 | 页面 | 难度 |
|---|---|---|
| 看懂文件和工具 | [源码结构](/docs/dev/source) | ★ |
| 注册模型能调用的功能 | [添加 MCP 工具](/docs/dev/mcp-tool) | ★★ |
| 扩展动作 | [添加新动作](/docs/dev/action) | ★★★ |
| 修改“你好奶龙” | [修改唤醒词](/docs/dev/wake-word) | ★ |
| 换场景图片 | [更换表情](/docs/dev/emotion) | ★★ |
| 换本地笑声 | [更换音效](/docs/dev/sound) | ★ |
| 接自己的语音服务器 | [更换服务端](/docs/dev/server) | ★★★ |
| 先学编辑、编译、烧录和串口 | [Catnip Forge IDE 入门](/docs/ide) | ★ |

| 想了解原理 | 页面 |
|---|---|
| 从源码到固件 | [编译系统](/docs/dev/build-system) |
| 声音与动作怎么配合 | [FreeRTOS 多任务](/docs/dev/freertos) |
| 机器人怎样连接服务器 | [通信协议](/docs/dev/protocol) |

## 2. 开始之前

1. 按 [编译奶龙固件](/docs/flash/build) 完成一次构建和设备验证。
2. 保存自己的修改，使用 Git 分支记录每次实验。
3. 对照 [功能状态](/docs/intro/status)，区分已有实测与候选功能。
4. 开着串口日志，先用小幅度、少次数验证机械动作。

:::nailong
一次只改一个本领，编译、烧录、看结果，哪里出问题才好找。
:::

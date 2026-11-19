---
slug: /debug
title: 调试
sidebar_label: 调试
---

## 1. 简介

烧录后先完成 **配网、绑定、校准**，再测试图片、语音和动作。遇到问题先保留日志。

| 步骤 | 页面 |
|---|---|
| 看启动和报错 | [看串口日志](/docs/debug/serial) |
| 连上家里的 Wi-Fi | [配网](/docs/debug/wifi) |
| 在 xiaozhi.me 添加设备 | [绑定设备](/docs/xiaozhi/bind) |
| 站直、走直 | [舵机校准](/docs/debug/trim) |
| 唤醒、笑声、按键 | [唤醒与声音](/docs/debug/voice) |

## 2. 开机后的状态

| 状态 | 意思 | 卡住时检查 |
|---|---|---|
| `starting` | 正在启动 | 供电、构建和资源 |
| `configuring` | 等待配网 | 手机热点连接 |
| `activating` | 等待绑定 | 后台验证码 |
| `idle` | 待机 | 可以唤醒 |
| `connecting` | 正在连接 | 网络和服务器地址 |
| `listening` | 正在听取 | 麦克风、识别和监听模式 |
| `speaking` | 正在播放 | 音频队列、字幕和场景图 |

说完后是否继续监听、超时如何结束，取决于会话模式和服务端。最新候选的 BOOT 行为是打断后继续监听，见 [功能状态](/docs/intro/status)，不要套用旧版“再按一下就回待机”的说明。

---
slug: /debug
title: 调试
sidebar_label: 调试
---

## 1. 简介

烧录完成后，机器人还需要三件事才能真正用起来：**连上 Wi-Fi、绑定后台、把舵机调正**。这一章按顺序带你做完，并教你出问题时怎么看日志。

| 步骤 | 做什么 | 页面 |
|---|---|---|
| 1 | 学会看串口日志，出问题时先看这里 | [看串口日志](/docs/debug/serial) |
| 2 | 让机器人连上家里的 Wi-Fi | [配网](/docs/debug/wifi) |
| 3 | 去 xiaozhi.me 绑定（第 5 章） | [绑定设备](/docs/xiaozhi/bind) |
| 4 | 让它站直、走直 | [舵机校准](/docs/debug/trim) |
| 5 | 唤醒词、音量、按键 | [唤醒与声音](/docs/debug/voice) |
| 进阶 | 不经过云端，在局域网里直接控制 | [本地联调 Otto Master](/docs/debug/otto-master) |

## 2. 开机后的状态

机器人开机后会经历下面几个状态，屏幕上方的状态栏和串口日志都会显示当前状态：

<figure>
  <img className="board-svg" src="/img/debug/states.svg" alt="状态流转图：starting 启动，没配过网时进入 configuring 配网模式，没绑定过时停在 activating 激活绑定，然后进入 idle 待机；说唤醒词或按 BOOT 后进入 connecting 连接服务器、listening 听你说、speaking 说话或做动作，说完回到 listening，没人说话或再按一次 BOOT 回到 idle" />
  <figcaption>开机后的状态变化</figcaption>
</figure>

| 状态 | 意思 | 卡在这里时去看 |
|---|---|---|
| `starting` | 正在启动 | [看串口日志](/docs/debug/serial) |
| `configuring` | 配网模式，等手机连热点 | [配网](/docs/debug/wifi) |
| `activating` | 已联网，等你在后台输入验证码 | [绑定设备](/docs/xiaozhi/bind) |
| `idle` | 待机，可以唤醒了 | — |
| `connecting` | 正在连服务器 | 检查网络；看 [唤醒与声音](/docs/debug/voice) |
| `listening` | 正在听你说话 | — |
| `speaking` | 正在播放回答 | — |

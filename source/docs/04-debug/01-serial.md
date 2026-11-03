---
slug: /debug/serial
title: 看串口日志
sidebar_label: 看串口日志
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. 简介

串口日志是机器人运行时打印出来的文字信息：启动到哪一步、连的是哪个 Wi-Fi、为什么连不上服务器、收到了什么动作指令，都会写在里面。**遇到任何问题，第一件事就是看日志。**

日志通过烧录用的那根 Type-C 线输出，不需要额外接线。

## 2. 打开日志

<Tabs groupId="tool">
<TabItem value="idf" label="idf.py（装了 ESP-IDF）" default>

把串口换成你自己的：

```bash
idf.py -p /dev/cu.usbmodem1101 monitor
```

按 `Ctrl+]` 退出。好处是崩溃时会自动把地址翻译成源码行号。

</TabItem>
<TabItem value="py" label="Python（没装 ESP-IDF）">

```bash
pip install pyserial
python -m serial.tools.miniterm /dev/cu.usbmodem1101 115200
```

按 `Ctrl+]` 退出。

</TabItem>
<TabItem value="gui" label="图形界面串口工具">

任何串口助手都可以，参数：

| 参数 | 值 |
|---|---|
| 波特率 | 115200 |
| 数据位 / 停止位 / 校验 | 8 / 1 / 无 |

</TabItem>
</Tabs>

打开后关掉再打开机器人的电源开关，就能从头看到启动日志。

## 3. 怎么读日志

每行开头的字母表示级别：`I` 信息、`W` 警告、`E` 错误。括号里是开机后的毫秒数，冒号前是模块名。重点看这几类：

| 关键词 | 说明 |
|---|---|
| `STATE:` | 状态切换，对照 [开机后的状态](/docs/debug#2-开机后的状态) |
| `WifiStation` / `wifi` | 连的是哪个 Wi-Fi、拿到的 IP |
| `Ota` / `Activation` | 检查新固件、获取验证码 |
| `MQTT` / `WS` | 和服务器的连接 |
| `OttoController` | 注册 MCP 工具、执行动作、舵机微调值 |
| `E (` | 任何错误，优先看 |

:::info 待补充
一段真机完整启动日志（从上电到 idle）。目前没有实机抓取，等拿到后补到这里作为对照。
:::

## 4. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 打开串口后什么都没有 | 机器人已经启动完了 | 关掉电源开关再打开 |
| 串口被占用 | 烧录工具或别的串口软件开着 | 关掉其他占用串口的程序 |
| 一直打印 `Brownout detector was triggered` 并重启 | 供电不够 | 装好电池、充满电；舵机动作时尤其明显 |
| 打印乱码 | 波特率不对 | 改成 115200 |

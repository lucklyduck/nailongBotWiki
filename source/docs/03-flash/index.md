---
slug: /flash
title: 烧录
sidebar_label: 烧录
---

## 1. 简介

「烧录」就是把固件（机器人的程序）通过 USB 线写进 ESP32-S3 的 Flash 存储里。奶龙机器人有两种固件可选：

| | 官方 Otto 固件 | 奶龙定制固件 |
|---|---|---|
| 适合 | 只想让机器人先跑起来 | 想要「你好奶龙」、看山表情、奶龙大笑，或者准备改代码 |
| 来源 | [ottodiy.tech 下载页](https://ottodiy.tech/docs/downloads/) | 奶龙源码仓库 `howtion0/otto` |
| 唤醒词 | 你好小智 | 你好奶龙 |
| 要装开发环境吗 | 不用 | 要，ESP-IDF v5.5.5 |
| 第一次大约用时 | 5 分钟 | 30～40 分钟（下载工具链和组件） |

<figure>
  <img className="board-svg" src="/img/flash/choose.svg" alt="选择烧录方式的判断图：不需要改源码时用官方 Otto 固件，可以网页在线烧录或用工具烧录；需要改源码或想要你好奶龙唤醒词时用奶龙定制固件，开发时用 idf.py flash，也可以导出合并镜像发给别人烧" />
  <figcaption>先选固件，再选烧录方式</figcaption>
</figure>

| 页面 | 内容 |
|---|---|
| [网页在线烧录](/docs/flash/online) | 官方固件，浏览器里点一下 |
| [用工具烧录](/docs/flash/tool) | 官方固件或合并镜像，esptool / Flash Download Tool |
| [编译奶龙固件](/docs/flash/build) | 装 ESP-IDF、编译、`idf.py flash` |
| [导出合并镜像](/docs/flash/merge) | 把奶龙固件打成一个 .bin 发给别人 |

## 2. 烧录前检查

1. **电池已经装好。** 只靠 USB 供电时，舵机一动就可能电压不够、反复重启。
2. 用的是**能传数据的** Type-C 线。很多充电线只有电源线，电脑上不会出现串口。
3. 机器人放在桌面中间或者架空。烧完开机时舵机会动，别让它从桌边掉下去。

:::warning
第一次烧录、还没装腿时，舵机会转到 90° 的初始位置。这正是 [舵机归中](/docs/assembly/center) 需要的，烧完不要手动拧舵机轴。
:::

:::nailong
烧录的时候别让我站在桌边！烧完我会伸伸腿，一不小心就掉下去了。
:::

## 3. 进入下载模式

大多数情况下电脑会自动让 ESP32-S3 进入下载模式，你不用做任何操作。烧录工具提示 `Failed to connect` 或者一直等待时，再手动进入：

<figure>
  <img className="board-svg" src="/img/flash/boot-mode.svg" alt="进入下载模式示意：电脑用 USB-C 数据线连接装好电池、电源开关处于关闭状态的奶龙机器人；步骤是关机插好线、按住 BOOT 键、打开电源开关、1 秒后松开 BOOT、开始烧录" />
  <figcaption>手动进入下载模式（示意图）</figcaption>
</figure>

1. 关掉电源开关，插好数据线。
2. 按住**功能键**（身体下方右侧，就是主板上的 BOOT 键）。
3. 打开电源开关。
4. 1 秒后松开 BOOT 键。
5. 重新点烧录。

## 4. 串口名称

| 系统 | 串口长什么样 | 怎么看 |
|---|---|---|
| Windows | `COM3`、`COM5` … | 设备管理器 → 端口（COM 和 LPT） |
| macOS | `/dev/cu.usbmodem1101` 之类 | 终端执行 `ls /dev/cu.*`，插拔前后对比 |
| Linux | `/dev/ttyACM0` | `ls /dev/ttyACM*` |

ESP32-S3 用的是芯片自带的 USB 串口，一般不需要另装驱动。

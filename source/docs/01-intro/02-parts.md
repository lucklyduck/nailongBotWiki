---
slug: /intro/parts
title: 部件与引脚
sidebar_label: 部件与引脚
---

## 1. 外观

需要打印外壳、底座、左右卡销、腿和脚时，请使用 [当前八件模型清单](/docs/assembly/print)，每个 STL 各 1 件。

<figure>
  <img src="/img/demo/nailong-front.jpg" alt="黄色奶龙正面：张嘴大笑，双手抱着胸前的屏幕，下面是白色的腿和蓝色的脚" />
  <figcaption>奶龙正面：屏幕在胸口，下面是两条腿和两只脚（截自演示视频）</figcaption>
</figure>

| 部件 | 位置 | 说明 |
|---|---|---|
| 圆屏 | 胸口，被双手抱着 | 显示表情、状态栏、对话字幕 |
| 腿（左、右） | 身体下方 | 由「腿舵机」带动，左右转动 |
| 脚（左、右） | 腿的下方 | 由「脚舵机」带动，抬起脚掌内外侧 |
| 电源开关 | 身体下方**左侧** | 拨动开关 |
| 功能键（BOOT） | 身体下方**右侧** | 开机后按一下：进入 / 退出对话（打断）；开机时按住：进入下载模式 |
| Type-C 口 | 身体下方 | 充电、烧录、看日志 |
| 喇叭、麦克风 | 身体内 | |

:::info 待补充
奶龙外壳底部开关、功能键、Type-C 口的实拍照片。
:::

## 2. 引脚分配

下面的引脚是奶龙固件 `main/boards/otto-robot/config.h` 里的定义，官方 Otto 固件相同。

<figure>
  <img className="board-svg" src="/img/intro/pinout.svg" alt="ESP32-S3 引脚分配图：左腿舵机 GPIO17、左脚舵机 GPIO18、右腿舵机 GPIO39、右脚舵机 GPIO38、BOOT 键 GPIO0、充电检测 GPIO21、电池电压 ADC2 通道 3；麦克风 WS SCK DIN 为 GPIO 4 5 6，功放 DOUT BCLK LRCK 为 GPIO 7 15 16，屏幕 MOSI CLK 为 10 9，DC RST CS 为 46 11 12，背光为 3" />
  <figcaption>ESP32-S3 引脚分配</figcaption>
</figure>

### 2.1 舵机

| 舵机 | GPIO | 代码里的名字 |
|---|---|---|
| 左腿 | 17 | `LEFT_LEG_PIN` |
| 左脚 | 18 | `LEFT_FOOT_PIN` |
| 右腿 | 39 | `RIGHT_LEG_PIN` |
| 右脚 | 38 | `RIGHT_FOOT_PIN` |
| 左手 / 右手 | -1 | 不使用，固件不会注册手部动作 |

主板上有三组 2×3 舵机排针（HDR1、HDR3、HDR4），每组接两个舵机。每个舵机的三根线从信号到地依次是 **信号 / 电源（电池直供）/ GND**，所以插的时候**棕色线（GND）朝外**。

| 排针 | 接哪两个舵机 |
|---|---|
| HDR1 | 左腿（GPIO17）、左脚（GPIO18） |
| HDR3 | 右腿（GPIO39）、右脚（GPIO38） |
| HDR4 | 手臂（GPIO8、GPIO12），奶龙不用，空着 |

:::warning
排针的线序是从原理图图片上读出来的，和固件引脚定义一致，但还没有对着奶龙主板实物逐个核对。插错方向一般不会立刻损坏，但舵机不会动；插好后先开机确认四个舵机都能归中。
:::

### 2.2 音频

| 信号 | GPIO |
|---|---|
| 麦克风 WS / SCK / DIN | 4 / 5 / 6 |
| 功放 DOUT / BCLK / LRCK | 7 / 15 / 16 |

麦克风采样率 16 kHz，播放采样率 24 kHz，两路 I2S 分开（simplex）。

### 2.3 屏幕

| 信号 | GPIO |
|---|---|
| MOSI / CLK | 10 / 9 |
| DC / RST / CS | 46 / 11 / 12 |
| 背光 | 3 |

ST7789，240×240，SPI mode 3，需要颜色反转（`DISPLAY_INVERT_COLOR true`）。

### 2.4 电源和按键

| 信号 | GPIO |
|---|---|
| BOOT 键 | 0 |
| 充电检测 | 21 |
| 电池电压 | ADC2 通道 3 |

:::info 待补充
立创原理图上标的是 CHG_DET = IO47、BAT_DET = IO21，和固件 `config.h` 不一致。本页以实际在跑的固件为准，原理图版本差异待确认。
:::

## 3. 主板

主要芯片（立创 BOM，ottoRobotV1.1）：

| 位号 | 器件 | 作用 |
|---|---|---|
| U2 | ESP32-S3-WROOM-1U-N16R8 | 主控 |
| U5 | MAX98357AETE+T | I2S 功放 |
| U7 | ICS-43434 | I2S 麦克风 |
| U8 | TP4054 | 锂电充电 |
| U3 | HE9073A33M5R | 3.3 V 稳压 |
| U6 | AO3400A | 屏幕背光开关 |
| SW1 / SW2 | XKB5858 拨动开关 / TS35CA 按键 | 电源 / 功能键 |
| CN2 / U9 | 1.25 mm 2P / PH2.0 2P | 喇叭 / 电池 |
| HDR1 / HDR3 / HDR4 | 2.54 mm 2×3 排针 | 舵机 |

:::info 待补充
主板正反面实拍和接口标注图。立创页面上只有整机渲染和成品照片，没有主板特写。
:::

---
slug: /intro/specs
title: 规格参数
sidebar_label: 规格参数
---

## 1. 硬件规格

| 项目 | 规格 |
|---|---|
| 主控 | ESP32-S3-WROOM-1U-N16R8（外接天线版），双核 Xtensa LX7 240 MHz；板载天线版 -1 也能用 |
| 存储 | 16 MB Flash，8 MB Octal PSRAM |
| 无线 | 2.4 GHz Wi-Fi，蓝牙 5（LE） |
| 舵机 | SG90 9g 180° × 4：左腿、右腿、左脚、右脚 |
| 屏幕 | 1.54 寸 IPS，240 × 240，ST7789 驱动，SPI 接口 |
| 麦克风 | ICS-43434 或 INMP441，I2S 数字麦克风 |
| 功放 | MAX98357A，I2S 输入，D 类 |
| 喇叭 | 2828 腔体喇叭，4 Ω 3 W |
| 电池 | 103450 锂电 2000 mAh，或双 18650 电池包 3.7 V 2200 mAh |
| 充电 | USB Type-C 输入，TP4054 锂电充电，带充电指示灯 |
| 稳压 | HE9073A33M5R 3.3 V LDO |
| 按键 | 电源拨动开关（身体下方左侧）× 1，功能键（身体下方右侧，GPIO0：打断 / 唤醒 / 配网，烧录时当 BOOT 键用）× 1 |
| 主板 | [立创开源 ottoRobot V1.1，作者小鹏（txp666），CC BY-NC-SA 4.0](https://pro.lceda.cn/editor?jspm=hub.gc.an.sjq&jlc_vid=E1ZXUABREQVYV1wERAcPAVwHQVQIUFxSRAVZUgJTRFIxVlNfRFdXUVJRQFZaXztWKAkaExQVTU5BCBcOAAkbBUoFGAw%3D#id=16252c97e5b14635931de8ce7e3af8dc) |
| 打印结构件 | [当前模型包](/docs/assembly/print)：身体外壳、无手臂底座、左右卡销、左右腿、左右脚；8 个 STL 各 1 件，材料与参数按切片及试装确定 |

## 2. 软件规格

| 项目 | 官方 Otto 固件 | 奶龙定制固件 |
|---|---|---|
| 当前版本 | v2.5.3（2026-10-19） | 2.0.16 |
| 基于 | 小智 2.5.3 | 小智 2.0.x |
| 唤醒词 | 你好小智 | 你好奶龙 |
| 表情 | 21 个重绘表情 | 21 个「看山」单色表情 + 动作贴图 |
| 开发环境 | ESP-IDF v6.0.2 | ESP-IDF v5.5.5 |
| 后台 | xiaozhi.me | xiaozhi.me，或本地 Otto Master |

两种固件的区别见 [功能状态](/docs/intro/status)。

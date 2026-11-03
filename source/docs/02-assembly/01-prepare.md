---
slug: /assembly/prepare
title: 物料与工具
sidebar_label: 物料与工具
---

## 1. 两种备料方式

| 方式 | 你需要准备 | 适合 |
|---|---|---|
| **买套件** | 由我们提供完整的零部件套装 | 第一次做，想快点看到成品 |
| **自己买料** | 下面所有电子件 + 自己打 PCB、焊接 + 打印全部结构件 | 想完整体验一遍，或者想改电路 |

套件购买入口见 ottodiy.tech 的 [零部件清单](https://ottodiy.tech/docs/bom)。注意套件通常包含**手臂**（6 个舵机），奶龙只用 4 个。

<figure>
  <img className="board-svg" src="/img/assembly/parts-overview.svg" alt="奶龙需要的八组零件：奶龙外壳、无手臂机身底座、两条腿、两只脚、四个 SG90 舵机、主板和 1.54 寸屏、电池和喇叭、摇臂螺丝和天线" />
  <figcaption>开工前把这些摆在桌上（示意图）</figcaption>
</figure>

<figure>
  <img src="/img/ottodiy/assembly-01.webp" alt="实拍：桌上平铺着锂电池、主板、天线、喇叭、几个蓝色舵机和一堆白色 3D 打印零件" />
  <figcaption>实拍：Otto 原版的全部材料（来源：ottodiy.tech 组装教程 图 1）</figcaption>
</figure>

## 2. 电子件

| # | 名称 | 型号 / 规格 | 数量 | 备注 |
|---|---|---|---|---|
| 1 | 主板 PCB | 立创开源 [ottoRobot V1.1](https://pro.lceda.cn/editor?jspm=hub.gc.an.sjq&jlc_vid=E1ZXUABREQVYV1wERAcPAVwHQVQIUFxSRAVZUgJTRFIxVlNfRFdXUVJRQFZaXztWKAkaExQVTU5BCBcOAAkbBUoFGAw%3D#id=16252c97e5b14635931de8ce7e3af8dc) | 1 | 立创可以一键下单，什么都不用改 |
| 2 | 主控模组 | ESP32-S3-WROOM-1U-**N16R8** | 1 | 必须是 16 MB Flash + 8 MB PSRAM。1U 是外接天线版，要配 IPEX 天线；板载天线的 -1 版也能用。推荐乐鑫原厂，便宜模组信号不稳 |
| 3 | 舵机 | SG90 9g 180° | **4** | 建议多备 1 个；金属齿更耐用 |
| 4 | 屏幕 | 1.54 寸 240×240 SPI（ST7789） | 1 | 不要买玻璃胶一体款 |
| 5 | 功放 | MAX98357AETE+T | 1 | 建议立创货。有人反馈淘宝货喇叭噪音大、发热、掉电快 |
| 6 | 麦克风 | ICS-43434 | 1 | INMP441 模块也可以 |
| 7 | 充电芯片 | TP4054 | 1 | |
| 8 | 稳压 | HE9073A33M5R（3.3 V） | 1 | |
| 9 | 喇叭 | 2828 4Ω 3W，1.25 mm 端子 | 1 | |
| 10 | 电池 | 103450 2000 mAh（1.25 端子）或双 18650 包 3.7 V（PH2.0） | 1 | 买的时候说明要红黑线 |
| 11 | 电源开关 | XKB5858-Z-E 拨动开关 | 1 | |
| 12 | 功能键 | TS35CA 轻触按键 | 1 | 有的店铺清单里叫 BOOT 键，立创一键下单可能不含，需要单独买 |
| 13 | 舵机排针 | 2.54 mm 2×3P（PZ254-2-03-S） | 2 | 原板有 3 组，第 3 组接手臂，奶龙可以不焊 |
| 14 | 接口座 | HC-1.25 2P（喇叭）、PH2.0 2P（电池） | 各 1 | |
| 15 | 阻容等 | 见立创 BOM | — | 一键下单 |

整机物料大约 ¥150～500，看渠道和器件质量。

## 3. 打印件

| 零件 | 数量 | 来源 |
|---|---|---|
| 腿 `Otto_leg` | 2 | Otto 原版，[MakerWorld](https://makerworld.com.cn/zh/models/1117966-ottorobot-xiao-zhi-ai) |
| 脚 `Otto_foot` | 2 | Otto 原版 |
| 机身底座 `Otto_body`（**无手臂版**） | 1 | Otto 原版 |
| 奶龙 / 看山身体外壳 | 1 套 | ZhiForge 建模，见 [打印外壳](/docs/assembly/print) |

:::warning
立创开源页面上附的 3D 文件和固件**不是最新的**（作者在评论里说明过），请以 MakerWorld 和 [ottodiy.tech](https://ottodiy.tech/docs/downloads/) 为准。
:::

## 4. 舵机配件

舵机包里自带，别扔：

- 十字摇臂：装腿用，要剪短
- 脚部专用形状的摇臂：装脚用
- 两颗大螺丝：把舵机固定到机身上
- 小螺丝：固定摇臂

## 5. 工具

| 工具 | 用途 |
|---|---|
| M2 十字螺丝刀 | 拧所有螺丝 |
| 斜口钳 | 剪摇臂、清理打印支撑 |
| 能传数据的 Type-C 线 | 烧录。只能充电的线电脑认不出来 |
| 恒温烙铁、焊锡、助焊剂、镊子 | 自己焊板时需要 |
| 热风枪或加热台 | 焊 ESP32 模组底部焊盘，可选 |

:::nailong
螺丝拧紧就好，别使出吃奶的劲儿。打印件是塑料的，拧太狠会裂。
:::

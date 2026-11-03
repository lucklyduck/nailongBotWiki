---
slug: /assembly/center
title: 舵机归中
sidebar_label: 舵机归中
---

## 1. 简介

SG90 舵机能在 0°～180° 之间转。固件启动时会把每个舵机转到 **90°**（中间位置），这就是机器人的「站立零位」。**装腿之前必须先让舵机转到 90°**，再按这个位置装摇臂，这样站姿才正。

## 2. 接线

<figure>
  <img className="board-svg" src="/img/assembly/servo-header.svg" alt="舵机排针示意：HDR1 上排接左腿 GPIO17、下排接左脚 GPIO18，HDR3 上排接右腿 GPIO39、下排接右脚 GPIO38，每排三个针从板子外侧往里依次是 GND 棕线、电源红线、信号橙黄线；HDR4 接手臂，奶龙不用" />
  <figcaption>舵机怎么插：上腿下脚，棕线朝外</figcaption>
</figure>

<div className="img-grid">
  <figure>
    <img src="/img/ottodiy/assembly-02.webp" alt="实拍：主板已经接好锂电池、喇叭、黑色天线和多根舵机线" />
    <figcaption>实拍：主板接好电池、喇叭、天线和舵机线（来源：ottodiy.tech 组装教程 图 2）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/assembly-14.webp" alt="渲染图：从上往下看机身内部，红框标注舵机棕色线在外侧、上腿下足，以及天线、喇叭和 4G 模块接口的位置" />
    <figcaption>渲染图：红框处写着「棕色线在外侧，上腿下足」（来源：ottodiy.tech 组装教程 图 14）</figcaption>
  </figure>
</div>

1. 把 4 个舵机插到主板的舵机排针上：
   - **HDR1**：上排左腿，下排左脚
   - **HDR3**：上排右腿，下排右脚
   - 每个插头的**棕色线（GND）朝主板外侧**
2. 接上喇叭（1.25 mm 2P 座）和电池（PH2.0 座）。

:::warning
舵机线序来自 ottodiy 组装教程和原理图图片，还没有对着奶龙主板逐个拍照核对。以主板丝印为准，插好后按下面的步骤确认四个舵机都会转。
:::

## 3. 烧录并归中

1. 按 [烧录](/docs/flash) 写入固件（官方或奶龙固件都可以）。买的套件固件已经烧好，跳过这一步。
2. 打开电源开关。四个舵机会各自转一下，停在 90°。
3. 关掉电源开关。
4. **拔下舵机线**（舵机先别拆），等机身装好后再插回去。

:::warning
从这一刻起，**不要用手拧舵机的输出轴**。拧动了就要重新上电归中一次。
:::

:::nailong
如果某个舵机上电后完全不动，先看看插头是不是插反了（棕线要朝外），再看电池有没有电。
:::

---
slug: /assembly/solder
title: 焊接主板
sidebar_label: 焊接主板
---

## 1. 简介

买官方套件或者成品板的话，**跳过这一页**。

自己做板：在 [立创开源 ottoRobot](https://oshwhub.com/txp666/ottorobot) 打开 **ottoRobotV1.1** 的 PCB 直接下单，作者说明「什么都不用改」。器件大多可以按 BOM 在立创一键下单，功能键（TS35CA）可能要单独买。

:::info
立创工程里还有一个「模块直插新手友好 V1.1」版本，麦克风和功放用模块直插，焊接难度更低，适合第一次焊贴片的人。
:::

<div className="img-grid">
  <figure>
    <img src="/img/community/oshwhub-06.jpg" alt="原理图缩略图，分成 POWER、USB-PROG、CORE、LCD、MIC、IOs 几个区域" />
    <figcaption>原理图（来源：立创开源 ottoRobot）</figcaption>
  </figure>
  <figure>
    <img src="/img/community/oshwhub-07.jpg" alt="红色 PCB 布局缩略图，标注板厚 1.2" />
    <figcaption>PCB，板厚 1.2 mm（来源：立创开源 ottoRobot）</figcaption>
  </figure>
</div>

立创 EDA 有个「焊接辅助工具」：左边是 BOM，点哪个器件右边 3D 图就高亮它在板上的位置，焊的时候很省事。

<div className="img-grid">
  <figure>
    <img src="/img/ottodiy/solder-01.webp" alt="立创 EDA 截图：PCB 编辑器里绿色箭头指向工具菜单" />
    <figcaption>在 PCB 编辑器的「工具」菜单里打开（来源：ottodiy.tech 焊接指南）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/solder-02.webp" alt="立创 EDA 焊接辅助工具截图：左边 BOM 列表，右边 3D 视图高亮待焊器件" />
    <figcaption>焊接辅助工具界面（来源：ottodiy.tech 焊接指南）</figcaption>
  </figure>
</div>

## 2. 难焊的几个器件

参考 ottodiy.tech 的 [焊接指南](https://ottodiy.tech/docs/soldering-guide)：

| 器件 | 要点 |
|---|---|
| 麦克风 ICS-43434 | 第 3 脚 GND 那一圈**一定要焊好**，否则会发热、不稳定甚至烧坏。别长时间用风枪吹：先给焊盘上锡，吹化后迅速放上麦克风 |
| 功放 MAX98357A | 注意方向，芯片上的 `+` 对准右上角白点 |
| ESP32-S3 模组 | 底部散热焊盘最好也焊上：涂锡膏后放加热台，或用热风枪 |
| 充电指示 LED | 左边是负极（绿色竖线朝左，或底部三角尖朝左）。不插电池时微亮是正常的 |

### 2.1 实拍参考

<div className="img-grid">
  <figure>
    <img src="/img/ottodiy/solder-03.webp" alt="实拍：麦克风 U6 焊盘已上锡，图中文字提示上锡并涂少量助焊剂" />
    <figcaption>麦克风焊盘先上锡、涂助焊剂</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/solder-04.webp" alt="实拍：麦克风已经摆正焊好，图中文字提示看丝印摆正、用加热台" />
    <figcaption>看丝印摆正麦克风，用加热台</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/solder-05.webp" alt="实拍：主板放在加热台上焊接，图中文字提示切勿时间过长" />
    <figcaption>加热台焊接，时间别太长</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/solder-06.webp" alt="实拍：模块板、排针和紫色麦克风子模块，图中文字提示排针适当剪短" />
    <figcaption>模块版：排针剪短，看清模块引脚丝印</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/solder-07.webp" alt="实拍：非模块板背面的屏幕排线焊盘已上锡" />
    <figcaption>屏幕排线焊盘上锡、涂助焊剂</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/solder-08.webp" alt="实拍：屏幕 FPC 排线焊在板上，图中文字提示刀头烙铁 350 度左右快速拖动不超过 3 秒" />
    <figcaption>屏幕排线：刀头 350 °C 快速拖焊，不超过 3 秒</figcaption>
  </figure>
</div>

<p style={{fontSize: '0.85rem'}}>以上实拍图来源：ottodiy.tech 焊接指南。</p>

<div className="img-grid">
  <figure>
    <img src="/img/ottodiy/solder-09.webp" alt="PCB 截图：ICS-43434 麦克风焊盘特写，GND 第 3 脚是一圈环形焊盘" />
    <figcaption>麦克风第 3 脚 GND 是一整圈，必须焊满（来源：ottodiy.tech 焊接指南）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/solder-10.webp" alt="原理图截图：U7 ICS-43434 的 WS、LR、GND、SD、VDD、SCK 引脚" />
    <figcaption>麦克风引脚定义（来源：ottodiy.tech 焊接指南）</figcaption>
  </figure>
</div>

通用技巧：烙铁 320～350 °C，每个焊点加热不超过 3～5 秒，烙铁头保持干净，同时加热焊盘和引脚。

## 3. 焊完检查

1. 目视检查有没有连锡、虚焊。
2. 万用表量 3.3 V 和 GND 之间**没有短路**。
3. 用酒精清掉助焊剂残留。
4. 插 USB，电脑能识别出串口，就可以去 [舵机归中](/docs/assembly/center) 烧录了。

:::danger
3.3 V 和 GND 短路时不要接电池。锂电池短路电流很大，可能烧坏板子甚至起火。
:::

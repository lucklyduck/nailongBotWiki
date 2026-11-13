---
slug: /assembly
title: 组装
sidebar_label: 组装
---

## 1. 简介

Wiki中有全套开源外壳可自行下载打印

这一章把一堆零件变成一只能站起来的奶龙。用官方套件大约 **40 分钟**；从焊板开始自己做大约 **2～3 小时**。

<figure>
  <img src="/img/photos/model-viewer.jpg" alt="手机上的「奶龙·结构观察室」页面：标题是把奶龙，装起来，副标题写着按实物照片装配、黄色外壳、白色双腿、四个关节，中间是黄色奶龙外壳和白色腿脚的三维模型" />
  <figcaption>历史结构预览图，仅作外观参考；打印文件见「打印外壳」页面</figcaption>
</figure>

<figure>
  <img className="board-svg" src="/img/assembly/flow.svg" alt="组装顺序：备料、焊板（买成品板可跳过）、烧录归中让舵机转到 90 度、装腿脚并把摇臂对正、装主板并插回舵机线、扣上奶龙或看山外壳、自检站直会动；第三步必须在第四步之前，否则走路会歪甚至顶死" />
  <figcaption>组装顺序</figcaption>
</figure>

| 步骤 | 页面 | 用时 |
|---|---|---|
| 1 | [物料与工具](/docs/assembly/prepare) | — |
| 2 | [打印外壳](/docs/assembly/print) | 以当前模型的切片预估为准 |
| 3 | [焊接主板](/docs/assembly/solder)（买成品板跳过） | 1 小时 |
| 4 | [舵机归中](/docs/assembly/center) | 10 分钟 |
| 5 | [装腿和脚](/docs/assembly/legs) | 20 分钟 |
| 6 | [装主板和外壳](/docs/assembly/body) | 15 分钟 |
| 7 | [装完自检](/docs/assembly/check) | 5 分钟 |

:::nailong
先烧录、再装腿！舵机要先被固件转到 90° 才能装摇臂，不然我走路会内八，还会一边走一边「嗡嗡」叫。
:::

## 2. 视频教程

| 分 P | 内容 | 时长 | 对应本章 |
|---|---|---|---|
| P1 | 配网及后台配置 | 3:54 | [配网](/docs/debug/wifi)、[xiaozhi 后台](/docs/xiaozhi) |
| P2 | 固定头部 | 5:46 | [装主板和外壳](/docs/assembly/body) |
| P3 | 腿部安装 | 10:32 | [装腿和脚](/docs/assembly/legs) |
| P4 | 组装脚部 | 7:08 | [装腿和脚](/docs/assembly/legs) |
| P5 | 组装手臂 | 9:40 | 奶龙没有手臂，跳过 |

下面是第 1 集，其他分 P 已经贴在对应的步骤页里：

<figure>
  <div className="video-embed">
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1zuNyzXEWa&p=1&autoplay=0&high_quality=1" title="B 站组装教程 P1：配网及后台配置" allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"></iframe>
  </div>
  <figcaption>B 站组装教程 P1：配网及后台配置（鹿小班电子科技，<a href="https://www.bilibili.com/video/BV1zuNyzXEWa?p=1">打不开就点这里去 B 站看</a>）</figcaption>
</figure>

视频里装的是 Otto 原版的方块头，奶龙把这一步换成了奶龙 / 看山的身体外壳，其余步骤一样。

---
slug: /assembly/print
title: 打印外壳
sidebar_label: 打印外壳
---

## 1. 简介

奶龙机器人 = Otto 原版的**腿、脚、机身底座** + 奶龙 / 看山造型的**身体外壳**。原版零件照常打印，外壳是 ZhiForge 在黑客松上建模的。

<figure>
  <img src="/img/photos/hero-three-robots.jpg" alt="三只样机：黄色奶龙和两只灰白色看山，腿是白色、脚是蓝色" />
  <figcaption>样机配色：奶龙黄 / 看山灰白身体，白色腿，蓝色脚</figcaption>
</figure>

## 2. 原版结构件

从 [MakerWorld · ottoRobot 小智 AI](https://makerworld.com.cn/zh/models/1117966-ottorobot-xiao-zhi-ai) 下载 STL。机身选**无手臂版**，腿打 2 个、脚打 2 个。

| 零件 | 数量 | 样机颜色 | 材料 |
|---|---|---|---|
| `Otto_body`（无手臂） | 1 | 蓝色 | PLA 或树脂 |
| `Otto_leg` | 2 | 白色 | PLA 或树脂 |
| `Otto_foot` | 2 | 蓝色 | PLA 或树脂 |

MakerWorld 上的 3MF 打印方案不完整，建议下载最新版的 STL 自己切片。

## 3. 奶龙 / 看山外壳

<figure>
  <img src="/img/demo/pair.jpg" alt="灰白色看山和黄色奶龙并排站着，都抱着胸前的屏幕" />
  <figcaption>两种外壳：看山（左）和奶龙（右），腿脚是同一套 Otto 原版件（截自演示视频）</figcaption>
</figure>

外壳可以先在「奶龙 · 结构观察室」（model.zhiforge.org）里在线预览：按实物照片装配，黄色外壳、白色双腿、四个关节，共 6 个 STL。

**奶龙外壳 STL 文件**

<a href="/downloads/nailong-shell.stl" download="nailong-shell.stl">下载我们提供的奶龙外壳 STL（约 1.8 MB）</a>

下载后可导入切片软件，进行摆放、支撑设置和打印准备。

### 3.1 换个配色？

奶龙外壳也是在 Otto 上「换皮」。社区里的 Otto 配色可以当参考：

<div className="img-grid">
  <figure>
    <img src="/img/community/makerworld-02.jpg" alt="实拍：白色身体、绿色腿、橙色脚的 Otto，屏幕显示眯眼表情" />
    <figcaption>白身绿腿橙脚（来源：MakerWorld ottoRobot 小智 AI）</figcaption>
  </figure>
  <figure>
    <img src="/img/community/makerworld-03.jpg" alt="实拍：全黄色 Otto 戴着白色耳机，屏幕显示两只圆眼" />
    <figcaption>全黄色戴耳机（来源：MakerWorld）</figcaption>
  </figure>
  <figure>
    <img src="/img/community/oshwhub-03.jpg" alt="实拍：灰色身体、蓝色头顶、橙黑腿脚的 Otto，屏幕显示两只白色圆眼" />
    <figcaption>灰身蓝顶（来源：立创开源 ottoRobot）</figcaption>
  </figure>
  <figure>
    <img src="/img/community/makerworld-04.jpg" alt="渲染图：白蓝粉配色的 Otto 戴着黑色耳机" />
    <figcaption>白蓝粉戴耳机，渲染图（来源：MakerWorld）</figcaption>
  </figure>
</div>

## 4. 打印建议

这些是通用建议，不是针对奶龙外壳的实测参数：

- 腿和脚受力大，填充率给高一点（30% 以上）。
- 摇臂和螺丝孔要尺寸准确，打印后先试装，孔小了用钻头或螺丝刀轻轻扩一下。
- 清干净支撑，尤其是舵机槽和螺丝孔里。

:::nailong
打印之前先想好颜色！我是奶龙黄，旁边那只灰白色的是看山。你想要粉色奶龙也不是不行。
:::

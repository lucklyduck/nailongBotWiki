---
slug: /dev/emotion
title: 更换表情
sidebar_label: 更换表情
---

## 1. 简介

奶龙固件把圆屏中间的表情换成了 240×240 的单色「看山」贴图，分两类：

| 类型 | 数量 | 什么时候显示 |
|---|---|---|
| 对话表情 | 21 个 | 后台根据对话情绪发来表情名时切换 |
| 动作贴图 | 22 个 | 本地动作开始时临时显示，结束或 stop 后恢复对话表情 |

21 个对话表情名和小智协议一致，**名字不能改**，只能换图：

```text
neutral happy laughing funny sad angry crying loving embarrassed surprised shocked
thinking winking cool relaxed delicious kissy confident sleepy silly confused
```

未知的表情名会显示 `neutral`。屏幕上方的状态栏和下方的字幕位置、样式都没有改。

## 2. 图片数据在哪

`main/boards/otto-robot/kanshan_emotions.c` 里每张图是一个 LVGL 图片结构体，例如 `emotion_neutral`、`action_walk`，数据是 **I1 格式**（每像素 1 位，黑白）的字节数组。原始 PNG 不在仓库里，仓库只保存转换好的数据。

## 3. 换一张图

1. 准备一张 **240×240** 的 PNG，黑白两色，背景透明或纯黑。
2. 用 LVGL 官方的图片转换工具（或仓库 `scripts/Image_Converter`）转成 C 数组：颜色格式选 **I1**，输出 C 文件。
3. 打开 `kanshan_emotions.c`，找到对应名字的数组（例如 `emotion_happy_data`），把字节数组替换成新生成的数据，**数组长度和结构体里的宽高、数据大小也要一起更新**。
4. 编译烧录，对奶龙说点开心的话，看表情是否切换。

:::tip
想换成彩色表情的话，颜色格式改为 RGB565，但每张图会从约 7 KB 变成约 112 KB，43 张图放不进固件，需要减少数量或改成从资源分区加载。
:::

:::info 待补充
看山贴图的原始素材和批量转换脚本。目前素材不在仓库里，批量替换需要作者提供。
:::

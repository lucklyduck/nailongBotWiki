---
slug: /dev/emotion
title: 更换表情
sidebar_label: 更换表情
---

## 1. 简介

NaiFirmware 使用 **9 张 240×240 彩色场景图**，格式为 RGB565 小端原始数据。正常对话按场景选图，不按云端的 21 个情绪名称逐一换图。

| 场景 | 原始素材 | 资源文件 |
|---|---|---|
| 待机 / 听取 / 等待 | `Materials/9.raw` | `nl_idle.raw` |
| 本地大笑 | `Materials/2.raw` | `nl_laugh.raw` |
| 语音回答 | `1、3、4、5、6、7、8.raw` | `nl_reply1.raw` 至 `nl_reply7.raw` |

每次回答选一张，避免相邻重复；大笑图优先，实际播放结束后恢复。字幕、网络和电量仍由界面显示。

## 2. 改哪个文件

| 文件 | 作用 |
|---|---|
| `nailong_display.cc` | 加载图片、刷新显示 |
| `nailong_scene_state.h` | 选择当前场景 |
| `nailong_assets/` | 构建使用的资源 |
| `scripts/prepare_nailong_materials.py` | 从原始素材准备图片和笑声 |

前三项位于 `main/boards/otto-robot/` 下。每张 RAW 应为 **115,200 字节**，不是把 PNG 改后缀得到的文件。

## 3. 换一张图

1. 准备尺寸、像素格式和字节序一致的 RAW，替换 `Materials/` 中对应文件。
2. 原始素材目录还需保留一份笑声 OGG；转换脚本会一起处理音频。
3. 在源码目录执行：

~~~bash
python scripts/prepare_nailong_materials.py --ffmpeg ffmpeg --laugh-seconds 5
python scripts/build_nailong.py
~~~

4. 构建成功后更新应用和资源，检查待机、连续回答、大笑、字幕与电量图标。

## 4. 常见问题

| 现象 | 检查 |
|---|---|
| 颜色或图案不对 | 尺寸、RGB565 小端格式、资源是否更新 |
| 连续回答始终一张图 | 是否真的进入了新回答，资源文件是否齐全 |
| 笑声结束了还显示大笑图 | 音频是否实际排空，查看场景与播放日志 |
| 想按 happy / sad 分别显示 | 需要扩展场景逻辑，当前不是逐情绪贴图方案 |

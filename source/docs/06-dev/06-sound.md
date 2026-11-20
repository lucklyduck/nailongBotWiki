---
slug: /dev/sound
title: 更换音效
sidebar_label: 更换音效
---

## 1. 简介

奶龙的笑声是 `main/boards/otto-robot/nailong_assets/nl_laugh.ogg`，约 5 秒，Ogg Opus、单声道、16 kHz、60 ms 帧。系统提示音仍在 `main/assets/common/`。

当前没有旧教程所述“每种动作自动配一段音效”的映射。

## 2. 准备笑声

仓库根目录的 `Materials/` 中保留九张图片和 **一份**原始 OGG。在 `nailong-firmware/` 下执行：

~~~bash
python scripts/prepare_nailong_materials.py --ffmpeg ffmpeg --laugh-seconds 5
python scripts/build_nailong.py
~~~

脚本截取前 5 秒、转换编码，更新素材清单并保留原文件。已有定制资源时可直接构建；重新转换需要可用的 ffmpeg。

## 3. 播放怎么控制

`nailong_actions.cc` 注册 `self.otto.laugh`：

1. 有界队列接收请求，忙时拒绝重复调用。
2. 等已有音频排空，再安排本地播放和大笑图。
3. 按播放代次检查中断，过期音频不再补入。
4. 音频完成或中断后返回工具结果。

不要让工具在等待云端退出 Speaking 后才开始：云端可能正在等待工具返回，这样会互相等待。

## 4. 边笑边走

使用 `self.otto.laugh_walk`，一次请求启动笑声和步态，两项结束后才完成。分别调用 `laugh` 和 `action` 可能被云端串行执行，变成先笑后走。

完整机械与音频重叠效果仍待实测，见 [功能状态](/docs/intro/status)。

## 5. 验证

更新配套资源后，说“笑一个”，检查工具日志、约 5 秒声音、大笑图和结束后的场景恢复。再测试打断、连续调用和重新对话。

只替换音频文件还不算完成，必须重新准备资源、构建、烧录并听实际输出。

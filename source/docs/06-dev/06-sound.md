---
slug: /dev/sound
title: 更换音效
sidebar_label: 更换音效
---

## 1. 简介

奶龙的本地音效（不经过云端、机器人自己播放的声音）都在 `main/assets/common/` 下：

| 文件 | 什么时候播放 |
|---|---|
| `nailong_laugh.ogg` | `self.otto.laugh`，奶龙大笑，约 2 秒 |
| `action_walk.ogg` | 走路 |
| `action_turn_jump.ogg` | 转身、跳 |
| `action_swing.ogg` | 摇摆 |
| `action_bend_shake_leg.ogg` | 弯腰、抖腿 |
| `action_other.ogg` | 其他动作 |
| `success.ogg` `popup.ogg` `exclamation.ogg` `vibration.ogg` `low_battery.ogg` | 系统提示音 |

编译时，这个目录里所有 `.ogg` 都会被打包进固件，并自动生成 `Lang::Sounds::OGG_文件名大写` 这样的常量供代码使用（例如 `nailong_laugh.ogg` → `OGG_NAILONG_LAUGH`）。

## 2. 换掉奶龙大笑

1. 准备新音频，建议 2 秒左右。
2. 转成 **Opus 编码的 OGG**、单声道、16 kHz。用 ffmpeg：

   ```bash
   ffmpeg -i my_laugh.mp3 -c:a libopus -ac 1 -ar 16000 -b:a 24k -frame_duration 60 nailong_laugh.ogg
   ```

   `-frame_duration 60` 让每个 Opus 包约 60 ms，和原文件一致。仓库里的 `scripts/mp3_to_ogg.sh` 和 `scripts/ogg_converter` 也可以用。
3. 覆盖 `main/assets/common/nailong_laugh.ogg`。
4. 编译烧录，说「笑一个」验证。

## 3. 加一个新音效

1. 把 `meow.ogg` 放进 `main/assets/common/`。
2. 重新编译一次，生成常量 `Lang::Sounds::OGG_MEOW`（以 `build` 里生成的 `lang_config.h` 为准）。
3. 参考 `self.otto.laugh` 的写法，在 `otto_controller.cc` 里注册一个工具，调用 `QueueSound(Lang::Sounds::OGG_MEOW, ...)` 播放。

:::warning
音效会占用固件空间。几秒钟的 Opus 音效只有几 KB，但不要放几十秒的音乐进去。
:::

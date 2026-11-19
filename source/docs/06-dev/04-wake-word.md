---
slug: /dev/wake-word
title: 修改唤醒词
sidebar_label: 修改唤醒词
---

## 1. 简介

奶龙使用 MultiNet 中文命令词模型，通过拼音配置唤醒词，不需要重新训练模型。当前设置在 `scripts/build_nailong.py` 的 `NAILONG_OVERRIDES` 中。

| 配置 | 当前值 |
|---|---|
| `CONFIG_USE_CUSTOM_WAKE_WORD` | `y` |
| `CONFIG_CUSTOM_WAKE_WORD` | `ni hao nai long` |
| `CONFIG_CUSTOM_WAKE_WORD_DISPLAY` | 你好奶龙 |
| `CONFIG_CUSTOM_WAKE_WORD_THRESHOLD` | 10 |
| 模型 | 中文 MultiNet7 |

## 2. 修改并构建

例如改为“你好看山”，编辑构建脚本中的对应项：

~~~python
'CONFIG_CUSTOM_WAKE_WORD="ni hao kan shan"',
'CONFIG_CUSTOM_WAKE_WORD_DISPLAY="你好看山"',
"CONFIG_CUSTOM_WAKE_WORD_THRESHOLD=10",
~~~

保持列表中其他配置和语法完整，然后执行：

~~~bash
python scripts/build_nailong.py
idf.py -p COM5 flash monitor
~~~

专用脚本会再次生成配置，单独修改 `menuconfig` 可能被脚本覆盖。不要照旧教程寻找 `sdkconfig.defaults.otto`。

## 3. 必须更新资源

模型和实际阈值从 `generated_assets.bin` 的索引读取。只更新应用可能仍使用旧词组和旧阈值，升级包要同时更新应用与资源。

**会看到什么**：日志中显示新的拼音和阈值；当前阈值 10 对应运行值 `0.1`。

## 4. 调节灵敏度

| 现象 | 调整方向 |
|---|---|
| 漏唤醒 | 可尝试减小阈值，同时记录误唤醒 |
| 误唤醒 | 增大阈值，例如 10 → 20 |
| 对话文字把“奶龙”听成别的词 | 这是云端听写问题，和待机唤醒模型分开排查 |

阈值越小越敏感，不代表越好。固定距离、音量和环境，分别记录唤醒成功与误触发次数，再决定取值。

本地“停下”有独立配置 `CONFIG_LOCAL_STOP_COMMAND_THRESHOLD`，不要与唤醒阈值混用。当前两项都是 10%，停止功能仍属待实测候选。

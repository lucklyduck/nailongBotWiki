---
slug: /dev/wake-word
title: 修改唤醒词
sidebar_label: 修改唤醒词
---

## 1. 简介

奶龙固件用乐鑫 MultiNet 中文命令词模型做自定义唤醒词，**用拼音配置，不需要重新训练模型**。当前配置：

| 配置项 | 值 | 作用 |
|---|---|---|
| `CONFIG_USE_CUSTOM_WAKE_WORD` | `y` | 启用自定义唤醒词（需要 ESP32-S3 + PSRAM） |
| `CONFIG_CUSTOM_WAKE_WORD` | `ni hao nai long` | 唤醒词拼音，空格分隔，不带声调 |
| `CONFIG_CUSTOM_WAKE_WORD_DISPLAY` | `你好奶龙` | 唤醒后发给后台的问候语 |
| `CONFIG_CUSTOM_WAKE_WORD_THRESHOLD` | `20` | 灵敏度阈值 1–99，**越小越灵敏** |

## 2. 修改

### 方法一：menuconfig

```bash
idf.py menuconfig
```

进入 **Xiaozhi Assistant**，找到 Custom Wake Word 相关的三项，修改后按 `S` 保存、`Q` 退出。

### 方法二：直接改默认配置

编辑 `sdkconfig.defaults.otto`：

```ini
CONFIG_CUSTOM_WAKE_WORD="ni hao kan shan"
CONFIG_CUSTOM_WAKE_WORD_DISPLAY="你好看山"
```

然后**删掉旧的 `sdkconfig`** 再编译，否则旧配置会覆盖默认值：

```bash
rm sdkconfig
idf.py build
```

## 3. 烧录

```bash
idf.py -p /dev/cu.usbmodem1101 flash monitor
```

唤醒词模型和索引在 `generated_assets.bin` 里，必须用完整的 `idf.py flash`。

## 4. 怎么选唤醒词

- 3～4 个字最好，太短容易误唤醒，太长不好识别。
- 避开日常高频词，「你好」开头的组合比较稳。
- 避开发音相近的字，「奶龙」和「来龙」容易混。

调阈值：

| 现象 | 调整 |
|---|---|
| 叫好几次才醒 | 阈值调小，例如 20 → 15 |
| 没叫也自己醒 | 阈值调大，例如 20 → 30 |

:::info 待补充
「你好奶龙」的实测识别率和误唤醒率。
:::

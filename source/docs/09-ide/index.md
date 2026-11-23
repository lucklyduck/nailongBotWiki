---
slug: /ide
title: Catnip Forge IDE 入门
sidebar_label: Catnip Forge IDE 入门
---

## 1. 简介

Catnip Forge 把 **改代码、编译、烧录、看串口** 放进一个桌面工作区。用两个小示例走完流程，再尝试自己的工程。

本文按 **v2.0.0** 的使用示例整理，界面以安装版本为准。源码见 [GitHub 仓库](https://github.com/cccatnipent/Catnip_Forge_IDE)。

| 页面 | 做什么 | 完成标志 |
|---|---|---|
| [第一次编译烧录](/docs/ide/first-run) | 使用 `hello_world_esp32s3` | 串口不断打印 `Hello world! heartbeat=…` |
| [改一句输出](/docs/ide/change-code) | 自己改或让 Agent 改 | 新固件打印 `hello_my_program` |
| [排错与速查](/docs/ide/troubleshooting) | 区分编译、烧录和运行 | 找到本次任务日志与设备输出 |

## 2. 开始之前

1. 准备一块 **ESP32-S3 开发板**和能传数据的 USB 线。
2. 完整解压 IDE 便携目录到可写位置，运行其中的程序，不要只复制 EXE。
3. 首次启动按界面配置自己的模型供应商，Key 只填入专用凭据窗口，不发到聊天框。
4. 选择软件自带的 `hello_world_esp32s3` 工程；缺少示例时先核对发布包，不要随便选其他板型的工程。

## 3. 先认三个页面

| 页面 | 用途 |
|---|---|
| 编辑器 | 打开文件、修改并保存 |
| 任务管理器 | 选工程编译，选设备烧录，查看每次任务结果 |
| 监视器 | 连接同一个串口，看设备实际输出 |

左侧 Agent 可以按文字要求改代码；右下角使用助手负责解释软件怎么用。是否完成，以文件、任务结果和串口为准。

:::nailong
编译是把程序做好，烧录是把它装进去，看串口才知道它有没有真的跑起来。
:::

## 4. 和奶龙固件是什么关系

本章示例只验证 IDE 使用流程，不包含奶龙图片、笑声或舵机控制。烧入 Hello World 会替换设备当前应用，建议用独立开发板练习。

NaiFirmware 有自己的 ESP-IDF v5.5.5 要求、构建脚本和资源分区。先按 [编译奶龙固件](/docs/flash/build) 跑通专用流程；IDE 示例成功不等于已经完成奶龙工程的导入和适配。

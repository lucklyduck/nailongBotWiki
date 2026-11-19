---
slug: /ide/first-run
title: 第一次编译烧录
sidebar_label: 第一次编译烧录
---

## 1. 简介

用自带的 `hello_world_esp32s3` 跑通一次 **工程 → 编译 → 烧录 → 串口**。第一次大约 15 分钟，以本机依赖准备情况为准。

## 2. 确认工程

启动后选择该工程，右上角“当前工程”应显示 `hello_world_esp32s3`。在“编辑器”展开 `main`，找到 `hello_world_main.c`。

使用其他工程时，一个工程放一个直接子目录，不要套两层：

| 运行方式 | 工程目录 |
|---|---|
| 便携包 | `安装目录/resources/runtime/hardboard/projects/` |
| 源码运行 | `runtime/hardboard/projects/` |

自带示例已经放好，无需重复复制。找不到时先核对所用包及工程位置，再刷新列表。

## 3. 编译

1. 点顶部 **任务管理器**。
2. 在 Build 行点 **刷新工程**，选择 `hello_world_esp32s3`。
3. 点 **编译**，等待任务完成。
4. 在“最近任务结果”检查本次 Build：状态“成功”、退出码 `0`。

<figure>
  <img src="/img/ide/tasks.png" alt="Catnip Forge 任务管理器：刷新工程、选择工程并编译；刷新设备、选择串口并烧录；下方显示任务结果" loading="lazy" />
  <figcaption>上面操作，下面核对本次 Build / Flash 结果</figcaption>
</figure>

“completed · 100%”配合本次成功记录才算编译通过。此时开发板里还可能是旧程序。

## 4. 烧录

1. 用 USB 数据线连接开发板。
2. 在 Flash 行点 **刷新设备**，选择对应串口，例如 `COM4`。
3. “烧录来源”保持 **当前工程构建**。
4. 点 **烧录**，检查本次 Flash 成功、退出码 `0`，端口正确。

截图中的 COM 号和耗时只是示例，不是固定要求。烧录时若串口被占用，先关闭其他串口工具。

## 5. 看串口输出

1. 点顶部 **监视器**，选择同一个串口。
2. 设置 `115200`、8 位数据、1 位停止、无校验，文本编码 UTF-8。
3. 点 **打开串口**，清空旧接收内容后观察；需要看启动行时复位开发板。

<figure>
  <img src="/img/ide/monitor.png" alt="监视器右侧设置串口和 115200 波特率，接收区下半部分显示 Hello world 心跳输出" loading="lazy" />
  <figcaption>只看本次程序的新输出，截图上方混有旧固件日志</figcaption>
</figure>

~~~text
Hello world! heartbeat=1, free_heap=… bytes
Hello world! heartbeat=2, free_heap=… bytes
~~~

**会看到什么**：`heartbeat=` 后面的数字持续增加。旧日志、Agent 的预期输出和编译成功消息都不能代替这一步。

完成后继续 [改一句输出](/docs/ide/change-code)。

---
slug: /flash/tool
title: 用工具烧录
sidebar_label: 用工具烧录
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. 简介

当网页烧录用不了，或者你手上有别人发来的合并镜像（比如 [导出合并镜像](/docs/flash/merge) 生成的 `nailong-merged.bin`）时，用烧录工具把一个 `.bin` 文件从地址 `0x0` 开始写进去。

## 2. 下载固件

官方固件在 [ottodiy.tech 下载页](https://ottodiy.tech/docs/downloads/)，下载最新版即可，兼容所有版本的电路板：

| 版本 | 日期 | 说明 |
|---|---|---|
| [v2.5.3](https://ottodiy.tech/assets/files/otto2.5.3-e08dbce7bc6f496588c9518c4882dc85.bin) | 2026-10-19 | 更新到小智 2.5.3，21 个表情重新绘制 |
| [v2.4.2](https://ottodiy.tech/assets/files/otto2.4.2-d709600f2ecfe2f66706467ec9c6a86b.bin) | 2026-08-27 | 更新到小智 2.4.2 |

这些文件都是**合并好的完整镜像**，烧录地址是 `0x0`。

## 3. 烧录

<Tabs groupId="os">
<TabItem value="esptool" label="esptool（全平台）" default>

1. 安装 esptool（需要先装好 Python 3）：

   ```bash
   pip install esptool
   ```

2. 把下面命令里的串口 `/dev/cu.usbmodem1101` 换成你自己的（Windows 写 `COM5` 这样），文件名换成你下载的固件：

   ```bash
   esptool.py --chip esp32s3 -p /dev/cu.usbmodem1101 -b 921600 write_flash 0x0 otto2.5.3.bin
   ```

3. 看到下面的输出就是成功了：

   ```text
   Wrote 16777216 bytes ... 
   Hash of data verified.

   Leaving...
   Hard resetting via RTS pin...
   ```

   字节数随固件大小不同。

</TabItem>
<TabItem value="win" label="Flash Download Tool（Windows）">

1. 下载并解压 [Flash Download Tool 3.9.5](https://www.espressif.com.cn/sites/default/files/tools/flash_download_tool_3.9.5.zip)，运行 `flash_download_tool_3.9.5.exe`。
2. ChipType 选 **ESP32-S3**，WorkMode 选 **Develop**，LoadMode 选 **USB**，点 OK。
3. 第一行勾选，点「...」选择固件文件，地址填 `0x0`。
4. 右下角 COM 选机器人的串口，BAUD 选 **921600**。
5. 点 **START**，等左下角显示「完成」。
6. 关掉再打开电源开关。

</TabItem>
</Tabs>

## 4. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| `Failed to connect to ESP32-S3` | 没进入下载模式 | 按住 BOOT 再开机，见 [进入下载模式](/docs/flash#3-进入下载模式) |
| 烧到一半报错断开 | 波特率太高 / 线太差 | 把 `-b 921600` 改成 `-b 115200` 重试；换短一点的数据线 |
| 烧完不停重启 | 地址填错，或电池没电 | 确认地址是 `0x0`；充电后重试 |
| 想清空重来 | | `esptool.py --chip esp32s3 -p 串口 erase_flash`，会清掉配网和校准数据 |

:::danger
`erase_flash` 会清空整个 Flash，包括 Wi-Fi 配置、xiaozhi.me 绑定信息和舵机校准值，执行后需要重新配网、重新绑定、重新校准。
:::

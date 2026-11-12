---
slug: /download
title: 下载
sidebar_label: 下载
---

## 1. 固件

| 固件 | 版本 | 下载 | 烧录方式 |
|---|---|---|---|
| 官方 Otto 固件 | v2.5.3（2026-10-19） | [otto2.5.3.bin](https://ottodiy.tech/assets/files/otto2.5.3-e08dbce7bc6f496588c9518c4882dc85.bin) | 地址 `0x0`，见 [用工具烧录](/docs/flash/tool)；或 [网页在线烧录](/docs/flash/online) |
| 官方 Otto 固件 | v2.4.2（2026-08-27） | [otto2.4.2.bin](https://ottodiy.tech/assets/files/otto2.4.2-d709600f2ecfe2f66706467ec9c6a86b.bin) | 同上 |
| 奶龙定制固件 | 2.0.16 | 源码编译，见 [编译奶龙固件](/docs/flash/build) | `idf.py flash` |

更多历史版本见 [ottodiy.tech 下载页](https://ottodiy.tech/docs/downloads/)。

:::info 待补充
奶龙固件 2.0.16 的合并镜像（`nailong-2.0.16-merged.bin`）和 md5。
:::

## 2. 源码

| 名称 | 地址 | 说明 |
|---|---|---|
| 奶龙固件 | `howtion0/otto`（是否公开待确认） | 基于小智，ESP-IDF v5.5.5 |
| 小智 AI | [78/xiaozhi-esp32](https://github.com/78/xiaozhi-esp32) | 上游 |
| Otto 小智版 | [txp666/xiaozhi-esp32](https://github.com/txp666/xiaozhi-esp32) | 官方 Otto 固件源码 |
| MCP 示例 | [78/mcp-calculator](https://github.com/78/mcp-calculator) | 云端 MCP 计算器 |

## 3. 硬件

| 名称 | 地址 |
|---|---|
| 主板（原理图、PCB、BOM） | [立创开源 ottoRobot](https://oshwhub.com/txp666/ottorobot) |
| 完整打印模型（2026-11-13） | <a href="/downloads/models/2026-11-13/nailong-models-20261113.zip" download="nailong-models-20261113.zip">下载完整模型包（ZIP，10.46 MB）</a>；8 个 STL + 1 个 3MF 参考工程 |
| 单件 STL 与数量 | [八件打印清单](/docs/assembly/print) |
| 3MF 参考工程 | <a href="/downloads/models/2026-11-13/reference-project.3mf" download="reference-project.3mf">下载</a>；只含外壳、底座与左右卡销，不与 STL 重复打印 |
| 文件校验 | <a href="/downloads/models/2026-11-13/SHA256SUMS.txt" download="SHA256SUMS.txt">SHA-256 清单</a> |
| 零部件清单 | [ottodiy.tech/docs/bom](https://ottodiy.tech/docs/bom) |
| 当前身体外壳 | <a href="/downloads/models/2026-11-13/01-shell.stl" download="01-shell.stl">外壳 STL</a>，原名 `01_奶蛙外壳.stl`；本包不含额外看山外壳 |

## 4. 工具

| 工具 | 系统 | 下载 |
|---|---|---|
| Flash Download Tool 3.9.5 | Windows | [乐鑫官网](https://www.espressif.com.cn/sites/default/files/tools/flash_download_tool_3.9.5.zip) |
| esptool | 全平台 | `pip install esptool` |
| ESP-IDF v5.5.5 | 全平台 | 乐鑫官方安装器 / VS Code ESP-IDF 扩展 |

## 5. 教程

| 名称 | 地址 |
|---|---|
| 组装视频（37 分钟，5P） | [B 站 BV1zuNyzXEWa](https://www.bilibili.com/video/BV1zuNyzXEWa) |
| Otto 官方文档 | [ottodiy.tech](https://ottodiy.tech/docs/downloads/) |
| Otto 聊天机器人资料（飞书） | [飞书知识库](https://gcnnjyl5fvdz.feishu.cn/wiki/GFPTwsYVSiOOwAk8KAhc9F73n5c) |
| 小智后台 | [xiaozhi.me](https://xiaozhi.me/) |

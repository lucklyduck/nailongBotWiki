---
slug: /download
title: 下载
sidebar_label: 下载
---

## 1. 固件与源码

| 内容 | 获取方式 | 说明 |
|---|---|---|
| NaiFirmware 源码 | [NaiLongFirmware](https://github.com/cccatnipent/NaiLongFirmware) | 固件在 `nailong-firmware/`，ESP-IDF v5.5.5 |
| 奶龙公开固件 | 待发布 | 还没有经过公开版发布验收的下载包 |
| 本地构建 | [编译奶龙固件](/docs/flash/build) | 使用 `build_nailong.py`，不传个人身份文件 |
| 固件导出 | [导出合并镜像](/docs/flash/merge) | 区分完整安装与保留配置升级 |
| 配套 server | [xiaozhi-esp32-server](https://github.com/cccatnipent/NaiLongFirmware/tree/main/xiaozhi-esp32-server) | 与固件同仓库，端到端实测待补 |
| Catnip Forge IDE | GitHub 仓库和安装包地址待补充 | [使用教程](/docs/ide) |

固件与 server 一起获取，首次使用见仓库的 [快速开始](https://github.com/cccatnipent/NaiLongFirmware/blob/main/docs/01-快速开始.md)。源码已公开，可直接烧录的奶龙发布包仍待发布。

不要把个人设备升级包、Flash / NVS 备份当成公开下载包。奶龙各修订的验证范围见 [功能状态](/docs/intro/status) 和仓库的 [验证记录](https://github.com/cccatnipent/NaiLongFirmware/blob/main/VALIDATION.md)。

## 2. 官方与上游资料

| 内容 | 地址 |
|---|---|
| 官方 Otto 固件与教程 | [ottodiy.tech](https://ottodiy.tech/docs/downloads/) |
| 保留的官方固件 v2.5.3 | [otto2.5.3.bin](https://ottodiy.tech/assets/files/otto2.5.3-e08dbce7bc6f496588c9518c4882dc85.bin)，完整镜像从 `0x0` 写入 |
| 保留的官方固件 v2.4.2 | [otto2.4.2.bin](https://ottodiy.tech/assets/files/otto2.4.2-d709600f2ecfe2f66706467ec9c6a86b.bin)，同上 |
| 小智 AI 上游 | [78/xiaozhi-esp32](https://github.com/78/xiaozhi-esp32) |
| Otto 固件上游 | [txp666/xiaozhi-esp32](https://github.com/txp666/xiaozhi-esp32) |
| server 上游 | [xinnan-tech/xiaozhi-esp32-server](https://github.com/xinnan-tech/xiaozhi-esp32-server) |

上游首页会继续更新；奶龙源码的具体版本以交付记录为准。官方固件与本教程定制固件不要混用资源。

## 3. 硬件和模型

| 内容 | 地址 |
|---|---|
| 主板原理图、PCB、BOM | [立创开源 ottoRobot](https://oshwhub.com/txp666/ottorobot) |
| 完整模型包（2026-11-13） | <a href="/downloads/models/2026-11-13/nailong-models-20261113.zip" download>下载 ZIP</a>，8 个 STL + 1 个 3MF 参考工程 |
| 单件模型与数量 | [八件打印清单](/docs/assembly/print) |
| 3MF 参考工程 | <a href="/downloads/models/2026-11-13/reference-project.3mf" download>下载 3MF</a>，仅外壳、底座、左右卡销四个对象 |
| 校验清单 | <a href="/downloads/models/2026-11-13/SHA256SUMS.txt" download>SHA-256</a> |

3MF 不与 STL 重复打印；模型包不含额外看山外壳。

## 4. 工具和教程

| 内容 | 入口 |
|---|---|
| Catnip Forge 两个入门示例 | [IDE 入门](/docs/ide) |
| ESP-IDF v5.5.5 | [奶龙编译环境](/docs/flash/build) |
| esptool / Flash Download Tool | [用工具烧录](/docs/flash/tool) |
| 组装视频 | [B 站 BV1zuNyzXEWa](https://www.bilibili.com/video/BV1zuNyzXEWa) |
| 小智后台 | [xiaozhi.me](https://xiaozhi.me/) |

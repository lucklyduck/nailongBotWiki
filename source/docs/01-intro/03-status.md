---
slug: /intro/status
title: 功能状态
sidebar_label: 功能状态
---

## 1. 本教程用哪份固件

本文的奶龙固件指 **NaiFirmware**：基于小智 / Otto 2.4.2，使用 ESP-IDF v5.5.5，选择四舵机 `nailong-otto` 变体。它和官方 Otto 固件是两条路线，不能混用烧录包、资源或开发示例。

公开源码见 [NaiLongFirmware](https://github.com/cccatnipent/NaiLongFirmware)，固件目录为 `nailong-firmware/`，配套 server 在同一仓库。公开版已移除个人身份覆盖，使用各设备自己的身份。

| 功能 | NaiFirmware 当前实现 | 说明 |
|---|---|---|
| 四舵机、无手臂 | 支持 | ESP32-S3，16 MB Flash、8 MB Octal PSRAM |
| 自定义唤醒词 | 你好奶龙 | MultiNet7，当前阈值 10%，实际识别率待测 |
| 待机 / 回答 / 大笑图片 | 9 张彩色图 | 待机 1 张、大笑 1 张、回答 7 张，回答避免连续重复 |
| 本地大笑 | 约 5 秒 | `self.otto.laugh`，播放完成后才返回工具结果 |
| 行走、转身、跳跃等 | 支持 | 统一使用 `self.otto.action` |
| 边笑边走 | 已实现，待完整实测 | `self.otto.laugh_walk` 一次调用启动两项任务 |
| 舵机校准 | 支持 | `set_trim` / `get_trims`，保存到设备 |
| 局域网控制 | 设备端 `8080/ws` | 实际客户端兼容性待验证，见 [通信协议](/docs/dev/protocol) |
| 语音“停下” | 最新候选已实现 | 只停动作；停止效果和误停率待实测 |
| BOOT 打断后继续听 | 最新候选已实现 | 取消话语与动作，继续监听，待实测 |
| 网页在线烧录 | 未提供奶龙版本 | 网页烧录入口提供的是官方固件 |
| 手臂、摄像头 | 本变体不启用 | 不要让模型调用手部动作 |

## 2. 哪些已经验证

| 范围 | 当前记录 |
|---|---|
| 四舵机硬件基线 | 用户反馈烧录成功、功能正常，未提供逐项测试日志 |
| 自定义唤醒、回答选图、普通 5 秒笑声 | 有实际运行日志 |
| 公开通用固件 | 2026-11-19 记录：完整构建、82 项固件主机测试通过 |
| 配套 server 配置 | 4 项课程配置测试通过，185 个后端 Python 文件语法检查通过 |
| 边笑边走、停止 / BOOT 修订 | 已包含在公开源码中，完整真机验收待补 |
| MQTT / WebSocket 与自建服务端 | 有实现和构建记录，未完成真实设备端到端验收 |

编译通过、烧录成功、实机正常是三件事。上述数量来自公开仓库的 [验证记录](https://github.com/cccatnipent/NaiLongFirmware/blob/main/VALIDATION.md)，不代表每一项功能都经过真机测试；个人工程的历史测试数量见 [更新日志](/docs/download/changelog)。

## 3. 怎么选

- 想先完成组装、聊天和动作：可走 [官方固件烧录](/docs/flash/online) 路线。
- 想使用本教程的彩色图片、5 秒大笑，或继续改代码：走 [NaiFirmware 编译](/docs/flash/build) 路线。
- 只想先学 IDE：用普通 ESP32-S3 开发板完成 [IDE 入门](/docs/ide)，再回到机器人。

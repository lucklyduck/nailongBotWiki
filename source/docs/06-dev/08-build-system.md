---
slug: /dev/build-system
title: 编译系统 CMake + Ninja
sidebar_label: 编译系统 CMake + Ninja
---

## 1. 一句话理解

**构建脚本选板型和配置，idf.py 调度 CMake 与 Ninja，最后得到应用和资源。**

| 工具 | 做什么 |
|---|---|
| `build_nailong.py` | 选择奶龙变体、中文、唤醒词和公开身份配置 |
| `idf.py` | 调度 ESP-IDF 的配置、编译与烧录 |
| CMake | 找到源码、组件和素材，生成构建规则 |
| Ninja | 按规则编译，后续只重做变化的部分 |

<figure>
  <img className="board-svg" src="/img/dev/build-pipeline.svg" alt="奶龙专用构建脚本选变体和配置，再由 ESP-IDF、CMake 与 Ninja 生成应用及资源" />
  <figcaption>从源码到固件</figcaption>
</figure>

## 2. 常用命令

| 想做什么 | 命令 |
|---|---|
| 构建奶龙配置 | `python scripts/build_nailong.py` |
| 在现有配置上编译代码改动 | `idf.py build` |
| 烧录并看日志 | `idf.py -p COM5 flash monitor` |
| 查看实际配置 | `idf.py menuconfig` |
| 原版 Otto 配置回归 | `python scripts/build.py otto-robot --name otto-robot` |

构建目录会复用。切换原版、定制版或个人版后，先确认当前配置与产物，不能拿上一轮的文件交付。

## 3. 哪些文件决定构建

| 文件 | 作用 |
|---|---|
| 根 `CMakeLists.txt` | 项目版本、ESP-IDF 入口、Windows 构建适配 |
| `main/CMakeLists.txt` | 源码、板型和资源的构建条件 |
| `main/boards/otto-robot/config.json` | 原版和 `nailong-otto` 变体 |
| `scripts/build_nailong.py` | 奶龙配置覆盖项 |
| `main/idf_component.yml` / `dependencies.lock` | 依赖要求与锁定版本 |
| `sdkconfig` | 这一次真正生效的配置 |
| `build/flash_args` | 这一次构建的烧录地址表 |

专用脚本可能重新生成 `sdkconfig`。要长期保留的奶龙配置应在脚本或对应变体中管理，不能只改生成文件后就以为下次还有效。

## 4. 常见问题

| 现象 | 检查 |
|---|---|
| 新文件没参与编译 | `main/CMakeLists.txt` 的收集规则和条件 |
| 原版混入奶龙素材 | 当前变体、宏和资源构建条件 |
| 修改图片后设备仍显示旧图 | 资源是否重新生成并实际烧录 |
| Windows 命令行过长 | 保留源码中的 Ninja 响应文件适配 |
| 构建失败后仍有 bin | 残留文件不代表本轮成功，不能继续发布 |

:::nailong
编译好只是做好了我的“程序”。还要烧进去，再看我有没有真的跑起来。
:::

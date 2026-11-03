---
slug: /dev/build-system
title: 编译系统：CMake + Ninja
sidebar_label: 编译系统 CMake + Ninja
---

## 1. 一句话理解

**你敲 `idf.py build`，它找 CMake 画图纸，再找 Ninja 按图纸施工，最后得到能烧进奶龙的固件。**

| 工具 | 打个比方 | 它干的事 |
|---|---|---|
| idf.py | 包工头 | 你只跟它说话，它去指挥另外两个 |
| CMake | 设计师 | 看清单，算出要编哪些文件、怎么编，画出图纸 `build.ninja` |
| Ninja | 施工队 | 照图纸干活，同时开好几路编译；第二次只重做改过的地方 |

<figure>
  <img className="board-svg" src="/img/dev/build-pipeline.svg" alt="编译流程：idf.py build 调用 CMake 配置，读取 CMakeLists、合并 sdkconfig、找齐组件，生成约 5600 条规则的 build.ninja，Ninja 并行编译约 2100 个源文件，最后链接打包出 xiaozhi.bin 和 generated_assets.bin" />
  <figcaption>idf.py build 背后的流程（示意图）</figcaption>
</figure>

:::nailong
第一次编译要等好几分钟，因为我的身体是 2000 多个文件拼起来的。之后你只改一个动作，Ninja 就只重编那一个文件，几十秒就好。
:::

## 2. 你只需要记住这几条命令

| 想做什么 | 命令 |
|---|---|
| 编译 | `idf.py build` |
| 编译 + 烧录 + 看日志 | `idf.py -p 串口 flash monitor` |
| 改配置（图形菜单） | `idf.py menuconfig` |
| 出了奇怪的错，从头再来 | `idf.py fullclean` 然后 `idf.py build` |

## 3. 工程里哪些文件跟编译有关

| 文件 | 是什么 | 你什么时候会改它 |
|---|---|---|
| `CMakeLists.txt`（根目录） | 总清单：版本号、芯片型号、用哪份默认配置 | 改固件版本号 |
| `main/CMakeLists.txt` | 要编译哪些源文件 | **新加了 `.cc` 文件时**，要把文件名加进去 |
| `main/idf_component.yml` | 要自动下载哪些现成的库（屏幕驱动、语音识别等） | 基本不用改 |
| `sdkconfig.defaults.otto` | 默认配置：板子、唤醒词、Flash 大小 | 改唤醒词等 |
| `sdkconfig` | 实际生效的完整配置，第一次编译时自动生成 | 用 `menuconfig` 改 |
| `build/` | 编译产物，可以随时删掉重新生成 | 不用改 |

:::warning 最常踩的坑
`sdkconfig` 存在时，`sdkconfig.defaults.otto` 里的改动**不会生效**。先删掉 `sdkconfig`，再重新编译。
:::

## 4. 常见问题

| 现象 | 解决 |
|---|---|
| 改了 `sdkconfig.defaults.otto` 没效果 | 删掉 `sdkconfig` 后重新编译 |
| 新加的文件报 `undefined reference` | 把文件名加进 `main/CMakeLists.txt` 的 `SOURCES` |
| 第一次编译卡在下载 | 网络连不上组件服务器，换网络或开代理；下载过一次以后就不用了 |
| 换了 ESP-IDF 版本后各种报错 | `idf.py fullclean` 后重新编译 |
| VS Code 里满屏红波浪线 | 先编译一次，编辑器会读 `build/compile_commands.json` 找到头文件 |

## 5. 想深入再看

<details>
<summary>不用 idf.py，自己敲 CMake 和 Ninja</summary>

乐鑫官方文档说，`idf.py build` 大致等于在 `build/` 目录里先执行 `cmake .. -G Ninja`，再执行 `ninja`。加载 ESP-IDF 环境后可以试试：

```bash
idf.py reconfigure               # 只跑 CMake，生成 build/build.ninja
ninja -C build                   # 直接让 Ninja 编译
ninja -C build -v | head         # 看 Ninja 实际执行的编译命令
```

作者 Mac 上的 `build/CMakeCache.txt` 里记录着：

```text
CMAKE_GENERATOR:INTERNAL=Ninja
CMAKE_MAKE_PROGRAM:FILEPATH=/opt/homebrew/bin/ninja
```

日常还是用 `idf.py`，它会帮你检查依赖、在需要时自动重跑 CMake。

</details>

<details>
<summary>根目录 CMakeLists.txt 逐行解释</summary>

```cmake
cmake_minimum_required(VERSION 3.16)
set(PROJECT_VER "2.0.16")                         # 固件版本号
set(IDF_TARGET "esp32s3" CACHE STRING "Otto target")   # 芯片固定为 ESP32-S3
if(NOT DEFINED SDKCONFIG_DEFAULTS)
    set(SDKCONFIG_DEFAULTS "${CMAKE_CURRENT_LIST_DIR}/sdkconfig.defaults.otto")  # 默认配置
endif()
add_compile_options(-Wno-missing-field-initializers)
include($ENV{IDF_PATH}/tools/cmake/project.cmake) # 引入 ESP-IDF 的构建逻辑
project(xiaozhi)                                  # 工程名，决定输出 xiaozhi.bin
```

</details>

<details>
<summary>main/CMakeLists.txt 做了什么</summary>

ESP-IDF 把代码分成**组件**，每个带 `CMakeLists.txt` 的目录是一个组件。`main` 是奶龙自己的组件，它：

1. 用 `set(SOURCES ...)` 列出所有源文件。
2. 用一串 `if(CONFIG_BOARD_TYPE_xxx)` 按板型挑代码，选中 Otto 时加进 `boards/otto-robot/`。
3. 用 `idf_component_register(SRCS ... EMBED_FILES ...)` 注册组件，`EMBED_FILES` 把 `.ogg` 音效直接嵌进固件。
4. 用 `add_custom_command` 把唤醒词模型、表情、字体打包成 `generated_assets.bin`。

`idf_component.yml` 里列的库，第一次编译时会被自动下载到 `managed_components/`，奶龙工程里有 48 个。

</details>

<details>
<summary>配置是怎么从 sdkconfig 传进代码的</summary>

```text
sdkconfig.defaults.otto ──第一次──▶ sdkconfig ──CMake──▶ build/config/sdkconfig.h
```

每项配置都变成一个 `CONFIG_` 开头的宏，CMake 和 C++ 都能用，例如：

- `CONFIG_CUSTOM_WAKE_WORD="ni hao nai long"`：唤醒词
- `CONFIG_USE_AUDIO_PROCESSOR=y`：开启音频处理
- `CONFIG_FREERTOS_HZ=100`：系统节拍 100 Hz，见 [FreeRTOS](/docs/dev/freertos)

</details>

<details>
<summary>build 目录里的文件和烧录地址</summary>

| 文件 | 是什么 |
|---|---|
| `build.ninja` | 给 Ninja 的图纸 |
| `compile_commands.json` | 每个文件的编译命令，编辑器用 |
| `bootloader/bootloader.bin` | 引导程序 |
| `partition_table/partition-table.bin` | 分区表 |
| `xiaozhi.bin` | 主程序 |
| `generated_assets.bin` | 唤醒词模型、表情、字体 |
| `flash_args` | 烧录地址表 |

奶龙的 `flash_args`：

```text
--flash_mode dio --flash_freq 80m --flash_size 16MB
0x0 bootloader/bootloader.bin
0x20000 xiaozhi.bin
0x8000 partition_table/partition-table.bin
0xd000 ota_data_initial.bin
0x800000 generated_assets.bin
```

所以只烧 `xiaozhi.bin` 不够，`0x800000` 的资源没更新，唤醒词和表情还是旧的。

</details>

## 6. 参考资料

- 乐鑫 ESP-IDF 编程指南：[构建系统](https://docs.espressif.com/projects/esp-idf/zh_CN/v5.5/esp32s3/api-guides/build-system.html)
- 奶龙固件源码：`CMakeLists.txt`、`main/CMakeLists.txt`、`main/idf_component.yml`、`build/flash_args`

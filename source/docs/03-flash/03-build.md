---
slug: /flash/build
title: 编译奶龙固件
sidebar_label: 编译奶龙固件
---

## 1. 简介

本教程使用 **NaiFirmware**，基础版本 2.4.2、ESP-IDF v5.5.5、板型变体 `nailong-otto`。主要定制是四舵机无手臂、“你好奶龙”唤醒、9 张彩色图片、5 秒笑声和组合动作。

当前源码还含语音停止与 BOOT 继续监听的候选修订。哪些已经实测，先看 [功能状态](/docs/intro/status)。

:::info 源码入口待补充
公司 GitHub 仓库和公开发布包尚未确定。拿到正式源码包后按下面的目录和命令操作；这里不提供旧作者仓库或个人设备升级包。
:::

## 2. 准备环境

1. 安装并激活 **ESP-IDF v5.5.5**，终端执行 `idf.py --version` 核对。
2. Windows 建议使用短英文路径，例如 `C:\work\NaiFirmware`。
3. 保留源码包里的 `Materials/`、`xiaozhi-esp32/` 和依赖锁定文件，首次构建需要联网下载组件。
4. 使用已准备好的 `nailong_assets/` 时不用重新转换素材；需要重新准备音频时再安装 ffmpeg。

~~~text
NaiFirmware/
├── Materials/                         原始素材
└── xiaozhi-esp32/                      在这里执行构建命令
    ├── scripts/build_nailong.py
    ├── scripts/prepare_nailong_materials.py
    ├── main/boards/otto-robot/
    └── dependencies.lock
~~~

## 3. 编译公开配置

进入 `xiaozhi-esp32/`，在已激活 ESP-IDF 的终端执行：

~~~bash
python scripts/build_nailong.py
~~~

不传 `--identity-file`。脚本会明确关闭个人设备身份覆盖，再调用标准构建流程，选定中文、`nailong-otto`、自定义唤醒词和配套资源。

| 项目 | 当前设置 |
|---|---|
| 芯片 / 内存 | ESP32-S3，16 MB Flash，Octal PSRAM |
| 唤醒词 | `ni hao nai long` / 你好奶龙，阈值 10% |
| 图片 / 音频 | `nailong_assets/` 中的场景图片和 5 秒笑声 |
| 最新候选功能 | 本地停动作、BOOT 打断后继续监听 |

**会看到什么**：结尾出现 `Project build complete`，并生成 `build/xiaozhi.bin`、`build/generated_assets.bin` 和烧录地址表。构建失败就先看错误，不要用残留镜像继续烧录。

## 4. 烧录和看日志

把 `COM5` 换成实际串口：

~~~bash
idf.py -p COM5 flash monitor
~~~

macOS / Linux 使用实际的 `/dev/cu.…` 或 `/dev/ttyACM…`。按 `Ctrl+]` 退出日志。

完整烧录会按地址表更新引导、分区、应用和资源。只写应用不会更新图片、笑声或唤醒阈值。已有设备升级时，按发布包说明选择写入范围，见 [导出合并镜像](/docs/flash/merge)。

## 5. 验证

| 检查 | 预期 |
|---|---|
| 启动 | 无持续重启，屏幕正常，能配网 |
| 唤醒 | “你好奶龙”进入对话，日志中的模型阈值为 0.1 |
| 图片 | 待机图正常，回答时换图，大笑时显示大笑图 |
| 笑声 | `self.otto.laugh` 播放约 5 秒；看实际工具调用和声音 |
| 动作 | 先校准，再用少步数、小幅度测试 |
| 候选功能 | 单独记录边笑边走、语音停动作、BOOT 后继续提问的实测结果 |

## 6. 常见问题

| 现象 | 解决 |
|---|---|
| 找不到 `idf.py` | 使用 ESP-IDF 终端，确认版本 v5.5.5 |
| 首次构建卡在下载 | 检查组件下载网络，保留依赖锁定文件 |
| 编译成了原版 Otto | 使用 `python scripts/build_nailong.py`，核对变体 `nailong-otto` |
| 图片不对或阈值还是旧值 | 配套更新 `generated_assets.bin`，不要混用旧资源 |
| 提示素材缺失 | 核对源码包的素材目录，见 [更换表情](/docs/dev/emotion) |
| 编译成功但设备不正常 | 看 [串口日志](/docs/debug/serial)，编译成功不等于实机通过 |

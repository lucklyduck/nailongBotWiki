---
slug: /flash/merge
title: 导出合并镜像
sidebar_label: 导出合并镜像
---

## 1. 简介

要把固件交给没有开发环境的朋友，先完成 [公开配置构建](/docs/flash/build)，再导出镜像。应用、资源、引导和分区必须来自同一次成功构建。

当前还没有可直接下载的公开发布包。下面是制作步骤；完整安装和保留配置两条路径都需要发布前实机验证。

## 2. 先检查构建

在 `xiaozhi-esp32/` 下执行 `python scripts/build_nailong.py`，**不要传个人身份文件**。核对实际 `sdkconfig` 中没有 `CONFIG_DEVICE_IDENTITY_OVERRIDE=y`。

不要把整机 Flash / NVS 备份、个人设备身份或个人升级包当成公开固件。

## 3. 导出完整安装镜像

在项目目录执行：

~~~bash
cd build
python -m esptool --chip esp32s3 merge_bin -o ../nailong-public-full.bin @flash_args
cd ..
~~~

烧录起点是 **`0x0`**。地址表由这次构建生成；合并后仍需核对应用、资源、分区边界及镜像哈希。

:::warning
完整镜像中未提供数据的地址间隙会填充空白字节。常规整段写入会覆盖 NVS，Wi-Fi、UUID、音量和舵机校准等本地设置可能重置。不要把这份镜像标成“保留配置升级”。
:::

## 4. 保留已有配置的升级

分区一致、引导兼容且应用支持旧 NVS 时，可只写本次应用和资源：

~~~bash
python -m esptool --chip esp32s3 -p COM5 -b 115200 write_flash 0x20000 build/xiaozhi.bin 0x800000 build/generated_assets.bin
~~~

这两个地址来自本教程的 `partitions/v2/16m.csv`。换分区表后必须重新核对，不能照抄；不要执行整片擦除。

从其他版本迁移时，保留 NVS 不等于服务端绑定一定兼容，也不证明旧引导能启动新应用。需要先在目标版本上验证。首次安装应使用完整的 `idf.py flash`。

## 5. 发给别人之前

| 检查 | 要提供什么 |
|---|---|
| 版本 | 基础版本、定制修订、构建日期 |
| 文件 | 每个文件的大小、SHA-256、准确烧录地址 |
| 配置 | 是否保留 NVS，是否需要重新配网 / 校准 / 绑定 |
| 功能 | 实测结果及仍待验证的候选功能 |
| 验收 | 启动、联网、图片、笑声、动作、重启和升级回退 |

~~~powershell
Get-FileHash .\nailong-public-full.bin -Algorithm SHA256
~~~

先自己完整验证，再发布下载地址。不要仅凭成功合并就认定可交付。

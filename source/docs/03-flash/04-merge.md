---
slug: /flash/merge
title: 导出合并镜像
sidebar_label: 导出合并镜像
---

## 1. 简介

`idf.py flash` 会把好几个文件分别写到不同地址。要把奶龙固件发给没有开发环境的朋友，可以先把它们合并成**一个**从 `0x0` 开始的 `.bin`，对方用 [用工具烧录](/docs/flash/tool) 的方法一次写进去。

## 2. 合并

先完成 [编译奶龙固件](/docs/flash/build) 里的 `idf.py build`，然后在项目根目录执行：

```bash
cd build
esptool.py --chip esp32s3 merge_bin -o ../nailong-merged.bin @flash_args
cd ..
```

`flash_args` 是编译时自动生成的地址表，里面已经包含引导程序、分区表、主程序和资源文件的地址，所以不用自己填地址。

成功后项目根目录会出现 `nailong-merged.bin`。

## 3. 验证

自己先烧一遍确认能用：

```bash
esptool.py --chip esp32s3 -p /dev/cu.usbmodem1101 -b 921600 write_flash 0x0 nailong-merged.bin
```

开机后说「你好奶龙」能唤醒、屏幕是看山表情，就说明资源文件也合进去了。

:::tip
发给别人时，在文件名里写上版本号，例如 `nailong-2.0.16-merged.bin`，方便以后对照 [更新日志](/docs/download/changelog)。
:::

---
slug: /flash/build
title: 编译奶龙固件
sidebar_label: 编译奶龙固件
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 1. 简介

奶龙定制固件基于 [小智 xiaozhi-esp32](https://github.com/78/xiaozhi-esp32) 的四舵机 Otto 板型，在官方 Otto 固件的基础上加了：

- 自定义唤醒词「**你好奶龙**」
- 240×240「看山」表情和动作贴图
- 本地「奶龙大笑」音效和 `self.otto.laugh` 工具
- 默认音量 100，舵机动作不再抢占音频
- 可选的本地 Otto Master 联调（见 [本地联调](/docs/debug/otto-master)）

当前版本 **2.0.16**，编译环境 **ESP-IDF v5.5.5**。

:::info 待补充
奶龙固件仓库 `howtion0/otto` 是否公开还没确认。不公开的话，请向作者索取源码或现成的合并镜像。
:::

## 2. 安装 ESP-IDF v5.5.5

ESP-IDF 是乐鑫官方的 ESP32 开发框架，包含编译器、烧录工具和各种库。

<Tabs groupId="os">
<TabItem value="win" label="Windows" default>

1. 下载乐鑫的 **ESP-IDF 离线安装器**，版本选 **v5.5.5**，一路下一步安装。
2. 装好后，开始菜单里会有「ESP-IDF 5.5 PowerShell」，之后所有命令都在这个窗口里执行。
3. 代码放在**短的英文路径**里，例如 `C:\work\otto`。路径里有中文或空格会编译失败。

</TabItem>
<TabItem value="mac" label="macOS / Linux">

1. 按 ESP-IDF 官方文档安装 v5.5.5，默认装在 `~/esp/esp-idf`。
2. 每次打开新终端，先加载环境：

   ```bash
   . $HOME/esp/esp-idf/export.sh
   ```

3. 检查版本：

   ```bash
   idf.py --version
   ```

   ```text
   ESP-IDF v5.5.5
   ```

</TabItem>
<TabItem value="vscode" label="VS Code 扩展">

1. 在 VS Code 或 Cursor 里安装 Espressif 官方的 **ESP-IDF** 扩展。
2. 第一次打开时按向导安装工具链，版本选 **v5.5.5**。
3. 装好后确认底部状态栏显示的 ESP-IDF 版本是 v5.5.5。
4. 之后可以用底部的「Build」「Flash」「Monitor」按钮代替下面的命令。

</TabItem>
</Tabs>

:::warning
不要用 Arduino 编译，也不要用 ESP-IDF v6.x。官方 txp666 源码推荐 v6.0.2，但奶龙固件是在 **v5.5.5** 上验证的，换版本容易编译失败。
:::

## 3. 获取源码并编译

```bash
git clone git@github.com:howtion0/otto.git
cd otto
idf.py build
```

- 不用手动选板型。编译时会自动读取 `sdkconfig.defaults.otto`，里面已经设好了：ESP32-S3、16 MB Flash、Octal PSRAM、Otto Robot 板型、四舵机无手臂、唤醒词「你好奶龙」。
- 第一次编译要联网下载组件，版本由 `dependencies.lock` 固定。网络不通会一直卡在下载组件那一步。
- 不要从别的电脑复制 `sdkconfig`、`build/`、`managed_components/`，它们都会自动重新生成。

成功时最后几行是：

```text
Project build complete. To flash, run:
 idf.py flash
```

## 4. 烧录

把命令里的串口换成你自己的：

<Tabs groupId="os">
<TabItem value="win" label="Windows" default>

```powershell
idf.py -p COM5 flash monitor
```

</TabItem>
<TabItem value="mac" label="macOS">

```bash
idf.py -p /dev/cu.usbmodem1101 flash monitor
```

</TabItem>
</Tabs>

- `flash` 烧录，`monitor` 烧完后自动打开串口日志。按 `Ctrl+]` 退出日志。
- 一定要用完整的 `idf.py flash`。它会按编译生成的地址表，一起写入引导程序、分区表、主程序和 `generated_assets.bin`（唤醒词模型、表情图片、音效）。

:::warning
只烧 `build/xiaozhi.bin` 不会更新唤醒词模型和表情资源，结果就是说「你好奶龙」没反应、屏幕表情不对。
:::

:::nailong
第一次编译会下载好多好多东西，泡杯奶茶等一会儿。后面再编译就快了。
:::

想知道 `idf.py build` 背后 CMake 和 Ninja 各做了什么，见 [编译系统：CMake + Ninja](/docs/dev/build-system)。

## 5. 改配置

想改唤醒词、音量之类的配置时：

```bash
idf.py menuconfig
```

已经存在的 `sdkconfig` 优先于 `sdkconfig.defaults.otto`。改了 defaults 之后要删掉 `sdkconfig` 再编译才会生效。具体改法见 [二次开发](/docs/dev)。

## 6. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| `idf.py: command not found` | 没加载 ESP-IDF 环境 | 执行 `. $HOME/esp/esp-idf/export.sh`，或用 ESP-IDF PowerShell |
| 卡在下载组件 | 网络访问不了组件仓库 | 换网络或配置代理后重新 `idf.py build` |
| 报 `Target 'esp32' ... esp32s3` 之类的芯片不匹配 | 旧的 `sdkconfig` 残留 | 执行 `idf.py set-target esp32s3`，或删掉 `sdkconfig` 和 `build/` 重来 |
| Windows 下各种奇怪的路径错误 | 路径太长或有中文 | 把代码移到 `C:\work\otto` |
| 烧完唤醒不了 | 只烧了主程序 | 用完整的 `idf.py flash` |

## 7. 附：用 VS Code 图形界面编译

不想敲命令的话，可以装 VS Code 的 **ESP-IDF 插件**，点按钮编译烧录。下面截图来自 ottodiy.tech 的 [编译指南](https://ottodiy.tech/docs/build-guide)，演示的是**官方固件**（txp666/xiaozhi-esp32）。

:::warning
奶龙固件不用做第 2～3 步：`sdkconfig.defaults.otto` 已经选好了 Otto Robot 开发板。直接选芯片、编译、烧录就行。图 5 的 WebSocket 选项是官方固件微信小程序控制用的，奶龙固件待确认是否需要。
:::

<div className="img-grid">
  <figure>
    <img src="/img/ottodiy/build-01.webp" alt="VS Code 截图：底部状态栏把目标芯片设成 esp32s3" />
    <figcaption>① 底部状态栏把目标芯片设为 esp32s3（图 1）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/build-03.webp" alt="SDK 配置编辑器截图：Xiaozhi Assistant 下的 Target Board 配置项" />
    <figcaption>② SDK 配置编辑器里找到 Target Board（图 3）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/build-04.webp" alt="SDK 配置编辑器截图：开发板下拉列表中选中 Otto Robot" />
    <figcaption>③ 开发板选 Otto Robot（图 4）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/build-05.webp" alt="SDK 配置编辑器截图：搜索 websocket 并勾选 WebSocket server support" />
    <figcaption>④ 官方固件：勾选 WebSocket server support（图 5）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/build-07.webp" alt="VS Code 截图：点击底部 Build 按钮开始编译" />
    <figcaption>⑤ 点底部 Build 编译（图 7）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/build-08.webp" alt="VS Code 截图：选择串口，提示用 Type-C 线连上 Otto" />
    <figcaption>⑥ 连上机器人，选串口（图 8）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/build-09.webp" alt="VS Code 截图：点击底部 Flash 按钮烧录" />
    <figcaption>⑦ 点 Flash 烧录（图 9）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/build-10.webp" alt="VS Code 截图：烧录方式列表中选择 UART" />
    <figcaption>⑧ 烧录方式选 UART（图 10）</figcaption>
  </figure>
</div>

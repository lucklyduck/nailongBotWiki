---
slug: /ide/change-code
title: 改一句输出
sidebar_label: 改一句输出
---

## 1. 简介

把 `Hello world!` 改成 `hello_my_program`，再看设备是否打印新文字。这样才能确认自己掌握了整个修改循环。

## 2. 修改并保存

打开“编辑器”中的 `main/hello_world_main.c`，找到开机打印和每秒心跳打印两处，把输出前缀替换成 `hello_my_program`，其他逻辑保留，保存文件。

也可以向左侧 Agent 发送：

~~~text
把 hello_world_main.c 中开机和每秒心跳的 Hello world! 都改成
hello_my_program，其他逻辑不要动。修改后说明改了哪里和验证结果。
~~~

检查实际文件是否只改了输出文字。Agent 说“编译通过”时，仍要核对对应任务结果。

## 3. 重新编译、烧录

1. 回到“任务管理器”，确认当前工程。
2. 点 **编译**，等本次 Build 成功。
3. 确认设备端口，点 **烧录**，等本次 Flash 成功。

<figure>
  <img src="/img/ide/rebuild.png" alt="修改后的任务管理器：最新 Build 在旧 Flash 之后，需要再次点击烧录" loading="lazy" />
  <figcaption>Build 比 Flash 新，说明还需要再烧录一次</figcaption>
</figure>

不能拿前一次成功的 Flash 记录，证明本次改动已经烧入。

## 4. 验证新输出

回“监视器”，连接同一串口，清空旧内容再观察。必要时复位板子；关闭再打开串口不一定会让开发板重启。

<figure>
  <img src="/img/ide/new-output.png" alt="串口接收区下方显示 hello_my_program heartbeat，新文字已在设备上运行" loading="lazy" />
  <figcaption>新文字出现，心跳继续增加，才是本次修改生效</figcaption>
</figure>

~~~text
hello_my_program heartbeat=1, free_heap=… bytes
hello_my_program heartbeat=2, free_heap=… bytes
~~~

**完成标志**：本次 Flash 成功，随后看到新文字和持续增加的心跳。还显示旧文字时，按 [排错与速查](/docs/ide/troubleshooting) 检查。

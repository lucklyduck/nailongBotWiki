---
slug: /xiaozhi/mcp
title: 接入云端 MCP
sidebar_label: 接入云端 MCP
---

## 1. 简介

奶龙身上的动作工具叫**设备端 MCP**，跑在机器人上。xiaozhi.me 还支持**云端 MCP**：你在电脑或服务器上跑一个小程序，给它提供新的工具（查天气、查日程、控制家里的灯……），奶龙的大模型就能调用这些工具。

| | 设备端 MCP | 云端 MCP |
|---|---|---|
| 跑在哪 | 机器人上 | 你的电脑 / 服务器 |
| 改的时候 | 要重新编译烧录 | 改完重启程序即可 |
| 适合 | 控制机器人自己的硬件 | 联网查询、控制别的设备 |
| 本 wiki | [添加 MCP 工具](/docs/dev/mcp-tool) | 本页 |

## 2. 获取 MCP 接入点

1. 打开 xiaozhi.me 控制台的 **智能体** 页面。
2. 找到奶龙的智能体，进入配置。
3. 点 **MCP 设置** → **获取 MCP 接入点**。
4. 页面会显示一个接入点地址（以 `wss://` 开头的一长串）和连接状态。复制这个地址。

:::warning
接入点地址里带有你的访问令牌，相当于密码。不要发到群里或提交到代码仓库。
:::

## 3. 跑一个示例

小智官方提供了一个计算器示例 [78/mcp-calculator](https://github.com/78/mcp-calculator)，接上后奶龙就会算数了。

1. 下载示例并安装依赖：

   ```bash
   git clone https://github.com/78/mcp-calculator.git
   cd mcp-calculator
   pip install -r requirements.txt
   ```

2. 设置接入点。把 `<你的接入点地址>` 换成上一步复制的地址：

   ```bash
   # macOS / Linux
   export MCP_ENDPOINT="<你的接入点地址>"
   ```

   ```powershell
   # Windows PowerShell
   $env:MCP_ENDPOINT="<你的接入点地址>"
   ```

3. 启动：

   ```bash
   python mcp_pipe.py calculator.py
   ```

   文件名以仓库里实际的为准。

**会看到什么**：xiaozhi.me 的 MCP 设置页面里连接状态变成已连接。对奶龙说「你好奶龙，帮我算一下 123 乘以 456」，它会调用计算器工具再回答。

## 4. 写自己的工具

照着示例里的 `calculator.py` 改：每个用 `@mcp.tool()` 装饰的函数就是一个工具，函数的说明文字会被大模型读到，决定什么时候调用。写清楚「这个工具做什么、参数是什么」，大模型就能用好它。

:::tip
云端工具也可以反过来控制奶龙，比如「每天早上 8 点让奶龙跳一下」。这需要结合 [本地联调 Otto Master](/docs/debug/otto-master) 的局域网通道，属于进阶玩法。
:::

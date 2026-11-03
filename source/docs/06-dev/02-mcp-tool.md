---
slug: /dev/mcp-tool
title: 添加 MCP 工具
sidebar_label: 添加 MCP 工具
---

## 1. 简介

MCP 工具是大模型能调用的「按钮」。注册一个工具，就是告诉大模型：「有这么一个功能，它叫什么、能做什么、要哪些参数」。

这一节把已经写好的 **踮脚摇摆（TiptoeSwing）** 开放给大模型，做完后你说「踮着脚摇一摇」，奶龙就会做。

## 2. 改代码

打开 `main/boards/otto-robot/otto_controller.cc`，找到 `RegisterMcpTools()` 里 `self.otto.swing` 的注册代码，在它后面加上：

```cpp
        mcp_server.AddTool("self.otto.tiptoe_swing",
                           "踮着脚左右摇摆，适合开心、得意的时候。steps: 摇摆次数(1-100); "
                           "speed: 速度(500-1500，数值越小越快); amount: 幅度(0-50度)",
                           PropertyList({Property("steps", kPropertyTypeInteger, 3, 1, 100),
                                         Property("speed", kPropertyTypeInteger, 900, 500, 1500),
                                         Property("amount", kPropertyTypeInteger, 20, 0, 50)}),
                           [this](const PropertyList& properties) -> ReturnValue {
                               int steps = properties["steps"].value<int>();
                               int speed = properties["speed"].value<int>();
                               int amount = properties["amount"].value<int>();
                               QueueAction(ACTION_TIPTOE_SWING, steps, speed, 0, amount);
                               return true;
                           });
```

逐行说明：

| 部分 | 作用 |
|---|---|
| `"self.otto.tiptoe_swing"` | 工具名。约定用 `self.` 开头表示设备自己的功能 |
| 第二个字符串 | **给大模型看的说明**。写清楚做什么、什么时候用、每个参数的含义和范围，大模型才会用对 |
| `Property("steps", kPropertyTypeInteger, 3, 1, 100)` | 参数名、类型、默认值、最小值、最大值。超出范围的值会被拒绝 |
| `QueueAction(...)` | 放进动作队列，立刻返回。不要在回调里直接控制舵机，否则会卡住对话 |
| `return true;` | 告诉大模型调用成功。也可以返回字符串，大模型会读到它 |

:::warning
`amount` 给太大，踮脚动作可能让机器人摔倒。新动作先用小幅度在桌子中间试。
:::

## 3. 编译烧录

```bash
idf.py -p /dev/cu.usbmodem1101 flash monitor
```

开机时串口日志里能看到 `开始注册MCP工具...`，没有报错就说明注册成功。

## 4. 让大模型知道

工具会自动上报，不用在后台添加。但建议在 [奶龙人设](/docs/xiaozhi/role) 里加一句：

```text
- 开心、得意的时候，调用 self.otto.tiptoe_swing 踮着脚摇一摇。
```

## 5. 验证

1. 说「你好奶龙，踮着脚摇一摇」。
2. 串口日志里应该能看到执行动作的记录，机器人踮脚左右摇摆，结束后回到站立姿势。
3. 没反应的话，看日志里有没有收到工具调用；没有收到就是大模型没选它，把工具说明写得更具体一些。

## 6. 返回数据的工具

不是所有工具都要动舵机。比如想让大模型能查询「今天走了多少步」，回调里直接返回字符串即可：

```cpp
        mcp_server.AddTool("self.otto.get_step_count", "获取开机以来走过的总步数", PropertyList(),
                           [this](const PropertyList&) -> ReturnValue {
                               return "已经走了 " + std::to_string(total_steps_) + " 步";
                           });
```

`total_steps_` 需要你自己在 `QueueAction` 里累加，这里只演示返回值的写法。

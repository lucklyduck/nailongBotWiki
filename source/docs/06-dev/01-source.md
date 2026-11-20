---
slug: /dev/source
title: 源码结构
sidebar_label: 源码结构
---

## 1. 目录

本章按 [NaiLongFirmware](https://github.com/cccatnipent/NaiLongFirmware) 的 `nailong-firmware/` 源码说明，基础版本为 2.4.2。引脚、资源、构建入口和工具接口请与这份源码配套使用。

<figure>
  <img className="board-svg" src="/img/dev/source-map.svg" alt="NaiFirmware 源码地图：硬件配置、动作控制、场景图片、笑声任务、资源目录和专用构建脚本" />
  <figcaption>最常改的几个文件</figcaption>
</figure>

~~~text
nailong-firmware/
├── main/boards/otto-robot/
│   ├── config.h / nailong_config.h  硬件配置，奶龙变体关闭手臂
│   ├── config.json                 注册 nailong-otto 变体
│   ├── otto_robot.cc               板子初始化、按键和状态通知
│   ├── otto_controller.cc          MCP 动作、队列、校准
│   ├── otto_movements.cc/h         舵机轨迹和取消检查
│   ├── nailong_actions.cc/h        本地笑声、边笑边走
│   ├── nailong_display.cc/h        图片加载和显示
│   ├── nailong_scene_state.h       待机 / 回答 / 大笑场景
│   ├── nailong_assets/             RGB565 图片、Opus 笑声
│   └── websocket_control_server.*  设备端局域网控制
├── main/application.cc             状态和协议调度
├── main/mcp_server.*               MCP 工具与延迟完成回调
├── scripts/build_nailong.py        奶龙构建入口
├── scripts/prepare_nailong_materials.py
└── partitions/v2/16m.csv           分区表
~~~

## 2. 一个动作怎么执行

<figure>
  <img className="board-svg" src="/img/dev/action-chain.svg" alt="你说话，模型调用 self.otto.action 并传入 swing，MCP 回调排入动作队列，动作任务执行摇摆并归位" />
  <figcaption>从一句话到舵机动作</figcaption>
</figure>

1. `self.otto.action` 接收动作名称和参数，例如 `action="swing"`。
2. 回调调用 `QueueAction(...)`，把动作交给后台任务。
3. 任务调用 `otto_movements.cc` 的对应方法，完成后归位。
4. 最新停止修订通过取消标记中断动作、清理队列并归位，实际停止效果仍待实测。

## 3. 设备端 MCP 工具

| 工具 | 作用 |
|---|---|
| `self.otto.action` | 统一动作：`walk`、`turn`、`jump`、`swing`、`moonwalk`、`bend`、`shake_leg`、`updown` 等 |
| `self.otto.servo_sequences` | 自定义舵机序列；首次调试用小幅度、短序列 |
| `self.otto.laugh` | 约 5 秒本地大笑，完成或中断后返回 |
| `self.otto.laugh_walk` | 一次调用启动笑声和行走，两项结束后返回 |
| `self.otto.stop` | 停止动作并归位 |
| `self.otto.set_trim` | 单舵机微调，`trim_value` 为 -50～50 |
| `self.otto.get_trims` | 读取微调值 |
| `self.otto.get_status` | 查询运动状态 |
| `self.battery.get_level` | 电量与充电状态 |
| `self.otto.get_ip` | 查询设备 IP |

奶龙只有腿脚四个舵机，手部动作不可用。基础动作不再使用独立的 `walk_forward`、`turn_left` 等工具名。

### 3.1 常用动作参数

~~~json
{"action":"walk","steps":3,"speed":1000,"direction":1,"arm_swing":0}
~~~

这是工具的参数示例，实际调用由后台模型发送。`direction=1` 为前进 / 左转，`-1` 为后退 / 右转；`speed` 是毫秒数，越大越慢。

`action` 工具的范围：`steps` 1～100，`speed` 100～3000，`amount` 0～170。范围合法不代表机械上安全，先用少步数、小幅度和较慢速度。

组合工具的限制不同：`steps` 1～7、`speed` 300～1500、`direction` 只能为 1 或 -1，且步数乘每步毫秒不超过 4500。默认 5 步、700 毫秒、向前。

## 4. 改完如何验证

按 [编译奶龙固件](/docs/flash/build) 构建，先看日志中实际调用的工具，再核对图片、声音和机械动作。当前候选功能的验证边界见 [功能状态](/docs/intro/status)。

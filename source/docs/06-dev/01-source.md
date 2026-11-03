---
slug: /dev/source
title: 源码结构
sidebar_label: 源码结构
---

## 1. 目录

<figure>
  <img className="board-svg" src="/img/dev/source-map.svg" alt="奶龙固件最常改的文件：config.h 放引脚和屏幕参数；otto_controller.cc 注册 MCP 工具、动作队列和校准；otto_movements.cc 是每个动作的舵机轨迹；kanshan_emotions.c 是看山表情和动作贴图；main/assets/common 下的 ogg 是本地音效；sdkconfig.defaults.otto 是默认配置；scripts/otto_master.py 是本地联调工具" />
  <figcaption>最常改的几个文件</figcaption>
</figure>

```text
otto/
├── main/
│   ├── boards/otto-robot/       ← 奶龙板型，二次开发主要改这里
│   │   ├── config.h             引脚、屏幕、音频参数
│   │   ├── otto_robot.cc        板子初始化（屏幕、音频、按键、电源）
│   │   ├── otto_controller.cc   MCP 工具注册、动作队列、校准、音效
│   │   ├── otto_movements.cc/h  所有动作的舵机轨迹
│   │   ├── oscillator.cc/h      单个舵机的正弦振荡器
│   │   ├── otto_emoji_display.cc 表情显示、动作贴图切换
│   │   ├── kanshan_emotions.c/h 看山表情和动作贴图数据
│   │   ├── NAILONG.md           奶龙定制说明
│   │   └── README.md            上游 otto 板型说明
│   ├── assets/common/*.ogg      本地音效
│   ├── application.cc           小智主流程（状态机、唤醒、对话）
│   └── mcp_server.cc            设备端 MCP 服务
├── scripts/otto_master.py       本地联调 Otto Master
├── sdkconfig.defaults.otto      默认配置
├── BUILD_OTTO.md                编译烧录说明
└── partitions/                  分区表
```

## 2. 一个动作是怎么执行的

<figure>
  <img className="board-svg" src="/img/dev/action-chain.svg" alt="流程图：你说跳个舞，xiaozhi.me 大模型决定调用 self.otto.swing，机器人固件里 McpServer 调用 AddTool 注册的回调函数，回调把动作放进 QueueAction 队列后立即返回，动作任务执行 otto_.Swing 并在结束后 Home 归位；动作在单独任务里执行，所以执行期间还能继续听你说话" />
  <figcaption>从一句话到舵机动作</figcaption>
</figure>

1. `otto_controller.cc` 的 `RegisterMcpTools()` 用 `mcp_server.AddTool(...)` 注册每个工具：名字、给大模型看的说明、参数范围、回调函数。
2. 机器人连上后台时，会把这些工具上报给大模型。
3. 大模型决定调用某个工具时，回调函数被执行。回调里只做一件事：`QueueAction(动作类型, steps, speed, direction, amount)`，把动作放进队列然后立刻返回。
4. 后台的动作任务从队列里取出动作，调用 `otto_movements.cc` 里对应的函数（例如 `Swing()`），做完后 `Home()` 回到站立姿势。

## 3. 设备端 MCP 工具

奶龙固件当前注册的工具（`speed` 数值越小越快）：

| 工具 | 作用 | 参数（默认值） |
|---|---|---|
| `self.otto.laugh` | 播放约 2 秒奶龙大笑，不动舵机 | 无 |
| `self.otto.walk_forward` | 走路 | steps 1–100（3）；speed 500–1500（1000）；direction 1 前进 / -1 后退（1）；arm_swing 0–170（50，无手臂时无效） |
| `self.otto.turn_left` | 转身 | steps（3）；speed（1000）；direction 1 左 / -1 右（1）；arm_swing（50） |
| `self.otto.jump` | 跳 | steps（1）；speed（1000） |
| `self.otto.swing` | 左右摇摆 | steps（3）；speed（1000）；amount 0–170（30） |
| `self.otto.moonwalk` | 太空步 | steps（3）；speed（1000）；direction 1 左 / -1 右（1）；amount（25） |
| `self.otto.bend` | 弯腰 | steps（1）；speed（1000）；direction（1） |
| `self.otto.shake_leg` | 抖腿 | steps（1）；speed（1000）；direction 1 左腿 / -1 右腿（1） |
| `self.otto.updown` | 上下蹲 | steps（3）；speed（1000）；amount（20） |
| `self.otto.stop` | 立即停止并归位 | 无 |
| `self.otto.set_trim` | 校准舵机 | servo_type：`left_leg` / `right_leg` / `left_foot` / `right_foot`；trim_value -50–50 |
| `self.otto.get_trims` | 读取校准值 | 无 |
| `self.otto.get_status` | 是否在动 | 无，返回 `moving` / `idle` |
| `self.battery.get_level` | 电量和是否在充电 | 无 |

`hands_up` / `hands_down` / `hand_wave` 只有在 `config.h` 里配置了手臂舵机引脚时才会注册，奶龙没有手臂所以没有。

### 3.1 已经写好、但没开放给大模型的动作

`otto_movements.cc` 里还有几个动作写好了，但没有注册成 MCP 工具：

| 函数 | 动作 | 动作编号 |
|---|---|---|
| `TiptoeSwing()` | 踮脚摇摆 | `ACTION_TIPTOE_SWING` |
| `Jitter()` | 抖动 | `ACTION_JITTER` |
| `AscendingTurn()` | 上升转弯 | `ACTION_ASCENDING_TURN` |
| `Crusaito()` | 十字步 | `ACTION_CRUSAITO` |
| `Flapping()` | 拍打 | `ACTION_FLAPPING` |

动作任务已经能执行它们，只差一个 MCP 工具。这正好是下一节的练习：[添加 MCP 工具](/docs/dev/mcp-tool)。

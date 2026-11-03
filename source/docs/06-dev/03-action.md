---
slug: /dev/action
title: 添加新动作
sidebar_label: 添加新动作
---

## 1. 简介

Otto 的动作都是用**振荡器**做的：每个舵机按正弦曲线来回摆，四个舵机的幅度（amplitude）、中心偏移（offset）、相位差（phase）组合起来，就变成了走路、摇摆、太空步。

这一节写一个新动作「**点头**」：两只脚同时向内踮一下再放下，像奶龙在点头。

<figure>
  <video controls playsInline preload="none" poster="/video/walk-three-back.jpg" style={{width: '100%', borderRadius: 8}} aria-label="从背后拍三只机器人在木地板上一起向前走">
    <source src="/video/walk-three-back.mp4" type="video/mp4" />
  </video>
  <figcaption>这就是 walk_forward 动作跑起来的样子（演示视频）</figcaption>
</figure>

## 2. 先看懂一个现成动作

`main/boards/otto-robot/otto_movements.cc` 里的 `Swing()`：

```cpp
void Otto::Swing(float steps, int period, int height) {
    //-- Both feets are in phase. The offset is half the amplitude
    //-- It causes the robot to swing from side to side
    int A[SERVO_COUNT] = {0, 0, height, height, 0, 0};
    int O[SERVO_COUNT] = {
        0, 0, height / 2, -height / 2, HAND_HOME_POSITION, 180 - HAND_HOME_POSITION};
    double phase_diff[SERVO_COUNT] = {0, 0, DEG2RAD(0), DEG2RAD(0), 0, 0};

    //-- Let's oscillate the servos!
    Execute(A, O, period, phase_diff, steps);
}
```

数组有 6 位（`SERVO_COUNT = 6`），依次是：**左腿、右腿、左脚、右脚、左手、右手**。奶龙没有手，后两位保持手臂的默认值即可。这里只有两只脚的幅度不为 0，所以只有脚在动；两只脚同相、偏移相反，机器人就左右摇摆。

| 参数 | 含义 |
|---|---|
| `A` 幅度 | 每个舵机来回摆多少度，0 表示不动 |
| `O` 偏移 | 摆动的中心偏离 90° 多少度 |
| `phase_diff` 相位 | 各舵机之间错开多少，决定动作是同步还是交替 |
| `period` | 摆一个来回用多少毫秒，就是 MCP 里的 `speed` |
| `steps` | 摆几个来回 |

## 3. 写「点头」

### 3.1 声明

在 `otto_movements.h` 的动作函数声明里加一行：

```cpp
    void Nod(float steps = 2, int period = 800, int height = 15);
```

### 3.2 实现

在 `otto_movements.cc` 里 `Swing()` 的后面加：

```cpp
void Otto::Nod(float steps, int period, int height) {
    // 两只脚向内踮起再放下，两条腿不动
    int A[SERVO_COUNT] = {0, 0, height, height, 0, 0};
    int O[SERVO_COUNT] = {0, 0, height, -height, HAND_HOME_POSITION, 180 - HAND_HOME_POSITION};
    double phase_diff[SERVO_COUNT] = {0, 0, DEG2RAD(-90), DEG2RAD(90), 0, 0};
    Execute(A, O, period, phase_diff, steps);
}
```

左右脚的偏移和相位符号相反，是因为两只脚的舵机是镜像安装的。符号写反了动作会变成往外翻，换一下正负号即可。

### 3.3 接进动作队列

在 `otto_controller.cc` 里：

1. `enum ActionType` 末尾加 `ACTION_NOD = 19,`。
2. 动作名称的 `switch` 里加 `case ACTION_NOD: return "nod";`。
3. 动作任务执行的 `switch` 里加：

   ```cpp
                       case ACTION_NOD:
                           controller->otto_.Nod(params.steps, params.speed, params.amount);
                           break;
   ```

4. 按 [添加 MCP 工具](/docs/dev/mcp-tool) 的方法注册 `self.otto.nod`。

:::tip
动作贴图和动作音效也是按动作类型映射的。新动作没有专门的贴图和音效时，会用默认的那一组，不影响运行。想加专属贴图见 [更换表情](/docs/dev/emotion)。
:::

## 4. 验证

1. 编译烧录：`idf.py -p 串口 flash monitor`。
2. 把机器人放在桌子中间，说「点点头」。
3. 不满意就改 `height`（幅度）和 `period`（速度），每次改一点。

:::warning
新动作第一次运行时，用手虚扶着机器人。幅度太大或者相位写错，舵机可能顶死或者摔倒。听到持续的「嗡嗡」声马上说「停下」或关机。
:::

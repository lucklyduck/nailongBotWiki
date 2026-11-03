---
slug: /debug/trim
title: 舵机校准
sidebar_label: 舵机校准
---

## 1. 简介

装腿时舵机齿轮总会差一两个齿，结果就是站姿歪、走路往一边偏。**校准（trim）** 就是给每个舵机加一个固定的偏移角度，让它的「零位」变正。校准值保存在机器人里（NVS 的 `otto_trims` 分区），断电、重启都不会丢，但**重新烧录时如果擦除了 Flash 就要重新校准**。

<figure>
  <img className="board-svg" src="/img/debug/trim.svg" alt="舵机校准示意：正确站姿是两条腿竖直、两只脚平放；腿歪时调腿舵机的 trim；脚不平时调脚舵机的 trim；每次调 2 到 5 度" />
  <figcaption>正确的站姿，以及两种需要校准的情况（示意图）</figcaption>
</figure>

<figure>
  <video controls playsInline preload="none" poster="/video/walk-pair.jpg" style={{width: '100%', borderRadius: 8}} aria-label="奶龙和看山并排在木地板上迈步向前走">
    <source src="/video/walk-pair.mp4" type="video/mp4" />
  </video>
  <figcaption>校准好以后，两只应该能走直线（演示视频）</figcaption>
</figure>

## 2. 校准前

1. 确认 [组装](/docs/assembly/center) 时舵机已经归中，腿的方向是朝前的。差得太多（超过 20°）的话，拆下摇臂重新装比软件校准更好。
2. 机器人已经 [配网](/docs/debug/wifi) 并 [绑定后台](/docs/xiaozhi/bind)，能正常对话。
3. 把机器人放在平整的桌面上。

## 3. 用语音校准

固件提供了两个 MCP 工具，大模型听懂你的话之后会自动调用：

| 工具 | 作用 | 参数 |
|---|---|---|
| `self.otto.set_trim` | 设置某个舵机的微调值 | `servo_type`：哪个舵机；`trim_value`：-50～50 度 |
| `self.otto.get_trims` | 查看当前所有微调值 | 无 |

直接对机器人说：

- 「你好奶龙，把**左脚**校准到 **10 度**」
- 「把**右腿**校准到 **-5 度**」
- 「现在的舵机微调值是多少？」

四个舵机分别是 **左腿、右腿、左脚、右脚**。

### 3.1 推荐顺序

1. 先调两条**腿**：从正面看，腿要竖直、不内八不外八。
2. 再调两只**脚**：从正面看，脚掌要平贴桌面。
3. 每次只改 2～5 度，看一眼效果再改。正负方向不确定时，先试 `5`，变差了就改成 `-5`。
4. 调完说「向前走三步」，看走路是否笔直。

:::nailong
校准就像给我矫正站姿。一次别调太多，2 到 5 度慢慢来，不然我会从内八变成外八。
:::

## 4. 其他校准方式

- **官方固件**（≥ v2.0.4-2）支持微信小程序校准，二维码在 [ottodiy.tech 下载页](https://ottodiy.tech/docs/downloads/)。奶龙固件是否兼容小程序还未验证。
- **开发者**：可以通过 MCP 直接发 JSON 调用，见 [添加 MCP 工具](/docs/dev/mcp-tool)。

## 5. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 说了校准但没反应 | 大模型没有调用工具 | 在后台人设里加一句「用户要求校准时调用 self.otto.set_trim」，见 [配置奶龙人设](/docs/xiaozhi/role) |
| 调到 ±50 还是歪 | 摇臂装偏太多 | 拆下摇臂，按 [舵机归中](/docs/assembly/center) 重新装 |
| 某个舵机一直抖、发热 | 结构顶死，舵机堵转 | 立刻关机，检查腿脚是否卡住、螺丝是否太紧 |

:::warning
舵机长时间堵转会烧坏。听到持续的「嗡嗡」声或摸到舵机发烫，先关机再排查。
:::

---
slug: /assembly/check
title: 装完自检
sidebar_label: 装完自检
---

## 1. 自检清单

打开电源开关，逐项检查：

| 项目 | 应该看到 | 不对的话 |
|---|---|---|
| 屏幕 | 亮起，显示表情或配网提示 | 检查屏幕排线；看 [串口日志](/docs/debug/serial) |
| 舵机 | 开机时四个舵机各动一下，然后站直不动 | 见下面的常见问题 |
| 站姿 | 两腿竖直、两脚放平 | [舵机校准](/docs/debug/trim) |
| 喇叭 | 有开机提示音 | 检查喇叭插头 |
| 充电 | 插上 Type-C 后充电灯亮 | 检查电池插头、充电线 |

全部正常后，去 [配网](/docs/debug/wifi) 和 [绑定后台](/docs/xiaozhi/bind)，然后说一句「你好奶龙，向前走三步」。

<figure>
  <img src="/img/photos/lineup-lit.jpg" alt="五只亮着屏幕的奶龙和看山机器人站成一排" />
  <figcaption>恭喜，你的奶龙也可以加入这一排了</figcaption>
</figure>

装好以后大概是这样走路的：

<figure>
  <video controls playsInline preload="none" poster="/video/walk-pair.jpg" style={{width: '100%', borderRadius: 8}} aria-label="奶龙和看山并排在木地板上迈步向前走">
    <source src="/video/walk-pair.mp4" type="video/mp4" />
  </video>
  <figcaption>奶龙和看山一起走路（演示视频）</figcaption>
</figure>

## 2. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 舵机不转 | 插头插反 / 没电 / 固件没烧 | 棕线朝外重插；充电；重新烧录 |
| 某个舵机一直抖、发烫、嗡嗡响 | 摇臂装偏，结构顶死 | **立刻关机**，拆下摇臂重新归中再装 |
| 站不稳、走两步就倒 | 螺丝松了 / 打印件变形 / 站姿不正 | 拧紧螺丝；检查打印件；做 [舵机校准](/docs/debug/trim) |
| 外壳装不进去 | 打印误差、支撑没清干净 | 清理支撑；适当打磨 |
| 动作时屏幕闪、重启 | 电池电量不足 | 充满电再试 |

:::warning
舵机堵转时电流很大，几分钟就可能烧坏舵机，同时也很耗电。听到持续的嗡嗡声先关机，再排查。
:::

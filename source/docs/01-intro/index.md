---
slug: /intro
title: 产品介绍
sidebar_label: 产品介绍
---

## 1. 简介

奶龙机器人是一个会说话、会走路、会大笑的桌面 AI 伙伴。它是 **知造 ZhiForge** 团队（catnipent）在 2026 知乎黑客松 · 校园新锐季「社交灵魂局」赛道上做的实物作品。

它由三部分组成：

- **机器人本体**：开源的 [小智 AI Otto 双足机器人](https://ottodiy.tech/docs/downloads/)。主控是 ESP32-S3，配 4 个舵机（两条腿、两只脚）和一块 1.54 寸圆屏。
- **外壳**：奶龙 / 看山造型的 3D 打印身体，装在 Otto 的机身上，用双手把屏幕抱在胸前。
- **对话后台**：[xiaozhi.me](https://xiaozhi.me/)，负责听懂你说的话、按人设想好怎么回答、再把语音和动作指令发回机器人。

<figure>
  <img src="/img/photos/hero-three-robots.jpg" alt="三只奶龙机器人站在木地板上：左边一只黄色奶龙，右边两只灰白色看山，都是白色腿、蓝色脚，胸口抱着一块小屏幕" />
  <figcaption>黑客松现场的三只样机：黄色是奶龙，灰白色是看山</figcaption>
</figure>

<figure>
  <img src="/img/photos/desk-kanshan.jpg" alt="工位桌面上，一只白色看山机器人和几个动漫手办、一罐可乐摆在一起" />
  <figcaption>黑客松工位上的看山，和它的朋友们</figcaption>
</figure>

<figure>
  <img src="/img/community/makerworld-01.jpg" alt="渲染图：白蓝配色的 Otto 原版，方脑袋上的黑色屏幕显示表情，带手臂和蓝色夹爪" />
  <figcaption>奶龙的「原型」：Otto 原版小智 AI 机器人，方脑袋、带手臂（来源：MakerWorld ottoRobot 小智 AI）</figcaption>
</figure>

## 2. 它能做什么

- 说「**你好奶龙**」唤醒，或者按一下机身按键，然后直接用中文聊天。
- 屏幕显示表情和对话字幕。
- 用语音让它走路、转身、跳、摇摆、太空步、大笑。
- 大模型会按人设自己决定什么时候做动作，比如听不懂时大笑一声。
- 在 xiaozhi.me 上随时换人设、换声音、换大模型，不用重新烧录。

<figure>
  <video controls playsInline preload="none" poster="/video/three-lit.jpg" style={{width: '100%', borderRadius: 8}} aria-label="三只亮着屏幕的奶龙和看山机器人站在一起，屏幕上是表情">
    <source src="/video/three-lit.mp4" type="video/mp4" />
  </video>
  <figcaption>三只样机亮屏站在一起（演示视频）</figcaption>
</figure>

<figure>
  <video controls playsInline preload="none" poster="/video/walk-three-back.jpg" style={{width: '100%', borderRadius: 8}} aria-label="从背后拍三只机器人在木地板上一起向前走">
    <source src="/video/walk-three-back.mp4" type="video/mp4" />
  </video>
  <figcaption>从背后看三只一起走（演示视频）</figcaption>
</figure>

## 3. 系统框图

<figure>
  <img className="board-svg" src="/img/intro/system.svg" alt="系统框图：机器人内的小智固件连接麦克风、喇叭、BOOT 键、圆屏、4 个舵机和电池；机器人通过 Wi-Fi 把语音发到 xiaozhi.me 云端，云端经过语音识别、大模型加角色人设、语音合成后，把回复语音、表情和动作指令发回机器人" />
  <figcaption>机器人负责「听、说、动、显示」，xiaozhi.me 负责「听懂、思考、说出来」</figcaption>
</figure>

1. 麦克风收到唤醒词后，固件开始把你的声音通过 Wi-Fi 发给 xiaozhi.me。
2. xiaozhi.me 做语音识别，把文字和角色人设一起交给大模型。
3. 大模型生成回答，需要动作时调用机器人上的 **MCP 工具**（MCP：一种让大模型调用外部功能的协议，这里的「外部功能」就是机器人的动作）。
4. 回答被合成成语音发回机器人播放，同时屏幕切换表情、舵机执行动作。

## 4. 本章内容

| 页面 | 内容 |
|---|---|
| [规格参数](/docs/intro/specs) | 主控、舵机、屏幕、音频、电池、尺寸 |
| [部件与引脚](/docs/intro/parts) | 每个部件接在哪个 GPIO 上 |
| [功能状态](/docs/intro/status) | 官方固件和奶龙固件各支持哪些功能 |
| [学习路线](/docs/intro/path) | 第一次做？按 Task 0～5 一步步来 |

:::nailong
我是奶龙，大家好！我能听、能说、能走两步，还会哈哈大笑。听不懂你说啥的时候，我就笑给你看。
:::

:::tip
第一次做的话，先看 [学习路线](/docs/intro/path)：6 个任务，一个周末从零件走到会说话的奶龙。
:::

## 5. 致谢

- [小智 AI（78/xiaozhi-esp32）](https://github.com/78/xiaozhi-esp32)：硬件端对话功能与源码参考
- [ESP-IDF](https://github.com/espressif/esp-idf)：嵌入式开发、编译与烧录框架
- [小鹏 ottoRobot](https://oshwhub.com/txp666/ottorobot)：机器人结构与 PCB 开源参考

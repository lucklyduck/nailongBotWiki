---
slug: /xiaozhi/bind
title: 绑定设备
sidebar_label: 绑定设备
---

## 1. 简介

绑定就是把机器人和你的 xiaozhi.me 账号配对。第一次联网的机器人会给出一串 **6 位数字验证码**，你在后台输入它，配对就完成了。

<figure>
  <img className="board-svg" src="/img/xiaozhi/bind.svg" alt="绑定流程：奶龙机器人联网后播报并显示 6 位验证码，你听到或看到验证码后，在 xiaozhi.me 控制台的智能体里点添加设备并输入验证码；绑定成功后机器人自动进入待机，使用这个智能体的人设和声音" />
  <figcaption>用 6 位验证码完成绑定</figcaption>
</figure>

## 2. 绑定步骤

<figure>
  <div className="video-embed">
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1zuNyzXEWa&p=1&autoplay=0&high_quality=1" title="B 站组装教程 P1：配网及后台配置，后半段是 xiaozhi.me 后台操作" allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"></iframe>
  </div>
  <figcaption>B 站组装教程 P1：配网及后台配置，后半段是 xiaozhi.me 后台操作（鹿小班电子科技，<a href="https://www.bilibili.com/video/BV1zuNyzXEWa?p=1">打不开就点这里去 B 站看</a>）</figcaption>
</figure>

1. 先完成 [配网](/docs/debug/wifi)。机器人连上网后，会**播报**并在屏幕上**显示** 6 位验证码，然后停在 `activating` 状态等你。
2. 在 xiaozhi.me 控制台找到要用的智能体（比如「奶龙」），点 **添加设备**。
3. 输入 6 位验证码，确认。
4. 稍等几秒，机器人会自动完成激活，进入待机。

**会看到什么**：后台的智能体卡片上多了一台设备；机器人屏幕显示表情，状态栏不再提示验证码。说「你好奶龙」就能开始聊了。

## 3. 换绑和解绑

- **把机器人换到另一个智能体**：在控制台的设备管理里，把设备从当前智能体解绑，机器人重启后会重新给出验证码，再按上面的步骤绑到新的智能体。
- **把机器人送人**：先在后台解绑，对方用自己的账号重新绑定。

:::info 待补充
解绑按钮在控制台中的具体位置。
:::

## 4. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 没听清验证码 | | 看屏幕，或者重启机器人让它再播报一次 |
| 提示验证码无效 | 验证码过期了 | 重启机器人拿新的验证码 |
| 机器人一直不出验证码 | 没联网 / 已经绑定过 | 看串口日志，确认 Wi-Fi 已连上；已绑定的不会再给验证码 |
| 绑定后说话没反应 | 智能体没配置好 | 检查人设和语言模型是否已保存，见 [配置奶龙人设](/docs/xiaozhi/role) |

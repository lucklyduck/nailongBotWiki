---
slug: /debug/wifi
title: 配网
sidebar_label: 配网
---

## 1. 简介

「配网」就是告诉机器人家里 Wi-Fi 的名字和密码。第一次开机，或者带着机器人换了地方（新的 Wi-Fi），都要配一次。

<figure>
  <img className="board-svg" src="/img/debug/wifi.svg" alt="配网流程：开机后屏幕提示配网，手机连接名为 xiaozhi-XXXX 的无密码热点，自动弹出网页后选择家里的 Wi-Fi 并输入密码，机器人重启，连上网后播报验证码；只支持 2.4 GHz Wi-Fi" />
  <figcaption>配网流程</figcaption>
</figure>

## 2. 配网步骤

<figure>
  <div className="video-embed">
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1zuNyzXEWa&p=1&autoplay=0&high_quality=1" title="B 站组装教程 P1：配网及后台配置，3 分 54 秒" allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"></iframe>
  </div>
  <figcaption>B 站组装教程 P1：配网及后台配置，3 分 54 秒（鹿小班电子科技，<a href="https://www.bilibili.com/video/BV1zuNyzXEWa?p=1">打不开就点这里去 B 站看</a>）</figcaption>
</figure>

1. 打开机器人电源。没配过网时，机器人会自动进入配网模式，屏幕上会显示热点名称。
2. 手机打开 Wi-Fi 设置，连接名为 **`xiaozhi-XXXX`** 的热点（XXXX 每台不同），不需要密码。
3. 连上后手机会自动弹出配网网页。没有弹出的话，用浏览器打开屏幕上显示的地址。
4. 在网页里选择家里的 Wi-Fi，输入密码，提交。
5. 机器人会重启并连接 Wi-Fi。

**会看到什么**：连上网后，第一次使用的机器人会播报并在屏幕上显示一串 **6 位数字验证码**，这时去 [绑定设备](/docs/xiaozhi/bind)。已经绑定过的机器人会直接进入待机，显示表情。

## 3. 重新配网

换了 Wi-Fi 后，机器人连不上旧网络，会自动重新进入配网模式，按上面的步骤再配一次即可。

身体下方右侧的**功能键**在 Otto 资料里标注为「打断 / 唤醒 / 重新配网」键。

:::info 待补充
在已经能连上旧 Wi-Fi 的情况下，用功能键手动进入配网模式的具体按法（单击、长按还是开机时按），需要在奶龙固件实机上确认。
:::

:::nailong
我只认 2.4G 的 Wi-Fi，5G 的我看不见。校园网那种要网页登录的我也连不上，开个手机热点给我就行。
:::

## 4. 常见问题

| 现象 | 原因 | 解决 |
|---|---|---|
| 网页里找不到自家 Wi-Fi | 路由器只开了 5 GHz | ESP32-S3 只支持 **2.4 GHz**，在路由器里打开 2.4 GHz，或用手机开 2.4 GHz 热点 |
| 提交后一直连不上 | 密码错误 / 信号太弱 | 重新配网，确认密码；靠近路由器 |
| 校园网、酒店网连不上 | 需要网页认证登录 | 这类网络不支持，用手机热点 |
| 手机连上热点后没弹网页 | 手机系统没识别到认证页 | 手动用浏览器打开屏幕上显示的地址 |

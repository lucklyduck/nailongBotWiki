---
slug: /assembly/body
title: 装主板和外壳
sidebar_label: 装主板和外壳
---

先准备当前模型包中的 <a href="/downloads/models/2026-11-13/01-shell.stl" download="01-shell.stl">身体外壳</a>、<a href="/downloads/models/2026-11-13/02-body-no-arms.stl" download="02-body-no-arms.stl">无手臂底座</a>、<a href="/downloads/models/2026-11-13/03-right-pin.stl" download="03-right-pin.stl">右卡销</a>和 <a href="/downloads/models/2026-11-13/04-left-pin.stl" download="04-left-pin.stl">左卡销</a>，各 1 件。完整文件见 [打印外壳](/docs/assembly/print)。以下原版图片和步骤用于装配参考，当前模型的具体配合需要试装核对。

## 1. 装主板（对应视频 P2）

<figure>
  <div className="video-embed">
    <iframe src="https://player.bilibili.com/player.html?bvid=BV1zuNyzXEWa&p=2&autoplay=0&high_quality=1" title="B 站组装教程 P2：固定头部，5 分 46 秒。视频装的是方块头，奶龙换成外壳" allowFullScreen sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"></iframe>
  </div>
  <figcaption>B 站组装教程 P2：固定头部，5 分 46 秒。视频装的是方块头，奶龙换成外壳（鹿小班电子科技，<a href="https://www.bilibili.com/video/BV1zuNyzXEWa?p=2">打不开就点这里去 B 站看</a>）</figcaption>
</figure>

<figure>
  <img className="board-svg" src="/img/assembly/body-wiring.svg" alt="身体里要接的五样东西：左腿左脚舵机接 HDR1，右腿右脚舵机接 HDR3，棕线朝外；喇叭接 1.25 mm 座，电池接 PH2.0 座，天线接 IPEX 座" />
  <figcaption>主板上要接的五样东西（示意图）</figcaption>
</figure>

1. 把喇叭固定到机身底座上，底座有走线槽。
2. 插回 4 根舵机线（[上腿下脚，棕线朝外](/docs/assembly/center#2-接线)），接上喇叭、电池、天线（1U 模组需要）。
3. 把主板装进机身，确认**屏幕、Type-C 口、电源开关**都对准开孔：
   - 电源开关在身体下方**左侧**
   - 功能键在身体下方**右侧**
   - Type-C 充电口在身体下方

<div className="img-grid">
  <figure>
    <img src="/img/ottodiy/assembly-13.webp" alt="渲染图：喇叭装进机身后壁的开槽位置" />
    <figcaption>① 喇叭装进后壁开槽（图 13）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/assembly-14.webp" alt="渲染图：机身内部俯视，标注舵机棕色线朝外、上腿下足，以及天线和喇叭" />
    <figcaption>② 插好舵机线、喇叭、电池、天线（图 14）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/assembly-15.webp" alt="渲染图：主板背面朝里，斜着插进机身前侧" />
    <figcaption>③ 主板斜着插进机身前侧（图 15）</figcaption>
  </figure>
  <figure>
    <img src="/img/ottodiy/assembly-16.webp" alt="渲染图：屏幕从机身正面露出，箭头指向 Type-C 口和开关位置" />
    <figcaption>④ 对准屏幕、Type-C 口和开关（图 16）</figcaption>
  </figure>
</div>

<p style={{fontSize: '0.85rem'}}>以上渲染图来源：ottodiy.tech 组装教程 第 5 步。</p>

## 2. 扣上奶龙外壳

Otto 原版这一步是扣上方块头盖；本套方案使用模型包中的身体外壳（原文件名 `01_奶蛙外壳.stl`），不再另找原版头盖或看山外壳。

<figure>
  <img src="/img/ottodiy/assembly-17.webp" alt="渲染图：Otto 原版的方块头盖从上方盖到机身上，头盖前侧有个突起压住电路板" />
  <figcaption>Otto 原版：头盖前侧的突起压紧电路板。奶龙外壳也要做到这一点（来源：ottodiy.tech 组装教程 图 17）</figcaption>
</figure>

<figure>
  <img className="board-svg" src="/img/assembly/shell.svg" alt="左边是奶龙外壳扣到机身底座上，屏幕从怀里露出；右边是从下往上看的底部，左侧电源开关、中间 Type-C、右侧功能键三个开孔" />
  <figcaption>扣外壳并检查底部三个开孔（示意图）</figcaption>
</figure>

1. 把外壳扣到机身底座上，外壳前侧要压住电路板，防止主板松动。
2. 屏幕从奶龙怀里的开口露出来，奶龙双手正好抱着屏幕。
3. 检查电源开关、功能键、Type-C 口没有被外壳挡住。

<figure>
  <img src="/img/demo/nailong-front.jpg" alt="装好的黄色奶龙站在木地板上：张嘴大笑，双手抱着胸前的屏幕，下面是白色的腿和蓝色的脚" />
  <figcaption>装好的奶龙：屏幕在怀里（截自演示视频）</figcaption>
</figure>

<figure>
  <img src="/img/demo/back.jpg" alt="奶龙和看山的背面，能看到外壳后侧和白色的腿" />
  <figcaption>背面（截自演示视频）</figcaption>
</figure>

:::info 当前模型的配套零件
模型包已提供左右卡销各 1 件。卡销的具体安装位置、外壳与底座的固定过程尚未完成实物验证，请先检查模型配合再试装；本页历史示意图不作为新模型固定方式的验证记录。
:::

:::nailong
扣外壳前先开机试一下，确认四条腿脚都会动、屏幕会亮、喇叭有声音。装好了再拆可就麻烦啦。
:::

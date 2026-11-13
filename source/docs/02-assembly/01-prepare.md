---
slug: /assembly/prepare
title: 物料与工具
sidebar_label: 物料与工具
---

## 1. 两种备料方式

| 方式 | 你需要准备 | 适合 |
|---|---|---|
| **买套件** | 由我们提供完整的零部件套装 | 第一次做，想快点看到成品 |
| **自己买料** | 下面所有电子件 + 自己打 PCB、焊接 + 打印全部结构件 | 想完整体验一遍，或者想改电路 |

套件购买入口见 ottodiy.tech 的 [零部件清单](https://ottodiy.tech/docs/bom)。注意套件通常包含**手臂**（6 个舵机），奶龙只用 4 个。

<figure>
  <img className="board-svg" src="/img/assembly/parts-overview.svg" alt="奶龙需要的八组零件：奶龙外壳、无手臂机身底座、两条腿、两只脚、四个 SG90 舵机、主板和 1.54 寸屏、电池和喇叭、摇臂螺丝和天线" />
  <figcaption>开工前把这些摆在桌上（示意图）</figcaption>
</figure>

<figure>
  <img src="/img/assembly/parts-yellow-shell-20261113.png" alt="配件示意图：黄色身体外壳与白色底座、腿脚摆在桌面，旁边保留锂电池、主板、天线、喇叭及四个蓝色舵机" />
  <figcaption>配件示意图：依据本套 STL 替换为黄色上半身外壳，保留原图电子件（基于 ottodiy.tech 组装教程图 1 编辑，非整套实拍；零件数量以清单为准）</figcaption>
</figure>

## 2. 电子件

购买链接整理于 2026-11-13，规格和价格以商品页为准。标注“待核对”的候选需确认接口、尺寸或焊盘后再购买。

<div className="purchase-table" role="region" aria-label="电子件与购买链接，可横向滚动" tabIndex={0}>

| # | 名称 | 型号 / 规格 | 数量 | 备注 | 购买链接 |
|---|---|---|---|---|---|
| 1 | 主板 PCB | 立创开源 [ottoRobot V1.1](https://pro.lceda.cn/editor?jspm=hub.gc.an.sjq&jlc_vid=E1ZXUABREQVYV1wERAcPAVwHQVQIUFxSRAVZUgJTRFIxVlNfRFdXUVJRQFZaXztWKAkaExQVTU5BCBcOAAkbBUoFGAw%3D#id=16252c97e5b14635931de8ce7e3af8dc) | 1 | 按实际工程版本在立创下单 | [立创工程与打板入口][pcb-order] |
| 2 | 主控模组 | ESP32-S3-WROOM-1U-**N16R8** | 1 | 必须是 16 MB Flash + 8 MB PSRAM。1U 是外接天线版，要配 IPEX 天线；板载天线的 -1 版也能用。推荐乐鑫原厂；天线候选的接口代际和线长待核对 | [乐鑫 N16R8 模组](https://item.taobao.com/item.htm?id=669879816972&skuId=5928281003813)<br/>[2.4GHz IPEX 天线（待核对）](https://detail.tmall.com/item.htm?id=1036822881394) |
| 3 | 舵机 | SG90 9g 180° | **4** | 建议多备 1 个；金属齿更耐用。链接选 SG90 180°、带小 5 孔配件 | [奥克欧 SG90](https://detail.tmall.com/item.htm?id=1077417446369&skuId=6294440894121) |
| 4 | 屏幕 | 1.54 寸 240×240 SPI（ST7789） | 1 | 链接选京东方玻璃胶框裸屏，不要选玻璃胶铁一体款 | [中景园屏幕](https://item.taobao.com/item.htm?id=600653923469&skuId=4193330464745) |
| 5 | 功放 | MAX98357AETE+T | 1 | 建议立创货。有人反馈淘宝货喇叭噪音大、发热、掉电快。链接为 TQFN-16 裸芯片，不是功放模块 | [佳信源功放芯片](https://item.taobao.com/item.htm?id=656824352017&skuId=4740462420725) |
| 6 | 麦克风 | ICS-43434 | 1 | 选择 ICS-43434，不要误选同页 ZTS6672。INMP441 模块需按主板方案适配 | [启天芯云 ICS-43434](https://item.taobao.com/item.htm?id=1027088727329&skuId=6274228647907) |
| 7 | 充电芯片 | TP4054 | 1 | 链接选 TP4054-42-SOT25R、SOT-23-5 | [佳信源 TP4054](https://item.taobao.com/item.htm?id=684690901003&skuId=5068394135896) |
| 8 | 稳压 | HE9073A33M5R（3.3 V） | 1 | 选择 3.3 V、SOT-23-5 | [凌芯稳压芯片](https://item.taobao.com/item.htm?id=1039420678320) |
| 9 | 喇叭 | 2828 4Ω 3W，1.25 mm 端子 | 1 | 选择 4R3W、2P1.25 银色款 | [芯创力喇叭](https://item.taobao.com/item.htm?id=939688934199&skuId=5836086884093)<br/>[兴华鑫喇叭（备选）](https://item.taobao.com/item.htm?id=857879179989&skuId=5670264693293) |
| 10 | 电池 | 103450 2000 mAh（1.25 端子）或双 18650 包 3.7 V（PH2.0） | 1 | 两种方案选一种。确认红黑线、插头和极性与主板一致；103450 链接的端子待确认，18650 候选的双电芯结构待确认 | [103450 2000mAh（端子待核对）](https://detail.tmall.com/item.htm?id=638394813102&skuId=4890126332973)<br/>[倍量 18650 PH 接口（结构待核对）](https://detail.tmall.com/item.htm?id=734363822390) |
| 11 | 电源开关 | XKB5858-Z-E 拨动开关 | 1 | 主链接为指定型号；备选为 5.8×5.8 侧插 6 脚自锁通用款，焊盘和尺寸待核对 | [XKB5858-Z-E](https://item.taobao.com/item.htm?id=781094702611)<br/>[思诚达通用款（待核对）](https://detail.tmall.com/item.htm?id=631520524805&skuId=4680509671372) |
| 12 | 功能键 | TS35CA 轻触按键 | 1 | 有的店铺清单里叫 BOOT 键，立创一键下单可能不含，需要单独买。链接为 3.3×4.5×6H 通用候选，非已确认的 TS35CA 原品牌，需核对按键高度和脚位 | [温州跃一 BOOT 按键（待核对）](https://item.taobao.com/item.htm?id=619380317760&skuId=4915088025515) |
| 13 | 舵机排针 | 2.54 mm 2×3P（PZ254-2-03-S） | 2 | 原板有 3 组，第 3 组接手臂，奶龙可以不焊；链接选 2×3P，焊盘形式待核对 | [2.54mm 2×3P 排针](https://item.taobao.com/item.htm?id=700748964957&skuId=5120840371371) |
| 14 | 接口座 | HC-1.25 2P（喇叭）、PH2.0 2P（电池） | 各 1 | 喇叭座 10 只/包，电池座 20 只/包；均为立贴候选，核对 PCB 焊盘及电池插头，不能仅按间距混用 | [1.25mm 2P 喇叭座](https://item.taobao.com/item.htm?id=528734911747&skuId=4981522281625)<br/>[PH2.0 2P 电池座](https://item.taobao.com/item.htm?id=676352225666&skuId=4862819477391) |
| 15 | 阻容等 | 见立创 BOM | — | 按最终 BOM 的数值、封装和用量下单 | [立创工程与 BOM 入口][pcb-order] |

</div>

[pcb-order]: https://pro.lceda.cn/editor?jspm=hub.gc.an.sjq&jlc_vid=E1ZXUABREQVYV1wERAcPAVwHQVQIUFxSRAVZUgJTRFIxVlNfRFdXUVJRQFZaXztWKAkaExQVTU5BCBcOAAkbBUoFGAw%3D#id=16252c97e5b14635931de8ce7e3af8dc

整机物料大约 ¥150～500，看渠道和器件质量。

## 3. 打印件

本 Wiki 统一使用 **2026-11-13 模型包**：8 个 STL（外壳、无手臂底座、左右卡销、左右腿、左右脚）及 1 个 3MF 参考工程。<a href="/downloads/models/2026-11-13/nailong-models-20261113.zip" download="nailong-models-20261113.zip">下载完整模型包（ZIP，10.46 MB）</a>，也可在 [打印外壳](/docs/assembly/print) 按零件下载。文件由本站直接提供，无需网盘。

<div className="purchase-table" role="region" aria-label="打印件与购买链接，可横向滚动" tabIndex={0}>

| 零件 | 数量 | 本站模型下载 | 购买链接 |
|---|---|---|---|
| 身体外壳 | 1 | <a href="/downloads/models/2026-11-13/01-shell.stl" download="01-shell.stl">01_奶蛙外壳.stl</a> | [3D 代打印询价][print-order] |
| 无手臂机身底座 | 1 | <a href="/downloads/models/2026-11-13/02-body-no-arms.stl" download="02-body-no-arms.stl">02_店家无手body.stl</a> | [3D 代打印询价][print-order] |
| 右卡销 | 1 | <a href="/downloads/models/2026-11-13/03-right-pin.stl" download="03-right-pin.stl">03_右卡销.stl</a> | [3D 代打印询价][print-order] |
| 左卡销 | 1 | <a href="/downloads/models/2026-11-13/04-left-pin.stl" download="04-left-pin.stl">04_左卡销.stl</a> | [3D 代打印询价][print-order] |
| 右腿 | 1 | <a href="/downloads/models/2026-11-13/05-right-leg.stl" download="05-right-leg.stl">05_右腿.stl</a> | [3D 代打印询价][print-order] |
| 左腿 | 1 | <a href="/downloads/models/2026-11-13/06-left-leg.stl" download="06-left-leg.stl">06_左腿.stl</a> | [3D 代打印询价][print-order] |
| 左脚 | 1 | <a href="/downloads/models/2026-11-13/07-left-foot.stl" download="07-left-foot.stl">07_左脚.stl</a> | [3D 代打印询价][print-order] |
| 右脚 | 1 | <a href="/downloads/models/2026-11-13/08-right-foot.stl" download="08-right-foot.stl">08_右脚.stl</a> | [3D 代打印询价][print-order] |

</div>

[print-order]: https://detail.tmall.com/item.htm?id=1062649997018

八个 STL 各打印 1 件。外壳原文件名为 `01_奶蛙外壳.stl`；3MF 是含外壳、底座与左右卡销的四对象参考工程，不计入额外打印数量。不要混用旧版模型；打印参数和试装说明见 [打印外壳](/docs/assembly/print)。

代打印链接是待询价的服务候选，尚未核验这套模型的具体报价；需要提供 STL、材料、颜色和数量，店铺展示价不代表整套打印费用。

## 4. 舵机配件

舵机包里自带，别扔：

- 十字摇臂：装腿用，要剪短
- 脚部专用形状的摇臂：装脚用
- 两颗大螺丝：把舵机固定到机身上
- 小螺丝：固定摇臂

## 5. 工具

| 工具 | 用途 |
|---|---|
| M2 十字螺丝刀 | 拧所有螺丝 |
| 斜口钳 | 剪摇臂、清理打印支撑 |
| 能传数据的 Type-C 线 | 烧录。只能充电的线电脑认不出来 |
| 恒温烙铁、焊锡、助焊剂、镊子 | 自己焊板时需要 |
| 热风枪或加热台 | 焊 ESP32 模组底部焊盘，可选 |

:::nailong
螺丝拧紧就好，别使出吃奶的劲儿。打印件是塑料的，拧太狠会裂。
:::

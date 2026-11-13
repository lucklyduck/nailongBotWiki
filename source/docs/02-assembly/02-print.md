---
slug: /assembly/print
title: 打印外壳
sidebar_label: 打印外壳
---

## 1. 当前模型包

Wiki中有全套开源外壳可自行下载打印

原始压缩包名为 `02_STL_单件落地(1).zip`，站内下载使用简短英文文件名；压缩包内容和所有模型文件均保持原始字节不变。旧版外壳、MakerWorld 原版结构件和历史预览不再作为本教程的打印下载方案。

<figure>
  <img src="/img/photos/hero-three-robots.jpg" alt="历史样机：黄色奶龙和灰白色看山，白色腿、蓝色脚" />
  <figcaption>历史样机配色参考；本次模型包只有下表列出的造型与零件</figcaption>
</figure>

## 2. 八个 STL，逐件下载

按下表每个 STL 打印 1 件，共 8 件。左右腿、左右脚和左右卡销已经分别提供，不需要用同一个文件镜像生成另一侧。

<div className="purchase-table" role="region" aria-label="打印模型与单件下载，可横向滚动" tabIndex={0}>

| 零件 | 压缩包内原始文件名 | 数量 | 本站下载 |
|---|---|---|---|
| 身体外壳 | `01_奶蛙外壳.stl` | 1 | <a href="/downloads/models/2026-11-13/01-shell.stl" download="01-shell.stl">STL 下载</a> |
| 无手臂机身底座 | `02_店家无手body.stl` | 1 | <a href="/downloads/models/2026-11-13/02-body-no-arms.stl" download="02-body-no-arms.stl">STL 下载</a> |
| 右卡销 | `03_右卡销.stl` | 1 | <a href="/downloads/models/2026-11-13/03-right-pin.stl" download="03-right-pin.stl">STL 下载</a> |
| 左卡销 | `04_左卡销.stl` | 1 | <a href="/downloads/models/2026-11-13/04-left-pin.stl" download="04-left-pin.stl">STL 下载</a> |
| 右腿 | `05_右腿.stl` | 1 | <a href="/downloads/models/2026-11-13/05-right-leg.stl" download="05-right-leg.stl">STL 下载</a> |
| 左腿 | `06_左腿.stl` | 1 | <a href="/downloads/models/2026-11-13/06-left-leg.stl" download="06-left-leg.stl">STL 下载</a> |
| 左脚 | `07_左脚.stl` | 1 | <a href="/downloads/models/2026-11-13/07-left-foot.stl" download="07-left-foot.stl">STL 下载</a> |
| 右脚 | `08_右脚.stl` | 1 | <a href="/downloads/models/2026-11-13/08-right-foot.stl" download="08-right-foot.stl">STL 下载</a> |

</div>

外壳原文件名为 `01_奶蛙外壳.stl`，这里保留原始命名便于核对。当前包没有另一套看山外壳。8 个 STL 均已检查三角面数据长度与顶点坐标，模型最低点在 Z=0；这不等于已完成打印与装配实测。

STL 不自带单位，导入切片软件后按毫米核对尺寸，避免自动缩放：外壳约 **107.6 × 118.3 × 112.6 mm**，底座约 **69 × 69 × 42 mm**，每条腿约 **17 × 41.5 × 40 mm**，每只脚约 **42 × 64 × 27 mm**，每个卡销约 **24.4 × 13 × 13 mm**（模型坐标轴方向的包围盒尺寸）。

## 3. 3MF 参考工程与文件校验

<a href="/downloads/models/2026-11-13/reference-project.3mf" download="reference-project.3mf">下载 3MF 参考工程</a>，原文件名为 `04_左卡销.3mf`。

:::warning 这个 3MF 不只是左卡销，也不是整套八件
工程包含 **外壳、无手臂底座、右卡销、左卡销** 4 个对象，不含腿和脚。如果已经按上表打印 8 个 STL，不要再把 3MF 中的同名零件重复打印。导入工程后，核对打印机、材料、支撑、缩放和对象数量，再自行切片。
:::

<a href="/downloads/models/2026-11-13/manifest.json">查看文件清单与 SHA-256</a> · <a href="/downloads/models/2026-11-13/SHA256SUMS.txt" download="SHA256SUMS.txt">下载 SHA256SUMS.txt</a>

校验值可以确认下载是否完整。下载链接带有版本日期，后续更新会使用新的版本目录，便于保留和回溯。

## 4. 配色参考

以下是历史样机与 Otto 社区的配色参考，不代表本模型包另含看山或其他造型的模型：

<div className="img-grid">
  <figure>
    <img src="/img/community/makerworld-02.jpg" alt="实拍：白色身体、绿色腿、橙色脚的 Otto，屏幕显示眯眼表情" />
    <figcaption>白身绿腿橙脚（来源：MakerWorld ottoRobot 小智 AI）</figcaption>
  </figure>
  <figure>
    <img src="/img/community/makerworld-03.jpg" alt="实拍：全黄色 Otto 戴着白色耳机，屏幕显示两只圆眼" />
    <figcaption>全黄色戴耳机（来源：MakerWorld）</figcaption>
  </figure>
  <figure>
    <img src="/img/community/oshwhub-03.jpg" alt="实拍：灰色身体、蓝色头顶、橙黑腿脚的 Otto，屏幕显示两只白色圆眼" />
    <figcaption>灰身蓝顶（来源：立创开源 ottoRobot）</figcaption>
  </figure>
  <figure>
    <img src="/img/community/makerworld-04.jpg" alt="渲染图：白蓝粉配色的 Otto 戴着黑色耳机" />
    <figcaption>白蓝粉戴耳机，渲染图（来源：MakerWorld）</figcaption>
  </figure>
</div>

## 5. 打印与试装建议

- 当前文件已落地放置，但摆放方向、层高、填充率和支撑仍需根据设备、材料及切片预览确定；尚无本套模型的统一实测参数。
- 腿脚和卡销应先检查受力位置与孔位，清理舵机槽、摇臂槽及螺丝孔中的支撑，再试装。
- 先核对左右件、舵机、屏幕和底座的配合，确认无干涉后再固定。原版组装图片用于理解顺序，具体孔位以当前文件与实际零件为准。
- 委托代打印时，发送完整模型包及“8 个 STL 各 1 件”的清单，同时确认材料、颜色、支撑处理和报价。

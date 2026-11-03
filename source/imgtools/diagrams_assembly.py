"""第 2 章 组装的示意图。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "assembly")

# 1. 组装流程
s = Svg(900, 270)
s.text(450, 34, "组装顺序：先烧录归中，再装腿", size=20, weight=700)
steps = [("① 备料", "电子件 + 打印件", "gray"), ("② 焊板", "买成品板跳过", "gray"), ("③ 烧录归中", "舵机转到 90°", "orange"),
         ("④ 装腿脚", "摇臂对正", "blue"), ("⑤ 装主板", "插回舵机线", "blue"), ("⑥ 扣外壳", "奶龙 / 看山", "yellow"), ("⑦ 自检", "站直、会动", "green")]
for i, (t, sub, c) in enumerate(steps):
    x = 18 + i * 126
    s.box(x, 90, 110, 90, t, sub, c, size=15)
    if i:
        s.arrow(x - 16, 135, x, 135)
s.text(450, 225, "第 ③ 步必须在第 ④ 步之前：舵机没归中就装摇臂，走路会歪，甚至顶死", size=13, color=C["red"])
s.save(os.path.join(OUT, "flow.svg"))

# 2. 舵机排针
s = Svg(900, 360)
s.text(450, 34, "舵机排针：上腿下脚，棕线（GND）朝板子外侧", size=20, weight=700)
s.raw(f'<rect x="250" y="70" width="400" height="220" rx="16" fill="{C["gray_bg"]}" stroke="{C["gray"]}" stroke-width="2"/>')
s.text(450, 190, "主板", size=18, weight=600, color=C["gray"])
PINS = (("GND", "#7a4a20"), ("电源", "#d64545"), ("信号", "#f0a020"))
def header(x, y, name, rows, mirror):
    s.text(x + 48, y - 12, name, size=13, weight=600)
    order = PINS if not mirror else PINS[::-1]
    for r in range(2):
        for k, (lab, col) in enumerate(order):
            cx, cy = x + 14 + k * 34, y + 14 + r * 40
            s.raw(f'<rect x="{cx-11}" y="{cy-11}" width="22" height="22" rx="3" fill="{col}"/>')
        tx = x - 16 if not mirror else x + 110
        s.text(tx, y + 19 + r * 40, rows[r], size=14, anchor="end" if not mirror else "start")
header(262, 110, "HDR1", ("左腿 GPIO17", "左脚 GPIO18"), False)
header(536, 110, "HDR3", ("右腿 GPIO39", "右脚 GPIO38"), True)
s.text(450, 260, "HDR4：手臂（GPIO8 / GPIO12），奶龙不用", size=13, color=C["gray"])
for i, (lab, col) in enumerate(PINS):
    x = 300 + i * 110
    s.raw(f'<rect x="{x}" y="306" width="16" height="16" rx="3" fill="{col}"/>')
    s.text(x + 22, 319, {"GND": "GND 棕线", "电源": "电源 红线", "信号": "信号 橙/黄线"}[lab], size=12, anchor="start")
s.text(450, 348, "示意图，不是实拍。线序综合 ottodiy 组装教程和原理图，以主板丝印为准", size=12, color=C["gray"])
s.save(os.path.join(OUT, "servo-header.svg"))

# 3. 腿的方向
s = Svg(900, 300)
s.text(450, 34, "腿怎么装：从上往下看", size=20, weight=700)
def legs(x0, title, ok, ang):
    for lx, a in ((x0 + 50, ang), (x0 + 130, -ang)):
        s.raw(f'<g transform="rotate({a} {lx+20} 160)"><rect x="{lx}" y="110" width="40" height="100" rx="8" fill="#ffffff" stroke="{C["gray"]}" stroke-width="2"/>'
              f'<circle cx="{lx+20}" cy="120" r="7" fill="{C["blue"]}"/></g>')
    s.raw(f'<line x1="{x0+20}" y1="90" x2="{x0+200}" y2="90" stroke="{C["ink"]}" stroke-width="3"/>')
    s.text(x0 + 110, 80, "屏幕一侧（前）", size=12, color=C["gray"])
    s.text(x0 + 110, 250, title, size=15, weight=600, color=C["green"] if ok else C["red"])
legs(20, "✓ 两腿平行朝前", True, 0)
legs(330, "✗ 内八", False, -14)
legs(640, "✗ 外八", False, 14)
s.text(450, 285, "蓝点 = 腿上的圆柱凸起，朝屏幕一侧。轻微偏差可以用软件校准", size=12, color=C["gray"])
s.save(os.path.join(OUT, "leg-direction.svg"))
print("ok")

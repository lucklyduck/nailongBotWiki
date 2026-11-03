"""第 2 章 组装：分步示意图（零件总览、摇臂、腿脚、内部接线、外壳、底部按键）。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "assembly")
Y, B, W, G, INK = C["yellow"], C["blue"], "#ffffff", C["gray"], C["ink"]


def servo(s, x, y, w=60, h=30, label=None, rot=0):
    """SG90：蓝色机身 + 两侧耳朵 + 白色输出轴。"""
    cx, cy = x + w / 2, y + h / 2
    s.raw(f'<g transform="rotate({rot} {cx} {cy})">'
          f'<rect x="{x-10}" y="{y+h*0.35}" width="{w+20}" height="{h*0.3}" rx="2" fill="#2b6fc4"/>'
          f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="#3b82d6" stroke="#1f4f8f" stroke-width="1.5"/>'
          f'<circle cx="{x+w*0.25}" cy="{y-5}" r="7" fill="#f4f4f4" stroke="{G}" stroke-width="1.5"/>'
          f'<rect x="{x+w*0.15}" y="{y-6}" width="{w*0.2}" height="6" fill="#3b82d6"/></g>')
    if label:
        s.text(cx, y + h + 22, label, size=12, color=G)


def cross_horn(s, cx, cy, arm=46, cut=False):
    col = "#f4f4f4"
    for dx, dy, L in ((1, 0, arm), (-1, 0, arm), (0, 1, arm * 0.6), (0, -1, arm * 0.6)):
        Lc = L * (0.5 if cut and dx else 1)
        x2, y2 = cx + dx * Lc, cy + dy * Lc
        s.raw(f'<line x1="{cx}" y1="{cy}" x2="{x2}" y2="{y2}" stroke="{G}" stroke-width="13" stroke-linecap="round"/>'
              f'<line x1="{cx}" y1="{cy}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="10" stroke-linecap="round"/>')
    s.raw(f'<circle cx="{cx}" cy="{cy}" r="9" fill="{col}" stroke="{G}" stroke-width="1.5"/><circle cx="{cx}" cy="{cy}" r="3" fill="{G}"/>')


# 1. 零件总览
s = Svg(900, 520)
s.text(450, 34, "开工前把这些摆在桌上", size=20, weight=700)
def tile(x, y, w, h, title, n):
    s.raw(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="#fbfbfc" stroke="#d9dde3" stroke-width="1.5"/>')
    s.text(x + w / 2, y + h - 14, f"{title} ×{n}", size=13, weight=600)
# 外壳
tile(20, 60, 200, 200, "奶龙外壳", 1)
s.raw(f'<path d="M70 210 Q60 120 120 90 Q180 120 170 210 Z" fill="#fff3a6" stroke="{Y}" stroke-width="2.5"/>'
      f'<rect x="100" y="160" width="40" height="34" rx="4" fill="{INK}"/>')
tile(240, 60, 200, 200, "机身底座（无手臂版）", 1)
s.raw(f'<rect x="290" y="110" width="100" height="90" rx="10" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2.5"/>'
      f'<rect x="300" y="190" width="30" height="16" fill="{W}" stroke="{G}"/><rect x="350" y="190" width="30" height="16" fill="{W}" stroke="{G}"/>')
tile(460, 60, 200, 200, "腿", 2)
for x in (515, 575):
    s.raw(f'<rect x="{x}" y="100" width="40" height="110" rx="8" fill="{W}" stroke="{G}" stroke-width="2"/><circle cx="{x+20}" cy="114" r="7" fill="{B}"/>')
tile(680, 60, 200, 200, "脚", 2)
for y in (115, 170):
    s.raw(f'<rect x="715" y="{y}" width="130" height="34" rx="6" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2"/>')
tile(20, 280, 200, 200, "SG90 舵机", 4)
for i in range(4):
    servo(s, 45 + (i % 2) * 90, 320 + (i // 2) * 60)
tile(240, 280, 200, 200, "主板 + 1.54 寸屏", 1)
s.raw(f'<rect x="285" y="315" width="110" height="80" rx="6" fill="#1f7a4d" stroke="#145233" stroke-width="2"/>'
      f'<rect x="300" y="330" width="40" height="30" fill="#c9ccd1"/><rect x="350" y="325" width="34" height="34" rx="3" fill="{INK}"/>')
tile(460, 280, 200, 200, "电池 + 喇叭", 1)
s.raw(f'<rect x="490" y="320" width="80" height="60" rx="6" fill="#eef1f4" stroke="{G}" stroke-width="2"/><text x="530" y="355" font-size="11" text-anchor="middle" fill="{G}">103450</text>'
      f'<circle cx="615" cy="350" r="26" fill="#d9dde3" stroke="{G}" stroke-width="2"/><circle cx="615" cy="350" r="12" fill="#b7bcc4"/>')
tile(680, 280, 200, 200, "摇臂 + 螺丝 + 天线", 1)
cross_horn(s, 735, 350, arm=34)
s.raw(f'<path d="M800 320 l30 0 l-8 50 l-14 0 z" fill="#f4f4f4" stroke="{G}" stroke-width="2"/>')
for i in range(4):
    s.raw(f'<line x1="{720+i*14}" y1="400" x2="{720+i*14}" y2="420" stroke="{G}" stroke-width="3"/>')
s.raw(f'<path d="M790 405 q30 -20 60 0" fill="none" stroke="{INK}" stroke-width="2"/>')
s.text(450, 508, "示意图，不是实拍。舵机包里的摇臂和螺丝不要扔", size=12, color=G)
s.save(os.path.join(OUT, "parts-overview.svg"))

# 2. 修剪十字摇臂
s = Svg(900, 300)
s.text(450, 34, "修剪十字摇臂：长的两端各剪掉一半", size=20, weight=700)
cross_horn(s, 200, 160, arm=80)
s.raw(f'<line x1="250" y1="120" x2="250" y2="200" stroke="{C["red"]}" stroke-width="2" stroke-dasharray="5 4"/>'
      f'<line x1="150" y1="120" x2="150" y2="200" stroke="{C["red"]}" stroke-width="2" stroke-dasharray="5 4"/>')
s.text(200, 250, "剪之前：红线处下剪刀", size=14)
s.arrow(360, 160, 520, 160, "斜口钳")
cross_horn(s, 680, 160, arm=80, cut=True)
s.text(680, 250, "剪之后：能塞进腿部零件的槽里", size=14, color=C["green"])
s.text(450, 288, "示意图。剪口用斜口钳修平，毛刺会让腿装不到底", size=12, color=G)
s.save(os.path.join(OUT, "horn-trim.svg"))

# 3. 装腿（侧视分解）
s = Svg(900, 360)
s.text(450, 34, "装腿：舵机固定在底座，摇臂嵌在腿里，再套上去", size=20, weight=700)
s.raw(f'<rect x="60" y="80" width="220" height="110" rx="12" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2.5"/>')
s.text(170, 104, "机身底座", size=13, color=B)
servo(s, 130, 150, w=80, h=34)
s.text(170, 220, "① 两颗大螺丝固定舵机", size=13)
s.raw(f'<line x1="104" y1="166" x2="104" y2="130" stroke="{G}" stroke-width="4"/><line x1="236" y1="166" x2="236" y2="130" stroke="{G}" stroke-width="4"/>')
s.arrow(300, 150, 380, 150)
s.raw(f'<rect x="420" y="70" width="70" height="200" rx="10" fill="{W}" stroke="{G}" stroke-width="2.5"/><circle cx="455" cy="90" r="9" fill="{B}"/>')
cross_horn(s, 455, 150, arm=30, cut=True)
s.text(455, 295, "② 剪好的摇臂嵌进腿里", size=13)
s.arrow(510, 150, 590, 150)
s.raw(f'<rect x="620" y="80" width="220" height="80" rx="12" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2.5"/>')
servo(s, 690, 120, w=80, h=34)
s.raw(f'<rect x="695" y="150" width="70" height="150" rx="10" fill="{W}" stroke="{G}" stroke-width="2.5"/><circle cx="730" cy="168" r="9" fill="{B}"/>')
s.raw(f'<line x1="730" y1="140" x2="730" y2="205" stroke="{INK}" stroke-width="3"/>')
s.text(730, 325, "③ 腿垂直套上舵机轴，拧中间螺丝", size=13)
s.text(450, 352, "示意图。套上前确认舵机已经上电归中到 90°，套的时候不要转动舵机轴", size=12, color=C["red"])
s.save(os.path.join(OUT, "leg-steps.svg"))

# 4. 装脚
s = Svg(900, 330)
s.text(450, 34, "装脚：专用摇臂垂直朝上，舵机线穿过腿进身体", size=20, weight=700)
s.raw(f'<rect x="60" y="200" width="220" height="60" rx="10" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2.5"/>')
s.raw(f'<path d="M160 200 l20 0 l-4 -80 l-12 0 z" fill="#f4f4f4" stroke="{G}" stroke-width="2"/>')
s.text(170, 290, "① 脚摇臂竖直朝上装在脚上", size=13)
s.arrow(300, 200, 380, 200)
s.raw(f'<rect x="420" y="70" width="70" height="200" rx="10" fill="{W}" stroke="{G}" stroke-width="2.5"/>')
servo(s, 415, 220, w=80, h=30)
s.raw(f'<path d="M455 220 C 470 160, 440 120, 455 70" fill="none" stroke="#7a4a20" stroke-width="3"/>'
      f'<path d="M459 220 C 474 160, 444 120, 459 70" fill="none" stroke="#d64545" stroke-width="3"/>'
      f'<path d="M463 220 C 478 160, 448 120, 463 70" fill="none" stroke="#f0a020" stroke-width="3"/>')
s.text(455, 295, "② 脚舵机装进腿下端，线往上穿", size=13)
s.arrow(510, 200, 590, 200)
s.raw(f'<rect x="690" y="70" width="70" height="170" rx="10" fill="{W}" stroke="{G}" stroke-width="2.5"/>'
      f'<rect x="640" y="236" width="170" height="40" rx="8" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2.5"/>')
s.text(725, 305, "③ 脚套上舵机轴，拧固定螺丝", size=13)
s.text(450, 324, "示意图。脚平放时脚掌应完全贴住桌面", size=12, color=G)
s.save(os.path.join(OUT, "foot-steps.svg"))

# 5. 身体内部接线
s = Svg(900, 420)
s.text(450, 34, "身体里要接的 5 样东西", size=20, weight=700)
s.raw(f'<rect x="330" y="120" width="240" height="170" rx="12" fill="#1f7a4d" stroke="#145233" stroke-width="2.5"/>')
s.text(450, 210, "主板", size=18, weight=700, color="#ffffff")
items = [(60, 70, "左腿 + 左脚舵机", "HDR1，棕线朝外", "blue", 330, 160),
         (640, 70, "右腿 + 右脚舵机", "HDR3，棕线朝外", "blue", 570, 160),
         (60, 300, "喇叭", "1.25 mm 2P 座", "green", 330, 260),
         (640, 300, "电池", "PH2.0 2P 座", "orange", 570, 260),
         (350, 320, "天线（1U 模组）", "IPEX 座", "gray", 450, 290)]
for x, y, t, sub, c, tx, ty in items:
    s.box(x, y, 200, 64, t, sub, c, size=14)
    s.arrow(x + 100 if x != 350 else 450, y + (64 if y < 200 else 0), tx, ty)
s.text(450, 412, "示意图。接完先开机试一下，四个舵机会动、喇叭有声再装进身体", size=12, color=G)
s.save(os.path.join(OUT, "body-wiring.svg"))

# 6. 扣外壳 + 底部开孔
s = Svg(900, 380)
s.text(450, 34, "扣上奶龙外壳，检查底部三个开孔", size=20, weight=700)
s.raw(f'<path d="M110 250 Q90 110 200 70 Q310 110 290 250 Z" fill="#fff3a6" stroke="{Y}" stroke-width="3"/>'
      f'<rect x="170" y="180" width="60" height="48" rx="5" fill="{INK}"/><circle cx="188" cy="200" r="4" fill="#7fd6ff"/><circle cx="212" cy="200" r="4" fill="#7fd6ff"/>'
      f'<path d="M150 210 q20 -20 25 0" fill="none" stroke="{Y}" stroke-width="10" stroke-linecap="round"/><path d="M250 210 q-20 -20 -25 0" fill="none" stroke="{Y}" stroke-width="10" stroke-linecap="round"/>')
s.arrow(200, 290, 200, 254)
s.raw(f'<rect x="130" y="290" width="140" height="40" rx="8" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2.5"/>')
s.text(200, 315, "机身底座", size=12, color=B)
s.text(200, 360, "外壳前侧压住电路板，屏幕从怀里露出", size=13)
s.raw(f'<rect x="470" y="120" width="380" height="170" rx="20" fill="{C["blue_bg"]}" stroke="{B}" stroke-width="2.5"/>')
s.text(660, 105, "从下往上看（屏幕朝上方）", size=13, color=G)
s.raw(f'<rect x="500" y="190" width="40" height="22" rx="4" fill="{INK}"/><rect x="640" y="250" width="40" height="16" rx="6" fill="#c9ccd1" stroke="{G}"/><circle cx="800" cy="200" r="12" fill="{C["orange"]}"/>')
s.text(520, 240, "电源开关", size=13); s.text(520, 258, "（左侧）", size=12, color=G)
s.text(660, 245, "Type-C", size=13)
s.text(800, 235, "功能键", size=13); s.text(800, 253, "（右侧）", size=12, color=G)
s.text(660, 330, "三个开孔都不能被外壳挡住", size=13, color=C["red"])
s.text(450, 372, "示意图，不是实拍。外壳固定方式待补充", size=12, color=G)
s.save(os.path.join(OUT, "shell.svg"))
print("ok")

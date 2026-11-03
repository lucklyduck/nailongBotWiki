"""第 4 章 调试的示意图。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "debug")

# 1. 设备状态流转
s = Svg(900, 330)
s.text(450, 34, "开机后的状态变化（串口日志里的 STATE）", size=20, weight=700)
row1 = [("starting", "启动"), ("configuring", "配网模式"), ("activating", "激活 / 绑定"), ("idle", "待机")]
for i, (k, v) in enumerate(row1):
    s.box(30 + i * 220, 70, 170, 64, k, v, ["gray", "orange", "orange", "green"][i], size=15)
    if i:
        s.arrow(30 + i * 220 - 50, 102, 30 + i * 220, 102)
s.text(310, 160, "没配过网才会进", size=12, color=C["gray"])
s.text(530, 160, "没绑定过才会停在这里", size=12, color=C["gray"])
row2 = [("connecting", "连接服务器"), ("listening", "听你说"), ("speaking", "说话 / 做动作")]
for i, (k, v) in enumerate(row2):
    s.box(140 + i * 240, 220, 180, 64, k, v, "blue", size=15)
    if i:
        s.arrow(140 + i * 240 - 60, 252, 140 + i * 240, 252)
s.arrow(745, 134, 230, 220)
s.text(600, 198, "唤醒词 / 按 BOOT", size=12, color=C["gray"])
s.arrow(620, 284, 230, 284, None, dash=True)
s.text(425, 306, "说完自动回到 listening；没人说话或再按一次 BOOT 回到 idle", size=12, color=C["gray"])
s.save(os.path.join(OUT, "states.svg"))

# 2. 配网
s = Svg(900, 250)
s.text(450, 34, "配网流程", size=20, weight=700)
steps = [("开机", "屏幕提示配网", "yellow"), ("手机连热点", "xiaozhi-XXXX\n无密码", "blue"), ("自动弹出网页", "选家里的 Wi-Fi\n输入密码", "blue"), ("机器人重启", "连上网后\n播报验证码", "green")]
for i, (t, sub, c) in enumerate(steps):
    s.box(30 + i * 220, 80, 180, 110, t, sub, c)
    if i:
        s.arrow(30 + i * 220 - 40, 135, 30 + i * 220, 135)
s.text(450, 228, "只支持 2.4 GHz Wi-Fi；换了新 Wi-Fi 环境要重新配网", size=13, color=C["gray"])
s.save(os.path.join(OUT, "wifi.svg"))

# 3. 舵机校准示意（正视）
s = Svg(900, 360)
s.text(450, 34, "舵机校准：站姿应该是什么样", size=20, weight=700)
def robot(x0, title, ok, tilt_l=0, tilt_r=0):
    s.raw(f'<rect x="{x0+40}" y="70" width="140" height="110" rx="40" fill="{C["yellow_bg"]}" stroke="{C["yellow"]}" stroke-width="2"/>')
    s.raw(f'<rect x="{x0+80}" y="110" width="60" height="44" rx="6" fill="{C["ink"]}"/>')
    for lx, t in ((x0 + 62, tilt_l), (x0 + 128, tilt_r)):
        s.raw(f'<g transform="rotate({t} {lx+15} 180)"><rect x="{lx}" y="180" width="30" height="80" rx="4" fill="#ffffff" stroke="{C["gray"]}" stroke-width="2"/></g>')
        s.raw(f'<rect x="{lx-14}" y="262" width="58" height="18" rx="4" fill="{C["blue_bg"]}" stroke="{C["blue"]}" stroke-width="2"/>')
    s.raw(f'<line x1="{x0+10}" y1="282" x2="{x0+210}" y2="282" stroke="{C["line"]}" stroke-width="2"/>')
    s.text(x0 + 110, 310, title, size=15, weight=600, color=C["green"] if ok else C["red"])
robot(20, "✓ 正确：腿竖直、脚放平", True)
robot(330, "✗ 腿歪：调腿舵机 trim", False, 8, -8)
robot(640, "✗ 脚不平：调脚舵机 trim", False)
s.raw(f'<rect x="{640+48}" y="258" width="58" height="18" rx="4" transform="rotate(-12 {640+77} 267)" fill="{C["red_bg"]}" stroke="{C["red"]}" stroke-width="2"/>')
s.text(450, 345, "示意图，不是实拍。每次调 2～5 度，看一眼再调", size=12, color=C["gray"])
s.save(os.path.join(OUT, "trim.svg"))
print("ok")

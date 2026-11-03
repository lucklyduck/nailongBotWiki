"""第 3 章 烧录的示意图。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "flash")

# 1. 选哪种烧录方式
s = Svg(900, 360)
s.text(450, 34, "选择烧录方式", size=20, weight=700)
s.box(330, 60, 240, 60, "要改源码或要「你好奶龙」？", None, "yellow", size=15)
s.arrow(380, 120, 190, 180, "不需要")
s.arrow(520, 120, 710, 180, "需要")
s.box(40, 180, 300, 70, "官方 Otto 固件", "合并好的 .bin，地址 0x0", "blue")
s.box(560, 180, 300, 70, "奶龙定制固件", "ESP-IDF v5.5.5 编译", "orange")
s.box(20, 280, 160, 54, "网页在线烧录", "Chrome / Edge", "gray", size=14)
s.box(200, 280, 160, 54, "工具烧录", "esptool / 下载工具", "gray", size=14)
s.box(560, 280, 140, 54, "idf.py flash", "开发用", "gray", size=14)
s.box(720, 280, 160, 54, "导出合并镜像", "发给别人烧", "gray", size=14)
s.arrow(150, 250, 100, 280); s.arrow(230, 250, 280, 280)
s.arrow(660, 250, 630, 280); s.arrow(760, 250, 800, 280)
s.save(os.path.join(OUT, "choose.svg"))

# 2. 下载模式接线和操作顺序
s = Svg(900, 300)
s.text(450, 34, "进入下载模式（自动失败时才需要）", size=20, weight=700)
s.box(40, 90, 180, 110, "电脑", "Chrome / esptool\n/ idf.py", "gray")
s.box(380, 70, 200, 150, "奶龙机器人", "电池已装\n电源开关：关", "yellow")
s.arrow(220, 145, 380, 145, "USB-C 数据线")
steps = ["① 关机，插好数据线", "② 按住 BOOT 键", "③ 打开电源开关", "④ 1 秒后松开 BOOT", "⑤ 开始烧录"]
for i, t in enumerate(steps):
    s.box(640, 62 + i * 44, 220, 36, t, None, "blue" if i < 4 else "green", size=14)
s.text(450, 280, "示意图。BOOT 键是主板上的贴片轻触按键（GPIO0）", size=12, color=C["gray"])
s.save(os.path.join(OUT, "boot-mode.svg"))
print("ok")

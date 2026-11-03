"""第 1 章 产品介绍的示意图。运行：python3 imgtools/diagrams_intro.py"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "intro")

# 1. 系统框图：机器人 ↔ xiaozhi.me
s = Svg(900, 400)
s.text(450, 34, "奶龙机器人系统框图", size=20, weight=700)
s.raw(f'<rect x="20" y="60" width="430" height="320" rx="14" fill="none" stroke="{C["yellow"]}" stroke-width="2" stroke-dasharray="6 5"/>')
s.text(235, 86, "奶龙机器人（ESP32-S3）", size=15, weight=600, color=C["orange"])
s.box(40, 110, 120, 60, "麦克风", "ICS-43434", "green")
s.box(40, 190, 120, 60, "喇叭", "MAX98357A", "green")
s.box(40, 270, 120, 60, "BOOT 键", "按一下=对话", "gray")
s.box(180, 150, 120, 140, "小智固件", "唤醒词\n音频编解码\n设备端 MCP", "yellow")
s.box(320, 110, 115, 60, "圆屏", "表情+字幕", "blue")
s.box(320, 190, 115, 60, "4 个舵机", "腿 ×2 脚 ×2", "blue")
s.box(320, 270, 115, 60, "电池", "充电检测", "gray")
for y in (140, 220):
    s.arrow(160, y, 180, y, both=True)
s.arrow(160, 300, 180, 270)
s.arrow(300, 170, 320, 140)
s.arrow(300, 220, 320, 220)
s.box(560, 90, 300, 260, "xiaozhi.me 云端", None, "blue", top_title=True)
s.box(590, 150, 240, 44, "语音识别 ASR", None, "gray", size=14)
s.box(590, 204, 240, 44, "大模型 + 角色人设", None, "gray", size=14)
s.box(590, 258, 240, 44, "语音合成 TTS", None, "gray", size=14)
s.arrow(450, 190, 560, 190, "Wi-Fi：语音上行")
s.arrow(560, 250, 450, 250, "回复语音 / 表情 / 动作指令", dy=20)
s.save(os.path.join(OUT, "system.svg"))

# 2. 引脚图
s = Svg(900, 470)
s.text(450, 34, "ESP32-S3 引脚分配（otto-robot 板型）", size=20, weight=700)
s.box(340, 70, 220, 360, "ESP32-S3", "N16R8\n16MB Flash\n8MB PSRAM", "yellow", size=20)
left = [("左腿舵机", "GPIO17", "blue"), ("左脚舵机", "GPIO18", "blue"), ("右腿舵机", "GPIO39", "blue"), ("右脚舵机", "GPIO38", "blue"),
        ("BOOT 键", "GPIO0", "gray"), ("充电检测", "GPIO21", "gray"), ("电池电压", "ADC2 CH3", "gray")]
for i, (n, p, c) in enumerate(left):
    y = 82 + i * 50
    s.box(30, y, 150, 38, n, None, c, size=14)
    s.arrow(180, y + 19, 340, y + 19, p)
right = [("麦克风 WS/SCK/DIN", "4 / 5 / 6", "green"), ("功放 DOUT/BCLK/LRCK", "7 / 15 / 16", "green"),
         ("屏幕 MOSI / CLK", "10 / 9", "orange"), ("屏幕 DC / RST / CS", "46 / 11 / 12", "orange"), ("屏幕背光", "3", "orange")]
for i, (n, p, c) in enumerate(right):
    y = 92 + i * 66
    s.box(700, y, 180, 40, n, None, c, size=13)
    s.arrow(560, y + 20, 700, y + 20, "GPIO " + p)
s.text(450, 458, "数据来自 main/boards/otto-robot/config.h；左手 / 右手舵机为 -1，奶龙版不使用", size=12, color=C["gray"])
s.save(os.path.join(OUT, "pinout.svg"))
print("ok")

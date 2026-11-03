"""第 6 章 二次开发的示意图。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "dev")

# 1. 一个动作从一句话到舵机
s = Svg(900, 300)
s.text(450, 34, "一句「跳个舞」是怎么变成舵机动作的", size=20, weight=700)
chain = [("你说话", "跳个舞", "gray"), ("xiaozhi.me 大模型", "决定调用\nself.otto.swing", "blue"),
         ("McpServer", "AddTool 注册的\n回调函数", "yellow"), ("QueueAction", "放进动作队列\n立即返回", "yellow"),
         ("动作任务", "otto_.Swing()\n结束后 Home()", "orange")]
for i, (t, sub, c) in enumerate(chain):
    x = 20 + i * 176
    s.box(x, 80, 150, 120, t, sub, c, size=15)
    if i:
        s.arrow(x - 26, 140, x, 140)
s.raw(f'<rect x="364" y="62" width="514" height="156" rx="14" fill="none" stroke="{C["yellow"]}" stroke-width="2" stroke-dasharray="6 5"/>')
s.text(620, 240, "机器人固件里（otto_controller.cc / otto_movements.cc）", size=13, color=C["orange"])
s.text(450, 280, "动作在单独的任务里执行，所以执行期间还能继续听你说话", size=12, color=C["gray"])
s.save(os.path.join(OUT, "action-chain.svg"))

# 2. 源码目录
s = Svg(900, 420)
s.text(450, 34, "奶龙固件源码里最常改的地方", size=20, weight=700)
rows = [
    ("main/boards/otto-robot/config.h", "引脚、屏幕参数", "gray"),
    ("main/boards/otto-robot/otto_controller.cc", "注册 MCP 工具、动作队列、校准", "yellow"),
    ("main/boards/otto-robot/otto_movements.cc", "每个动作的舵机轨迹", "yellow"),
    ("main/boards/otto-robot/kanshan_emotions.c", "看山表情和动作贴图（LVGL 图片）", "blue"),
    ("main/assets/common/*.ogg", "本地音效：奶龙大笑、动作音效", "green"),
    ("sdkconfig.defaults.otto", "默认配置：板型、唤醒词、Flash", "orange"),
    ("scripts/otto_master.py", "本地联调工具", "gray"),
]
for i, (path, desc, c) in enumerate(rows):
    y = 64 + i * 48
    s.box(40, y, 440, 38, path, None, c, size=13)
    s.text(500, y + 24, desc, size=14, anchor="start")
s.save(os.path.join(OUT, "source-map.svg"))
print("ok")

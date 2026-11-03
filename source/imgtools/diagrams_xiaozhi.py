"""第 5 章 xiaozhi 后台的示意图。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "xiaozhi")

# 1. 绑定流程
s = Svg(900, 260)
s.text(450, 34, "绑定设备：机器人和后台通过 6 位验证码配对", size=20, weight=700)
s.box(30, 80, 200, 110, "奶龙机器人", "联网后播报并显示\n6 位验证码", "yellow")
s.box(350, 80, 200, 110, "你", "听到 / 看到验证码", "gray")
s.box(670, 80, 200, 110, "xiaozhi.me 控制台", "智能体 → 添加设备\n输入验证码", "blue")
s.arrow(230, 135, 350, 135, "123456")
s.arrow(550, 135, 670, 135, "输入")
s.arrow(770, 190, 130, 225, None, dash=True)
s.text(450, 248, "绑定成功后，机器人自动进入待机，之后用的就是这个智能体的人设和声音", size=13, color=C["gray"])
s.save(os.path.join(OUT, "bind.svg"))

# 2. 人设 + 设备端 MCP 工具
s = Svg(900, 300)
s.text(450, 34, "人设怎么让奶龙做动作", size=20, weight=700)
s.box(30, 70, 250, 190, "角色介绍（人设）", "我是奶龙……\n听不懂就大笑\n高兴时摇摆\n打招呼时跳一下", "blue")
s.box(330, 100, 240, 130, "大模型", "读人设 + 你说的话\n决定说什么、做什么", "orange")
s.box(620, 70, 250, 190, "机器人上的 MCP 工具", "self.otto.laugh\nself.otto.walk_forward\nself.otto.swing\nself.otto.jump …", "yellow")
s.arrow(280, 165, 330, 165)
s.arrow(570, 165, 620, 165, "调用工具")
s.text(450, 288, "工具由固件在连接时自动上报，后台不需要手动添加；人设只负责告诉大模型什么时候用", size=12, color=C["gray"])
s.save(os.path.join(OUT, "role-mcp.svg"))
print("ok")

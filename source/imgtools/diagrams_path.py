"""学习路线图（Task0～Task5）。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "intro")
s = Svg(900, 330)
s.text(450, 34, "奶龙养成路线：6 个任务，一个周末", size=20, weight=700)
tasks = [("Task 0", "学前须知", "10 分钟", "gray"), ("Task 1", "把奶龙装起来", "1～3 小时", "yellow"),
         ("Task 2", "让它亮起来", "10～40 分钟", "orange"), ("Task 3", "让它站直、会说话", "30 分钟", "blue"),
         ("Task 4", "给它一个灵魂", "20 分钟", "blue"), ("Task 5", "教它新本领", "1 小时起", "green")]
for i, (t, name, tm, c) in enumerate(tasks):
    x = 20 + (i % 3) * 300
    y = 70 if i < 3 else 200
    s.box(x, y, 250, 96, f"{t} · {name}", "预计 " + tm, c, size=15)
    if i % 3:
        s.arrow(x - 50, y + 48, x, y + 48)
s.arrow(770, 166, 145, 200, None, dash=True)
s.text(450, 318, "做完 Task 5 别忘了「晒出你的奶龙」：发到知乎，把经验留给下一个人", size=13, color=C["orange"])
s.save(os.path.join(OUT, "learning-path.svg"))
print("ok")

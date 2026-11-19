"""第 6 章 原理篇的示意图：编译流程、FreeRTOS 任务、两种传输协议。"""
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from svgkit import Svg, C

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "img", "dev")

# 1. idf.py build 背后
s = Svg(900, 400)
s.text(450, 34, "奶龙专用构建脚本背后做了什么", size=20, weight=700)
steps = [("build_nailong.py", "选奶龙变体与配置\n调度 ESP-IDF", "yellow"),
         ("CMake 配置", "读 CMakeLists.txt\n合并 sdkconfig\n找齐所有组件", "blue"),
         ("生成 build.ninja", "根据当前配置\n生成构建规则", "blue"),
         ("Ninja 并行编译", "编译实际选中的文件\n输出组件库", "green"),
         ("链接 + 打包", "xiaozhi.bin\ngenerated_assets.bin", "orange")]
for i, (t, sub, c) in enumerate(steps):
    x = 20 + i * 176
    s.box(x, 80, 150, 130, t, sub, c, size=15)
    if i:
        s.arrow(x - 26, 145, x, 145)
s.box(170, 260, 250, 76, "输入", "板型 config.json · 构建覆盖项\nidf_component.yml · dependencies.lock", "gray", size=14)
s.box(480, 260, 250, 76, "输出 build/", "bootloader · 分区表 · xiaozhi.bin\ngenerated_assets.bin · flash_args", "gray", size=14)
s.arrow(295, 260, 295, 214, dash=True)
s.arrow(715, 214, 605, 260, dash=True)
s.text(450, 372, "第二次 idf.py build 只重编改过的文件：Ninja 比较时间戳，CMake 只在 CMakeLists 或 sdkconfig 变了时重跑", size=12, color=C["gray"])
s.save(os.path.join(OUT, "build-pipeline.svg"))

# 2. 任务图
s = Svg(900, 520)
s.text(450, 34, "奶龙固件里的主要 FreeRTOS 任务", size=20, weight=700)
s.text(450, 58, "事件、队列和完成回调负责协调；具体优先级以当前源码为准", size=13, color=C["gray"])
tasks = [
    (40, 90, "音频采集", "读麦克风 · 唤醒词 · VAD\n处理识别事件", "red"),
    (40, 220, "音频编解码", "Opus 编码 / 解码\n处理音频队列", "orange"),
    (40, 350, "音频播放", "解码后的声音\n送给功放", "red"),
    (620, 90, "应用主循环", "等事件组 · 管状态机\n收发网络消息", "yellow"),
    (620, 220, "动作任务", "从动作队列取动作\n插值驱动 4 个舵机", "blue"),
    (620, 350, "本地笑声任务", "场景图 · 播放与中断\n完成后回复工具", "blue"),
]
for x, y, t, sub, c in tasks:
    s.box(x, y, 240, 90, t, sub, c, size=15)
s.box(350, 150, 200, 70, "事件组", "SEND_AUDIO · WAKE_WORD\nVAD · SCHEDULE · CLOCK", "gray", size=14)
s.box(350, 290, 200, 70, "队列", "动作请求队列\n笑声请求与完成回调", "gray", size=14)
s.arrow(280, 135, 350, 175, "置位")
s.arrow(550, 175, 620, 135, "唤醒")
s.arrow(280, 265, 350, 195, "编码好一包")
s.arrow(660, 180, 520, 290)
s.text(560, 262, "MCP 回调", size=12, color=C["gray"], anchor="end")
s.arrow(550, 315, 620, 265)
s.arrow(550, 340, 620, 390)
s.text(450, 384, "xQueueReceive 取出", size=12, color=C["gray"])
s.text(450, 480, "规则：网络和状态只在 main_event_loop 里改；别的任务想动它们，就用 Schedule() 把一段代码排进主循环", size=13, color=C["orange"])
s.save(os.path.join(OUT, "freertos-tasks.svg"))

# 3. 两种协议对比
s = Svg(900, 470)
s.text(450, 34, "两种传输方式：控制消息和声音走不走同一条路", size=20, weight=700)
def side(x0, title, ctrl, audio, color):
    s.text(x0 + 200, 74, title, size=17, weight=700, color=C[color])
    s.box(x0, 96, 110, 300, "奶龙", "ESP32-S3", "yellow", size=15)
    s.box(x0 + 300, 96, 110, 300, "服务器", "xiaozhi.me\n或自建", "gray", size=15)
    for i, (y, lab, c, dash) in enumerate(ctrl + audio):
        s.arrow(x0 + 114, y, x0 + 296, y, None, color=c, dash=dash, both=True)
        s.text(x0 + 205, y - 10, lab, size=12, color=C["gray"])
side(20, "MQTT + UDP", [(150, "MQTT：JSON 控制消息", "line", False)],
     [(250, "UDP：加密的 Opus 声音", "red", True), (330, "hello 时下发 UDP 地址和密钥", "line", False)], "blue")
side(460, "WebSocket", [(150, "文本帧：JSON 控制消息", "line", False)],
     [(250, "二进制帧：Opus 声音", "red", True), (330, "同一条连接，wss 走 TLS", "line", False)], "green")
s.text(450, 440, "实线 = 控制消息（JSON），虚线 = 声音（Opus，60 ms 一帧）", size=13, color=C["gray"])
s.save(os.path.join(OUT, "protocol-compare.svg"))

# 4. UDP 包结构
s = Svg(900, 230)
s.text(450, 34, "UDP 声音包的前 16 字节（同时也是 AES-CTR 的计数器）", size=18, weight=700)
fields = [("type", "1", 60), ("flags", "1", 60), ("payload_len", "2", 110), ("ssrc", "4", 150),
          ("timestamp", "4", 150), ("sequence", "4", 150)]
x = 40
for name, n, w in fields:
    s.box(x, 70, w, 70, name, f"{n} 字节", "blue", r=4, size=14)
    x += w
s.box(x, 70, 900 - 40 - x, 70, "Opus 密文", "payload_len 字节", "orange", r=4, size=14)
s.text(450, 175, "服务器在 hello 里给出 key 和 nonce；设备每发一包，把长度、时间戳和自增序号写进 nonce 再加密", size=13, color=C["gray"])
s.text(450, 200, "接收端用同样的 16 字节解密，并检查 sequence 防止重放", size=13, color=C["gray"])
s.save(os.path.join(OUT, "udp-packet.svg"))
print("ok")

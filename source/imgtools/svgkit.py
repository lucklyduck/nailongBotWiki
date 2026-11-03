"""手写示意图用的小工具：统一配色、字体、圆角。"""
from xml.sax.saxutils import escape

FONT = "PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif"
C = {
    "yellow": "#f7c600", "yellow_bg": "#fff6cc", "blue": "#2f8fe0", "blue_bg": "#e3f0fc",
    "gray": "#5b6472", "gray_bg": "#f1f3f5", "green": "#2e9e5b", "green_bg": "#e2f5ea",
    "red": "#d64545", "red_bg": "#fde8e8", "orange": "#e08c02", "orange_bg": "#fff0d6",
    "ink": "#1d2330", "line": "#8a93a3",
}


class Svg:
    def __init__(self, w, h):
        self.w, self.h, self.items = w, h, []

    def box(self, x, y, w, h, title, sub=None, color="blue", r=10, size=16, top_title=False):
        fill, stroke = C[color + "_bg"], C[color]
        self.items.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>')
        lines = sub.split("\n") if sub else []
        block = size + len(lines) * 17 + (6 if lines else 0)
        top = y + (h - block) / 2 if not top_title else y + 10
        self.text(x + w / 2, top + size * 0.85, title, size=size, weight=600)
        for i, line in enumerate(lines):
            self.text(x + w / 2, top + size + 6 + 13 + i * 17, line, size=13, color=C["gray"])

    def text(self, x, y, s, size=14, weight=400, color=None, anchor="middle"):
        self.items.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color or C["ink"]}" text-anchor="{anchor}" font-family="{FONT}">{escape(s)}</text>')

    def arrow(self, x1, y1, x2, y2, label=None, color="line", dash=False, both=False, dy=-8):
        d = ' stroke-dasharray="6 5"' if dash else ""
        ms = ' marker-start="url(#arrs)"' if both else ""
        self.items.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{C[color]}" stroke-width="2"{d} marker-end="url(#arr)"{ms}/>')
        if label:
            self.text((x1 + x2) / 2, (y1 + y2) / 2 + dy, label, size=12, color=C["gray"])

    def raw(self, s):
        self.items.append(s)

    def save(self, path):
        head = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" width="{self.w}" height="{self.h}">'
                '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{C["line"]}"/></marker>'
                '<marker id="arrs" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto">'
                f'<path d="M10,0 L0,5 L10,10 z" fill="{C["line"]}"/></marker></defs>'
                f'<rect width="{self.w}" height="{self.h}" fill="#ffffff"/>')
        open(path, "w").write(head + "".join(self.items) + "</svg>")

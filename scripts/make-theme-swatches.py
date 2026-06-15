#!/usr/bin/env python3
"""Build public/theme-swatches.png: the 14 Leaf color schemes.

Each scheme is a card in its page background with a centered Leaf-shaped pill (the
launcher's directional pill: rounded top-left + bottom-right only) holding the
scheme name in its on-pill text color - i.e. a "selected row" preview. Seven rows,
dark column left, light column right. Transparent background so it reads on either
a light or dark docs page. Run from leaf-docs root: python3 scripts/make-theme-swatches.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "../Catastrophe/res/fonts/Nunito/Nunito-Bold.ttf")
OUT = os.path.join(ROOT, "public/theme-swatches.png")

# (name, page bg, selection pill, on-pill text), dark left / light right, spectrum order.
rows = [
 (("Rose","#1C1620","#EB6F92","#1C1620"),       ("Petal","#DEC9D0","#E886A4","#3A2630")),
 (("Ember","#1A1413","#FF8A4C","#1A1413"),       ("Apricot","#E6D2B0","#EE9F54","#332518")),
 (("Goldenrod","#15120A","#E8C24A","#15120A"),   ("Wheat","#ECE6C2","#CDB23E","#332C12")),
 (("Leaf","#0F160E","#7FB069","#0F160E"),         ("Meadow","#D1D0A6","#7FB069","#1B2E1B")),
 (("Tide","#0D1620","#4FA3E0","#0D1620"),         ("Sky","#BFCED7","#6FA8DC","#1B2A33")),
 (("Indigo","#131426","#818CF5","#131426"),       ("Periwinkle","#CFCFE2","#8088E6","#22243A")),
 (("Orchid","#181226","#C792EA","#181226"),       ("Lavender","#D2C9DC","#BE8FE2","#2A2238")),
]
S = 2
W = 1000 * S
CW, CH = 440 * S, 84 * S
MX, GAP, TOP, PITCH = 40 * S, 40 * S, 30 * S, 104 * S
DX, LX = MX, MX + CW + GAP
H = TOP + len(rows) * PITCH + 30 * S - (PITCH - CH)

img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
font = ImageFont.truetype(FONT, 27 * S)


def card(x, y, c):
    name, bg, sel, txt = c
    d.rounded_rectangle([x, y, x + CW, y + CH], radius=14 * S, fill=bg,
                        outline=(136, 136, 136, 60), width=S)
    bb = d.textbbox((0, 0), name, font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    pw, ph = tw + 36 * S, th + 22 * S
    px, py = x + (CW - pw) / 2, y + (CH - ph) / 2
    # Leaf pill: round top-left + bottom-right corners only.
    d.rounded_rectangle([px, py, px + pw, py + ph], radius=ph / 2, fill=sel,
                        corners=(True, False, True, False))
    d.text((px + (pw - tw) / 2 - bb[0], py + (ph - th) / 2 - bb[1]), name, font=font, fill=txt)


for i, (dk, lt) in enumerate(rows):
    y = TOP + i * PITCH
    card(DX, y, dk)
    card(LX, y, lt)

img.save(OUT, "PNG")
print("wrote", OUT, img.size)

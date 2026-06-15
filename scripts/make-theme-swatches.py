#!/usr/bin/env python3
"""Build public/theme-swatches.png: the 14 Leaf color schemes as paired swatches.

Seven spectrum rows (R-O-Y-G-B-I-V), dark scheme left, light right, each a mini
card in its own colors (page bg, theme text for the name, selection pill). Labels
use a mid gray so the figure reads on either a light or dark docs page.
Transparent background. Run from leaf-docs root: python3 scripts/make-theme-swatches.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "../Catastrophe/res/fonts/Nunito/Nunito-Bold.ttf")
OUT = os.path.join(ROOT, "public/theme-swatches.png")

# (family, dark(name,bg,text,sel), light(name,bg,text,sel))
rows = [
 ("Red",    ("Rose","#1C1620","#F0E6EC","#EB6F92"),      ("Petal","#DEC9D0","#3A2630","#E886A4")),
 ("Orange", ("Ember","#1A1413","#F2EAE2","#FF8A4C"),     ("Apricot","#E6D2B0","#332518","#EE9F54")),
 ("Yellow", ("Goldenrod","#15120A","#F2EEDD","#E8C24A"), ("Wheat","#ECE6C2","#332C12","#CDB23E")),
 ("Green",  ("Leaf","#0F160E","#E8F1E3","#7FB069"),      ("Meadow","#D1D0A6","#1B2E1B","#7FB069")),
 ("Blue",   ("Tide","#0D1620","#E2EEF4","#4FA3E0"),      ("Sky","#BFCED7","#1B2A33","#6FA8DC")),
 ("Indigo", ("Indigo","#131426","#E6E7F4","#818CF5"),    ("Periwinkle","#CFCFE2","#22243A","#8088E6")),
 ("Violet", ("Orchid","#181226","#ECE4F2","#C792EA"),    ("Lavender","#D2C9DC","#2A2238","#BE8FE2")),
]
S = 2  # render at 2x for crisp display
GRAY = "#888888"
W = 1040 * S
ROW_H, PITCH = 72 * S, 86 * S
TOP = 66 * S
H = TOP + len(rows) * PITCH + 24 * S
DX, EX, LX, CW = 150 * S, 572 * S, 590 * S, 405 * S

img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
name_f = ImageFont.truetype(FONT, 26 * S)
lab_f = ImageFont.truetype(FONT, 22 * S)


def card(x, y, c):
    name, bg, text, sel = c
    d.rounded_rectangle([x, y, x + CW, y + ROW_H], radius=12 * S, fill=bg, outline=sel, width=S)
    d.text((x + 20 * S, y + 16 * S), name, font=name_f, fill=text)
    d.rounded_rectangle([x + 20 * S, y + 44 * S, x + 92 * S, y + 64 * S], radius=10 * S, fill=sel)


def ctr(x, y, txt, font, fill):
    bb = d.textbbox((0, 0), txt, font=font)
    d.text((x - (bb[2] - bb[0]) / 2, y), txt, font=font, fill=fill)


ctr(DX + CW / 2, 30 * S, "dark", lab_f, GRAY)
ctr(LX + CW / 2, 30 * S, "light", lab_f, GRAY)
for i, (fam, dk, lt) in enumerate(rows):
    y = TOP + i * PITCH
    d.text((30 * S, y + 24 * S), fam, font=lab_f, fill=GRAY)
    card(DX, y, dk)
    ctr(EX, y + 22 * S, "≈", name_f, GRAY)
    card(LX, y, lt)

img.save(OUT, "PNG")
print("wrote", OUT, img.size)

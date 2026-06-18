#!/usr/bin/env python3
"""Build the Leaf social card (1280x640) for link previews and the repo READMEs.

Horizontal layout, on-brand with the landing hero: dark green-black field, a soft
green glow behind the leaf mark, the leaf on the left, then the Leaf wordmark and a
two-line tagline on the right. One image is shared by both the docs Open Graph card
(leaf-docs/public/og.png) and the Leaf repo's README banner
(Leaf/.github/social-preview.png). Run from the leaf-docs root: `python3 scripts/make-og.py`.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEAF = os.path.join(ROOT, "src/assets/leaf.png")
FONT = os.path.join(ROOT, "../Catastrophe/res/fonts/Nunito/Nunito-Bold.ttf")
OUTPUTS = [
    os.path.join(ROOT, "public/og.png"),
    os.path.join(ROOT, "../Leaf/.github/social-preview.png"),
]

W, H = 1280, 640
BG    = (14, 22, 13)
TITLE = (232, 241, 227)   # off-white wordmark
GREEN = (160, 203, 135)   # subtitle
GRAY  = (126, 149, 121)   # tagline

base = Image.new("RGB", (W, H), BG)

# Soft green glow behind the leaf: a wide, flat blob in the gap between the leaf
# and the text, fading to near-black at the corners and the right edge.
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
gcx, gcy, ghw, ghh = 440, 345, 500, 180
gd.ellipse([gcx - ghw, gcy - ghh, gcx + ghw, gcy + ghh], fill=(84, 176, 86, 200))
glow = glow.filter(ImageFilter.GaussianBlur(170))
base = Image.alpha_composite(base.convert("RGBA"), glow).convert("RGB")

# Leaf mark: crop to its visible content, scale so the content is 326px, center left.
mark = Image.open(LEAF).convert("RGBA")
mark = mark.crop(mark.getbbox())
scale = 326 / max(mark.size)
mark = mark.resize((round(mark.size[0] * scale), round(mark.size[1] * scale)), Image.LANCZOS)
base.paste(mark, (293 - mark.size[0] // 2, 345 - mark.size[1] // 2), mark)

draw = ImageDraw.Draw(base)


def fit_width(text, target_w, lo=10, hi=240):
    """Largest Nunito-Bold size whose rendered width fits target_w (keeps the
    three lines at their original widths regardless of exact glyph metrics)."""
    while lo < hi:
        mid = (lo + hi + 1) // 2
        b = draw.textbbox((0, 0), text, font=ImageFont.truetype(FONT, mid))
        lo, hi = (mid, hi) if (b[2] - b[0]) <= target_w else (lo, mid - 1)
    return ImageFont.truetype(FONT, lo)


def draw_inktop(text, font, left, inktop, fill):
    """Draw so the ink's top-left lands at (left, inktop), ignoring font padding."""
    b = draw.textbbox((0, 0), text, font=font)
    draw.text((left - b[0], inktop - b[1]), text, font=font, fill=fill)


title_txt = "Leaf"
sub_txt   = "Custom firmware for the Miniloong Pocket 1"
tag_txt   = "themeable  ·  app-driven  ·  runs on top of stock"

draw_inktop(title_txt, fit_width(title_txt, 301), 599, 234, TITLE)
draw_inktop(sub_txt,   fit_width(sub_txt,   627), 591, 377, GREEN)
draw_inktop(tag_txt,   fit_width(tag_txt,   632), 590, 424, GRAY)

for out in OUTPUTS:
    os.makedirs(os.path.dirname(out), exist_ok=True)
    base.save(out, "PNG")
    print("wrote", out, base.size)

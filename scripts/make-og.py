#!/usr/bin/env python3
"""Build the Open Graph social card (public/og.png, 1200x630) for link previews.

On-brand with the landing hero: dark green-black field, a soft green glow behind
the leaf mark, the Leaf wordmark, and a one-line tagline. Run from the leaf-docs
root: `python3 scripts/make-og.py`.
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LEAF = os.path.join(ROOT, "src/assets/leaf.png")
FONT = os.path.join(ROOT, "../Catastrophe/res/fonts/Nunito/Nunito-Bold.ttf")
OUT = os.path.join(ROOT, "public/og.png")

W, H = 1200, 630
BG = (12, 17, 13)
GREEN = (167, 224, 160)      # soft-green wordmark
TAG = (203, 214, 205)        # light tagline
PILL = (124, 152, 130)       # dim sub-line

base = Image.new("RGB", (W, H), BG)

# Soft green glow behind the mark.
glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
gd = ImageDraw.Draw(glow)
cx, cy = W // 2, 215
gd.ellipse([cx - 340, cy - 280, cx + 340, cy + 280], fill=(86, 176, 108, 115))
glow = glow.filter(ImageFilter.GaussianBlur(120))
base = Image.alpha_composite(base.convert("RGBA"), glow).convert("RGB")

# Leaf mark.
mark = Image.open(LEAF).convert("RGBA")
sz = 230
mark = mark.resize((sz, sz), Image.LANCZOS)
base.paste(mark, ((W - sz) // 2, 48), mark)

draw = ImageDraw.Draw(base)
title_font = ImageFont.truetype(FONT, 108)
tag_font = ImageFont.truetype(FONT, 36)
pill_font = ImageFont.truetype(FONT, 27)


def centered(text, font, y, fill):
    box = draw.textbbox((0, 0), text, font=font)
    draw.text(((W - (box[2] - box[0])) // 2 - box[0], y), text, font=font, fill=fill)


centered("Leaf", title_font, 300, GREEN)
centered("Custom firmware for the Miniloong Pocket 1", tag_font, 446, TAG)
centered("themeable  ·  app-driven  ·  recoverable", pill_font, 512, PILL)

base.save(OUT, "PNG")
print("wrote", OUT, base.size)

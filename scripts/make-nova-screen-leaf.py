#!/usr/bin/env python3
"""Generate public/nova/screen_leaf.png — the Retroid leaf pre-warped into the Nova render's screen.

The illustrated Nova sits at an angle, so its screen is a perspective quad rather than a
rectangle (scanning the mask gives row widths 61 -> 736 -> 57). Anything drawn there has
to be warped to match, which is why the existing on-screen assets (rise.png,
bleepbloop.png) are full-frame 2048 images rather than logos placed at runtime — canvas
can only do affine transforms, so the perspective has to be baked in.

This reads the screen quad straight off masks/screen.png, so it stays correct if the
mask is ever re-cut: the mask is a clean quad (area within 2% of its corner polygon) and
its corners are the extreme points in each axis.

    python3 scripts/make-nova-screen-leaf.py
"""
import numpy as np
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
NOVA = ROOT / 'public/nova'
SIZE = 2048
CONTAIN = 0.70        # logo fills this much of the screen's short side


def screen_quad(alpha):
    """Corners of the screen quad, in device order: TL, TR, BR, BL."""
    m = alpha > 128
    ys, xs = np.where(m)
    at = lambda i: (int(xs[i]), int(ys[i]))
    top, bottom = at(ys.argmin()), at(ys.argmax())
    left, right = at(xs.argmin()), at(xs.argmax())
    # The long edge is the screen's width. left->top is long on this render, so the
    # device-space top edge runs left -> top.
    edge = lambda a, b: ((a[0]-b[0])**2 + (a[1]-b[1])**2) ** 0.5
    if edge(left, top) >= edge(top, right):
        return left, top, right, bottom
    return top, right, bottom, left


def perspective_coeffs(dst, src):
    """PIL wants the DEST->SRC homography for Image.PERSPECTIVE."""
    A, b = [], []
    for (dx, dy), (sx, sy) in zip(dst, src):
        A.append([dx, dy, 1, 0, 0, 0, -dx*sx, -dy*sx]); b.append(sx)
        A.append([0, 0, 0, dx, dy, 1, -dx*sy, -dy*sy]); b.append(sy)
    return np.linalg.solve(np.array(A, float), np.array(b, float))


def main():
    mask = Image.open(NOVA / 'masks/screen.png').convert('RGBA').getchannel('A')
    TL, TR, BR, BL = screen_quad(np.asarray(mask))
    edge = lambda a, b: ((a[0]-b[0])**2 + (a[1]-b[1])**2) ** 0.5
    W, H = round(edge(TL, TR)), round(edge(TR, BR))
    print(f'screen quad TL{TL} TR{TR} BR{BR} BL{BL} -> {W}x{H} in its own plane')

    # Lay the logo out flat on the screen's own plane, then warp that whole panel.
    panel = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    logo = Image.open(NOVA / 'real/retroid_leaf.png').convert('RGBA')
    s = min(W * CONTAIN / logo.width, H * CONTAIN / logo.height)
    lw, lh = int(logo.width * s), int(logo.height * s)
    panel.paste(logo.resize((lw, lh), Image.LANCZOS), ((W - lw) // 2, (H - lh) // 2))

    coeffs = perspective_coeffs([TL, TR, BR, BL], [(0, 0), (W, 0), (W, H), (0, H)])
    warped = panel.transform((SIZE, SIZE), Image.PERSPECTIVE, coeffs, Image.BICUBIC)

    # Clip to the screen so a bicubic edge can't bleed onto the bezel.
    a = np.asarray(warped.getchannel('A')).astype(float)
    a *= np.asarray(mask).astype(float) / 255.0
    warped.putalpha(Image.fromarray(a.astype('uint8')))

    out = NOVA / 'screen_leaf.png'
    warped.save(out)
    print(f'wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    main()

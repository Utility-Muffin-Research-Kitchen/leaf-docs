#!/usr/bin/env python3
"""Check a hand-painted Mangmi part mask before the studio tries to use it.

The studio reads ONE mask per angle from public/mangmi/air_mask/. Paint each part's
region in that part's flat ID color and let the alpha channel carry the shape; the
studio's splitMask() sorts every painted pixel to the nearest ID and crops each part to
its own bounding box. The rules that matter:

  * one flat ID color per part, straight from the table below
  * alpha is the shape — anti-aliased edges are fine and keep their softness
  * no two parts overlapping (a pixel can only belong to one part)

A color that isn't in the table won't error, it will silently snap to whichever ID is
nearest — which is exactly the bug this script exists to catch.

    python3 scripts/check-mangmi-mask.py                       # check every mask
    python3 scripts/check-mangmi-mask.py air_front_mask.png    # check one
    python3 scripts/check-mangmi-mask.py --fix                 # normalize in place
    python3 scripts/check-mangmi-mask.py --legend              # print the color table

--fix rewrites each mask so every painted pixel is fully opaque and sits on an exact ID
color. Selection tools leave stray 75-99% alpha along an edge, which composites as a
faint seam on that part and nowhere else; snapping the color removes any drift that
would otherwise silently classify to a neighbouring part.
"""
import sys
import numpy as np
from pathlib import Path
from PIL import Image

MASKS = Path(__file__).resolve().parent.parent / 'public/mangmi/air_mask'

# Part key -> ID color. Must stay in sync with MASK_ID in MangmiStudio.astro.
ID = {
    'dpad':          (255,   0,   0),
    'abxy':          (  0, 255,   0),
    'start':         (  0,   0, 255),
    'home':          (255, 255,   0),
    'stick_left':    (255,   0, 255),
    'stick_right':   (  0, 255, 255),
    'bumper_left':   (255, 128,   0),
    'bumper_right':  (128,   0, 255),
    'power':         (  0, 255, 128),
    'volume':        (255,   0, 128),
    'screen':        (128, 128, 128),
    'trigger_left':  (128, 255,   0),
    'trigger_right': (  0, 128, 255),
}
TOLERANCE = 12          # per-channel slop allowed before a pixel counts as off-palette


def legend():
    print('part            ID color        hex')
    for k, (r, g, b) in ID.items():
        print(f'{k:15s} {r:3d},{g:3d},{b:3d}     #{r:02X}{g:02X}{b:02X}')


def check(path):
    im = Image.open(path).convert('RGBA')
    a = np.asarray(im).astype(int)
    print(f'{path.name}  {im.size[0]}x{im.size[1]}')
    if im.size != (2000, 2000):
        print('  !! not 2000x2000 — it will not line up with the renders')

    painted = a[:, :, 3] > 0
    if not painted.any():
        print('  !! nothing painted')
        return
    rgb = a[painted][:, 0:3]

    keys = list(ID)
    ids = np.array([ID[k] for k in keys])
    dist = np.abs(rgb[:, None, :] - ids[None, :, :]).max(2)   # per-channel worst case
    nearest = dist.argmin(1)
    off = dist.min(1) > TOLERANCE

    ys, xs = np.where(painted)
    for i, k in enumerate(keys):
        sel = nearest == i
        n = int(sel.sum())
        if not n:
            continue
        px, py = xs[sel], ys[sel]
        soft = int((a[painted][sel][:, 3] < 255).sum())
        print(f'  {k:15s} {n:7d}px  bbox {px.min():4d},{py.min():4d} -> {px.max():4d},{py.max():4d}'
              f'  ({soft} soft-edge)')

    if off.any():
        bad = rgb[off]
        uniq = np.unique(bad, axis=0)[:6]
        print(f'  !! {int(off.sum())}px are not within {TOLERANCE} of any ID color — '
              f'they will snap to the nearest part anyway')
        for c in uniq:
            print(f'     stray #{c[0]:02X}{c[1]:02X}{c[2]:02X}')
    else:
        print('  all painted pixels sit on a known ID color')


def fix(path):
    """Snap every painted pixel to full opacity and its exact ID color."""
    im = Image.open(path).convert('RGBA')
    a = np.asarray(im).astype(int).copy()
    painted = a[:, :, 3] > 0
    if not painted.any():
        print(f'{path.name}: nothing painted')
        return

    keys = list(ID)
    ids = np.array([ID[k] for k in keys])
    rgb = a[painted][:, 0:3]
    nearest = np.abs(rgb[:, None, :] - ids[None, :, :]).max(2).argmin(1)

    soft = int((a[painted][:, 3] < 255).sum())
    drift = int((rgb != ids[nearest]).any(1).sum())

    out = a[painted]
    out[:, 0:3] = ids[nearest]
    out[:, 3] = 255
    a[painted] = out
    Image.fromarray(a.astype(np.uint8), 'RGBA').save(path)
    print(f'{path.name}: {soft}px raised to opaque, {drift}px snapped to an exact ID color')


def main():
    args = [a for a in sys.argv[1:] if a != '--fix']
    if '--legend' in sys.argv[1:]:
        legend()
        return
    files = [MASKS / a for a in args] if args else sorted(MASKS.glob('*.png'))
    if '--fix' in sys.argv[1:]:
        for f in files:
            if f.exists():
                fix(f)
        print()
    if not files:
        print(f'no masks in {MASKS}')
        return
    for f in files:
        if not f.exists():
            print(f'{f.name}: missing')
            continue
        check(f)


if __name__ == '__main__':
    main()

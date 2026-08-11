#!/usr/bin/env python3
"""Build the Air Y / Air Y Pro studio assets from the raw exports.

NOTE: the inputs are NOT in the repo. Only the built outputs live in public/mangmi/
air_y/ - the raw per-part masks, the green-screen background and the source PNGs were
deleted after building, matching how air_mask/ and max_mask/ ship only packed results.
To re-run this, drop the exports back into that folder first:
    air_y_{screen,dpad,abxy,select_start,stick,stick_right,background}_mask.png
    air_y_{black,white}.png, air_y_pro_{black,white}.png
(the "white" files are the Retro GB colorway; the output is renamed accordingly).

The other Mangmi devices ship one mask per angle: every region painted a flat ID
colour, alpha carrying the shape, no two regions overlapping. splitMask() in
MangmiStudio.astro cuts it back into bbox-cropped stencils at load, which is what
keeps the studio at ~3 MB of masks instead of ~170 MB. The Air Y was exported the
other way - one file per part, all the same green - so this repacks them.

The two variants are pixel-identical apart from the sticks (device bbox matches
exactly, and the Pro's right stick mirrors the left), so they share every mask
except which stick regions get painted:

    Air Y      one stick   -> stick_main   ("Analog stick")
    Air Y Pro  two sticks  -> stick_left + stick_right

Colourways are Black and Retro GB (the cream-and-maroon DMG homage). Renders go
to WebP q92 like every other device; masks stay lossless PNG, because lossy would
smear ID colours across region boundaries and mis-assign edge pixels.
"""
import sys
from PIL import Image

SRC = 'public/mangmi/air_y'
ALPHA_MIN = 8

SHARED = [
    ('screen', 'screen',       (128, 128, 128)),
    ('dpad',   'dpad',         (255,   0,   0)),
    ('abxy',   'abxy',         (  0, 255,   0)),
    ('start',  'select_start', (  0,   0, 255)),
]
VARIANTS = {
    'air_y_front_mask.png':     SHARED + [('stick_main',  'stick',       (200,   0, 255))],
    'air_y_pro_front_mask.png': SHARED + [('stick_left',  'stick',       (255,   0, 255)),
                                          ('stick_right', 'stick_right', (  0, 255, 255))],
}
RENDERS = [('air_y_black', 'air_y_black'), ('air_y_retro_gb', 'air_y_white'),
           ('air_y_pro_black', 'air_y_pro_black'), ('air_y_pro_retro_gb', 'air_y_pro_white')]


def pack(out_name, parts):
    base, claimed, overlaps = None, {}, 0
    for key, suffix, rgb in parts:
        im = Image.open(f'{SRC}/air_y_{suffix}_mask.png').convert('RGBA')
        if base is None:
            base = Image.new('RGBA', im.size, (0, 0, 0, 0))
        elif im.size != base.size:
            sys.exit(f'{suffix}: {im.size} does not match {base.size}')
        src, dst = im.load(), base.load()
        w, h = im.size
        for y in range(h):
            for x in range(w):
                a = src[x, y][3]
                if a < ALPHA_MIN:
                    continue
                if (x, y) in claimed:
                    overlaps += 1
                claimed[(x, y)] = key
                dst[x, y] = (*rgb, a)     # flat ID colour, shape carried by alpha
    if overlaps:
        sys.exit(f'ABORT: {overlaps} overlapping px in {out_name} - regions must be disjoint')
    base.save(f'{SRC}/{out_name}', optimize=True)
    print(f'  {out_name:26s} {len(parts)} regions, {len(claimed)} px')


def background():
    """Cut the backdrop out of the green-screen export.

    A background mask must paint ONLY the backdrop - the studio punches it with
    destination-out, so anything painted over the device erases the device. This
    export is a full render on chroma green rather than a flat silhouette, so key
    on how green a pixel is. The soft ramp keeps the anti-aliased outline instead
    of stair-stepping it; a hard threshold leaves a jagged halo.
    """
    src = Image.open(f'{SRC}/air_y_background_mask.png').convert('RGBA')
    out = Image.new('RGBA', src.size, (0, 0, 0, 0))
    sp, op_ = src.load(), out.load()
    w, h = src.size
    GREEN = (96, 216, 56)
    NEAR, FAR = 40.0, 110.0      # <=NEAR is pure backdrop, >=FAR is device

    painted = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = sp[x, y]
            if a < ALPHA_MIN:
                continue
            d = ((r - GREEN[0]) ** 2 + (g - GREEN[1]) ** 2 + (b - GREEN[2]) ** 2) ** 0.5
            if d <= NEAR:
                av = 255
            elif d >= FAR:
                av = 0
            else:
                av = int(round((1.0 - (d - NEAR) / (FAR - NEAR)) * 255))
            if av:
                op_[x, y] = (255, 255, 255, av)
                painted += 1
    out.save(f'{SRC}/background_mask.png', optimize=True)
    print(f'  background_mask.png        backdrop {painted * 100 // (w * h)}% of frame')


def renders():
    for out_name, src_name in RENDERS:
        im = Image.open(f'{SRC}/{src_name}.png').convert('RGB')
        im.save(f'{SRC}/{out_name}.webp', 'WEBP', quality=92, method=6)
        print(f'  {out_name + ".webp":26s} from {src_name}.png')


if __name__ == '__main__':
    print('masks:')
    for name, parts in VARIANTS.items():
        pack(name, parts)
    background()
    print('renders:')
    renders()

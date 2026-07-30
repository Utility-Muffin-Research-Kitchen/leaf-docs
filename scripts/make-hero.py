#!/usr/bin/env python3
"""Build the animated MLP1 hero for the leaf-docs landing page.

Composites live launcher screenshots into the device photo's screen, wraps the
device in a breathing green halo, and plays a boot splash (leaf logo + glow +
LED stick-ring) that fades into a cycle of UI screens. Output is a looped,
alpha-transparent WebP served raw from public/ (Astro's optimizer is bypassed
for animated images).

Screens are captured off the device with hints OFF (see the leaf-docs-hero
recipe). Re-run after UI changes; pass --preview to only dump key still frames.
"""
import argparse
import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = "/Users/htpc/Projects/miniloong-cfw"
DEVICE_IMG = f"{ROOT}/miniloong.png"
LEAF_IMG = f"{ROOT}/leaf-docs/src/assets/leaf.png"
SHOTS_DIR = "/tmp/hero"
OUT_WEBP = "/tmp/hero/hero-mlp1.webp"

# Screen rect inside the device photo (left, top, right, bottom).
SCR = (384, 61, 1115, 619)
PAD = 330                      # transparent margin so the halo fully fades
OUT_W = 900                    # final downscaled width
FRAME_MS = 160                 # ~6 fps (slower, more readable loop)

SCREEN_BG = (15, 22, 14)       # dark-green page/screen background
HALO_GREEN = (140, 220, 120)   # external device halo + leaf glow
RING_GREEN = (150, 255, 130)   # LED stick-ring
RING_CENTER = (262, 433)       # device-coord center of the analog stick
RING_RX, RING_RY = 80, 72

GI_BASE = 0.48                 # external-halo intensity during the screen cycle
                               # (and the breath's low point) - raise to brighten
                               # the resting glow around the device.
LEAF_GLOW_GAIN = 0.42          # overall on-screen leaf-glow brightness.
DONUT_W = 1.2                  # inner glow hugging the leaf (the "middle").
BLOOM_W = 0.85                 # wide outer bloom.

# Screen cycle (order shown in the loop). 8 frames, hints off.
SCREENS = [
    "recents", "favorites", "games", "gamelist",
    "apps", "switcher", "discoboy", "system-menu",
]
HOLD_FRAMES = 9                # how long each screen sits still
TRANS_FRAMES = 3              # fade-through-bg frames between screens
BOOT_SEG = 8                  # frames per boot-breath segment (x3 segments)

# ── Geometry ────────────────────────────────────────────────────────────────
dev = Image.open(DEVICE_IMG).convert("RGBA")
DW, DH = dev.size
SCR_W, SCR_H = SCR[2] - SCR[0], SCR[3] - SCR[1]
CW, CH = DW + 2 * PAD, DH + 2 * PAD
DEV_OFF = (PAD, PAD)
SCR_OFF = (PAD + SCR[0], PAD + SCR[1])
BG_SCR = Image.new("RGBA", (SCR_W, SCR_H), (*SCREEN_BG, 255))


def scale_alpha(img, k):
    """Return img with its alpha channel multiplied by k (0..1)."""
    if k >= 0.999:
        return img.copy()
    r, g, b, a = img.split()
    a = a.point(lambda v: int(v * k))
    return Image.merge("RGBA", (r, g, b, a))


def smoothstep(t):
    return t * t * (3.0 - 2.0 * t)


# ── Pre-built static layers ─────────────────────────────────────────────────
def build_external_halo():
    """Device silhouette filled green, three blurred passes, on the full canvas."""
    shape = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    green_dev = Image.new("RGBA", dev.size, (0, 0, 0, 0))
    green_dev.paste((*HALO_GREEN, 255), (0, 0), dev.split()[3])
    shape.paste(green_dev, DEV_OFF, green_dev)
    halo = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    for radius, weight in [(120, 0.55), (64, 0.8), (30, 0.7)]:
        b = shape.filter(ImageFilter.GaussianBlur(radius))
        halo = Image.alpha_composite(halo, scale_alpha(b, weight))
    return halo


def build_ring():
    ring = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    cx, cy = PAD + RING_CENTER[0], PAD + RING_CENTER[1]
    ImageDraw.Draw(ring).ellipse(
        [cx - RING_RX, cy - RING_RY, cx + RING_RX, cy + RING_RY],
        outline=(*RING_GREEN, 255), width=15)
    return ring.filter(ImageFilter.GaussianBlur(9))


def build_device_layer():
    layer = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    layer.paste(dev, DEV_OFF, dev)
    return layer


EXT_HALO = build_external_halo()
RING_LAYER = build_ring()
DEVICE_LAYER = build_device_layer()

# Leaf logo sized to 0.58 * screen height; glow donut + bloom behind it.
_leaf = Image.open(LEAF_IMG).convert("RGBA")
_lh = int(0.58 * SCR_H)
_lw = int(_leaf.width * _lh / _leaf.height)
LEAF_S = _leaf.resize((_lw, _lh), Image.LANCZOS)
_LX, _LY = (SCR_W - _lw) // 2, (SCR_H - _lh) // 2
_sil = Image.new("L", (SCR_W, SCR_H), 0)
_sil.paste(LEAF_S.split()[3], (_LX, _LY))
_donut = ImageChops.subtract(_sil.filter(ImageFilter.GaussianBlur(80)), _sil)
_bloom = _sil.filter(ImageFilter.GaussianBlur(130))
_ga = np.clip((np.asarray(_donut, np.float32) * DONUT_W
               + np.asarray(_bloom, np.float32) * BLOOM_W) * LEAF_GLOW_GAIN,
              0, 255).astype(np.uint8)
LEAF_GLOW = Image.new("RGBA", (SCR_W, SCR_H), (*HALO_GREEN, 0))
LEAF_GLOW.putalpha(Image.fromarray(_ga, "L"))


def boot_screen(p):
    """Boot splash: dark-green bg, breathing green glow (intensity p), leaf logo."""
    s = Image.new("RGBA", (SCR_W, SCR_H), (*SCREEN_BG, 255))
    s = Image.alpha_composite(s, scale_alpha(LEAF_GLOW, p))
    s.paste(LEAF_S, (_LX, _LY), LEAF_S)
    return s


def load_screen(name):
    img = Image.open(f"{SHOTS_DIR}/{name}.png").convert("RGBA")
    return img.resize((SCR_W, SCR_H), Image.LANCZOS)


SHOTS = {name: load_screen(name) for name in SCREENS}


def compose(screen_img, gi, ring_i):
    """One full frame: halo*gi behind device, screen in the bezel, ring*ring_i on top."""
    f = scale_alpha(EXT_HALO, gi)
    f = Image.alpha_composite(f, DEVICE_LAYER)
    f.paste(screen_img, SCR_OFF)
    if ring_i > 0.001:
        f = Image.alpha_composite(f, scale_alpha(RING_LAYER, ring_i))
    return f.resize((OUT_W, round(CH * OUT_W / CW)), Image.LANCZOS)


def gi_of(p):
    return GI_BASE + (1.0 - GI_BASE) * p


def ring_of(p):
    return 0.15 + 0.85 * p


def fade_through(a, b):
    """Three screen frames that cross through the bg so content never overlaps."""
    return [Image.blend(a, BG_SCR, 0.6), BG_SCR, Image.blend(BG_SCR, b, 0.6)]


# ── Frame timeline ──────────────────────────────────────────────────────────
def build_timeline():
    """Yield (screen_img, gi, ring_i) per frame for one loop."""
    frames = []

    # Boot breathe: one full breath (0->1->0) then a rise (0->1).
    boot_ps = []
    for seg in [(0.0, 1.0), (1.0, 0.0), (0.0, 1.0)]:
        for i in range(BOOT_SEG):
            t = smoothstep(i / (BOOT_SEG - 1))
            boot_ps.append(seg[0] + (seg[1] - seg[0]) * t)
    for p in boot_ps:
        frames.append((boot_screen(p), gi_of(p), ring_of(p)))

    # Boot -> first screen: fade through bg, ring fades out, halo eases to baseline.
    a = boot_screen(1.0)
    for k, scr in enumerate(fade_through(a, SHOTS[SCREENS[0]])):
        t = (k + 1) / TRANS_FRAMES
        frames.append((scr, 1.0 + (GI_BASE - 1.0) * t, 1.0 * (1.0 - t)))

    # Screen cycle, with the last transition looping back to the boot splash.
    for idx, name in enumerate(SCREENS):
        for _ in range(HOLD_FRAMES):
            frames.append((SHOTS[name], GI_BASE, 0.0))
        if idx < len(SCREENS) - 1:
            for scr in fade_through(SHOTS[name], SHOTS[SCREENS[idx + 1]]):
                frames.append((scr, GI_BASE, 0.0))
        else:
            # Settings -> boot(p=0): ring eases 0 -> ring_of(0) so the loop is seamless.
            for k, scr in enumerate(fade_through(SHOTS[name], boot_screen(0.0))):
                t = (k + 1) / TRANS_FRAMES
                frames.append((scr, GI_BASE, ring_of(0.0) * t))
    return frames


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--preview", action="store_true",
                    help="only dump key still frames, skip the WebP encode")
    args = ap.parse_args()

    # Key still previews for quick geometry/look checks.
    compose(boot_screen(1.0), gi_of(1.0), ring_of(1.0)).save(f"{SHOTS_DIR}/preview_boot.png")
    compose(SHOTS["recents"], 0.30, 0.0).save(f"{SHOTS_DIR}/preview_recents.png")
    compose(SHOTS["switcher"], 0.30, 0.0).save(f"{SHOTS_DIR}/preview_switcher.png")
    compose(BG_SCR, 0.30, 0.0).save(f"{SHOTS_DIR}/preview_transition.png")
    print("previews written to", SHOTS_DIR)
    if args.preview:
        return

    timeline = build_timeline()
    imgs = [compose(scr, gi, ring) for (scr, gi, ring) in timeline]
    imgs[0].save(OUT_WEBP, save_all=True, append_images=imgs[1:],
                 duration=FRAME_MS, loop=0, quality=74, method=6)
    import os
    print(f"wrote {OUT_WEBP}  ({len(imgs)} frames, "
          f"{os.path.getsize(OUT_WEBP)/1024:.0f} KB, {imgs[0].size[0]}x{imgs[0].size[1]})")


if __name__ == "__main__":
    main()

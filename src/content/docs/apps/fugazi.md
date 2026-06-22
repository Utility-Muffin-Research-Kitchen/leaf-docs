---
title: Fugazi
description: 'A live CRT-shader tuner for Leaf: dial in scanlines, curvature, and glow, then apply the look to every RetroArch game.'
---

Fugazi is a CRT-shader tuner. It shows a full-screen live preview, lets you adjust
the look in real time, and then applies it to every RetroArch game at once, so you
do not have to fiddle with shader menus per game.

## How it works

You tune eight settings against a live preview. When you press **A** to apply, Fugazi
bakes your values into a RetroArch shader preset and sets it as RetroArch's global
shader. The next time you launch a game, the look is already there. It applies to
RetroArch cores, which is where most of your games run.

## What you can adjust

- **Curvature** - bends the screen edges like a tube.
- **Glow** - soft light bleed from bright areas.
- **Scanlines** - the strength of the dark horizontal lines.
- **Gap Darkness** - how dark the space between scanlines gets.
- **Phosphor Mask** - the faint vertical grille of a CRT.
- **Vignette** - darkening toward the corners.
- **Brightness** - overall output level (raise it to offset the darkening from the
  other effects).
- **Warmth** - a slight warm tint.

## Controls

| Button | Action |
|---|---|
| Up / Down | pick a setting |
| Left / Right | fine adjust |
| L1 / R1 | coarse adjust |
| X | toggle between a game image and a test pattern |
| Y | reset everything to no visible effect |
| A | apply (bake into RetroArch's global shader) |
| B | quit |

## Tips

- CRT shaders darken the picture. Turn **Brightness** up to compensate, and bump the
  screen backlight in **Settings → Display & Sound** if needed.
- Press **X** to check your look against the test pattern as well as a real game image.
- To go back to no shader, press **Y** to clear, then **A** to apply.

Fugazi is open source (MIT).

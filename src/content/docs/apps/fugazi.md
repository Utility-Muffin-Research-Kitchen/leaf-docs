---
title: Fugazi
description: "Tune a global CRT shader, remove it safely, and resolve conflicts with another RetroArch global preset."
---

Fugazi tunes a CRT look against a full-screen live preview and applies it to every
RetroArch game.

For a ready-made shader on one game, start with
**[MENU > Shader](/guide/shaders/)** instead.

![Fugazi tuning Curvature over its built-in test pattern, showing Not applied and the Quit, Reset, Image, and Apply controls](/fugazi.png)

## What you can adjust

- **Curvature** - bends the screen edges like a tube.
- **Glow** - adds soft light bleed around bright areas.
- **Scanlines** - controls the dark horizontal lines.
- **Gap Darkness** - changes the darkness between scanlines.
- **Phosphor Mask** - adds the faint vertical grille of a CRT.
- **Vignette** - darkens the corners.
- **Brightness** - offsets the darkening from the other effects.
- **Warmth** - adds a slight warm tint.

CRT effects darken the picture. Raise **Brightness** here, and the backlight under
**Settings > Display & Sound**, if you need to.

## Controls

| Button | Action |
| --- | --- |
| **Up / Down** | Pick a setting |
| **Left / Right** | Fine adjustment |
| **L1 / R1** | Coarse adjustment |
| **X** | Toggle between the game image and test pattern |
| **Y** | Reset the tuner values to no visible effect |
| **A** | Apply the current tuning globally |
| **START** | Remove Fugazi or resolve a conflicting preset state |
| **B** | Quit |

**Y** only resets the sliders. If Fugazi is already applied, use **START > Remove**
to turn it off.

## Apply or remove the look

**Apply** makes your tuning the shader for all RetroArch games. The next game you
start loads it. If Fugazi is already applied, **Apply** updates it.

If another global shader is active, Fugazi asks before replacing it and keeps that
shader so you can get it back. It keeps one.

**Remove** takes Fugazi's shader out. If Fugazi kept an earlier shader, **Remove**
puts it back. If the active global shader isn't Fugazi's, **Remove** leaves it
alone.

The status line tells you where things stand:

| Status | Meaning |
| --- | --- |
| **Not applied** | No global shader is set |
| **Applied globally** | Fugazi's look is the global shader |
| **Applied globally - previous shader preserved** | Fugazi's look is active, and **Remove** will restore the shader it replaced |
| **Another global shader is active** | The global shader isn't Fugazi's |
| **State needs attention** | Another global shader is active, and Fugazi is still keeping an earlier one |

A shader saved for one game, folder, or core takes priority over Fugazi. See
[RetroArch shaders](/guide/shaders/#save-at-the-right-scope).

## Fugazi says the state needs attention

This happens if you apply Fugazi over a global shader, then save a different
**All RetroArch** shader later. Press **START** and choose one:

- **Keep current** keeps the current global shader and discards the one Fugazi was
  keeping.
- **Restore previous** replaces the current global shader with the one Fugazi was
  keeping.
- **Cancel** changes nothing.

Do this before you try **Apply** again, and don't delete the files by hand.

Fugazi is open source under the MIT license.

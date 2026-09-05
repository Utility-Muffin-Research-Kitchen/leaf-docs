---
title: Themes
description: Replace the wallpaper, system art, name overlays and controller icons in Grid view with your own PNGs. A theme is one folder on the SD card, and you only have to supply the parts you want to change.
---

A theme replaces the artwork in **Grid view** with your own. You can change the
wallpaper, the picture on each system tile, the name written across a tile, and
the little controller drawn next to the game count.

A theme is one folder on the SD card holding PNGs and a small text file. There is
nothing to install and nothing to compile, and you only have to supply the parts
you want to change.

## Where themes live

Themes go in a `Themes` folder at the top level of the SD card, one folder per
theme:

```
Themes/
  My Theme/
    theme.json
    wallpaper.png
    grid/
      wallpaper.png
      icons/
        FC.png
        SFC.png
        _apps.png
      labels/
        FC.png
      controllers/
        FC.png
```

The `grid/` folder holds the art for Grid view. A `wallpaper.png` inside it
overrides the theme-wide one, so a theme can use a different background per view.

Copy your folder to the card, then pick it in **Settings → Appearance → Theme**.

## theme.json

This is the only file a theme must have. A folder without one is ignored.

```json
{
  "name": "My Theme",
  "author": "Your Name",
  "version": "1.0",
  "grid": { "cols": 3, "rows": 2 },
  "status_style": "auto"
}
```

`name` is what shows up in Settings. `grid` suggests how many tiles to show per
screen, which you can still override in **Settings → Appearance → Grid Size**.

`status_style` sets the color of the clock, battery, controller and game count
that Leaf draws over your wallpaper. Leave it on `auto` and Leaf samples your
wallpaper behind each of those two corners and picks light or dark for itself.
Set it to `light` or `dark` to decide for both.

## The four kinds of art

- **`icons/`** is the picture on the tile. Leaf draws the rounded corners and the
  border itself, so supply a plain square and leave the corners alone.
- **`labels/`** is a name written across the tile, drawn on top of the icon. Its
  canvas is the whole tile, so you place the wordmark wherever you want it and
  leave the rest transparent.
- **`controllers/`** is the one drawn beside the game count of whichever tile is
  selected. Leaf colors it to match the clock and battery, so draw a white shape
  on transparency - any color you paint is thrown away, and holes stay holes.
- **`wallpaper.png`** fills the screen behind everything.

| | Size | Notes |
| --- | --- | --- |
| Icons | 512 x 512 | 1024 is the hard cap. Anything larger is skipped |
| Labels | 512 x 512 | Same canvas as the icon it sits on |
| Controllers | 128 px tall | Any width, cropped tight to the art |
| Wallpaper | 960 x 720 | `.jpg` is accepted too |

PNG only, apart from the wallpaper. Controllers are small on purpose: one draws
about 37 pixels tall, so check yours at that size rather than at full canvas.

## Naming the files

Each file is named after Leaf's code for the system, which is not always the
folder your ROMs are in. A card can hold `Roms/NES/`, `Roms/FC/` or
`Roms/FAMICOM/` and all three are read as the system `FC`, so a single `FC.png`
covers every card.

Five codes do not match the folder name people expect:

| Code | Folder you probably have |
| --- | --- |
| `FC` | `NES` |
| `SFC` | `SNES` |
| `MD` | `GENESIS` |
| `PS` | `PSX` |
| `SEVENTYEIGHTHUNDRED` | `A7800` |

Everything else uses the folder name as its code: `GBA.png`, `N64.png`,
`SEGACD.png`, and so on. Case has to match exactly.

`_apps` is the code for the Apps tile, and you can theme it like any other.
`_default` is reserved and a theme cannot replace it.

## Ship only what you want to change

A theme with three icons themes three tiles. Every system you skip keeps the art
Leaf already had, so nothing breaks and nothing goes blank. Files you have no use
for can simply be absent, and a theme that is only a wallpaper is a perfectly good
theme.

When more than one picture could apply, the first of these that exists wins:

1. Your theme, in `Themes/My Theme/grid/icons/FC.png`
2. The user's own, in `icon.png` inside the system's ROM folder
3. Art shipped with an add-on system
4. Leaf's built-in set
5. Leaf's fallback art

Labels, controllers and the wallpaper resolve the same way. One you leave out
falls back to Leaf's generic controller rather than to nothing.

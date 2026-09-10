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
```

The `grid/` folder holds the art for Grid view. A `wallpaper.png` inside it
overrides the theme-wide one, so a theme can use a different background per view.

Copy your folder to the card, then pick it in **Settings → Appearance → Theme**.

## theme.json

This is the only file a theme must have. A folder without one is ignored.

Every key except `name` is optional. Anything you leave out falls back to what
Leaf already uses, so a theme that only sets a wallpaper is a perfectly good
theme.

```json
{
  "name": "My Theme",
  "author": "Your Name",
  "version": "1.0",

  "status_style": "auto",

  "grid": { "cols": 3, "rows": 2 },

  "colors": {
    "text":             "#5C6367",
    "underlay":         "#FFFFFF",
    "underlay_opacity": 178,
    "highlight":        "#68C7C3",
    "highlight_text":   "#12292B",
    "tile_border":      "#FFFFFF3C",
    "focus_ring":       "#68C7C3",
    "shadow":           120
  }
}
```

### Identity

`name` is what shows up in Settings. `author` and `version` are yours to use.

### Wallpaper and the status icons

Your wallpaper is found by name, not declared here: put `wallpaper.png` at the
theme root, or `grid/wallpaper.png` to use a different one in Grid view. `.jpg`
works too.

`status_style` sets the color of the clock, battery, controller and game count
that Leaf draws over your wallpaper. Leave it on `auto` and Leaf samples your
wallpaper behind each of those two corners and picks light or dark for itself.
Set it to `light` or `dark` to decide for both.

### Colors

One palette for the whole theme, and it only dresses Grid view. Menus, Settings
and the other layouts keep Leaf's own colors however loud a theme is.

| Key | What it colors |
| --- | --- |
| `text` | game names in the list, and the system logo, which is tinted to match |
| `underlay` | the translucent panels that text sits on |
| `underlay_opacity` | how solid those panels are, 0 to 255 |
| `highlight` | the selected row or tile |
| `highlight_text` | text on the highlight |
| `tile_border` | the border around an unfocused tile |
| `focus_ring` | the border around the focused tile |
| `shadow` | how heavy the drop shadows are, 0 to 255. Use 0 to turn them off |

Colors are `#RRGGBB` or `#RRGGBBAA`. `underlay_opacity` and `shadow` are plain
numbers, not colors, because you will want to tune them against your wallpaper
without changing the hue.

Leave `text` out and Leaf works it out from how light or dark your `underlay` is,
which means a theme cannot end up with white text on a white panel by accident.

### Grid

`cols` and `rows` suggest how many tiles fit on a screen, which the user can still
override in **Settings → Appearance → Grid Size**.

## The three kinds of art

- **`icons/`** is the picture on the tile. Leaf draws the rounded corners and the
  border itself, so supply a plain square and leave the corners alone.
- **`labels/`** is a name written across the tile, drawn on top of the icon. Its
  canvas is the whole tile, so you place the wordmark wherever you want it and
  leave the rest transparent.
- **`wallpaper.png`** fills the screen behind everything.

| | Size | Notes |
| --- | --- | --- |
| Icons | 512 x 512 | 1024 is the hard cap. Anything larger is skipped |
| Labels | 512 x 512 | Same canvas as the icon it sits on |
| Wallpaper | 960 x 720 | `.jpg` is accepted too |

PNG only, apart from the wallpaper.

The controller drawn beside the game count is not themeable. It labels what the
number counts, the same way the battery icon labels a percentage, so it stays the
same in every theme.

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

Labels and the wallpaper resolve the same way.

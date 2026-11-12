---
title: Make a theme
description: Restyle Grid view and Cover Flow with your own wallpaper, colors, system art and logos. A theme is one folder on the SD card.
---

A theme restyles **Grid view** and **Cover Flow**. It can change the wallpaper, the
colors of the panels and highlights, the picture on each system tile, the name written
across a tile, the system logo on a game list, and the system cards in Cover Flow.

A theme is one folder on the SD card holding images and a small text file. You only
have to supply the parts you want to change.

To install themes other people made, see [Themes](/guide/pak-rat-themes/), or browse
the [Theme gallery](/themes/). When yours is ready to share, see
[Submit a theme](/guide/submit-a-theme/).

## Where themes live

Themes go in a `Themes` folder at the top level of the SD card, one folder per theme:

```
Themes/
  my-theme/
    theme.json
    wallpaper.png
    icons/
      FC.png
      SFC.png
    grid/
      wallpaper.png
      icons/
        FC.png
        SFC.png
        _apps.png
      labels/
        FC.png
      wordmarks/
        FC.png
        SFC.color.png
    coverflow/
      icons/
        FC.png
```

Only `theme.json` is required. A folder without a readable `theme.json` is skipped.

- `grid/` holds the art for Grid view. A `wallpaper.png` inside it overrides the
  theme-wide one in Grid view.
- `coverflow/` holds the system cards for Cover Flow. Cover Flow uses icons only, so
  there is no wallpaper, label or wordmark folder for it.

Leaf lists up to 32 theme folders. Folders whose names start with a dot are ignored.

To try your theme, pick it in **Settings > Appearance > Theme**. Leaf looks for new
theme folders each time you open **Appearance**, so a theme you copied to the card
shows up without a restart.

Leaf comes with one theme, **Sample**. Its folder is replaced every time you install
or update Leaf, so don't edit it in place. To build on it, copy the folder, give the
copy a new name, and change the `name` in its `theme.json`.

## theme.json

A theme that sets only its name is valid, and every key you leave out falls back to
what Leaf already uses. The file must be a single JSON object of at most 64 KB.

```json
{
  "name": "My Theme",

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

These are the keys Leaf reads from a theme on the card:

| Key | What it does |
| --- | --- |
| `name` | The name shown in Settings. Without it, Settings shows the folder name |
| `grid` | The grid size the theme suggests, see [Grid](#grid) |
| `colors` | The Grid view palette, see [Colors](#colors) |
| `status_style` | The color of the status icons over the wallpaper, see [Wallpaper and the status icons](#wallpaper-and-the-status-icons) |

A key with a value Leaf can't read is ignored, and the rest of the theme still applies.

A theme you share also needs `schema`, `id`, `author`, `version`, `min_leaf_version`
and `license`. They don't change how a theme looks on your own device. Pak Rat needs
them to list and install it, and the
[package format](/guide/submit-a-theme/#themejson) explains each one.

### Wallpaper and the status icons

Your wallpaper is found by name: put `wallpaper.png` at the theme root, or in `grid/`
to use a different one in Grid view. `wallpaper.jpg` and `wallpaper.jpeg` work too.
Use one wallpaper per folder. If a folder holds more than one, Leaf takes the `.png`,
and a theme like that can't be submitted to Pak Rat.

Leaf scales the wallpaper to fill the screen and centers it, trimming the edges when
its shape isn't the 4:3 of the screen, so 960 x 720 fits exactly.

`status_style` sets the color of the clock, battery, controller and game count that
Leaf draws over your wallpaper. On `auto`, Leaf looks at your wallpaper behind each of
those corners and picks light or dark itself. Set it to `light` for light icons on a
dark wallpaper, or `dark` for dark icons on a light one.

### Colors

One palette for the whole theme, used in Grid view only.

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

Colors are `#RRGGBB` or `#RRGGBBAA`. `underlay_opacity` and `shadow` are whole
numbers, and `underlay_opacity` replaces any alpha you gave `underlay`.

Leave `text` out and Leaf works it out from how light or dark your `underlay` is.

### Grid

`cols` (1 to 8) and `rows` (1 to 6) suggest how many tiles fit on a screen. Give both
or neither. Leaf uses the suggestion while **Settings > Home Screen > Grid Size**
is on **Automatic**, and the player's own pick there always wins. Without a
suggestion, Automatic means **4 x 3**.

Your label artwork is drawn at whatever grid size the player picks. A word that fills
a tile at 3 x 2 is unreadable at 8 x 6, so keep labels short, or leave them out and
let the icon carry the tile.

## The art

| Kind | Where | What it is |
| --- | --- | --- |
| Shared icons | `icons/<CODE>.png` | One icon that both Grid and Cover Flow use |
| Icons | `grid/icons/<CODE>.png` | The picture on a Grid tile |
| Labels | `grid/labels/<CODE>.png` | A name written across a Grid tile, drawn over the icon |
| Wordmarks | `grid/wordmarks/<CODE>.png` or `<CODE>.color.png` | The system logo on a system's game list in Grid view |
| Cover Flow icons | `coverflow/icons/<CODE>.png` | The system card in Cover Flow |
| Wallpaper | `wallpaper.png` or `grid/wallpaper.png` | The background behind Grid view |

`<CODE>` is Leaf's code for the system, explained under
[Naming the files](#naming-the-files).

If your Grid and Cover Flow icons are the same pictures, put them in `icons/` once
instead of copying them into both `grid/icons/` and `coverflow/icons/`. Copies count
twice against Pak Rat's size limit. A view still checks its own folder first, so you
can share most icons and give one view a different picture for a few systems. Only
icons are shared: labels and wordmarks stay in `grid/`.

- **Icons** are plain squares. Leaf draws the rounded corners and the border itself, so
  leave the corners alone.
- **Labels** use the whole tile as their canvas, so you place the name wherever you
  want it and leave the rest transparent.
- **Wordmarks** come in two kinds. A plain `<CODE>.png` is white on a transparent
  background, and Leaf tints it with your `text` color so it matches the list. A
  `<CODE>.color.png` keeps its own colors and is drawn as it is. If a system has both,
  the `.color.png` wins. Leaf's own wordmarks are up to 1024 px wide and only as tall
  as the logo, and a system with no wordmark anywhere shows its name as text instead.
- **Cover Flow icons** are the square cards in the Cover Flow carousel. Leaf fits them
  inside the card without cropping or stretching.

### Sizes

| Kind | Best size | Limit per side | Format |
| --- | --- | --- | --- |
| Icons and Cover Flow icons | 512 x 512, with transparency | 1024 | PNG |
| Labels | 512 x 512, the same canvas as the icon | 1024 | PNG |
| Wordmarks | as wide as the logo, up to 1024, and only as tall as it | 1024 | PNG |
| Wallpaper | 960 x 720 | 2048 | PNG or JPEG |

An image over its limit is skipped: a tile falls back to the next picture in line as
if the file weren't there, and a wallpaper isn't drawn. An icon that isn't square is
still drawn, scaled to fit without stretching, but it will look out of place next to
the others.

When you pick a theme in Settings, the status line reports what Leaf found in its Grid
icons, for example `My Theme: 12 icons ok` or `My Theme: 2 icons over 1024px skipped`.

The controller drawn beside the game count can't be themed.

## Naming the files

Each file is named after Leaf's code for the system, which isn't always the folder
your ROMs are in. A card can hold `Roms/NES/`, `Roms/FC/` or `Roms/FAMICOM/` and all
three are read as the system `FC`, so a single `FC.png` covers every card.

Five codes don't match the folder name people expect:

| Code | Folder you probably have |
| --- | --- |
| `FC` | `NES` |
| `SFC` | `SNES` |
| `MD` | `GENESIS` |
| `PS` | `PSX` |
| `SEVENTYEIGHTHUNDRED` | `A7800` |

Everything else uses the folder name as its code: `GBA.png`, `N64.png`, `SEGACD.png`,
and so on. Codes are uppercase letters, digits and underscores, and the case has to
match exactly.

`_apps` is the code for the Apps tile. You can give it an icon in `icons/`,
`grid/icons/` or `coverflow/icons/` and a label in `grid/labels/`, like any other
tile. It has no wordmark. `_default` is reserved and a theme can't replace it.

## Ship only what you want to change

A theme with three icons themes three tiles, and every system you skip keeps the art
Leaf already had. A theme can be only a wallpaper, or only colors.

When more than one picture could apply to a tile icon, the first of these that exists
wins:

1. Your theme, in `Themes/my-theme/grid/icons/FC.png` (or `coverflow/icons/` in Cover
   Flow)
2. Your theme's shared icon, in `Themes/my-theme/icons/FC.png`
3. The user's own, in `icon.png` inside the system's ROM folder
4. Leaf's built-in art, following **System Icons** in **Settings > Home Screen**, or
   art shipped with an add-on system
5. Leaf's fallback art

Labels and wordmarks put the ROM folder first instead, so a card owner's own art
beats the theme's:

- **Labels** - `label.png` in the system's ROM folder, then your theme's label. With
  neither, the tile has no label.
- **Wordmarks** - `wordmark.color.png`, then `wordmark.png` in the system's ROM folder,
  then your theme's `.color.png`, then its `.png`, then art from an add-on system, then
  Leaf's own.

The wallpaper comes only from the theme: `grid/wallpaper.png` first, then the one at
the theme root.

## Sharing your theme

To put your theme in Pak Rat for everyone, package it as a zip and send it in through
the submission form. [Submit a theme](/guide/submit-a-theme/) covers the package
format, the checks it has to pass, and review.

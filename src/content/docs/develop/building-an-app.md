---
title: Building a Leaf app
description: Make an app that looks and behaves like the rest of Leaf, using the Catastrophe toolkit and its box model.
---

Leaf apps are small native programs packaged as a `.pak`. They are built on
[Catastrophe](https://github.com/Utility-Muffin-Research-Kitchen/Catastrophe),
the C/SDL2 toolkit the launcher uses, so your app can look and behave like the
rest of Leaf.

This page covers how a pak is structured, how the box model lays out a screen so
your spacing matches the launcher at any font size, and the conventions for theme
colors, fonts, and buttons.

`Catastrophe/examples/leaf-app/` is a complete, runnable example to read alongside
this page: a list with a preview that drills into a scrollable detail page, the
shape most Leaf apps take.

## Anatomy of a pak

A Leaf app is a directory named `YourApp.pak` containing at least:

```
YourApp.pak/
  pak.json        # metadata: name, icon, version, description
  launch.sh       # entry point Leaf runs
  your-app        # your compiled binary
  icon.png        # square app icon (optional; a default is shown if absent)
```

The launcher reads `pak.json` to list your app. The display name and icon come
from here, not from the folder or binary name:

```json
{
  "name": "Leaf App",
  "version": "v1.0.0",
  "icon": "icon.png",
  "platform": "mlp1",
  "pak_version": "1.0.0",
  "min_leaf_version": "0.7.0",
  "type": "TOOL",
  "description": "What the app does, shown in the app store.",
  "author": "your-name",
  "repo_url": "https://github.com/your-name/leaf-app"
}
```

To add a system, libretro core, or standalone emulator instead of a launchable
app, build a [content pak](/develop/adding-an-emulator/).

Leaf runs `launch.sh` from inside the pak directory with the platform environment
set (`PLATFORM`, `DEVICE`, `HOME`, and the `*_PATH` data roots). At minimum, route
logs to the shared userdata area and exec your binary:

```sh
#!/bin/sh
set -eu
APP_BIN="your-app"
PAK_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$PAK_DIR"

LOG_ROOT=${LOGS_PATH:-"${SHARED_USERDATA_PATH:-${HOME:-/tmp}/.userdata/shared}/logs"}
mkdir -p "$LOG_ROOT"
exec >>"$LOG_ROOT/$APP_BIN.txt" 2>&1
echo "=== Launching $APP_BIN at $(date) ==="

exec "./$APP_BIN" "$@"
```

Write durable data under the `*_PATH` roots Leaf provides, never inside the pak:
an app store update replaces the pak directory. The example's `pak/` folder has a
working copy.

## The box model

Every Leaf screen has the same three parts: a title band, a content area, and an
optional footer hint bar. The content area is usually split into a list column
and a detail column. You build that layout by carving fixed-height bands off the
screen and splitting the remainder.

![The box model: a screen carved into a title band, a content area split into list and detail columns, and a footer hint bar](/box-model.svg)

Two rules keep your layout consistent with the launcher's:

- A box pads its contents inward and never reserves space outside itself. Boxes
  tile their parent with no gaps, so every visible gap on screen comes from one
  box's padding, and there is a single number to tune.
- The title and footer band heights come from the current font at render time and
  are never hardcoded. The same layout is correct at any font size or DPI, and
  with the hint bar on or off.

The primitives live in `catastrophe.h`:

```c
cat_box  root = { 0, 0, cat_get_screen_width(), cat_get_screen_height(),
                  pad, pad, pad, pad };           // a rect + internal padding
cat_box  title = cat_box_carve_top(&root, title_h);          // band off the top
                 cat_box_carve_bottom(&root, cat_get_footer_height()); // and bottom
cat_box  list, detail;
cat_box_split_cols(&root, list_w, gutter, &list, &detail);   // remainder -> columns
SDL_Rect rows = cat_box_fit_rows(&list, base_row_h, count, &visible, &row_h);
```

`cat_box_fit_rows` stretches the rows to fill the column exactly, with no ragged
gap below the last row. The number of items never changes the geometry, so a
3-item list and a 30-item list sit on the same grid.

The example wraps this carve in a small header you can copy,
`examples/leaf-app/leaf_layout.h`, so your screens read as:

```c
SDL_Rect title;
cat_box content = leaf_carve(&title, /*has_footer=*/true);
leaf_title("Leaf App", title);
cat_box list_box, detail_box;
leaf_split(&content, /*list_pct=*/58, &list_box, &detail_box);
```

`list_pct` is the share of the width that goes to the list, and the detail column
takes the rest. Pass `100` for a list with no preview, or skip `leaf_split` and
hand the whole content box to one thing, as the example's detail screen does with
its scroll view.

## Conventions

### Theme colors

Use theme color roles, never hardcoded colors. Leaf has many color schemes, and an
app that hardcodes colors breaks on most of them. Pull from `cat_get_theme()`:

| Role | Use it for |
|---|---|
| `text` | default body text |
| `hint` | dim / secondary text, metadata |
| `highlight` | the selected-row pill |
| `highlighted_text` | text on a selected row |
| `emphasis` | section headings and status (contrast-clamped to stay legible) |
| `accent` | the footer pill, status bar |
| `background` | the screen background |

### Fonts

Use the font tiers from `cat_get_font(...)`: `CAT_FONT_EXTRA_LARGE` for screen
titles, `CAT_FONT_MEDIUM` for body and list rows, `CAT_FONT_SMALL` for metadata.
Don't load your own sizes.

### Buttons

Use the same buttons for the same things as the launcher:

| Button | Meaning |
|---|---|
| **A** | primary action - confirm, open, drill in |
| **B** | back (and at the top level, quit) |
| **MENU** | quit the app, from anywhere |
| **X / Y** | secondary actions (label them in the footer) |
| **L1 / R1** | switch tabs, when you have them |

Always draw the footer hint bar with `cat_draw_footer(...)` so the buttons are
labeled, and respect the user's Show Hints setting.

### Long content

When content is taller than its box, put it in a `cat_draw_scroll_view` and let
the user scroll, as the example's detail page does. Don't shrink the font to fit.
For a single long line, use a marquee or `cat_draw_text_ellipsized`.

### Detail pages

To show more about an item, open a sub-screen in your own render loop (**A** to
enter, **B** to return). Don't stack blocking dialogs. The example's detail page
works this way.

## The render loop

An app with more than one screen drives its own loop: poll input, draw the active
screen, present.

```c
bool running = true;
while (running) {
    cat_input_event ev;
    while (cat_poll_input(&ev)) {
        if (!ev.pressed) continue;
        // dispatch ev.button by the active screen
    }
    cat_draw_background();      // themed background
    // ... draw the active screen via the box model ...
    cat_draw_footer(footer, footer_count);
    cat_present();
}
cat_quit();
```

Read `examples/leaf-app/main.c` for the full version: a list screen with a
preview, an A-to-open detail screen with a scroll view, and the input dispatch
that ties them together.

## Quick paths and more widgets

You don't always need a custom loop. For a "pick one item" screen, `cat_list()`
runs the whole thing for you (see `examples/hello/`), and `cat_confirmation()` is
a ready-made yes/no dialog. For tab bars (`cat_draw_tab_bar`), progress screens
(`cat_process_message`), keyboards, and sliders, the `examples/combo/` and
`examples/demo/` programs in the Catastrophe repo exercise the full widget set.

## Translate your app

Leaf is translated, and so are Central Scrutinizer and Thing-File. Your app is a
separate program, so it stays English unless you translate it too.

### Read the language Leaf gives you

Every pak is launched with `UMRK_LANGUAGE` set to the user's choice (`en`,
`zh_CN`, `fr_FR`):

```c
const char *lang = getenv("UMRK_LANGUAGE");
```

### Wrap the strings you draw

Leaf programs put a `T()` around each visible literal. It is both the lookup and
the marker that the string is user-facing:

```c
cat_draw_text(font, T("No files found"), x, y, theme->text);
```

Leave paths, log lines and config keys unwrapped. A string you forget to wrap
shows up in English on screen.

### Keep a template and a table per language

```text
i18n/your-app.pot       every wrapped string, generated from your source
i18n/zh_CN.po           one translation, edited by a person
```

Extract the template from your source, then compile each `.po` into the small
lookup table your app loads at startup. Thing-File is the smallest complete
example: see its `tools/i18n-extract.py` and `tools/i18n-po2tsv.py`, which you can
copy and point at your own sources.

### Let a translator work without a build

Load a table from `$USERDATA_PATH/<YourApp>/i18n/<lang>.tsv` before the one you
ship. A translator can then drop a file on the card, restart your app, and see
their changes. Leaf's own translations are reviewed on hardware the same way.

Every string is looked up by its English text, so anything a translator hasn't
reached stays English, and you can ship a partial translation.

## Build and run

From the Catastrophe repo, build the examples for your host and run the one above:

```sh
make mac        # or: make linux / make windows / make native
./build/mac/leaf-app/leaf-app
```

Build for the device with the MLP1 toolchain, the same way the launcher is built.
Then package the binary with a `pak.json` and `launch.sh` as shown above and copy
the `.pak` into the device's `Apps` folder.

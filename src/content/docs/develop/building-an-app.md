---
title: Building a Leaf app
description: Make an app that looks and behaves like the rest of Leaf, using the Catastrophe toolkit and its box model.
---

Leaf apps are small native programs packaged as a `.pak`. They are built on
[Catastrophe](https://github.com/Utility-Muffin-Research-Kitchen/Catastrophe),
the same C/SDL2 toolkit the launcher itself uses, so a well-built app looks and
feels like a built-in part of Leaf rather than a bolt-on.

This page shows how to make an app that fits in: how a pak is structured, how the
**box model** lays out a screen so your spacing matches the launcher at any font
size, and the handful of conventions (theme colors, fonts, button grammar) that
make an app feel native.

There is a complete, runnable example to read alongside this page:
`Catastrophe/examples/leaf-app/` - a list with a preview that drills into a
scrollable detail page, which is the shape most Leaf apps take.

## Anatomy of a pak

A Leaf app is a directory named `YourApp.pak` containing at least:

```
YourApp.pak/
  pak.json        # metadata: name, icon, version, description
  launch.sh       # entry point Leaf runs
  your-app        # your compiled binary
  icon.png        # square app icon (optional; a default is shown if absent)
```

`pak.json` is what the launcher reads to list your app. The display name and icon
come from here, not the folder or binary name:

```json
{
  "name": "Leaf App",
  "version": "v1.0.0",
  "icon": "icon.png",
  "platform": "mlp1",
  "pak_version": "1.0.0",
  "min_jawaka_version": "0.0.1",
  "type": "TOOL",
  "description": "What the app does, shown in the app store.",
  "author": "your-name",
  "repo_url": "https://github.com/your-name/leaf-app"
}
```

`launch.sh` is run from inside the pak directory with the platform environment
set (`PLATFORM`, `DEVICE`, `HOME`, and the `*_PATH` data roots). The minimal job
is to route logs to the shared userdata area and exec your binary:

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

Write durable data under the `*_PATH` roots Leaf provides, never inside the pak
(an app store update replaces the pak directory). See the example's `pak/`
folder for a working copy.

## The box model

Every Leaf screen is the same three parts: a **title** band, a **content** area,
and an optional **footer** hint bar. The content area is usually split into a
list column and a detail column. You build that layout by carving fixed-height
bands off the screen and splitting the remainder - the box model.

![The box model: a screen carved into a title band, a content area split into list and detail columns, and a footer hint bar](/box-model.svg)

Two ideas make it produce Leaf-consistent layouts for free:

- **Padding, never margins.** A box only ever pads its contents inward; it never
  reserves space outside itself. Boxes tile their parent with no gaps, so every
  visible gap on screen traces back to one box's internal padding. There is a
  single number to tune.
- **Heights come from the live font.** The title and footer band heights are
  derived from the current font at render time, never hardcoded. The same layout
  is correct at any font size or DPI, and with the hint bar on or off.

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

`cat_box_fit_rows` is worth calling out: it stretches the rows to fill the column
exactly (no ragged gap below the last row) and is the **filled-grid invariant** -
the number of items never changes the geometry, so a 3-item list and a 30-item
list sit on the same grid.

The example wraps this carve in a tiny, copy-paste header,
`examples/leaf-app/leaf_layout.h`, so your screens read as:

```c
SDL_Rect title;
cat_box content = leaf_carve(&title, /*has_footer=*/true);
leaf_title("Leaf App", title);
cat_box list_box, detail_box;
leaf_split(&content, /*list_pct=*/58, &list_box, &detail_box);
```

The two columns share one width: `list_pct` is how much goes to the list and the
detail column takes the rest, so the split flexes to whatever the screen needs.
Pass `100` for a list with no preview, or skip `leaf_split` entirely and hand the
whole content box to one thing - which is exactly what the example's detail screen
does, giving its full width to a scroll view.

Drop the header into your app, or rebuild the same few lines from the primitives -
either way your gaps match the launcher.

## Conventions that make it feel native

The layout gets you most of the way; these conventions do the rest.

**Use theme color roles, never hardcoded colors.** Leaf ships 14 color schemes;
an app that hardcodes colors breaks on most of them. Pull from `cat_get_theme()`:

| Role | Use it for |
|---|---|
| `text` | default body text |
| `hint` | dim / secondary text, metadata |
| `highlight` | the selected-row pill |
| `highlighted_text` | text on a selected row |
| `emphasis` | section headings and status (contrast-clamped to stay legible) |
| `accent` | the footer pill, status bar |
| `background` | the screen background |

**Use the font tiers** from `cat_get_font(...)`: `CAT_FONT_EXTRA_LARGE` for screen
titles (matches the launcher's drilled-in pages), `CAT_FONT_MEDIUM` for body and
list rows, `CAT_FONT_SMALL` for metadata. Never load your own sizes.

**Follow the button grammar** so muscle memory carries over:

| Button | Meaning |
|---|---|
| **A** | primary action - confirm, open, drill in |
| **B** | back (and at the top level, quit) |
| **MENU** | quit the app, from anywhere |
| **X / Y** | secondary actions (label them in the footer) |
| **L1 / R1** | switch tabs, when you have them |

Always draw the footer hint bar with `cat_draw_footer(...)` so the buttons are
labeled, and respect the user's Show Hints setting.

**Overflow scrolls, it does not shrink.** When content is taller than its box, put
it in a `cat_draw_scroll_view` and let the user scroll (the detail page in the
example does this), rather than shrinking the font to fit. For a single long line,
use a marquee or `cat_draw_text_ellipsized`.

**Drill in to a page, do not stack modals.** The Leaf pattern for "show me more"
is a sub-screen in your own render loop (press A to enter, B to return), not a
nested blocking dialog. The example's detail page is exactly this.

## The render loop

Unlike the all-in-one `cat_list()` helper, a real app drives its own loop: poll
input, draw the active screen, present. This is what lets you have a list that
drills into a detail page.

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

You do not always need a custom loop. For a simple "pick one item" screen,
`cat_list()` runs the whole thing for you (see `examples/hello/`), and
`cat_confirmation()` is a ready-made yes/no dialog. For richer UI - tab bars
(`cat_draw_tab_bar`), progress screens (`cat_process_message`), keyboards, sliders -
the `examples/combo/` and `examples/demo/` programs in the Catastrophe repo
exercise the full widget set.

## Build and run

From the Catastrophe repo, build the examples for your host and run the one above:

```sh
make mac        # or: make linux / make windows / make native
./build/mac/leaf-app/leaf-app
```

Build for the device with the MLP1 toolchain the same way the launcher is built,
then package the binary with a `pak.json` and `launch.sh` as shown above and drop
the `.pak` into the device's `Apps` folder.

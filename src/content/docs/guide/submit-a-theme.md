---
title: Submit a theme
description: Package your Leaf theme as a zip, send it in through the submission form, and get it reviewed and published to Pak Rat for everyone.
---

You can share a theme you made with everyone who uses Leaf by submitting it to Pak Rat.
You fill in a form on GitHub and attach your theme as a zip, with no git needed. A bot
checks the zip within a few minutes and tells you exactly what to fix, a maintainer
reviews the theme, and once it is published, anyone can install it from
[Pak Rat](/guide/pak-rat-themes/).

Submissions live in the
[leaf-themes](https://github.com/Utility-Muffin-Research-Kitchen/leaf-themes)
repository. You need a free GitHub account to submit.

This page covers packaging and submitting. To make the theme itself, start with
[Themes](/guide/themes/).

## How it works

1. **Package** your theme as a zip holding one folder, named after your theme's `id`.
2. **Submit** it with the **Submit a theme** form: attach the zip, pick a license,
   write a one-line summary, and check three boxes.
3. **Checks.** A bot downloads your zip, checks it, and comments on your issue. If
   something needs fixing, the comment lists every problem at once.
4. **Review.** When the checks pass, the bot opens a review pull request, and a
   maintainer looks at your theme.
5. **Publish.** When the maintainer merges it, your theme is published and added to
   Pak Rat. The bot comments and closes your issue.

Nothing you submit appears in Pak Rat until a maintainer merges it.

## Prepare your theme

A theme you share follows **THEME-1**, Leaf's theme package format. It is the same
folder you would copy to your own card, with a few more fields in `theme.json`, a
preview image, and nothing that isn't part of the theme. The
[THEME-1 contract](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts/blob/main/docs/themes.md)
holds the complete rules. This page covers the ones you need.

### The zip

The zip holds exactly one folder, named exactly like the `id` in your `theme.json`,
with nothing beside it:

```
neon-nights.zip
  neon-nights/
    theme.json                   required
    preview.png                  required, 960 x 720
    LICENSE.txt                  optional, the full license text
    wallpaper.png                optional, or wallpaper.jpg or wallpaper.jpeg
    grid/
      wallpaper.png              optional, or .jpg or .jpeg
      icons/<CODE>.png           optional
      labels/<CODE>.png          optional
      wordmarks/<CODE>.png       optional
      wordmarks/<CODE>.color.png optional
    coverflow/
      icons/<CODE>.png           optional
```

Nothing else is allowed. A readme, notes, your source files or a folder of spare art
all get the theme refused, so keep those outside the theme folder. Pak Rat installs
the folder as `Themes/<id>/` on the card.

`<CODE>` is a system code, as described in
[Naming the files](/guide/themes/#naming-the-files): 2 to 32 uppercase letters, digits
and underscores, such as `GBA` or `FC`. `_apps`, in lowercase, is also allowed for the
Apps tile's icons and its Grid label, but not as a wordmark. Names are compared exactly, so `grid/icons/FC.PNG` and
`Grid/icons/FC.png` are both refused.

If you started from a copy of the bundled **Sample** theme, remove the
`GRID-ICON-SOURCE.md` and `commons.json` files from its `grid/icons` folder, and make
sure you have the right to share any of its art you kept.

### theme.json

```json
{
  "schema": 1,
  "id": "neon-nights",
  "name": "Neon Nights",
  "author": "Example",
  "version": "1.2.0",
  "min_leaf_version": "0.12.0",
  "license": "CC-BY-4.0",
  "description": "Pink and cyan on black.",
  "grid": { "cols": 4, "rows": 3 },
  "colors": {
    "text": "#F2F2F2",
    "highlight": "#FF4FB8",
    "highlight_text": "#12292B",
    "underlay": "#000000",
    "underlay_opacity": 178,
    "tile_border": "#FFFFFF40",
    "focus_ring": "#2FE6FF",
    "shadow": 96
  },
  "status_style": "light"
}
```

These fields are required:

| Field | Rule |
| --- | --- |
| `schema` | `1` |
| `id` | 2 to 40 lowercase letters, digits and hyphens, starting with a letter or digit, such as `neon-nights`. It names the theme's folder and never changes between versions |
| `name` | The name people see, 1 to 40 characters. It also has to fit in 95 bytes of UTF-8, which is about 31 characters of Chinese or Japanese |
| `author` | Your name as it should appear, 1 to 60 characters and at most 63 bytes |
| `version` | Three numbers, such as `1.0.0`. Each number is 0 to 9999, with no leading zeros |
| `min_leaf_version` | The oldest Leaf your theme works on, written the same way, and at least `0.12.0` |
| `license` | One of `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC0-1.0` or `redistribution-permitted`. See [Licenses](#licenses) |

These are optional:

| Field | Rule |
| --- | --- |
| `description` | Up to 300 characters, shown on the theme's details page in Pak Rat. Line breaks are allowed |
| `grid` | Both `cols` (1 to 8) and `rows` (1 to 6) |
| `colors` | `text`, `highlight`, `highlight_text`, `underlay`, `tile_border` and `focus_ring` as `#RRGGBB` or `#RRGGBBAA`, plus `underlay_opacity` and `shadow` from 0 to 255 |
| `status_style` | `auto`, `light` or `dark` |

[Themes](/guide/themes/#themejson) explains what the optional fields do on screen.

A few rules catch people out:

- No other keys, at the top level or inside `grid` and `colors`. A leftover key from an
  experiment, or a typo such as `colour`, gets the theme refused.
- Numbers are whole numbers written plainly: `3`, not `3.0`.
- Save the file as UTF-8 without a byte order mark. It must be valid JSON with no
  duplicate keys, and at most 64 KB.
- Names and descriptions can't contain control characters, and a name can't be only
  spaces.

### preview.png

`preview.png` is the picture Pak Rat shows in its theme list and on the details page.
It must be a PNG of exactly 960 x 720. That is the size of the screen, so a
[screenshot](/guide/screenshots/) of your theme in Grid view, taken on the device, is
exactly right.

### Images

| File | Format | Size, width and height |
| --- | --- | --- |
| `preview.png` | PNG | exactly 960 x 720 |
| `wallpaper.*`, `grid/wallpaper.*` | PNG for `.png`, JPEG for `.jpg` and `.jpeg` | 1 to 2048 each |
| Icons, labels and wordmarks | PNG | 1 to 1024 each |

- Each folder may hold only one wallpaper.
- A file has to really be the format its name says. A JPEG renamed to `.png` is
  refused. JPEG wallpapers must be ordinary baseline or progressive JPEGs in color or
  grayscale, not CMYK.
- Icons look best at 512 x 512 with transparency. Other sizes pass with a warning.
- A theme with no wallpaper, icons, labels or wordmarks at all, only colors, also passes
  with a warning.

### Size limits

- The zip is at most 10 MiB, and its files add up to at most 25 MiB once extracted.
- It holds at most 512 files and folders.
- Files are stored or compressed with ordinary zip compression (deflate), with no
  encryption and no split or ZIP64 archives.
- No hidden files or folders, such as `.DS_Store`, `._` files or `__MACOSX`.
- No symbolic links.
- No two names that differ only in letter case. The SD card is FAT32, where they would
  be the same file.

### Making the zip

Zip the theme folder itself, not the files inside it.

On a Mac, the Finder's **Compress** can add hidden files that get the theme refused.
Use Terminal instead, from the folder that contains your theme folder:

```sh
zip -r -X neon-nights.zip neon-nights -x '*.DS_Store'
```

The same command works on Linux. On Windows, right-click the theme folder and compress
it to a zip.

### Checklist

Before you submit, check that:

- The theme works on your own device. Copy the folder into `Themes/`, pick it in
  **Settings > Appearance > Theme**, and look at it in Grid view and, if you
  made Cover Flow icons, in Cover Flow.
- The folder name is exactly your `id`.
- `theme.json` has `schema`, `id`, `name`, `author`, `version`, `min_leaf_version` and
  `license`, and no keys beyond the optional four.
- `preview.png` is 960 x 720.
- Every image is within its size limit and named with a system code.
- The folder holds nothing but the theme.
- The zip holds that one folder, is 10 MiB or smaller, and has no hidden files.

## Submitting your theme

Open the
[Submit a theme form](https://github.com/Utility-Muffin-Research-Kitchen/leaf-themes/issues/new?template=submit-theme.yml)
and fill it in:

- **Theme zip** - drag your zip into the field. Attach exactly one. The theme's name,
  id, author and version all come from the `theme.json` inside it, so there is nothing
  else to type about the theme.
- **License** - the license people get your theme under. It must match `license` in
  your `theme.json`.
- **Summary** - one line of up to 100 characters, shown with your theme in Pak Rat's
  theme list. For example, "Pink and cyan on black."
- **Confirmations** - three boxes, all required: that you made the theme or have the
  right to share every image in it, that you agree it may be redistributed under the
  license you chose, and that you read the rules.

Leave the issue title as it is and submit.

## After you submit

### The bot's comment

Within a few minutes, the bot comments on your issue with one of two results.

**Your theme needs changes** means at least one check failed. The comment is a table
with a row for each problem: the name of the check, such as `theme-image-dimensions`,
what to fix, and the file in your zip it is about, such as
`neon-nights/grid/icons/GB.png`. It lists every problem it found, so you can fix them
all in one go. The
issue gets the `needs-changes` label. [Common problems](#common-problems) below
explains the ones people hit most.

**Your theme passed the checks** means the zip is good. The comment links the review
pull request, and the issue gets the `ready-for-review` label. There is nothing more
for you to do unless a maintainer asks for a change.

Either comment can end with **Warnings**. Warnings never block a submission. They point
out something you may want to fix, such as an icon that isn't 512 x 512.

### Fixing a submission

Fix every problem in the comment, make a new zip, and update the same issue rather than
opening a new one:

1. Edit the issue.
2. Under the **Theme zip** heading, replace the old attachment by dragging in the new
   zip. Leave the headings and the other sections as they are.
3. Save, then leave a short comment saying the new zip is attached.

A maintainer then comments `/recheck`, and the bot runs every check again and comments
with the new result. Only maintainers can run `/recheck`.

The same applies after your theme has passed: to change something before it is
published, attach the new zip and a maintainer rechecks it. If the new zip fails, the
review pull request for the old one is closed, so an outdated version can't be
published by mistake.

### Review

The review pull request shows a maintainer your preview, the name, author, summary and
description, the license, whether this is a new theme or an update and which account
owns it, and any warnings. The maintainer checks that:

- The preview shows the theme, and the name, summary and description describe it.
- The license fits, and you made the art or have the right to share it under that
  license. Console and system logos are allowed, the same way Leaf's own wordmarks use
  them.
- The warnings, if any, are intended.

### Publishing

When a maintainer merges the review pull request, your theme is published. The bot
creates a release in leaf-themes holding the zip and the preview, adds the theme to
the Pak Rat catalog, comments **Published** on your issue with a link to the release,
and closes the issue.

The theme shows up in Pak Rat once leaf.game finishes deploying, usually within a few
minutes. At the same time, it appears in the [Theme gallery](/themes/) on this site.

The zip people download is rebuilt by the bot from the files that passed the checks,
so every device gets exactly what was reviewed.

## Common problems

These are the checks people run into most. The bot's comment names the check and the
file, and the
[THEME-1 contract](https://github.com/Utility-Muffin-Research-Kitchen/leaf-contracts/blob/main/docs/themes.md)
lists every one.

| Check | What to fix |
| --- | --- |
| `theme-hidden-file` | The zip contains `.DS_Store`, `._` files or a `__MACOSX` folder. Make the zip again from the command line, as in [Making the zip](#making-the-zip) |
| `theme-not-single-folder` | The zip must hold one folder and nothing beside it. Zip the theme folder itself, not the files inside it |
| `theme-id-mismatch` | Rename the folder so it matches the `id` in `theme.json` exactly |
| `theme-unknown-file` | Remove every file and folder that isn't in [the zip layout](#the-zip), such as a readme or source files |
| `theme-missing-preview` | Add a 960 x 720 `preview.png` to the theme folder |
| `theme-image-dimensions` | An image is outside its limits: `preview.png` must be exactly 960 x 720, wallpapers at most 2048 px per side, and icons, labels and wordmarks at most 1024 px per side |
| `theme-unsupported-image` | An image is not the format its name says, or is a kind Leaf can't read. Export it again as a real PNG, or as an ordinary JPEG for a wallpaper |
| `theme-system-id-invalid` | Name art files with a system code in uppercase, such as `GBA.png`. `_apps` works for icons and Grid labels, not wordmarks |
| `theme-multiple-wallpapers` | Keep one of `wallpaper.png`, `wallpaper.jpg` or `wallpaper.jpeg` in each folder |
| `theme-malformed-manifest` | `theme.json` is not valid JSON. Look for a missing comma, a duplicate key or a byte order mark |
| `theme-unknown-schema` | Add `"schema": 1` to `theme.json` |
| `theme-unknown-field` | Remove the key that THEME-1 doesn't define, often a typo or a leftover |
| `theme-id-invalid` | Use 2 to 40 lowercase letters, digits and hyphens for `id`, with no spaces or underscores |
| `theme-version-invalid` | Write `version` as three numbers, such as `1.0.0`, with no leading zeros |
| `theme-min-leaf-version` | Set `min_leaf_version` to `0.12.0` or later |
| `theme-unknown-license` | Set `license` to `CC-BY-4.0`, `CC-BY-SA-4.0`, `CC0-1.0` or `redistribution-permitted` |
| `theme-reserved-name` | Your `id` is the name of a theme that comes with Leaf, such as `sample`. Pick another |
| `submission-missing-attachment` | Attach your zip in the **Theme zip** field |
| `submission-license-mismatch` | Make the license in the form and in `theme.json` the same |
| `submission-version-not-newer` | Raise `version` above the newest published version of your theme |
| `submission-not-owner` | Another GitHub account owns this `id`. Pick a different `id` for your theme |
| `submission-id-taken` | An app or content package in Pak Rat already uses this `id`. Pick a different one |
| `submission-in-review` | Another submission for this theme is already waiting for review. Update that issue instead, or wait until it is published or closed |

And the two warnings:

| Warning | What it means |
| --- | --- |
| `theme-icon-off-size` | An icon is not 512 x 512. Leaf still shows it, scaled to fit |
| `theme-no-art` | The theme has no wallpaper, icons, labels or wordmarks, so it only changes colors |

## Updating your theme

To publish a new version, open a new submission from the same GitHub account, with the
same `id` and a higher `version` in `theme.json`, for example `1.0.0` to `1.1.0`.
Everything else works the same way.

Earlier versions stay published, and Pak Rat offers the update to everyone who
installed your theme. If a new version needs a newer Leaf, raise its
`min_leaf_version`, and people on an older Leaf keep the newest version they can use.

Only one submission per theme can wait for review at a time.

A theme can have up to 16 published versions in its lifetime, and published versions
are never removed, so save a new version for changes worth downloading. If you reach
the limit, ask a maintainer.

## Ownership

The GitHub account that first publishes an `id` owns it. Only that account, or a
maintainer, can publish new versions of it. Ownership follows your account, not your
username, so renaming your GitHub account doesn't lose your themes.

If you want to hand a theme over to someone else, ask a maintainer to transfer it.

## Licenses

Pick one when you submit. The form choice and `license` in `theme.json` must match.

| Form choice | `theme.json` value | What people can do |
| --- | --- | --- |
| CC BY 4.0 | `CC-BY-4.0` | Share and adapt, with credit to you |
| CC BY-SA 4.0 | `CC-BY-SA-4.0` | Share and adapt, with credit, under the same license |
| CC0 | `CC0-1.0` | Anything, no credit needed |
| All rights reserved, redistribution permitted | `redistribution-permitted` | Download and use it through Pak Rat. You keep every other right |

Pak Rat shows the license on the theme's details page. You can include the full
license text as `LICENSE.txt` in your theme folder.

## Takedowns and contact

If a theme uses your work without permission, or you want your own theme removed, tell
a maintainer on the [Leaf Discord](https://discord.gg/q5F7cZ7KRp) or
[open an issue in the Leaf repository](https://github.com/Utility-Muffin-Research-Kitchen/Leaf/issues).
The theme is withdrawn first and discussed after.

A withdrawn theme disappears from Pak Rat for everyone who hasn't installed it, and
can't be installed or updated. Copies already on a device keep working.

For questions about submitting, ask on the [Leaf Discord](https://discord.gg/q5F7cZ7KRp).

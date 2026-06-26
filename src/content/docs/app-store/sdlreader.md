---
title: SDLReader
description: 'A document reader for Leaf: PDFs, comics (CBZ/CBR), EPUB and MOBI ebooks, plain text, and standalone images, with zoom, rotation, themes, and a controller-friendly file browser.'
---

![SDLReader on a Miniloong Pocket 1, showing its file browser with PDF, comic, EPUB, and MOBI files](/sdlreader.png)

SDLReader is a lightweight reader for everything that isn't a game: PDFs, comic
archives, ebooks, plain text, and loose image files. It's built on SDL2 and MuPDF,
with a controller-friendly file browser, smooth zoom and pan, page rotation, and a
set of reading themes for comfortable long sessions on the handheld.

## Install

SDLReader is a standalone app, not bundled with Leaf. Install it on-device with
**Pak Rat**: press the **Menu** button, open **Actions → Pak Rat**, choose
**SDLReader**, and install it over Wi-Fi. It appears in your **Apps** tab when the
install finishes.

Manual fallback: open the
**[latest release](https://github.com/Helaas/SDLReader-brick/releases/latest)**,
download `SDLReader.mlp1.pak.zip`, unzip it, copy the `SDLReader.pak` folder into
`Apps/mlp1/` on your SD card, then run **System → Rescan Library**. SDLReader is
open source ([AGPL-3.0](https://github.com/Helaas/SDLReader-brick)).

## Features

- **Reads almost any document** - PDF, CBZ / ZIP and CBR / RAR comic archives,
  EPUB and MOBI ebooks, plain text, and standalone image files, all from one app.
- **Controller-friendly browser** - walk your SD card with the d-pad, jump by
  letter with **L1 / R1**, and tap left or right to page through long lists. Press
  **X** to switch between a plain list and a thumbnail grid that previews covers.
- **Zoom, pan, and rotate** - zoom in and out, fit a page to the screen width,
  scroll within an oversized page, and rotate or mirror the view to suit how you're
  holding the device.
- **Reading themes** - Sepia, Dark Mode, High Contrast, Paper Texture, Soft Gray,
  and Night Mode for EPUB, MOBI, and text, plus a runtime font picker so books read
  the way you like.
- **Remembers where you were** - reading history keeps your place, and an optional
  edge progress bar and document minimap show how far through you are.
- **Jump anywhere** - an on-screen number pad lets you jump straight to a page with
  the controller, no keyboard needed.

## Adding documents

SDLReader reads from your SD card, so organize files however you like. Drop PDFs,
comics, ebooks, text files, or images anywhere on the card and browse to them in the
app; the file browser remembers the last directory you were in. For comics, the
thumbnail grid (**X**) makes covers easy to spot.

## Controls

These are the controls while reading a document. The file browser uses the simpler
scheme shown along its top bar: **d-pad** to navigate, **A** to open, **B** to go
back, **X** to toggle list / thumbnail view, and **Menu** to quit.

| Button | Action |
|---|---|
| D-pad | scroll / pan; hold at a page edge to turn the page |
| L1 / R1 | previous / next page |
| L1 + R1 | open the font & reading-style menu |
| L2 / R2 | jump back / forward 10 pages |
| L2 + R2 | reset the page view |
| X | zoom in |
| A | zoom out |
| B | fit page to width |
| Y | rotate 90° clockwise |
| Start | toggle horizontal mirror |
| Select | toggle vertical mirror |
| Menu | open the font & reading-style menu |

The font and reading-style menu (the **Menu** button, or **L1 + R1**) is where the
themes, font picker, page jump, minimap, and edge-turn behaviour live.

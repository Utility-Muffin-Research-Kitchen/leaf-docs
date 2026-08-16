---
title: Language
description: Switch the Leaf interface to Simplified Chinese, and how Chinese game names render whatever language you use.
---

Leaf's interface is available in **Simplified Chinese** alongside English. The
translation was written and reviewed by a native speaker from the community, not run
through a machine and shipped as-is.

## Switching

Go to **Settings > General > Language** and pick **中文**. Leaf restarts on the spot,
about a second, and comes back translated. Pick **English** the same way to switch
back.

The row only appears when a translation is installed, so if you do not see it, your
Leaf predates the feature.

## What changes

Menus, settings, dialogs, button hints, the in-game menu, and system messages are
translated. **RetroArch and PPSSPP follow too**: their own menus switch with Leaf, so
you never set the language in three places, and switching back to English brings them
all with it. The interface also switches to a font that can draw Chinese, since none of
the nine regular Leaf fonts carry those characters. That is why the **Font** row
in Settings is locked while Chinese is active: your chosen font comes back when you
switch to English.

If you would rather run PSP games in a different language from the rest of Leaf, set it
inside PPSSPP's own settings. Leaf notices you have chosen for yourself and stops
changing it.

## What stays in English

Some things are kept in English on purpose:

- **Game names.** They come from your files and from the artwork scraper. Leaf never
  rewrites them.
- **Console names.** Game Boy, PlayStation, and the rest stay in Latin script, which
  is how Chinese players write them too. The arcade category is translated (街机).
- **Product and app names.** Leaf, RetroArch, and the built-in apps keep their names,
  since those are the words you would search for when asking for help.
- **Some standalone emulator menus.** PPSSPP now follows Leaf, but the others each
  carry their own interface and are still English. **DraStic** is only ever offered in
  Traditional Chinese, which is the one translation it ships, so Leaf leaves it in
  English rather than switch you to the wrong script. **Flycast** and the **N64
  emulator** have no Chinese at all. Bringing the rest in line is on the list.

## Chinese game names

This part works in any language, including English. A game file named in Chinese, a
fan translation for example, used to show up as empty boxes. Now it renders
correctly everywhere titles appear, and the rest of your interface stays exactly as
it was.

## Fixing a translation

If a string reads wrong, say so on the [Discord](https://discord.gg/q5F7cZ7KRp). No
update is needed to test a fix: Leaf reads a plain text override file from
`.umrk/mlp1/i18n/zh_CN.tsv` on the SD card, one `English<TAB>中文` pair per line,
which outranks the built-in translation. That file is how the translation was
reviewed in the first place, and it survives updates.

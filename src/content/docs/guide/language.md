---
title: Language
description: Switch the Leaf interface to another language, and see what follows the switch and what stays in English.
---

Leaf's interface is available in **Brazilian Portuguese**, **Dutch (Belgium)**,
**French**, **German**, **Japanese**, **Korean**, **Mexican Spanish**, **Russian**,
**Simplified Chinese** and **Vietnamese** alongside English. Each one came from
someone in the community. Korean is by
[cumasterns-cpu](https://github.com/cumasterns-cpu), and Brazilian Portuguese by
[muniz95](https://github.com/muniz95).

A translation that is still being filled in shows the lines nobody has reached yet
in English. To finish one, or add a language of your own, see
[Translate Leaf](/guide/translating/).

## Switching

Go to **Settings > System > Language**, choose one with **Left** and **Right**, and
press **A**. Leaf asks you to confirm, then switches in place: you stay on the same
page, and nothing restarts. Choose **English** the same way to switch back.

## What changes

Menus, settings, dialogs, button hints, the in-game menu, and system messages are
translated. PPSSPP follows too, in every language it has a translation for. RetroArch's
own menus follow when you choose Chinese, and stay in English otherwise. Fun DraStic's
menu follows in Spanish and Chinese.

To run PSP games in a different language from the rest of Leaf, set it in PPSSPP's own
settings. Leaf then stops changing it.

Some languages need letters your font doesn't have, and Leaf swaps the font while that
language is active:

- Chinese, Japanese and Korean use their own font, and the **Font** row in Settings is
  locked.
- Vietnamese uses Nunito in place of **Fredoka**.
- Russian uses Nunito in place of **Space Grotesk**, **Lexend**, **Baloo 2** and
  **Fredoka**.

The **Font** row skips the fonts a language can't use, and your own choice comes back
when you switch language.

## What stays in English

- Game names. They come from your files and from the artwork scraper.
- Console names, such as Game Boy and PlayStation. The arcade category is translated.
- Product and app names: Leaf, RetroArch, and the built-in apps.
- The menus of the other standalone emulators, such as **DraStic**, **Flycast** and the
  **N64 emulator**.

## Chinese and Korean game names

A game file named in Chinese or Korean displays correctly in the launcher, the in-game
menu, PPSSPP's menus, and the File Explorer, whatever language Leaf is set to.

## Fixing a translation

If a line reads wrong, say so on the [Discord](https://discord.gg/q5F7cZ7KRp). You can
try a correction on your own device first with an
[override file](/guide/translating/#testing-it-on-the-device).

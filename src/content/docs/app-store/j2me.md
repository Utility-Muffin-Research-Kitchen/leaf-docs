---
title: J2ME
description: Play Java phone games on Leaf with the optional J2ME content pak, which brings the FreeJ2ME-Plus core and the Java it needs.
---

J2ME games are the Java games that phones from Nokia, Sony Ericsson, Motorola,
and others ran before smartphones. The J2ME pak adds a **J2ME** system with its
own `Roms/J2ME/` folder. It brings the Java it needs, so you don't install
anything else.

## Install

Install **J2ME** from Pak Rat; see
[installing an app](/app-store/introduction/#installing-an-app). **J2ME** appears
with your other systems, and nothing is added to **Apps**. The pak doesn't
include any games.

## Add a game

Copy your games straight into `Roms/J2ME/`:

```text
Roms/J2ME/
  Diamond Rush.jar
  Gravity Defied.jar
```

A J2ME game is a single `.jar`, sometimes with a `.jad` file beside it. You only
need the `.jar`; Leaf ignores the `.jad`. Japanese KDDI games come as `.kjx`,
which the core reads too. Don't unzip either one. File names can be in any
language.

Press **MENU**, then choose **Actions > Rescan Library** after copying games.
A game takes about 6 to 9 seconds to start.

For box art, put `Images/J2ME/Diamond Rush.png` beside the example above, named
like the game, or let Leaf [fetch it from ScreenScraper](/guide/games/#box-art).
ScreenScraper finds J2ME games by file name, so name each `.jar` after the
game's full title: `Asphalt 4 Elite Racing.jar` finds its art, but
`Asphalt 4.jar` doesn't. Anything in parentheses is ignored, so a name such as
`Diamond Rush (Gameloft) (1.0.1).jar` works too. A game without box art shows
the J2ME system icon.

**Delete Game** isn't offered for J2ME games. Use
[Hide Game](/guide/games/#hiding-a-game), or delete the file from your computer.

## Controls

The buttons press the keys of a phone keypad:

| Button | Phone key |
| --- | --- |
| D-pad | the arrow keys |
| **A** | OK / Fire, the center key |
| **B** | 7 |
| **X** | 0 |
| **Y** | 9 |
| **L1** / **R1** | 1 / 3 |
| **L2** / **R2** | * / # |
| **SELECT** / **START** | left / right soft key |
| Left stick | 2, 4, 6, 8 |
| **L3** (press the stick) | 5 |

Most games need only the D-pad, **A**, and the soft keys, which are the two
buttons under a phone's screen. The number keys are there for games that use the
whole keypad, like Doom II RPG. When a game says "press 5", **A** usually works
too.

The in-game menu and hotkeys work as they do on Leaf's other RetroArch cores;
see [Playing games](/guide/playing/).

## Saves

Phone games save in their own menus. This core can't save states, so
**Save State** and **Load State** in the in-game menu show **No states**.

Each game's saves go to `Saves/FreeJ2ME-Plus/freej2me/rms/`, in a folder named
after the game. Some games keep your place only when you leave through their own
menu: Final Fantasy saves when you choose **Quit** in its menu. Leave a game that
way before you choose **Quit** in Leaf's in-game menu.

## A game asks you to touch the screen

Some later games were made for touchscreen phones and wait for a tap. Final
Fantasy is one. FreeJ2ME gives these games a pointer, which follows the right
stick by default. The MLP1 has only a left stick, so for each of these games,
move the pointer to that stick:

1. Start the game and press **MENU**.
2. Open **RetroArch Settings**, then **Quick Menu > Core Options > Advanced
   Settings**, and set **Pointer Stick** to **Left Stick**.
3. Go back to **Core Options**, open **Manage Core Options**, and choose
   **Save Game Options**, so the change applies to this game only.

The left stick now moves the pointer, and pressing the stick (**L3**) taps where
it points. Aim with the left stick, let go, then press **L3** within about 3
seconds to tap. After that the pointer hides and **L3** presses 5 again.
Pressing any other button hides the pointer at once. While **Pointer Stick** is
set, the left stick no longer presses 2, 4, 6, and 8, and the D-pad works as
before.

## A game is cut off or too small

Games are drawn at 240x320 by default, which suits most of them. Older Nokia
games often want 176x208, touchscreen games often want 360x640, and a few
landscape games want 640x480. A game that is cut off at the edges, sits small in
a corner, or says it doesn't support portrait mode needs a different resolution.

To set one for a single game:

1. Start the game and press **MENU**.
2. Open **RetroArch Settings**, then **Quick Menu > Core Options > System**,
   and change **Phone Resolution**.
3. Go back to **Core Options**, open **Manage Core Options**, and choose
   **Save Game Options**.
4. Quit the game and start it again. Until you do, it keeps drawing at the old
   size.

Larger resolutions are slower.

## A game stays on a white screen

Open **RetroArch Settings**, then **Quick Menu > Core Options > Compatibility
Settings**, and set **Repaint on MIDP Display setCurrent** to **Enabled**. Save
it as a game option the same way as the resolution, and restart the game. Need
for Speed: Most Wanted needs this.

## A game doesn't start

FreeJ2ME-Plus doesn't run every phone game, and a few never start; Nokia's
Bounce is one. The same game often exists in several builds for different
phones, so another build of it may work.

## Credits

FreeJ2ME-Plus is the work of Paulo Sousa
([AShiningRay](https://github.com/AShiningRay)), David Richardson
([recompileorg](https://github.com/recompileorg)), Saket Dandawate
([hex007](https://github.com/hex007)), and the
[FreeJ2ME-Plus contributors](https://github.com/TASEmulators/freej2me-plus). The
pak is open source in the
[J2ME-pak repository](https://github.com/Utility-Muffin-Research-Kitchen/J2ME-pak).

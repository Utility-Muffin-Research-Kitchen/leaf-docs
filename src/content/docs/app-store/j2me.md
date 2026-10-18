---
title: J2ME
description: Play Java phone games on Leaf with the optional J2ME content pak, which brings the FreeJ2ME-Plus core and the Java it needs.
---

J2ME games are the Java games that phones from Nokia, Sony Ericsson, Motorola,
and others ran before smartphones. The optional J2ME content pak adds a **J2ME**
system with its own `Roms/J2ME/` folder, and the FreeJ2ME-Plus core that runs the
games. The pak brings the Java runtime that core needs, so you don't install
anything else, and it doesn't add an app to the **Apps** tab.

FreeJ2ME-Plus is the work of Paulo Sousa
([AShiningRay](https://github.com/AShiningRay)), David Richardson
([recompileorg](https://github.com/recompileorg)), Saket Dandawate
([hex007](https://github.com/hex007)), and the
[FreeJ2ME-Plus contributors](https://github.com/TASEmulators/freej2me-plus). The
pak builds their code with a small patch so it runs from inside a pak.

:::note[Requires Leaf 0.12]
The pak needs Leaf 0.12 or newer. Older releases don't offer it in Pak Rat.
:::

## Install

Open **System** with the **Menu** button, go to **Actions**, then choose
**Pak Rat**. Pick **J2ME** and install it over Wi-Fi. The download is about
38 MB, and the pak takes about 68 MB on the card, most of it Java. When the
install finishes, **J2ME** appears with your other systems rather than in
**Apps**.

The pak is open source and independently packaged in the
[J2ME-pak repository](https://github.com/Utility-Muffin-Research-Kitchen/J2ME-pak).
It doesn't include any games.

## Add a game

Copy your games straight into `Roms/J2ME/`:

```text
Roms/J2ME/
  Diamond Rush.jar
  Gravity Defied.jar
```

A J2ME game is a single `.jar`, sometimes with a `.jad` file beside it. You only
need the `.jar`; Leaf ignores the `.jad`. Japanese KDDI games come as `.kjx`,
which the core reads too. Don't unzip either one: a `.jar` already is a zip,
and the core reads it as it is.

Press **MENU**, then choose **Actions → Rescan Library** after copying games.
For box art, put `Images/J2ME/Diamond Rush.png` beside the example above, named
like the game. A game without box art shows the J2ME system icon.

A game takes about 6 to 9 seconds to start, because Java starts with it.

**Delete Game** isn't offered for J2ME games, as for every system a content pak
adds. Use [Hide Game](/guide/games/#hiding-a-game), or delete the file from your
computer.

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
| **Select** / **Start** | left / right soft key |
| Left stick | 2, 4, 6, 8 |
| **L3** (press the stick) | 5 |

Most games need only the D-pad, **A**, and the soft keys, which are the two
buttons under a phone's screen. The number keys are there for games that use the
whole keypad, like Doom II RPG. When a game says "press 5", **A** usually works
too.

Everything else matches Leaf's other RetroArch cores.

- **Menu** opens Leaf's in-game menu over the game; see
  [The in-game menu](/guide/playing/#the-in-game-menu). Choose **Quit** there
  to leave the game. **Save State** and **Load State** show **No states**,
  because this core can't save states; see [Saves](#saves).
- **Menu** held with another button works as it does on other cores. By default,
  **Menu + Select** opens the [Game Switcher](/guide/playing/#the-game-switcher),
  and any RetroArch hotkey you've bound works the same way. See
  [Hotkeys](/guide/features/#hotkeys).

## Games that ask you to touch the screen

Some later games were made for touchscreen phones and wait for a tap. Final
Fantasy is one. FreeJ2ME gives these games a pointer, which follows the right
stick by default. The MLP1 has only a left stick, so for each of these games,
move the pointer to that stick:

1. Start the game and press **MENU**.
2. Open **RetroArch Settings**, then **Quick Menu → Core Options → Advanced
   Settings**, and set **Pointer Stick** to **Left Stick**.
3. Go back to **Core Options**, open **Manage Core Options**, and choose
   **Save Game Options**, so the change applies to this game only.

The left stick now moves the pointer, and pressing the stick (**L3**) taps where
it points. Aim with the left stick, let go, then press **L3** within about 3
seconds to tap. After that the pointer hides and **L3** presses 5 again.
Pressing any other button hides the pointer at once, so you can go back to the
keys without waiting. While **Pointer Stick** is set, the left stick no longer
presses 2, 4, 6, and 8, and the D-pad works as before.

## A game is cut off or too small

Games are drawn at 240x320 by default, which suits most of them. Older Nokia
games often want 176x208, touchscreen games often want 360x640, and a few
landscape games want 640x480. A game that is cut off at the edges, sits small in
a corner, or says it doesn't support portrait mode needs a different resolution.

To set one for a single game:

1. Start the game and press **MENU**.
2. Open **RetroArch Settings**, then **Quick Menu → Core Options → System**,
   and change **Phone Resolution**.
3. Go back to **Core Options**, open **Manage Core Options**, and choose
   **Save Game Options**.
4. Quit the game and start it again. Until you do, it keeps drawing at the old
   size.

Larger resolutions are slower. Asphalt 4 at 640x480 plays, but at about 40
frames per second instead of 60.

## A game stays on a white screen

Open **RetroArch Settings**, then **Quick Menu → Core Options → Compatibility
Settings**, and set **Repaint on MIDP Display setCurrent** to **Enabled**. Save
it as a game option the same way as the resolution, and restart the game. Need
for Speed: Most Wanted needs this.

## A game doesn't start

FreeJ2ME-Plus doesn't run every phone game, and a few never start; Nokia's
Bounce is one. The same game often exists in several builds for different
phones, so another build of it may work.

## Saves

Phone games save in their own menus, and there are no save states. Each game's
saves go to `Saves/FreeJ2ME-Plus/freej2me/rms/`, in a folder named after the
game. Some games keep your place only when you leave through their own menu:
Final Fantasy saves when you choose **Quit** in its menu. Leave a game that way
before you choose **Quit** in Leaf's in-game menu.

- FreeJ2ME's own settings for each game go to
  `Saves/FreeJ2ME-Plus/freej2me/config/`.
- Core options, including the game options you save, are kept with the rest of
  Leaf's RetroArch settings, in `.umrk/mlp1/retroarch/` on your main card.
- FreeJ2ME also creates a `freej2me_system/` folder in `BIOS/` for its log.

Removing the pak removes the system on the next rescan. It doesn't remove your
files under `Roms/`, `Images/`, `Saves/`, or `BIOS/`.

## How it works

Phone games are Java programs, and the MLP1 has no Java. The pak carries its
own, Eclipse Temurin 17, cut down to the parts FreeJ2ME uses. When you start a
game, the core starts that Java beside it, FreeJ2ME runs the game, and each frame
goes to RetroArch. Starting Java is why a game takes a few seconds to appear, and
why the pak is larger than most cores. Game text is drawn with the MLP1
firmware's fonts, so Chinese, Japanese, and Korean games show their text too.

The pak sets a few defaults for a handheld: **A** is Fire, the green tint of an
old phone screen is off, and music plays on two synthesizers instead of four,
which starts games about half a second faster.

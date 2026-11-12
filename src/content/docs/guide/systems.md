---
title: Systems and emulators
description: Which emulator runs each system on Leaf, how to switch, and the controls and setup that are specific to one system.
---

Most systems need nothing beyond a game in the right folder. This page covers the
ones with their own emulator choices, controls or setup. For where games go, see
[Adding games](/guide/games/). For BIOS files, see [BIOS files](/guide/bios-and-cores/).

## Cores (the emulators)

A *core* is the emulator for a given system. Leaf bundles the default emulators;
optional integrations can add other choices. For example,
[native PICO-8](/guide/pico-8/) uses a runtime you purchase separately, while
the bundled FAKE-08 remains the default. A system shows up in the launcher once
its emulator is present on the device. Each bundled emulator is the work of its
own authors: the full license text and
a pointer to the source for every one ships inside the install under
`licenses/`.

Under the hood:

- **RetroArch cores** handle the bulk of systems. Leaf's cores are built with a
  core builder forked from [spruceOS](https://github.com/spruceUI)'s build lane,
  which is itself downstream of
  [libretro-super](https://github.com/libretro/libretro-super) (the same source
  the wider libretro ecosystem uses), so they track upstream rather than being
  hand-maintained forks.
- **Standalone PPSSPP** runs PSP games; a dedicated build outperforms the
  RetroArch core on this hardware. PSP ROMs can be `.chd`, `.iso`, `.cso`, or
  `.pbp`, and PSP needs no BIOS. It comes in two flavors, **PPSSPP (Vulkan)** as
  the default and **PPSSPP (GLES)** as a fallback, switchable with **Core**.
  Standalone sessions work a little differently: the Menu button opens PPSSPP's
  pause menu, and the RetroArch in-game menu and save states don't apply. Volume
  keys work as usual - see
  [PSP controls](/guide/systems/#psp-standalone-ppsspp) for the details.
- **Standalone DraStic** runs Nintendo DS games (`.nds`) from `Roms/NDS/`, and
  needs no BIOS of your own. Like PPSSPP it's a standalone session: the Menu
  button opens DraStic's own menu (save states, options, and the second-screen
  layout live there), so the RetroArch in-game menu doesn't apply. Volume keys
  work as usual. DraStic uses **MENU** as a modifier for save states, layouts, and
  the transparent second screen - see
  [Nintendo DS controls](/guide/systems/#nintendo-ds-standalone-drastic) for the
  full list. **Fun DraStic** is an alternate front end for the same emulator,
  selectable per game - see [Nintendo DS](#nintendo-ds) below.
- **Standalone N64** runs Nintendo 64 games from `Roms/N64/` through Leaf's
  packaged Mupen64Plus build. The standard RetroArch N64 core is still available
  as an alternate core, but standalone is the default because it gives Leaf more
  direct control over the video plugins, performance settings, save-and-quit
  handoff, and MLP1 display quirks.
- **Standalone Flycast** runs Dreamcast, Atomiswave, and Naomi games from
  `Roms/DC/`, `Roms/ATOMISWAVE/`, and `Roms/NAOMI/`. It is the default for all
  three systems; the RetroArch Flycast core remains an alternate, followed by
  KM Flycast Xtreme when that optional core is installed. Like the other
  standalone emulators it runs its own session: the Menu button opens Flycast's
  native menu, correctly oriented for the portrait-mounted screen, and the
  RetroArch in-game menu doesn't apply. VMU data, save states, and settings use
  the same durable Flycast locations for all three systems and survive Leaf
  updates - see [Flycast controls](/guide/systems/#dreamcast-atomiswave-and-naomi-standalone-flycast).
- **Standalone YabaSanshiro** is an optional, faster Saturn route for directly
  launched `.ccd`, `.chd`, `.cue`, `.iso`, and `.mds` games. RetroArch
  YabaSanshiro remains the default because its playlists, compressed-game
  handling, menu, and disc controls are more complete. The standalone emulator
  uses its own native menu and save-state format; see
  [Saturn controls](/guide/systems/#saturn-optional-standalone-yabasanshiro).
- **Neko Project II kai** runs NEC PC-98 software from `Roms/PC98/` through
  RetroArch. It supports disk control for multi-disk software and uses firmware
  from `BIOS/np2kai/` when supplied.
- **PUAE 2021** runs Amiga OCS/ECS, AGA, CDTV, and CD32 content from
  `Roms/AMIGA/` through RetroArch. **PUAE** is available as an alternate through
  **Core**. Both support disk control and use model-specific Kickstart firmware
  from `BIOS/puae/`.

Because Leaf runs upstream RetroArch, features that upstream adds (including
RetroAchievements with compatible cores) come along for the ride rather than
needing to be reimplemented.

When a system has more than one emulator, you don't need a second ROM folder for
it. Keep all of that console's games in its one folder and switch emulators with
the **Core** option (press **X** on a game or system; see
[Adding games](/guide/games/#options-menu)). For example, Game Boy Advance games
all live in `Roms/GBA/` whichever core you pick.

### Game Boy Advance: mGBA vs gpSP

Leaf keeps **mGBA** as the default because it has the broader compatibility and
accuracy. **gpSP** is available as a faster alternate: on the MLP1 it delivered
about 1.86 times mGBA's fast-forward rate in a matched reference test scene.
Normal-speed play, zipped games, in-game saves, and save states all work through
the gpSP path.

To try gpSP for one game, press **X** on that game, choose **Core**, then choose
**gpSP**. To return to mGBA, choose **mGBA**, or use **Reset Overrides** to clear
the game's custom core and return to the system default.

The two cores keep their saves and save states separate. A save made in one core
does not appear in the other, and their save-state formats are not compatible.
Do not copy or move save states between mGBA and gpSP; switch back to the core
that created the state instead.

Use mGBA when a title fails under gpSP. For example, the homebrew game *Glory
Hunters* exits under the current gpSP build but works in mGBA. A commercial game
with an in-game clock works with gpSP's default automatic RTC setting, but a
strict RTC test ROM fails there and passes in mGBA, so mGBA is also the safer
choice for RTC homebrew, test software, and ROM hacks. No manual gpSP RTC setting
is normally needed.

### Nintendo 64: standard vs standalone

Leaf lists Nintendo 64 as one system, with one ROM folder: `Roms/N64/`.
The difference is the emulator selected by the **Core** option:

- **Mupen64Plus Standalone** is Leaf's default. It is a native Mupen64Plus
  package with Rice and GLideN64 video plugins, plus a Leaf-themed overlay for
  save states, per-game settings, and save-and-quit resume.
- **Mupen64Plus Next** is the standard RetroArch/libretro N64 core. Choose it if
  a specific game behaves better there, or if you specifically need RetroArch's
  own in-game menu, shaders, or RetroAchievements path for that title.

We default to standalone because N64 is one of the hardest systems for the MLP1:
the native package gives us tighter control over rendering, display rotation,
and game-specific settings than the generic RetroArch core path. That makes it
the better baseline for the device, while keeping the RetroArch core available
as a compatibility fallback.

### Saturn: RetroArch vs standalone

Leaf keeps **YabaSanshiro** in RetroArch as the Saturn default. It provides the
normal Leaf and RetroArch menus and is the route used for `.m3u` playlists and
`.zip` files.

**YabaSanshiro Standalone** is an optional faster route for direct `.ccd`,
`.chd`, `.cue`, `.iso`, and `.mds` launches. Pick it with **Core** for a
compatible game. It is not offered for `.m3u` or `.zip` entries because those
formats fail in the standalone frontend.

The two routes use different save-state formats, which are not compatible. Standalone uses `Saves/YabaSanshiro/` and
`States/YabaSanshiro/`; switch back to the emulator that created a state rather
than moving states between them.

**Yabadabadoo** is an experimental alternate Saturn core you can add from Pak
Rat. It's tuned for low-power handhelds, needs a real BIOS in `BIOS/SATURN/`,
and keeps its own saves and states in `Saves/Yabadabadoo/` and
`States/Yabadabadoo/`. See [Yabadabadoo](/app-store/yabadabadoo/).

:::note
The heaviest systems (PSP, Dreamcast, N64) are demanding on this hardware. Whether
a given game runs at full speed varies by title; treat these as "best effort,"
not guaranteed.
:::

### Nintendo DS

Leaf lists Nintendo DS as one system, with one ROM folder: `Roms/NDS/`. Two front
ends are available through the **Core** option:

- **DraStic** is the default, using [Steward Fu](https://github.com/steward-fu/nds)'s
  front end. It's what the [Nintendo DS controls](/guide/systems/#nintendo-ds-standalone-drastic)
  describe.
- **Fun DraStic** is by [tenlevels](https://github.com/tenlevels): a redesigned
  menu, screen overlays, extra screen layouts, and themes.

Both run the same closed-source DraStic emulator binary. Choose the front end
whose menus, layouts, and controls you prefer; the alternate interface does
not provide a newer emulator core.

To move a game across, press **X** on it, choose **Core**, and pick the other
one. To put it back on the default, choose **Core** again and pick **DraStic**, or
use **Reset Override** to clear the per-game choice entirely.

Your in-game saves are shared, so a game keeps its progress whichever front end
you play it in. Save states and settings are not shared: each front end keeps its
own, and a save state you made in one won't be there in the other. Save in-game
before you switch.

Neither one needs a BIOS file of your own; both include DraStic's own free
replacement BIOS, and most games run on it with no setup at all.

If you need original Nintendo files, for example for encrypted ROMs, supply
your own dumps using these names and sizes:

| File | Size |
| --- | --- |
| `nds_bios_arm7.bin` | 16 KB (16,384 bytes) |
| `nds_bios_arm9.bin` | 4 KB (4,096 bytes) |
| `nds_firmware.bin` | 256 KB (262,144 bytes) |

The two front ends read them from different places on your primary card:

- **Fun DraStic** reads them directly from `BIOS/`.
- **DraStic** reads them from `.umrk/mlp1/drastic/system/`, which is its durable
  runtime data folder.

Putting them in `BIOS/NDS/` does not make them available to both front ends.
Neither location above is replaced by a Leaf update. Your DS username,
birthday, favourite colour, and language are emulator settings; supplying
`nds_firmware.bin` does not import those settings from your console.

Both DraStic front ends accept `.nds` files, and `.zip` and `.7z` archives
containing one.

#### DSperate (optional pak)

[DSperate](https://github.com/beebono/DSperate), by
[beebono](https://github.com/beebono), is an independent Nintendo DS emulator.
Install the [DSperate content pak](https://github.com/Utility-Muffin-Research-Kitchen/DSperate-pak/releases/tag/v3.0.5)
through Pak Rat on Leaf 0.12.0 or newer. On MLP1, it adds two more cores for
the same Nintendo DS system: **DSperate** and **DSperate TATE**. Choose one in
the system's or game's **Core** setting. DSperate keeps your saves separate
from both DraStic front ends.

**DSperate TATE** stacks the two screens down the long side of the screen, so
they're about a third bigger. Turn the MLP1 a quarter clockwise, with the d-pad
at the top: the d-pad, face buttons and stick turn with it. TATE uses
DSperate's saves, save states and settings, so you can switch between the two
in the middle of a game. It doesn't use the RetroAchievements account saved in
Leaf yet; plain DSperate does.

To play TATE on a TV, turn the TV a quarter clockwise instead and hold the MLP1
as usual. This needs Leaf 0.14 or newer. On Leaf 0.12 and 0.13, TATE can't
tell it's on a TV, so it turns the controls there too.

DSperate reads `.nds` and `.zip` files. Launching a `.7z` shows a warning:
extract it to `.nds`, or choose another Nintendo DS emulator.

DSperate 3 can't load save states made in DSperate 2.x. In-game saves carry
over, so save in the game before you update.

## Standalone emulators from content paks

An emulator installed by a content pak can use **MENU** for its own menu. Tap
and release **MENU** to open it. If the pak doesn't provide a menu, tapping
**MENU** shows **Return to Leaf?** instead. Tap **MENU** again within four
seconds to quit back to Leaf, or let the prompt disappear to keep playing.

To leave a stuck session, hold the handheld's **MENU** button alone for three
seconds. Leaf asks the emulator to quit. If it stays open, keep holding for
another two seconds to force it to stop. Unsaved progress can be lost.
There's no Leaf message over the emulator during this hold.

Release **MENU** to cancel the forced stop. Pressing another built-in button,
moving the D-pad or stick, or using **Volume** or **Power** also cancels it.
Start with the other controls released and the stick centred. After a
cancellation, release **MENU** before trying again.

Built-in **MENU** chords never open the emulator's menu. **MENU + Volume**
still changes brightness. A shortcut the emulator can't use forwards only
the other button.

On an external controller, **Guide** reaches the emulator directly. Its
chords aren't filtered, and holding it won't perform Leaf's escape gesture.
If the pak doesn't provide a menu, **Guide** shows **Return to Leaf?** too,
and a second press quits. If the emulator stays open, confirm again at least
two seconds later to force it to stop. Use the handheld's
**MENU** button for the escape hold.

Native PICO-8 and the bundled standalones keep their controls described on
their own pages.

## Nintendo 64 (standalone Mupen64Plus)

Nintendo 64 games default to **Mupen64Plus Standalone** rather than the standard
RetroArch N64 core. Both use the same `Roms/N64/` folder; switch between them
with **Core** from a game or system's **Options** menu.

Standalone is the default because it lets Leaf tune the MLP1-specific parts that
matter most for N64: video plugin choice, display handling, performance options,
and the save-and-quit handoff back to the launcher. The RetroArch core remains
available as an alternate when a particular game behaves better there.

Controls that differ from RetroArch. These are fixed, not the configurable
[hotkeys](/guide/features/#hotkeys):

- **MENU** - open the Leaf N64 overlay.
- **MENU + SELECT** - save the current state and hand off to Leaf's game
  switcher/recents flow.
- **A** from the game switcher or recents - resume the saved N64 state.
- **RetroArch Settings** does not appear while using standalone N64; renderer and
  N64-specific options live in the standalone overlay instead.

### D-pad or stick

Some N64 games only read the analog stick. **Input Mode** decides what the d-pad
does:

- **D-Pad**, the default, sends the N64 d-pad.
- **Joystick** steers the N64 analog stick with the d-pad.

Press **MENU** during a game and change it in **Options > Controls > Input Mode**,
or bind **Options > Shortcuts > Toggle Input Mode** to a button. Each game keeps
its own mode.

You can also bind a d-pad direction to any N64 button, such as the C buttons. In
**Options > Controls**, pick **C-Up**, press **A**, then press up on the d-pad. In
**D-Pad** mode that direction then sends C-Up instead of the d-pad, and **R2 + X**
still works too. In **Joystick** mode the d-pad steers the stick and these bindings
rest.

[AlexL](https://github.com/dapass5) made **Input Mode** work on this device.

## Saturn (optional standalone YabaSanshiro)

Saturn games default to **YabaSanshiro** in RetroArch. For a directly launched
`.ccd`, `.chd`, `.cue`, `.iso`, or `.mds` game, you can instead choose
**YabaSanshiro Standalone** with **Core** from the game or system **Options**
menu. The standalone route performed better in device testing, but RetroArch
remains the safer default and is always used for `.m3u` playlists and `.zip`
files.

YabaSanshiro is developed by [devMiyax](https://github.com/devmiyax/yabause).

In RetroArch, the face buttons follow the shape of a Saturn pad. **Y**, **B**,
and **A**, left to right around your thumb, are the Saturn's A, B, and C
buttons, and **L1**, **X**, and **R1** are its X, Y, and Z:

| Saturn | MLP1 |
| --- | --- |
| A, B, C | **Y**, **B**, **A** |
| X, Y, Z | **L1**, **X**, **R1** |
| L, R | **L2**, **R2** |
| Start | **Start** |

To move a button for one game or for all of them, open **RetroArch Settings**
in the in-game menu, change it in **Quick Menu > Controls**, and save a remap
file there.

Standalone runs its own session, so Leaf's in-game menu, game switcher, and
RetroArch save states do not apply:

- **MENU** opens YabaSanshiro's own menu, where you can resume, manage native
  save states, change emulator settings, or exit.
- In-game saves are kept under `Saves/YabaSanshiro/`; native `.yss` states are
  kept under `States/YabaSanshiro/`. They are not compatible with RetroArch
  save states or Leaf's state browser.
- HLE BIOS is used by default. For a real BIOS, use **Saturn BIOS** in the
  game or system **Options** menu. See
  [BIOS and cores](/guide/bios-and-cores/#saturn-choosing-a-bios).
- The native **Open/Close CD Tray** picker only scans the current game's folder
  for sibling `.cue`, `.mdf`, `.ccd`, and `.chd` files. It does not understand
  Leaf `.m3u` playlists and does not list sibling `.iso` or `.mds` files, so the
  list may be empty even when another disc is present. Use RetroArch for
  reliable multi-disc playlist switching.

## Nintendo DS (standalone DraStic)

Nintendo DS games run in **DraStic**, a standalone emulator rather than RetroArch,
so the in-game menu, save states, and switcher above don't apply - DraStic has its
own menu and its own controls.

Leaf ships two front ends for DraStic. The default one is described here; **Fun
DraStic** is an alternate you can pick per game, and it's covered
[further down](#fun-drastic-the-alternate-ds-front-end).

DraStic itself is closed-source. The two-screen layouts, the transparent overlay,
and the button shortcuts below all come from
[Steward Fu](https://github.com/steward-fu/nds)'s open-source SDL2 wrapper for
DraStic, which Leaf forks and builds on - most of the heavy lifting here is his
work. Because the DS has two screens and a touch screen, the wrapper maps
everything onto the handheld using **MENU** as a modifier you hold together with
another button.

These chords are **fixed** and belong to DraStic, not to Leaf. They are not the
configurable [hotkeys](/guide/features/#hotkeys).
**MENU + L1** here quits DraStic regardless
of what you have set your Leaf screenshot shortcut to.

### Everyday controls

- **MENU** (tap and release) - open DraStic's own menu: save/load states, options,
  and the screen-layout picker.
- **MENU + Start** - open the Steward Fu menu for the see-through second screen
  (its size, position, transparency, and border).
- **MENU + A** - flip between your two saved screen layouts. By default that's the
  normal stacked view and a transparent second screen tucked into the corner.
- **MENU + Left / Right** - cycle through all of the screen layouts.
- **L2** - switch the D-pad between controlling the game and controlling the DS
  touch pointer. In pointer mode the D-pad moves the stylus and **A** taps the
  screen; press **L2** again to switch back.
- **R2** - swap the two DS screens, so the other one becomes the main view. Handy
  with the transparent overlay, or for games that put the action on the bottom
  screen.

### Save states, fast-forward, and quitting

- **MENU + L2** - save state.
- **MENU + R2** - load state.
- **MENU + R1** - fast-forward (hold).
- **MENU + L1** - quit back to the launcher.
- **MENU + Select** - also opens DraStic's own menu.

### Display tweaks

- **MENU + B** - toggle the picture between sharp pixels and smoothing.
- **MENU + Y** - cycle the menu background art (or, in pointer mode, the stylus
  cursor).

**MENU + Up** is intentionally inactive on the Pocket 1. On other devices it
toggles DraStic's microphone, but that feature relies on a recorded sample played
back into the game rather than live mic input, and the Pocket 1's 64-bit DraStic
is a closed-source build the wrapper has to drive through fragile internal entry
points. Triggering the microphone that way crashed the emulator, so the shortcut
is switched off here until it can be wired up safely.

Inside DraStic's own menu (and the Steward Fu menu), use the **D-pad** to move,
**Left / Right** to change a value, **A** to confirm, and **B** to go back or close.

### Fun DraStic, the alternate DS front end

**Fun DraStic** gives your DS games a redesigned menu, screen overlays, more
screen layouts, and themes. Switch a game over to it with **Core**
from that game's **Options** menu, and switch back the same way. DraStic stays the
default for everything you haven't changed.

Fun DraStic runs the same closed-source DraStic emulator binary as the default
front end. You are choosing its menus, layouts, and controls; there is no
newer emulator core underneath.

Fun DraStic is by [tenlevels](https://github.com/tenlevels), whose work is the
menus, overlays, screen layouts, and presentation, in the same way the default DS
front end is Steward Fu's work. You can read
[Fun DraStic's source and credits](https://github.com/Utility-Muffin-Research-Kitchen/Fun-Drastic-src);
the frontend uses the PolyForm Noncommercial 1.0.0 license.

A few things to know before you switch a game over:

- **MENU** opens Fun DraStic's own menu, which is laid out differently from the
  default one. The **MENU + button** shortcuts above belong to the Steward Fu
  front end and don't carry over.
- The menu follows your Leaf language when that's Spanish or Chinese, and is in
  English otherwise, thanks to [AlexL](https://github.com/dapass5). Its translated
  menus draw Latin letters in Fun DraStic's own font, not the Leaf theme's.
- The **Cheats** page lists the cheats in Fun DraStic's bundled database for the
  game you're playing, about 145,000 in all, including ones with Chinese names.
- Your in-game saves come with you. Both front ends read and write the same DS
  save files, so a game you switch keeps its progress, and so does a game you
  switch back.
- Save states and settings do not. Each front end keeps its own, so a save state
  you made in one won't appear in the other. Save in-game before you switch.
- Neither one needs a BIOS file of your own. See
  [BIOS and cores](/guide/systems/#nintendo-ds) for the included
  replacement BIOS and the correct locations for optional Nintendo files.

## NEC PC-98 (Neko Project II kai)

PC-98 games run through the Neko Project II kai RetroArch core. Leaf enables
the core's **Arrows** joypad mode by default so games that ask you to press a
key work from the handheld without a keyboard:

- **D-pad** - keyboard arrow keys.
- **A / B** - keyboard **X / Z**.
- **X / Y** - keyboard **Space / Left Ctrl**.
- **L1 / R1** - keyboard **Backspace / Right Shift**.
- **SELECT / START** - keyboard **Escape / Return**. Press **START** at a
  typical "press any key" prompt.

For a mouse-driven game, open **MENU → RetroArch Settings → Quick Menu → Core
Options** and change **Joypad D-pad to Mouse/Keyboard/Joypad Mapping** to
**Mouse**. In that mode the D-pad moves the pointer, **B** left-clicks, and
**A** right-clicks. Switch it back to **Arrows** for keyboard-driven games.
For software that needs two floppy drives populated at startup, use a
[PC-98 `.cmd` launch file](/guide/systems/#pc-98-games-that-need-multiple-disks-at-startup).
Later disk changes can be made from RetroArch's **Disc Control** menu.

## Pokémon mini (PokeMini)

Pokémon mini games run through the PokeMini RetroArch core. The console's
buttons map to the Pocket 1 like this:

- **D-pad**, **A**, and **B** - the same buttons on the Pokémon mini.
- **R1** - the **C** button.
- **L1** - **Shake**, for games that react to you shaking the console, such as
  nudging the table in Pokémon Pinball Mini.
- **X** - **A** with turbo.
- **SELECT** - the console's **Power** button. Pressing it switches the
  emulated Pokémon mini off, which leaves a blank screen; press **SELECT**
  again to switch it back on.

The first time you start a game it asks you to set the clock, just as a
new console did. The game keeps that, along with your progress, in its own
save file in `Saves/PokeMini/`, which is written when you quit the game.

## Amiga (PUAE)

Amiga games run through **PUAE 2021** in RetroArch by default. You can choose
**PUAE** instead with **Core** in the game or system **Options** menu. Both
come from the [UAE and libretro teams](https://github.com/libretro/libretro-uae).
They keep separate save and state folders, so return to the same core to
continue your progress. The default handheld controls are:

- **D-pad** - joystick; **B / A** - fire buttons 1 / 2.
- **Left or right analog stick** - mouse; **L2 / R2** - left / right mouse button.
- **X** - Space.
- **SELECT** (short press) - toggle PUAE's virtual keyboard. In the keyboard,
  use the **D-pad** to move, **B** to press a key, **A** for transparency, **X** for
  Space, and **START** for Return.

Some Amiga games expect a mouse instead of a joystick. Open the virtual keyboard
and choose **J/M**, or change **Quick Menu → Core Options → RetroPad
Joystick/Mouse**. Multi-disk games use **MENU → RetroArch Settings → Quick Menu
→ Disc Control** to eject, choose the next disk, and insert it.

PUAE 2021 saves normal game data under `Saves/PUAE 2021/` and states under
`States/PUAE 2021/`. The alternate PUAE core uses `Saves/PUAE/` and
`States/PUAE/`. CDTV/CD32 NVRAM, WHDLoad helper/save images, generated save disks,
and core configuration are durable user data and survive Leaf updates. Writes
made inside a ZIP are the exception: PUAE does not repack the temporary archive,
so follow the persistence advice in
[Adding games](/guide/systems/#amiga-games-archives-and-multiple-disks).

## Dreamcast, Atomiswave, and Naomi (standalone Flycast)

Dreamcast, Atomiswave, and Naomi games default to **standalone Flycast** rather
than the RetroArch Flycast core, because the standalone path performs noticeably
better on this hardware. Each system keeps its own ROM folder (`Roms/DC/`,
`Roms/ATOMISWAVE/`, or `Roms/NAOMI/`), while Naomi, Naomi GD-ROM, and Naomi 2 all
share `Roms/NAOMI/`. Switch emulator with **Core** from a game or system's
**Options** menu; RetroArch Flycast remains the first compatibility fallback.

Like the other standalone emulators, it runs its own session, so the in-game
menu, save states, and switcher above don't apply:

- **MENU** - open Flycast's own menu, rotated to match the screen. Save states,
  video and controller settings, and exiting all live there.
- **SELECT** - insert a coin in Atomiswave and Naomi games.
- **A, B, L1, X, Y, R1** - arcade buttons 1 through 6 respectively. Metal
  Slug 6 uses L1 for grenades.
- **L2 / R2** - Dreamcast left and right analog triggers. Crazy Taxi uses L2
  for brake/reverse and R2 for acceleration.
- Dreamcast uses VGA output by default. Flycast automatically falls back to
  composite for games that do not support VGA.
- Your VMU memory-card data and Flycast settings survive Leaf updates. VMU data
  and saves are kept under `Saves/Flycast/`, and Flycast's own save states under
  `States/Flycast/`. Dreamcast, Atomiswave, and Naomi share these durable
  locations rather than creating separate emulator copies.

## PSP (standalone PPSSPP)

PSP games run in **PPSSPP**, standalone rather than through RetroArch, because a
dedicated build is much faster on this hardware. There are two versions to pick
from with **Core** in a game or system's **Options** menu:

- **PPSSPP (Vulkan)** - the default, and the faster of the two.
- **PPSSPP (GLES)** - a fallback for anything that misbehaves on Vulkan.

Both read the same `Roms/PSP/` folder, and PSP needs no BIOS.

This is PPSSPP's own session, so Leaf's in-game menu, Leaf's save states, and the
game switcher don't apply:

- **MENU** - open PPSSPP's own pause menu. Save states, its graphics and control
  settings, and exiting the game all live in there.
- Volume keys work as usual.

Those menus follow Leaf's language, so setting Leaf to 中文 puts PPSSPP in Simplified
Chinese as well. See [Language](/guide/language/).

The analog stick uses the calibration from
[Joe's Calibrage](/apps/introduction/#joes-calibrage), so if the stick drifts or doesn't reach
full tilt in PSP games, calibrate it there rather than inside PPSSPP.

### If your face buttons or stick were wrong

Early Leaf releases shipped a default mapping with **Square** and **Triangle**
swapped, and with analog **Up** mapped to a button instead of the stick. Both are
fixed.

If you have been playing PSP games since before that fix, Leaf corrects the two
mappings once, on the next PSP launch. It only touches them if they still hold
those exact original values, so a mapping you set yourself is left alone. If you
had already worked around the swap with your own remap, that remap survives and
you may want to undo your workaround in PPSSPP's control settings.

## Native PICO-8

The optional [PICO-8 integration](/guide/pico-8/) lets you return to Leaf by
pressing **MENU**, then pressing **MENU** again within four seconds to confirm.
Let the prompt disappear to keep playing. Use **START** to open
PICO-8's own menu. Choose **Shutdown** for a direct cart, or **Options >
Shutdown PICO-8** in Splore, to return to Leaf. A Splore cart also offers
**Exit to Splore**. Volume controls work normally.

Native progress belongs to PICO-8 and is separate from FAKE-08. RetroArch's
menu, shaders, rewind, achievements, and savestates don't apply to native play.

## Naomi and Atomiswave arcade sets

A `.zip` in either of these folders is a MAME/Flycast ROM set, not a generic
compressed game. Its filename before `.zip` is a machine-readable game ID. Do
not replace that shortname with the friendly title: Flycast will not identify
the game. Leaf shows the friendly title automatically, so `doa2m.zip` appears
as **Dead or Alive 2 Millennium** without changing the file on disk.

On the SD card, a cartridge example keeps its set archive alongside the
matching BIOS:

```text
Roms/NAOMI/doa2m.zip
BIOS/dc/naomi.zip
```

A Naomi GD-ROM set uses its shortname ZIP as the launchable entry and keeps the
CHD in a same-shortname subfolder:

```text
Roms/NAOMI/ikaruga.zip
Roms/NAOMI/ikaruga/gdl-0010.chd
BIOS/dc/naomi.zip
```

Launch `ikaruga.zip`, not the CHD. Split sets may also require their parent ZIP.
Keep every archive, parent, subfolder, and media filename exactly as supplied by
a compatible MAME/Flycast set. Renaming an incompatible dump does not convert it
into a compatible set.

For a wider title-to-shortname lookup, [Flycast's upstream Naomi compatibility
list](https://github.com/libretro/flycast/issues/136?timeline_page=1) includes a
`romset` column. Its compatibility results were collected against an older core,
so use the names as a lookup aid rather than a Leaf compatibility guarantee.

## PC-98 games that need multiple disks at startup

Some PC-98 software expects Disk A in the first floppy drive and Disk B in the
second drive immediately at startup. Launching Disk A by itself can produce a
**Not ready** message. Keep the images together and add a UTF-8 `.cmd` file in
the same folder, for example:

```text
Dragon Knight 4 Special Disk.cmd
Dragon Knight 4 Special Disk (Disk 1 of 2)(Disk A).fdd
Dragon Knight 4 Special Disk (Disk 2 of 2)(Disk B).fdd
```

The `.cmd` file contains one line. Quote every filename that contains spaces:

```text
np2kai "Dragon Knight 4 Special Disk (Disk 1 of 2)(Disk A).fdd" "Dragon Knight 4 Special Disk (Disk 2 of 2)(Disk B).fdd"
```

The first floppy image is mounted in FDD1 and the second in FDD2. Launch the
`.cmd` entry from Jawaka; Jawaka hides the disk files referenced by that command
so the game appears only once. Unreferenced images remain visible as normal.
Use RetroArch's **Disc Control** later if the software asks for another disk.

## Amiga games, archives, and multiple disks

Keep every supported Amiga family in `Roms/AMIGA/`: A500/OCS, A600/ECS,
A1200/A4000/AGA, CDTV, and CD32 do not use separate public folders. PUAE chooses
the machine model from the content type and familiar path tags such as `AGA`,
`CDTV`, or `CD32`. For example, include `CDTV` in the filename or a parent-folder
name when CD content must boot as CDTV rather than the normal CD32 default.

Leaf passes individual game `.zip` and `.7z` archives to PUAE intact. If you
download a large collection ZIP containing many per-game ZIPs, unpack the outer
collection once on your computer and copy only the individual game archives to
`Roms/AMIGA/`. Do not unpack a preinstalled WHDLoad `.lha`; launch the LHA
directly. Writes made inside a temporarily extracted ZIP are not repacked, so
use an uncompressed disk image, a dedicated save disk, or a WHDLoad LHA when a
game must write persistent data.

For a multi-disk game, create a text `.m3u` file with one disk per line and
launch that playlist. Leaf shows the M3U as the game and hides its referenced
members, including entries with friendly labels such as
`Disk 1.adf|Game Disk` or ZIP members such as `Game.zip#Disk 1.adf`. PUAE also
understands `#SAVEDISK:Label` in an M3U. Change media with RetroArch's **Disc
Control** menu.

Leaf deliberately does not list `.ipf`, loose `.slave`, or loose `.info` files.
IPF needs a separately packaged CAPSIMG library that this release does not ship;
preinstalled WHDLoad games should remain in `.lha` archives.

## RPG Maker 2000 and 2003 games

**EasyRPG Player** runs games made with RPG Maker 2000 and 2003 from
`Roms/EASYRPG/`. An RPG Maker game is a whole folder of files rather than one
file, so give each game its own folder and copy the folder across as it is:

```text
Roms/EASYRPG/Yume Nikki/RPG_RT.ldb
Roms/EASYRPG/Yume Nikki/RPG_RT.lmt
Roms/EASYRPG/Yume Nikki/Map0001.lmu
Roms/EASYRPG/Yume Nikki/CharSet/
...
```

Leaf lists the game under its folder name, so name the folder after the game.
It launches the game through `RPG_RT.ldb`, which has to stay in that folder with
the rest of the game's files. Don't rename it.

Your progress from the game's own save menu is written into the game's folder,
next to `RPG_RT.ldb` (`Save01.lsd` and so on). Keep those files if you replace
the folder with a newer version of the game. EasyRPG has no save states, so the
in-game menu has none to save or load.

A game packed as a `.zip`, or as an `.easyrpg` file, also works as a single file
in `Roms/EASYRPG/`, and is listed under its filename. EasyRPG can't write inside
those, so the game saves to a folder next to it instead, such as
`Yume Nikki.zip.save`. Prefer a folder or a `.zip`: ScreenScraper rarely
recognizes `.easyrpg` names, so those games seldom get box art.

For box art, name the image after the folder: `Images/EASYRPG/Yume Nikki.png`.
**Scrape Artwork** searches ScreenScraper by the folder name too, so a folder
named with the game's plain title finds its art most often.

### The RPG Maker RTP

Many RPG Maker games rely on the **RTP** (Run Time Package), the shared graphics,
music, and sound that RPG Maker installed on the player's PC. A game that ships
all of its own files doesn't need it. Without the RTP, a game that does need it
shows blank graphics, plays without music, or stops with an error about a missing
file.

The RTP isn't included with Leaf. Install the RPG Maker 2000 or 2003 RTP on a
Windows PC, then copy the folders it installs (`Backdrop`, `Battle`, `CharSet`,
`ChipSet`, `Music`, `Sound`, and the rest) into a folder named after its version
in `BIOS/rtp/`:

```text
BIOS/rtp/2000/CharSet/
BIOS/rtp/2000/Music/
...
BIOS/rtp/2003/CharSet/
BIOS/rtp/2003/Music/
...
```

EasyRPG works out which version a game was made with and looks in the matching
folder, so you can keep both. Games on a second SD card use that card's `BIOS/`
folder, so give that card its own copy.

A system appears in the launcher once its emulator core is available on the
device. If a folder's system isn't showing up, its core may not be installed;
see [BIOS & cores](/guide/bios-and-cores/).

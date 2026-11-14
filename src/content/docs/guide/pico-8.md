---
title: Native PICO-8 and Splore
description: Set up your purchased PICO-8 runtime, browse Splore, and play local carts on MLP1.
---

Native PICO-8 lets you browse Splore and play PICO-8 carts on your MLP1.
**PICO-8 for Leaf** is an optional integration. You supply the paid runtime
from [Joseph White / Lexaloffle](https://www.lexaloffle.com/pico-8.php).
FAKE-08 remains available and stays your default until you choose native PICO-8.

## Install

1. Purchase PICO-8 from Lexaloffle and download the **Raspberry Pi** ZIP. The
   Windows, macOS, and desktop Linux downloads won't work here.
2. Install **PICO-8 for Leaf** from Pak Rat; see
   [installing an app](/app-store/introduction/#installing-an-app).
3. Extract `pico8_64` and `pico8.dat` from the ZIP's `pico-8` folder. Copy both
   files from the same download to `BIOS/PICO8/` on your primary card:

```text
BIOS/
  PICO8/
    pico8_64
    pico8.dat
```

Keep the names and capitalization shown above. Don't copy the enclosing
`pico-8` folder into `BIOS/PICO8/`, and don't rename `pico8_64` to `pico8`.

## Browse Splore

Open **Apps > PICO-8 for Leaf**. Connect to Wi-Fi to refresh BBS lists and
download games. Select a game and press an action button to open it.

Splore's local file browser starts at your primary card's `Roms/PICO8/`.
Its `/` means that library root. It doesn't expose the whole SD card.
Use Leaf's game library to launch carts from your secondary card.

## Keep Splore favorites in Leaf

Select a game in Splore, press **START**, and choose **Favourite**. When you
exit Splore, Leaf copies your downloaded favorites into your PICO-8 game
library. Allow the library scan to finish after returning to Leaf.

Your copies live in `Roms/PICO8/Splore/` on the primary card. They start on
native PICO-8 and share your existing native progress. You can change their
**Core** choice later. Splore favorites and Leaf favorites stay separate.

If Splore only supplies an ID as a title, Leaf makes it readable, for example
`pilatro_35` becomes **Pilatro 35**. A display name you set in Leaf is kept.

Removing a Splore favorite keeps your library copy. Whenever you exit Splore,
Leaf also updates imported games that Splore has downloaded newer versions of.
Their library entries, playtime, and core choices stay in place. A cart you've
edited yourself isn't overwritten: edited carts and filename conflicts are
skipped, and no error is shown.

A favorite must finish downloading before it can be imported. Leaf tries again
after your next Splore session. If you delete an imported game while it remains
a Splore favorite, Leaf imports it again.

## Choose native playback for local carts

Put `.p8` or cartridge `.p8.png` files in `Roms/PICO8/` on either card.
Extract archives first. An ordinary PNG picture isn't a PICO-8 cartridge.

Press **X** on a game or on the PICO-8 system, choose **Core**, then choose
**PICO-8 (native)**. A game choice overrides the system choice. Choose
**FAKE-08** to switch back, or use **Reset Game Overrides** to remove a custom
choice and inherit the default.

If the native runtime is missing or can't start, Leaf uses FAKE-08 for local
carts. Your saved core preference stays in place.

## Controls and returning to Leaf

Press **MENU** to show **Return to Leaf?**, then press **MENU** again within
four seconds to quit PICO-8 normally. If you want to keep playing, let the
prompt disappear. This works in a game and in Splore, even when no cart is
selected. If PICO-8 stays frozen, wait at least two seconds and repeat the
**MENU** confirmation to force it to close. Unsaved progress may be lost.

Use the D-pad and action buttons to navigate and play. Press **START** for
PICO-8's native menu:

- A directly launched cart offers **Shutdown**.
- A Splore cart offers **Exit to Splore** and **Options > Shutdown PICO-8**.
- In the Splore browser, select a cart and use **START > Options > Shutdown
  PICO-8** to return to Leaf.

RetroArch's shaders, achievements, rewind, savestates, and Leaf's RetroArch
menu don't apply to native PICO-8.

## Your progress and files

Native PICO-8 keeps your configuration, cartridge progress, controller
mappings, and Splore cache in `.userdata/mlp1/pico8/` on the primary card.
Captures go to `Recordings/PICO8/` on the same card. Updating or removing the
integration leaves that folder and your runtime in place.

Native progress is separate from FAKE-08 progress and savestates. Switching
emulators doesn't migrate either format. Keep multi-cart games together in
their original folder structure. A multi-cart game may need an internet
connection to download its extra carts.

To reset a settings file, quit PICO-8, back the file up, then remove it from
`.userdata/mlp1/pico8/`. PICO-8 recreates `config.txt` and `sdl_controllers.txt`
when they're absent.

## PICO-8 won't open

An upgrade message means your Leaf doesn't provide native PICO-8 support.
[Update Leaf](/guide/updating/) before trying the integration again.

A setup message means you should check that both files are directly inside
`BIOS/PICO8/` on the primary card, came from the same Raspberry Pi download, and
were fully extracted. Don't move the runtime to your secondary card when a cart
lives there; the runtime always belongs on the primary card.

## Splore can't download games

Check Wi-Fi and the device's date and time, then retry. New BBS games need an
internet connection. If the game list loads but a game doesn't, note the error
and check `.userdata/mlp1/logs/umrk-leaf-session.log` on the primary card.

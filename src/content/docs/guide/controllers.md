---
title: Controllers
description: Pair a wireless controller to the Miniloong Pocket 1, how player order works, and what you need for three or more players.
---

Leaf plays multiplayer games with wireless controllers alongside the Pocket 1's own
controls. Up to four players: three wireless controllers plus the handheld itself.

Leaf is tested with the Xbox Wireless Controller. Other controllers generally work,
but they aren't tested.

## Pairing

Go to **Settings > Bluetooth**, put your controller into pairing mode, and pick
it from the list.

On an Xbox controller, pairing mode is the small button on the top edge next to the
USB-C port. Hold it for about three seconds until the Xbox button flashes quickly.
A slow blink means the controller is on but not connected to anything; a steady light
means it's connected.

Once paired, the controller reconnects on its own when you turn it on.

## Who is which player

Wireless controllers take the first player slots, in the order they connected. The
handheld's own controls are always the last player.

| Connected | Player 1 | Player 2 | Player 3 |
| --- | --- | --- | --- |
| Nothing | Handheld | | |
| One controller | Controller | Handheld | |
| Two controllers | Controller 1 | Controller 2 | Handheld |

The handheld never loses its slot. A fourth wireless controller is ignored.

Player order is decided when the game starts, so connect everyone's controllers
first. A controller switched on mid-game doesn't join until you quit and start the
game again.

## Three or more players

Most of the consoles Leaf emulates had two controller ports, and games for more
players used a multitap accessory. Emulation works the same way: for a third player,
turn on the console's multitap in RetroArch first, or the third controller does
nothing.

Leaf doesn't turn the multitap on for you, because some games ignore it, misread
the extra ports, or won't boot with one connected. Open the RetroArch menu in-game
and set the controller type for the port your game expects the multitap on. Where
that setting lives depends on the console.

### The handheld's controls stopped working

With two controllers connected, the handheld is player 3. Without a multitap the
console has nowhere to put a third player. Disconnect one controller and the
handheld becomes player 2 again straight away.

## The Xbox button

The **Xbox button** opens the Leaf menu over a RetroArch game, or the menus
inside PPSSPP, DraStic, Flycast and the bundled N64 emulator.

For an emulator installed by a content pak, it opens the emulator's own menu
if the pak provides one. Otherwise it asks **Return to Leaf?** before the
emulator quits. Button combinations with the Xbox button go straight to these
emulators, and holding it doesn't perform Leaf's escape hold. Use the handheld's
**MENU** button for the
[escape hold](/guide/systems/#standalone-emulators-from-content-paks).

## A controller disconnected

Turn it back on and it reconnects by itself. Input picks up again within a couple of
seconds.

If it was connected when the game started, it keeps its player slot. If it wasn't,
it joins from the next launch.

If a controller keeps dropping, check its battery first. An Xbox controller with a
low battery disconnects without warning.

---
title: RAOfflineProxy
description: 'Earn RetroAchievements while offline, and send them when you reconnect.'
---

RAOfflineProxy lets you earn RetroAchievements with no network. It caches a
game's achievement data while you are online, serves that cache to RetroArch
while you are not, and queues anything you unlock offline to send the next time
you reconnect.

It is meant for trips, commutes, and anywhere the Wi-Fi is bad or absent.

:::caution[Casual only, and experimental]
Achievements earned through this pak are **casual** unlocks. Hardcore play is
never proxied: if you have Hardcore enabled, games launch directly with no
involvement from this pak, exactly as they would if it were not installed.

It is also built on the Linux support in
[misantronic/RAOfflineProxy](https://github.com/misantronic/RAOfflineProxy),
which its authors describe as **alpha**. It is qualified on the Miniloong
Pocket 1, but expect rough edges.
:::

## Before you start

Do these in order. The pak learns your account token from a game launched
through it, so the service has to be on and Hardcore has to be off first.
Nothing works offline until it has that token.

1. Sign in to RetroAchievements under **Settings → Games → Accounts**.
2. Turn off Hardcore. RetroArch turns it on by default. Start a RetroArch game,
   open **MENU → RetroArch Settings → Settings → Achievements**, and turn off
   **Hardcore Mode**. RetroArch restarts the game when you change this, so save
   first. Then exit through **MENU → Save & Quit** so the setting is kept.
3. Open RAOfflineProxy and turn the service on.
4. With a network connection, launch a game that runs in RetroArch and let it
   log in. Standalone emulators like N64, DraStic, and PPSSPP don't teach the
   pak your token.

## Turning it on

The pak has two separate controls, and they do different things:

- **Service** starts or stops the proxy right now.
- **Start with Leaf** decides whether it comes back on its own after a reboot.
  It does not start or stop anything by itself.

Turn on both if you want it always available. Both are also in
**Settings → System → Services**.

## Preparing games for a trip

Playing a game online with the service on and Hardcore off caches it
automatically. Anything else has nothing cached, so it will not have
achievements offline. You usually find that out once you are already away from
a network.

To prepare in advance:

- **Prepare Recents and Favourites** covers everything you have played or
  favourited recently. This is the one to run before you travel.
- **Prepare one game** browses your library by console, with a search, so you
  can prepare a specific title.

Preparing downloads achievement data for each game, a few requests at a time
so it does not hammer the RetroAchievements servers. The progress screen updates
live. You can leave it and the work carries on in the background; stopping is a
separate, explicit action.

Some ROMs will report **No RA data**. That means RetroAchievements has no entry
for that exact dump, not that anything is broken; a different release of the
same game may well be recognised.

:::note[Why there is no "prepare everything" button]
Preparing a game costs a few requests to RetroAchievements. A full library on
this device is around two thousand games, which would be well over an hour of
continuous requests against a service that is free and community-run. Recents,
Favourites, and per-game keep it proportionate.
:::

## Playing offline

Once a game is prepared, play as normal with the network off. Achievements
unlock, and the ones you earn are queued locally and signed.

When you reconnect, the queue is sent automatically, once each and in order.
You do not need to open the pak.

## What it does not do

- **No Hardcore.** Upstream does not support offline hardcore unlocks, so
  neither does this. Hardcore games launch unproxied instead.
- **No leaderboards offline.** Submissions are refused rather than queued,
  because a leaderboard entry sent hours later is not the same entry.
- **Not a way to earn achievements you did not earn.** The queue is signed and
  hash-chained, and is only ever replayed to your own account.

## If something looks wrong

- **The pak won't prepare a game and says it has no token, even though
  achievements work online.** Your games are probably launching directly, which
  happens when Hardcore is on or the service was off when you launched. Follow
  [Before you start](#before-you-start) again, in order.
- **Nothing is cached for a game.** It was never played online through the pak
  and never prepared. Prepare it while you have a network.
- **Achievements did not appear after reconnecting.** Open the pak; the flush
  happens on its own once connectivity returns, and the run status shows what
  is left.
- **The pak says the service is not running.** Turn it on from the Service row.

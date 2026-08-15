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

1. Sign in to RetroAchievements under **Settings → Accounts**.
2. Launch one game **online**, so the pak learns your account token. Nothing
   works offline until it has one.
3. Open RAOfflineProxy and turn the service on.

## Turning it on

The pak has two separate controls, and they do different things:

- **Service** starts or stops the proxy right now.
- **Start with Leaf** decides whether it comes back on its own after a reboot.
  It does not start or stop anything by itself.

Turn on both if you want it always available. Both are also in
**Settings → Services**.

## Preparing games for a trip

Playing a game online caches it automatically. Anything you have *not* played
online has nothing cached, so it will not have achievements offline — which is
usually discovered at the worst moment.

To prepare in advance:

- **Prepare Recents and Favourites** covers everything you have played or
  favourited recently. This is the one to run before you travel.
- **Prepare one game** browses your library by console, with a search, so you
  can prepare a specific title.

Preparing downloads achievement data for each game, pacing itself to stay a
good citizen of a free community service. The progress screen updates live, and
you can leave it — the work continues in the background, and stopping is a
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

When you reconnect, the queue is sent automatically — once each, in order. You
do not need to open the pak.

## What it does not do

- **No Hardcore.** By design; upstream does not support offline hardcore
  unlocks, and this pak will not pretend otherwise.
- **No leaderboards offline.** Submissions are refused rather than queued,
  because a leaderboard entry sent hours later is not the same entry.
- **Not a way to earn achievements you did not earn.** The queue is signed and
  hash-chained, and is only ever replayed to your own account.

## If something looks wrong

- **Nothing is cached for a game.** It was never played online and never
  prepared. Prepare it while you have a network.
- **Achievements did not appear after reconnecting.** Open the pak; the flush
  happens on its own once connectivity returns, and the run status shows what
  is left.
- **The pak says the service is not running.** Turn it on from the Service row.

---
title: Building from source
description: Build Leaf's MLP1 install and recovery ZIPs from public source, then stage to a device if needed.
---

You can build the MLP1 install and recovery ZIPs from public source on a macOS
arm64 host. You don't need a connected device, ScreenScraper credentials, or the
private `umrk-workspace` repo for a development build.

## Build the ZIPs

Install Docker and make sure it is running. Clone Leaf into a parent directory,
then run these commands from the `Leaf` checkout:

```sh
make bootstrap
docker pull ghcr.io/utility-muffin-research-kitchen/mlp1-toolchain:latest
toolchain_image="$(docker image inspect --format '{{.Id}}' \
  ghcr.io/utility-muffin-research-kitchen/mlp1-toolchain:latest)"
make release-zips DEVICE=mlp1 TOOLCHAIN_IMAGE="$toolchain_image" REBUILD_CORES=1
```

`make bootstrap` clones the public sibling repos that Leaf builds. The full
`sha256:` image ID keeps the toolchain selection fixed throughout the build.
The first development build may compile missing or stale libretro cores.
It also fetches the pinned FFmpeg sources and builds the recording-enabled
RetroArch stack. The ZIPs are written under `Leaf/build/release/`.

After the cores have valid cached outputs for that image ID, leave off
`REBUILD_CORES=1` on later builds. If a core becomes stale, add the flag again
to permit compilation. A build without the flag stops on a missing or stale
core before compiling it.

ScreenScraper is disabled in a development build unless you provide your own
developer credentials. To enable it, copy `Jawaka/.env.example` to the ignored
`Jawaka/.env.local` and set `SCREENSCRAPER_DEV_ID` and
`SCREENSCRAPER_DEV_PASSWORD`, or export both variables in your environment.
The ZIP metadata records whether the feature was enabled.

## Tagged builds

Beta and stable ZIPs require ScreenScraper developer credentials and valid
cached outputs for all 31 stock-parity cores. They use the same full toolchain
image ID for preflight, core report assembly, and packaging. Check the inputs
before a tagged build:

```sh
make release-preflight DEVICE=mlp1 LEAF_RELEASE_CHANNEL=beta \
  TOOLCHAIN_IMAGE="$toolchain_image" REBUILD_CORES=0 FORCE_REBUILD_CORES=0
```

Use `LEAF_RELEASE_CHANNEL=stable` for a stable build. Tagged builds reject
`REBUILD_CORES=1` and `FORCE_REBUILD_CORES=1`; prepare any missing core cache
entries in a separate development build first. See the
[Leaf README](https://github.com/Utility-Muffin-Research-Kitchen/Leaf#end-user-sd-install-package)
for the guarded `beta-zips` and `stable-zips` commands and release checks.

## Stage to a device

When your MLP1 is connected over ADB, run these commands from `Leaf`:

```sh
make doctor
make stage DEVICE=mlp1 TOOLCHAIN_IMAGE="$toolchain_image"
```

`make doctor` checks ADB and the device. You don't need it for a ZIP build.
Leaf also has narrower staging targets for the launcher, RetroArch, and
individual apps. See the [Repo map](/develop/repo-map/) for the owning repos.

---
title: Building from source
description: Build the Leaf launcher and components from source, and stage them to a device.
---

An overview of building Leaf. (Detailed, command-exact instructions live in each
repo's README - this is the map.)

## Prerequisites

- A clone of the relevant repos as siblings (see [Repo map](/leaf-docs/develop/repo-map/)),
  most easily via Leaf's bootstrap target.
- **Docker** - the cross-compiler runs inside a toolchain image, so you don't install
  an ARM toolchain on your host.
- For deploying to hardware: `adb`, and a device running Leaf.

## The toolchain

Cross-compilation uses the `mlp1-toolchain` Docker image (Buildroot-based,
aarch64 for the RK3566). Builds mount the source into the container and compile
there, so the host only needs Docker.

## Building the launcher

**Jawaka** builds against the sibling Catastrophe toolkit. It has a device build
target that produces all launcher binaries (daemon, launcher, menu, OSD) using the
toolchain image. There's also a native/mock build for developing the UI on a desktop
without hardware.

## Emulation stack

**retroarch-builds** and **Cores-spruce** each have their own build scripts that
produce the RetroArch binary and the libretro cores for the device.

## Staging to a device

Deployment is a Leaf-level concern - you don't `cd` into each repo to deploy.
Leaf's `Makefile` is a dispatcher that assembles the SD payload and pushes it over
`adb`:

- A full stage assembles the launcher payload and stages the apps and emulation
  stack.
- Narrower targets stage just the launcher, just RetroArch, or a single app.

After staging launcher/daemon changes, the device is rebooted (or the launcher
stack restarted) to pick them up.

:::note[Reviewer note]
Keep exact commands in the repo READMEs (the single source of truth) and link to
them here rather than duplicating, so this page doesn't go stale.
:::

---
title: Repo map
description: What each repository in the Leaf project does.
---

Leaf is split across several repositories in the
[Utility-Muffin-Research-Kitchen](https://github.com/Utility-Muffin-Research-Kitchen)
organization. Each is an independent repo with its own build.

| Repo | Role |
|---|---|
| **Leaf** | Release artifacts (SD install / recovery ZIPs) and cross-repo build orchestration |
| **Jawaka** | The launcher stack — `jawakad` daemon + launcher + menu + OSD |
| **Catastrophe** | Shared C UI toolkit the launcher and apps are built on |
| **miniloong-launcher-switcher** | The on-device mechanism that boots Leaf on top of stock — boot hook, session supervisor, install/recovery payloads, device defaults |
| **mlp1-toolchain** | The Buildroot-based Docker image used to cross-compile for the device |
| **retroarch-builds** | RetroArch fetch/build/packaging |
| **Cores-spruce** | libretro core builder (downstream of libretro-super) |
| **ssh-server** | The SSH Server app (a `.pak`) |
| **Thing-File** | The file-manager app (a `.pak`) |
| **miniloong-adb-keeper** | SD payload used to enable developer access on the device |
| **leaf-docs** | This documentation site |

## How they fit together

- **Leaf** is the dispatcher: it calls each product repo's own build/package targets
  and assembles the SD payload. You don't build product repos individually to ship —
  you stage from Leaf.
- **Jawaka** depends on **Catastrophe** (header-only toolkit).
- **retroarch-builds** + **Cores-spruce** produce the emulation stack that Leaf
  stages alongside the launcher.
- **miniloong-launcher-switcher** owns everything device-stock-specific (the boot
  swap and install/recovery flow).

:::note[Reviewer note]
Confirm repo names/visibility before release (some apps may be private or renamed),
and add any repos not listed here.
:::

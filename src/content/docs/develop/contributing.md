---
title: Contributing
description: How to contribute to Leaf - where to start and the project's conventions.
---

Contributions are welcome. Leaf is cooked up in the open at the
[Utility-Muffin-Research-Kitchen](https://github.com/Utility-Muffin-Research-Kitchen).

## Where to start

1. Find the right repository for your change - see the [Repo map](/leaf-docs/develop/repo-map/).
   Keep changes in the owning repo (e.g. launcher logic in Jawaka, UI-toolkit
   changes in Catastrophe, the boot/install mechanism in miniloong-launcher-switcher).
2. Read that repo's README and any in-repo plans/docs.
3. See [Building from source](/leaf-docs/develop/building/) to get a build going.

## House conventions

- **C first.** The codebase is C; reach for C++ only when it materially simplifies a
  subsystem.
- **Naming.** Catastrophe uses `cat_` (public), `cat__` (internal), `CAT_`
  (macros/constants/enums). Jawaka uses `jw_` / `jw__`. Use descriptive variable
  names - `screen_w`, not `sw`.
- **No `system()` calls** - spawn processes with `fork`/`exec`.
- **FAT32-safe content** - no symlinks or desktop-only filesystem assumptions in
  shared launcher/runtime behavior (the SD card is FAT32).
- **Use the runtime path contract** - don't hardcode SD/launcher/app/data roots;
  use the shared environment variables.
- **Respect repo ownership** - the umbrella workspace holds cross-cutting plans;
  product repos hold their own code and plans.

## Pull requests

- Keep changes scoped to one concern and one repo where possible.
- Build the affected component before opening the PR.
- Open the PR against the owning repo; a maintainer reviews and merges.

:::note[Reviewer note]
Add the canonical contribution policy (license, DCO/CLA if any, PR checklist,
review expectations) before promoting this publicly.
:::

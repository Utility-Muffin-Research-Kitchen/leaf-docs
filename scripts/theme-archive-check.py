#!/usr/bin/env python3
"""Run the THEME-1 reference validator on one theme .zip.

usage: theme-archive-check.py <leaf-contracts dir> <archive.zip>

The validator itself lives in leaf-contracts and is imported from there, so
the catalog check and the submission pipeline can never disagree about a
package. This wrapper only adds what the catalog comparison needs: the store
fields of theme.json, read once the archive has passed.

Prints one JSON object:
    {"reasons": [...], "warnings": [...], "manifest": {...} | null}
Exit status 0 means the script ran, whatever the verdict; 2 means it could
not run (bad arguments, validator not found).
"""
import json
import os
import sys
import zipfile

sys.dont_write_bytecode = True

STORE_FIELDS = ("id", "version", "min_leaf_version", "license")


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__.strip().splitlines()[2], file=sys.stderr)
        return 2
    contracts_dir, archive = sys.argv[1], sys.argv[2]
    scripts = os.path.join(contracts_dir, "contracts", "leaf-themes", "scripts")
    if not os.path.isfile(os.path.join(scripts, "theme_model.py")):
        print(f"theme_model.py not found under {scripts}", file=sys.stderr)
        return 2
    sys.path.insert(0, scripts)
    import theme_model  # noqa: E402

    reasons, warnings = theme_model.validate_archive(archive)
    manifest = None
    if not reasons:
        # A passing archive is one well-formed folder holding a strict,
        # duplicate-free theme.json, so the standard reader sees what the
        # reference validator saw.
        with zipfile.ZipFile(archive) as bundle:
            root = bundle.namelist()[0].split("/", 1)[0]
            obj = theme_model.parse_manifest_bytes(bundle.read(f"{root}/theme.json"))
        manifest = {key: obj.get(key) for key in STORE_FIELDS}
    print(json.dumps({"reasons": reasons, "warnings": warnings, "manifest": manifest}))
    return 0


if __name__ == "__main__":
    sys.exit(main())

"""Migrate property markdown frontmatter using cartier_canon.json spec."""
import json
import os
import re
import sys

BASE = r"C:\00\Antigravity\Sites\CozmaVasile\astro-site"
SPEC_PATH = os.path.join(BASE, "tools", "cartier_canon.json")
DIR = os.path.join(BASE, "src", "content", "proprietati")


def format_coords(coords):
    return "[" + ", ".join(str(c) for c in coords) + "]"


def migrate_file(path, entry):
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()

    if not text.startswith("---"):
        raise ValueError(f"No frontmatter in {path}")

    # Split frontmatter
    m = re.match(r"^---\r?\n(.*?)\r?\n---(\r?\n)(.*)$", text, re.DOTALL)
    if not m:
        raise ValueError(f"Bad frontmatter in {path}")
    fm = m.group(1)
    sep = m.group(2)
    body = m.group(3)

    lines = fm.split("\n")
    new_lines = []
    has_street = any(re.match(r"^street\s*:", l) for l in lines)
    has_coords = any(re.match(r"^coords\s*:", l) for l in lines)

    street_val = entry.get("street")
    coords_val = entry["coords"]
    zone_val = entry["zone"]

    zone_done = False
    for line in lines:
        if re.match(r"^zone\s*:", line):
            new_lines.append(f'zone: "{zone_val}"')
            # Insert street right after zone if spec has one
            if street_val is not None:
                new_lines.append(f'street: "{street_val}"')
            zone_done = True
        elif re.match(r"^street\s*:", line):
            # Skip; either replaced above (if spec has street) or removed if not
            if street_val is None:
                # No street in spec: drop existing street line
                continue
            else:
                # Already handled after zone — skip duplicate
                continue
        elif re.match(r"^coords\s*:", line):
            new_lines.append(f"coords: {format_coords(coords_val)}")
        else:
            new_lines.append(line)

    if not zone_done:
        raise ValueError(f"No zone: line found in {path}")

    if not has_coords:
        # Add coords line at end of frontmatter
        new_lines.append(f"coords: {format_coords(coords_val)}")

    new_fm = "\n".join(new_lines)
    new_text = f"---\n{new_fm}\n---{sep}{body}"

    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(new_text)


def main():
    with open(SPEC_PATH, "r", encoding="utf-8") as f:
        spec = json.load(f)
    mig = spec["propertyMigration"]

    count = 0
    missing = []
    for fname in os.listdir(DIR):
        if not fname.endswith(".md"):
            continue
        slug = fname[:-3]
        if slug not in mig:
            missing.append(slug)
            continue
        path = os.path.join(DIR, fname)
        migrate_file(path, mig[slug])
        count += 1

    print(f"Modified: {count}")
    if missing:
        print(f"Missing from spec: {missing}")


if __name__ == "__main__":
    main()

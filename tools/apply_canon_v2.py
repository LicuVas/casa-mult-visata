"""Re-apply cartier_canon.json v2 to property MDs (zone, street, coords)."""
import json, re
from pathlib import Path

ROOT = Path(r"C:\00\Antigravity\Sites\CozmaVasile\astro-site")
MD_DIR = ROOT / "src" / "content" / "proprietati"
CANON = json.loads((ROOT / "tools" / "cartier_canon.json").read_text(encoding="utf-8"))

migration = CANON["propertyMigration"]
changed = 0

for md in sorted(MD_DIR.glob("*.md")):
    slug = md.stem
    entry = migration.get(slug)
    if not entry:
        print(f"SKIP no migration entry: {slug}")
        continue
    text = md.read_text(encoding="utf-8")
    if not text.startswith("---"):
        print(f"SKIP no frontmatter: {slug}")
        continue
    parts = text.split("---", 2)
    if len(parts) < 3:
        continue
    fm = parts[1]
    body = "---" + parts[2]  # keep second --- intact

    def set_or_insert(s, key, value, after_key=None):
        line_rx = re.compile(rf"^{re.escape(key)}: *.*$", re.MULTILINE)
        new_line = f"{key}: {value}"
        if line_rx.search(s):
            return line_rx.sub(new_line, s, count=1)
        if after_key:
            anchor_rx = re.compile(rf"^({re.escape(after_key)}: *.*)$", re.MULTILINE)
            m = anchor_rx.search(s)
            if m:
                return s[:m.end()] + "\n" + new_line + s[m.end():]
        if not s.endswith("\n"):
            s += "\n"
        return s + new_line + "\n"

    zone = entry["zone"]
    coords = entry["coords"]
    street = entry.get("street")

    fm = set_or_insert(fm, "zone", f'"{zone}"', after_key="location")
    if street:
        fm = set_or_insert(fm, "street", f'"{street}"', after_key="zone")
    else:
        fm = re.sub(r"^street: *.*\n", "", fm, flags=re.MULTILINE)
    fm = set_or_insert(fm, "coords", f"[{coords[0]}, {coords[1]}]", after_key="privateOwnerContact")

    new_text = "---" + fm + body
    if new_text != text:
        md.write_text(new_text, encoding="utf-8")
        changed += 1
        print(f"OK {slug}: zone={zone}, street={street}, coords={coords}")

print(f"\n{changed} files updated.")

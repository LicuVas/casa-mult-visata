"""Generate src/data/image_dims.json mapping image paths to [width, height].
PhotoSwipe needs real dimensions to avoid stretching."""
import json, sys
from pathlib import Path
from PIL import Image
import pillow_avif  # noqa

ROOT = Path(r"C:\00\Antigravity\Sites\CozmaVasile\astro-site")
IMG_DIR = ROOT / "public" / "images"
OUT = ROOT / "src" / "data" / "image_dims.json"
OUT.parent.mkdir(parents=True, exist_ok=True)

dims = {}
for p in IMG_DIR.rglob("*.webp"):
    try:
        with Image.open(p) as img:
            w, h = img.size
        # Key as URL path starting with /images/
        rel = p.relative_to(IMG_DIR).as_posix()
        key = f"/images/{rel}"
        dims[key] = [w, h]
    except Exception as e:
        print(f"ERR {p}: {e}", file=sys.stderr)

with OUT.open("w", encoding="utf-8") as f:
    json.dump(dims, f, indent=2)
print(f"Wrote {len(dims)} entries -> {OUT}")

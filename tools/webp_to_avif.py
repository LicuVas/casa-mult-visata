"""Convert every .webp in public/images to .avif alongside (keep webp as fallback)."""
import os, sys
from pathlib import Path
from PIL import Image
import pillow_avif  # registers AVIF format

ROOT = Path(r"C:\00\Antigravity\Sites\CozmaVasile\astro-site\public\images")
QUALITY = 65  # AVIF q65 ≈ WebP q82 visually

total_before = 0
total_after = 0
n = 0
errs = 0
for p in ROOT.rglob("*.webp"):
    out = p.with_suffix(".avif")
    if out.exists():
        # Skip if already converted
        total_before += p.stat().st_size
        total_after += out.stat().st_size
        continue
    try:
        img = Image.open(p)
        if img.mode in ("RGBA", "LA"):
            save_kw = dict(quality=QUALITY)
        else:
            img = img.convert("RGB")
            save_kw = dict(quality=QUALITY)
        img.save(out, "AVIF", **save_kw)
        bw = p.stat().st_size
        aw = out.stat().st_size
        total_before += bw
        total_after += aw
        n += 1
        if n <= 8 or 'hero' in p.name:
            print(f"  {p.relative_to(ROOT)}: webp {bw//1024}KB -> avif {aw//1024}KB ({(1-aw/bw)*100:.0f}% smaller)")
    except Exception as e:
        errs += 1
        print(f"ERR {p.name}: {e}", file=sys.stderr)

print(f"\nConverted {n} files. {errs} errors.")
print(f"Total: webp {total_before/1024/1024:.1f}MB  ->  avif {total_after/1024/1024:.1f}MB ({(1-total_after/max(1,total_before))*100:.0f}% smaller)")

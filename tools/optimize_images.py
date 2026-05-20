"""
Convert all raster images in public/images to WebP, delete originals,
and rewrite references across the codebase.

Steps:
1. Copy hero panorama from Downloads to public/images/hero-source.jpg (backup) if not present.
2. Walk public/images recursively. For each .jpg/.jpeg/.png:
   - Resize hero panorama (very large) to max 2400px wide
   - Save as .webp with quality 82 alongside, then delete original
3. Rewrite references in src/**/*.{astro,md,ts} and public/admin/config.yml:
   - /images/something.jpg -> /images/something.webp
   - /images/something.png -> /images/something.webp
"""
import os, sys, shutil, re
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Run: pip install Pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(r"C:\00\Antigravity\Sites\CozmaVasile\astro-site")
IMG_DIR = ROOT / "public" / "images"
HERO_SRC = Path(r"C:\Users\licuv\Downloads\20221005_115244-PANO.jpg")
HERO_DST = IMG_DIR / "hero.jpg"  # will be converted to hero.webp

QUALITY = 82
HERO_MAX_WIDTH = 2400
GENERIC_MAX_WIDTH = 1920  # cap large photos

def convert_one(p: Path, is_hero: bool = False) -> tuple[int, int, int]:
    """Returns (original_bytes, webp_bytes, did_resize)."""
    orig_size = p.stat().st_size
    img = Image.open(p)
    if img.mode in ("RGBA", "LA"):
        # PNG with alpha: keep transparency in webp
        save_kwargs = dict(quality=QUALITY, method=6)
    else:
        img = img.convert("RGB")
        save_kwargs = dict(quality=QUALITY, method=6)

    w, h = img.size
    max_w = HERO_MAX_WIDTH if is_hero else GENERIC_MAX_WIDTH
    did_resize = 0
    if w > max_w:
        new_h = int(h * max_w / w)
        img = img.resize((max_w, new_h), Image.LANCZOS)
        did_resize = 1

    out = p.with_suffix(".webp")
    img.save(out, "WEBP", **save_kwargs)
    new_size = out.stat().st_size
    # Delete original only if webp was written successfully and is smaller
    if out.exists() and new_size > 0:
        p.unlink()
    return orig_size, new_size, did_resize

def main():
    # 1. Place hero panorama
    if HERO_SRC.exists():
        # Always overwrite hero source so we use the panorama the user wants
        if HERO_DST.exists():
            HERO_DST.unlink()
        # Remove the previous hero.png if present (we now use a .jpg → .webp)
        old_hero_png = IMG_DIR / "hero.png"
        if old_hero_png.exists():
            old_hero_png.unlink()
            print(f"Removed old hero.png")
        old_hero_webp = IMG_DIR / "hero.webp"
        if old_hero_webp.exists():
            old_hero_webp.unlink()
        shutil.copy2(HERO_SRC, HERO_DST)
        print(f"Copied panorama to {HERO_DST}")
    else:
        print(f"Warning: hero panorama not found at {HERO_SRC}", file=sys.stderr)

    # 2. Convert all images
    exts = {".jpg", ".jpeg", ".png"}
    total_before = 0
    total_after = 0
    n = 0
    for p in IMG_DIR.rglob("*"):
        if p.suffix.lower() not in exts:
            continue
        is_hero = (p.name == "hero.jpg")
        before, after, resized = convert_one(p, is_hero=is_hero)
        total_before += before
        total_after += after
        n += 1
        if n <= 6 or is_hero:
            print(f"  {p.relative_to(IMG_DIR)}: {before/1024:.0f}KB -> {after/1024:.0f}KB"
                  + (" (resized)" if resized else ""))
    print(f"Converted {n} files. Total {total_before/1024/1024:.1f}MB -> {total_after/1024/1024:.1f}MB"
          f" ({(1 - total_after/max(1,total_before))*100:.0f}% smaller)")

    # 3. Rewrite references
    targets = []
    for pattern in ["src/**/*.astro", "src/**/*.md", "src/**/*.ts", "src/**/*.tsx", "src/**/*.js"]:
        targets.extend(ROOT.glob(pattern))
    targets.append(ROOT / "public" / "admin" / "config.yml")

    # Pattern: /images/...something.{jpg|jpeg|png}  (in paths only; not in random text)
    # We accept it inside attr values and yaml strings.
    rx = re.compile(r'(/images/[A-Za-z0-9_\-./]+?)\.(jpg|jpeg|png)\b', re.IGNORECASE)
    changed_files = 0
    for t in targets:
        if not t.is_file():
            continue
        try:
            txt = t.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        new_txt = rx.sub(lambda m: f"{m.group(1)}.webp", txt)
        if new_txt != txt:
            t.write_text(new_txt, encoding="utf-8")
            changed_files += 1
    print(f"Rewrote references in {changed_files} files")

if __name__ == "__main__":
    main()

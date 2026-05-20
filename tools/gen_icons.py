"""Generate PWA icons for Casa Mult Visata.

Approach:
1. Try cairosvg to rasterize public/favicon.svg.
2. Fallback: PIL draws a sage square with white "CMV" letters.

Outputs (in public/):
  - icon-192.png        (192x192, "any" purpose)
  - icon-512.png        (512x512, "any" purpose)
  - icon-512-maskable.png (512x512, with safe-zone padding)
  - apple-touch-icon.png  (180x180, no padding)
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SVG = PUBLIC / "favicon.svg"

SAGE = (138, 163, 153)        # #8AA399
SAGE_DARK = (107, 130, 122)   # darker sage for maskable bg
WHITE = (255, 255, 255)
CREAM = (250, 247, 242)       # #FAF7F2


def try_cairosvg() -> bool:
    try:
        import cairosvg  # noqa: F401
        return True
    except Exception:
        return False


def render_svg_to_png(out_path: Path, size: int) -> None:
    import cairosvg
    cairosvg.svg2png(
        url=str(SVG),
        write_to=str(out_path),
        output_width=size,
        output_height=size,
    )


def pil_icon(size: int, padding_ratio: float = 0.0, bg=SAGE, fg=WHITE,
             text: str = "CMV") -> "object":
    """Draw a sage square with centered white text."""
    from PIL import Image, ImageDraw, ImageFont

    img = Image.new("RGB", (size, size), bg)
    draw = ImageDraw.Draw(img)

    if padding_ratio > 0:
        # Inner rounded rect for the maskable safe-zone visual
        pad = int(size * padding_ratio)
        inner_box = (pad, pad, size - pad, size - pad)
        radius = int(size * 0.10)
        try:
            draw.rounded_rectangle(inner_box, radius=radius, fill=SAGE)
        except AttributeError:
            draw.rectangle(inner_box, fill=SAGE)

    # Find a serif font
    font = None
    font_size = int(size * (0.42 if padding_ratio > 0 else 0.50))
    candidates = [
        "C:/Windows/Fonts/georgiab.ttf",
        "C:/Windows/Fonts/georgia.ttf",
        "C:/Windows/Fonts/times.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                font = ImageFont.truetype(c, font_size)
                break
            except Exception:
                pass
    if font is None:
        font = ImageFont.load_default()

    # Measure text
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        offset_x = bbox[0]
        offset_y = bbox[1]
    except AttributeError:
        tw, th = draw.textsize(text, font=font)
        offset_x = offset_y = 0

    x = (size - tw) // 2 - offset_x
    y = (size - th) // 2 - offset_y
    draw.text((x, y), text, fill=fg, font=font)
    return img


def main() -> int:
    PUBLIC.mkdir(exist_ok=True)
    use_cairo = try_cairosvg()
    print(f"cairosvg available: {use_cairo}")

    targets = [
        ("icon-192.png", 192, 0.0, SAGE),
        ("icon-512.png", 512, 0.0, SAGE),
        ("icon-512-maskable.png", 512, 0.20, SAGE_DARK),
        ("apple-touch-icon.png", 180, 0.0, SAGE),
    ]

    for name, size, padding, bg in targets:
        out = PUBLIC / name
        if use_cairo and padding == 0.0:
            try:
                # Render SVG onto a sage background canvas
                from PIL import Image
                import io
                import cairosvg
                # Render SVG at slightly smaller size and composite
                svg_size = int(size * 0.70)
                png_bytes = cairosvg.svg2png(
                    url=str(SVG),
                    output_width=svg_size,
                    output_height=svg_size,
                )
                bg_img = Image.new("RGBA", (size, size), bg + (255,))
                fg_img = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
                # Recolor non-transparent pixels to white
                pixels = fg_img.load()
                for y in range(fg_img.height):
                    for x in range(fg_img.width):
                        r, g, b, a = pixels[x, y]
                        if a > 0:
                            pixels[x, y] = (255, 255, 255, a)
                ox = (size - svg_size) // 2
                bg_img.alpha_composite(fg_img, (ox, ox))
                bg_img.convert("RGB").save(out, "PNG", optimize=True)
                print(f"  wrote {name} via cairosvg+PIL ({size}x{size})")
                continue
            except Exception as e:
                print(f"  cairosvg path failed for {name}: {e}; falling back to PIL")

        img = pil_icon(size, padding_ratio=padding, bg=bg)
        img.save(out, "PNG", optimize=True)
        print(f"  wrote {name} via PIL ({size}x{size}, padding={padding})")

    return 0


if __name__ == "__main__":
    sys.exit(main())

// Post-build: optimizeaza pozele urcate prin CMS (dist/images), originalele din repo raman neatinse.
// - JPG/PNG: auto-rotate EXIF, redimensionare la max 1600px latime, recompresie mozjpeg
// - genereaza variante .webp + .avif linga fiecare imagine (folosite de <picture> din template-uri)
// - /images/scraped/ are deja perechi optimizate si e sarit; /sistem/ nu e sub acest folder
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('../dist/images/', import.meta.url));
const MAX_W = 1600;
const JPEG_Q = 78, WEBP_Q = 75, AVIF_Q = 55;

let saved = 0, count = 0, variants = 0, failed = 0;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'scraped') yield* walk(p); }
    else yield p;
  }
}

const files = [];
for await (const f of walk(ROOT)) files.push(f);
const rasters = files.filter(f => /\.(jpe?g|png)$/i.test(f));
const existing = new Set(files.map(f => f.toLowerCase()));

for (const f of rasters) {
  try {
    const input = await readFile(f); // o singura citire; totul se genereaza din buffer
    const isPng = /\.png$/i.test(f);
    const pipe = () => sharp(input, { failOn: 'none' }).rotate().resize({ width: MAX_W, withoutEnlargement: true });

    // 1. recompreseaza originalul in-place (acelasi path => anunturile nu se ating)
    const buf = isPng
      ? await pipe().png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipe().jpeg({ quality: JPEG_Q, mozjpeg: true }).toBuffer();
    if (buf.length < input.length) {
      await writeFile(f, buf);
      saved += input.length - buf.length;
      count++;
    }

    // 2. variante moderne linga original (din acelasi buffer sursa, nu din JPEG-ul recomprimat)
    const base = f.replace(/\.(jpe?g|png)$/i, '');
    if (!existing.has((base + '.webp').toLowerCase())) {
      await writeFile(base + '.webp', await pipe().webp({ quality: WEBP_Q }).toBuffer());
      variants++;
    }
    if (!existing.has((base + '.avif').toLowerCase())) {
      await writeFile(base + '.avif', await pipe().avif({ quality: AVIF_Q }).toBuffer());
      variants++;
    }
  } catch (err) {
    failed++;
    console.warn(`WARN optimize-images: ${f} a esuat (${err.message}) - ramane neoptimizat`);
  }
}

console.log(`optimize-images: ${rasters.length} rastere, ${count} recomprimate (economie ${(saved / 1048576).toFixed(1)} MB), ${variants} variante webp/avif, ${failed} esuate`);

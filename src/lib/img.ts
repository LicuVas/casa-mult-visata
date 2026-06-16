// Netlify Image CDN helper — on-the-fly resize + AVIF/WebP negotiation.
// Transforms ONLY local CMS uploads under /images/* (the raw JPGs Cozma
// uploads via the CMS). Everything else passes through untouched:
//   - /sistem/* pre-optimized site assets (logo, agent, hero, fallbacks)
//   - external URLs, empty/missing values
// This keeps the .md listing files completely untouched — only how the
// templates RENDER the image path changes. Reversible: delete the wraps.
const CMS = /^\/images\//i;

export interface ImgOpts {
  w?: number;
  h?: number;
  q?: number;
  fit?: 'cover' | 'contain' | 'fill';
}

/** Single optimized URL. Pass-through for non-CMS sources. */
export function cdnImg(src: string, opts: ImgOpts = {}): string {
  if (!src || !CMS.test(src)) return src;
  const p = new URLSearchParams({ url: src, q: String(opts.q ?? 72), fit: opts.fit ?? 'cover' });
  if (opts.w) p.set('w', String(opts.w));
  if (opts.h) p.set('h', String(opts.h));
  return '/.netlify/images?' + p.toString();
}

/** Responsive srcset string. Empty for non-CMS sources (harmless attr). */
export function cdnSrcset(src: string, widths: number[], opts: ImgOpts = {}): string {
  if (!src || !CMS.test(src)) return '';
  return widths.map((w) => `${cdnImg(src, { ...opts, w })} ${w}w`).join(', ');
}

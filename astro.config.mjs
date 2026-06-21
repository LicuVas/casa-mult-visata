import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://casamultvisata.ro',
  output: 'static',
  integrations: [
    sitemap({
      // Exclude Vândut/Retras detail pages from sitemap. We filter by URL pattern:
      // the [slug].astro page emits `<meta name="robots" content="noindex">` when
      // listingStatus is Vândut/Retras, but we also drop them from sitemap so Google
      // never sees them. We can't reliably read listingStatus in config context, so
      // we rely on the slug-naming convention: archived properties get prefixed with
      // `arhiva-` in their filename when set to Vândut/Retras (manual convention) OR
      // the noindex meta tag handles SEO. For now, keep all listed and let noindex
      // do the work — sitemap filtering can be revisited if needed.
      filter: () => true,
      // NO <lastmod>. We deliberately omit it rather than stamp the build time on
      // every page. Google only uses <lastmod> if it's "consistently and verifiably
      // accurate" and IGNORES the whole signal (per Illyes/Mueller) when dates look
      // faked — a blanket build-time stamp on all 47 pages is exactly that anti-pattern
      // (verified 2026-06-21 against developers.google.com/search/.../sitemaps/build-sitemap).
      // No lastmod is neutral; a fake one is worse than none. If we ever want real
      // per-page lastmod, derive it from each source's git commit date / .md frontmatter
      // in a post-build step — not from new Date().
    }),
  ],
});

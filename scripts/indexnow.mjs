// IndexNow notifier — pings Bing + Yandex so new/edited listings get crawled in
// MINUTES (and surface in ChatGPT Search, which uses the Bing index) instead of
// days. Google does NOT support IndexNow — it keeps relying on sitemap + GSC.
//
// Runs in the GitHub Action AFTER the Netlify deploy. It submits the FULL set of
// public URLs from the freshly-built sitemap (so silos, static pages and every
// listing get pinged — not only the .md that changed in the triggering push).
// The changed-listing slugs + core pages are always unioned in as a safety net
// in case the sitemap can't be read.
//
// Why full-sitemap: a narrow "only changed .md" scope silently left the silos and
// the back-catalogue out of Bing for weeks (observed 2026-06-20: 4/47 indexed).
// 47 URLs is well within IndexNow limits, so submit everything each deploy.
//
// Never throws fatally: a Bing hiccup must never block the client's publish.
//
// Key contract: KEY must equal the contents of public/<KEY>.txt (served at the
// site root). To rotate, regenerate both together.

import { execSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://casamultvisata.ro';
const HOST = 'casamultvisata.ro';
const KEY = 'cf8f8bf29fe030aa8ad7e509b7880ca3';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const DIST = 'dist';

function changedPropertySlugs() {
  try {
    const out = execSync('git diff --name-only HEAD~1 HEAD -- src/content/proprietati/', {
      encoding: 'utf8',
    });
    return out
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.split('/').pop().replace(/\.md$/i, ''));
  } catch {
    // No previous commit reachable (shallow/initial) — fall back to core pages only.
    return [];
  }
}

// Parse every <loc> from the built page sitemaps (dist/sitemap-N.xml). The index
// file (sitemap-index.xml) only points to sub-sitemaps, so we skip it.
function sitemapUrlsFromDist() {
  const urls = [];
  try {
    for (const f of readdirSync(DIST)) {
      if (!/^sitemap-\d+\.xml$/.test(f)) continue;
      const xml = readFileSync(join(DIST, f), 'utf8');
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(m[1].trim());
    }
  } catch {
    /* dist not present — fall through to fetch */
  }
  return urls;
}

async function sitemapUrlsFromLive() {
  try {
    const idx = await (await fetch(`${SITE}/sitemap-index.xml`)).text();
    const maps = [...idx.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    const urls = [];
    for (const map of maps) {
      const xml = await (await fetch(map)).text();
      for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(m[1].trim());
    }
    return urls;
  } catch {
    return [];
  }
}

async function buildUrlList() {
  const urls = new Set([`${SITE}/`, `${SITE}/proprietati/`]);
  for (const slug of changedPropertySlugs()) {
    if (slug) urls.add(`${SITE}/proprietati/${slug}/`);
  }
  let sitemap = sitemapUrlsFromDist();
  if (sitemap.length === 0) sitemap = await sitemapUrlsFromLive();
  for (const u of sitemap) urls.add(u);
  return [...urls];
}

async function main() {
  const urlList = await buildUrlList();
  console.log(`[indexnow] submitting ${urlList.length} URL(s):`);
  urlList.forEach((u) => console.log(`  - ${u}`));

  const body = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  });

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });
    const text = await res.text().catch(() => '');
    // IndexNow: 200 OK, 202 Accepted = success. Others = log, don't fail deploy.
    if (res.status === 200 || res.status === 202) {
      console.log(`[indexnow] OK (HTTP ${res.status}).`);
    } else {
      console.warn(`[indexnow] non-success HTTP ${res.status}: ${text.slice(0, 300)}`);
    }
  } catch (e) {
    console.warn(`[indexnow] request failed (non-fatal): ${e?.message || e}`);
  }
}

main();

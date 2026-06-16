// IndexNow notifier — pings Bing + Yandex so new/edited listings get crawled in
// MINUTES (and surface in ChatGPT Search, which uses the Bing index) instead of
// days. Google does NOT support IndexNow — it keeps relying on sitemap + GSC.
//
// Runs in the GitHub Action AFTER the Netlify deploy. It submits ONLY the URLs
// whose source .md changed in the triggering push (plus the homepage and the
// listing index, which change whenever a property is added/edited/removed).
//
// Never throws fatally: a Bing hiccup must never block the client's publish.
//
// Key contract: KEY must equal the contents of public/<KEY>.txt (served at the
// site root). To rotate, regenerate both together.

import { execSync } from 'node:child_process';

const SITE = 'https://casamultvisata.ro';
const HOST = 'casamultvisata.ro';
const KEY = 'cf8f8bf29fe030aa8ad7e509b7880ca3';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

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

function buildUrlList() {
  const urls = new Set([`${SITE}/`, `${SITE}/proprietati/`]);
  for (const slug of changedPropertySlugs()) {
    if (slug) urls.add(`${SITE}/proprietati/${slug}/`);
  }
  return [...urls];
}

async function main() {
  const urlList = buildUrlList();
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

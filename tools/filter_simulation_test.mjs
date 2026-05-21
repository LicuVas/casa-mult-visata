// Simulare programatică a filtrului client-side din proprietati.astro.
// Reproduce logica `passes()` și `normZ` exact, apoi rulează scenarii pe dataset real.
// Run: node tools/filter_simulation_test.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const propsDir = path.join(__dirname, '..', 'src', 'content', 'proprietati');

// Parse all .md frontmatter (lightweight YAML-ish; only needs fields we filter on).
function parseFrontmatter(content) {
  const normalized = content.replace(/\r\n/g, '\n');
  const m = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    let [, k, v] = kv;
    v = v.trim();
    if (v === 'null' || v === '') data[k] = null;
    else if (v === 'true') data[k] = true;
    else if (v === 'false') data[k] = false;
    else if (/^-?\d+(\.\d+)?$/.test(v)) data[k] = parseFloat(v);
    else if (v.startsWith('"') && v.endsWith('"')) data[k] = v.slice(1, -1);
    else if (v.startsWith("'") && v.endsWith("'")) data[k] = v.slice(1, -1);
    else if (v.startsWith('[')) {
      try { data[k] = JSON.parse(v); } catch { data[k] = v; }
    }
    else data[k] = v;
  }
  return data;
}

const files = fs.readdirSync(propsDir).filter(f => f.endsWith('.md'));
const props = files.map(f => {
  const content = fs.readFileSync(path.join(propsDir, f), 'utf8');
  const data = parseFrontmatter(content);
  return { id: f.replace(/\.md$/, ''), data };
}).filter(p => p.data);

console.log(`Loaded ${props.length} properties from ${propsDir}`);

// ------ Reproduce server-side data attrs ------
const isPN = (loc) => !!loc && /Piatra Neam/i.test(loc);

function buildSearchBlob(p) {
  const raw = [
    p.data.title, p.data.location, p.data.zone, p.data.street,
    p.data.propertyType, p.data.status, p.data.listingStatus,
    ...(Array.isArray(p.data.features) ? p.data.features : [])
  ].filter(Boolean).join(' ').toLowerCase();
  return raw.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[,.;:()\[\]{}!?"„"'']/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function buildItem(p) {
  return {
    id: p.id,
    type: p.data.propertyType,
    status: p.data.status,
    zone: p.data.zone || '',
    street: p.data.street || '',
    price: parseFloat(p.data.price || 0),
    surface: (p.data.surface ?? p.data.landSurface ?? ''),
    rooms: p.data.rooms ?? 0,
    comision: p.data.comisionZero ? '1' : '0',
    exclusive: p.data.exclusive ? '1' : '0',
    listingStatus: p.data.listingStatus || 'Activ',
    region: isPN(p.data.location) ? 'PN' : 'imprejurimi',
    search: buildSearchBlob(p),
  };
}

const items = props.map(buildItem);

// ------ Reproduce passes() logic exactly ------
const normZ = (s) => (s || '').trim().toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '');

function passes(it, state) {
  if (state.q) {
    const terms = state.q.split(/\s+/).filter(Boolean);
    if (!terms.every(t => it.search.includes(t))) return false;
  }
  if (state.type !== 'all' && it.type !== state.type) return false;
  if (state.status !== 'all' && it.status !== state.status) return false;
  if (state.zone !== 'all') {
    if (state.zone.startsWith('region:')) {
      if (it.region !== state.zone.slice('region:'.length)) return false;
    } else {
      const itemZ = normZ(it.zone);
      const stateZ = normZ(state.zone);
      if (!(itemZ === stateZ || itemZ.startsWith(stateZ + ' ') || itemZ.startsWith(stateZ + '('))) return false;
    }
  }
  if (state.rooms !== 'all') {
    const r = parseInt(it.rooms, 10);
    if (state.rooms === '5') { if (r < 5) return false; }
    else { if (r !== parseInt(state.rooms, 10)) return false; }
  }
  const sRaw = it.surface;
  const s = parseFloat(sRaw);
  const sKnown = !isNaN(s) && s > 0;
  if (state.pMin !== null && it.price < state.pMin) return false;
  if (state.pMax !== null && it.price > state.pMax) return false;
  if (state.sMin !== null && (!sKnown || s < state.sMin)) return false;
  if (state.sMax !== null && (!sKnown || s > state.sMax)) return false;
  if (state.onlyCom && it.comision !== '1') return false;
  if (state.onlyExcl && it.exclusive !== '1') return false;
  if (!state.includeArchived) {
    if (it.listingStatus === 'Vândut' || it.listingStatus === 'Retras') return false;
  }
  return true;
}

const normQ = (q) => q.trim().toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[,.;:()\[\]{}!?"„"'']/g, ' ')
  .replace(/\s+/g, ' ').trim();

const defState = () => ({
  q: '', type: 'all', status: 'all', zone: 'all', rooms: 'all',
  pMin: null, pMax: null, sMin: null, sMax: null,
  onlyCom: false, onlyExcl: false, includeArchived: false
});

// ------ Scenarios ------
const scenarios = [
  { name: 'No filter', state: defState(), expectMin: 27 },
  { name: 'Zone = Mărăței', state: { ...defState(), zone: 'Mărăței' }, expectExact: 1 },
  { name: 'Zone = Centru', state: { ...defState(), zone: 'Centru' }, expectMin: 5 },
  { name: 'Zone = Dumbrava Roșie', state: { ...defState(), zone: 'Dumbrava Roșie' }, expectMin: 5 },
  { name: 'Zone = Bodești (prefix-match → Bodești de Jos)', state: { ...defState(), zone: 'Bodești' }, expectMin: 3 },
  { name: 'Zone = NonExistent', state: { ...defState(), zone: 'XYZ123' }, expectExact: 0 },
  { name: 'Region = PN', state: { ...defState(), zone: 'region:PN' }, expectMin: 10 },
  { name: 'Region = imprejurimi', state: { ...defState(), zone: 'region:imprejurimi' }, expectMin: 5 },
  { name: 'Search "darmanesti" (no diacritics)', state: { ...defState(), q: normQ('darmanesti') }, expectMin: 1 },
  { name: 'Search "Dărmănești" (with diacritics)', state: { ...defState(), q: normQ('Dărmănești') }, expectMin: 1 },
  { name: 'Search "centru piatra" (multi-word AND-match)', state: { ...defState(), q: normQ('centru piatra') }, expectMin: 5 },
  { name: 'Search "piatra centru" (reverse word order)', state: { ...defState(), q: normQ('piatra centru') }, expectMin: 5 },
  { name: 'Search "apartament centru" (type+zone match)', state: { ...defState(), q: normQ('apartament centru') }, expectMin: 1 },
  { name: 'Search "casa terasa" (type + feature)', state: { ...defState(), q: normQ('casa terasa') }, expectMin: 0 },
  { name: 'Search "MARATEI" (uppercase)', state: { ...defState(), q: normQ('MARATEI') }, expectMin: 1 },
  { name: 'Search "garaj"', state: { ...defState(), q: normQ('garaj') }, expectMin: 0 },
  { name: 'Type = Apartament', state: { ...defState(), type: 'Apartament' }, expectMin: 5 },
  { name: 'Type = Teren', state: { ...defState(), type: 'Teren' }, expectMin: 5 },
  { name: 'Type = Casă', state: { ...defState(), type: 'Casă' }, expectMin: 5 },
  { name: 'Type = Spațiu Comercial', state: { ...defState(), type: 'Spațiu Comercial' }, expectMin: 1 },
  { name: 'Status = Vânzare', state: { ...defState(), status: 'Vânzare' }, expectMin: 20 },
  { name: 'Status = Închiriere', state: { ...defState(), status: 'Închiriere' }, expectMin: 1 },
  { name: 'Price ≤ 30k', state: { ...defState(), pMax: 30000 }, expectMin: 1 },
  { name: 'Price 30k-80k', state: { ...defState(), pMin: 30000, pMax: 80000 }, expectMin: 3 },
  { name: 'Price 80k-150k', state: { ...defState(), pMin: 80000, pMax: 150000 }, expectMin: 3 },
  { name: 'Surface ≥ 100 mp', state: { ...defState(), sMin: 100 }, expectMin: 3 },
  { name: 'Rooms = 2', state: { ...defState(), rooms: '2' }, expectMin: 1 },
  { name: 'Comision 0%', state: { ...defState(), onlyCom: true }, expectMin: 5 },
  { name: 'Type Apartament + Zone Centru', state: { ...defState(), type: 'Apartament', zone: 'Centru' }, expectMin: 0 },
  { name: 'Type Casă + Region PN', state: { ...defState(), type: 'Casă', zone: 'region:PN' }, expectMin: 1 },
];

let pass = 0, fail = 0;
for (const sc of scenarios) {
  const matched = items.filter(it => passes(it, sc.state));
  let ok = true;
  if (sc.expectExact !== undefined) ok = matched.length === sc.expectExact;
  else if (sc.expectMin !== undefined) ok = matched.length >= sc.expectMin;
  const status = ok ? '✓' : '✗';
  if (ok) pass++; else fail++;
  const expect = sc.expectExact !== undefined ? `=${sc.expectExact}` : `≥${sc.expectMin}`;
  console.log(`${status} [${matched.length}/${expect}] ${sc.name}`);
  if (!ok && matched.length < 5) {
    console.log(`    matched: ${matched.map(m => m.id).join(', ') || '(none)'}`);
  }
}

console.log(`\n${pass}/${scenarios.length} scenarios passed (${fail} failed)`);
process.exit(fail > 0 ? 1 : 0);

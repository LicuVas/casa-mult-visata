// Parsează valoarea structurată „Județ › Localitate › Sat/Cartier" din câmpul CMS `localitate`.
// Ex: "Neamț › Bicaz › Izvorul Muntelui" → { judet:'Neamț', localitate:'Bicaz', sat:'Izvorul Muntelui', leaf:'Izvorul Muntelui' }
export interface ParsedLocalitate {
  judet: string;
  localitate: string;
  sat: string;
  leaf: string;
  full: string;
}

export function parseLocalitate(v?: string | null): ParsedLocalitate | null {
  if (!v || typeof v !== 'string') return null;
  const parts = v.split('›').map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return null;
  const judet = parts[0] || '';
  const localitate = parts[1] || '';
  const sat = parts[2] || parts[1] || '';
  return { judet, localitate, sat, leaf: parts[parts.length - 1], full: parts.join(' › ') };
}

// Zona afișată pe carduri/pagini: derivată din `localitate` (structurat) dacă există,
// altfel `zone` clasic (compatibilitate cu anunțurile vechi).
export function displayZone(data: { localitate?: string | null; zone?: string | null }): string {
  const p = parseLocalitate(data.localitate);
  if (p) {
    if (p.sat && p.localitate && p.sat !== p.localitate) return `${p.sat}, ${p.localitate}`;
    return p.localitate || p.leaf;
  }
  return data.zone || '';
}

// Tokeni de căutare derivați din `localitate` (toate segmentele, pt filtrul text).
export function localitateTokens(v?: string | null): string[] {
  const p = parseLocalitate(v);
  if (!p) return [];
  return [p.judet, p.localitate, p.sat, p.full].filter(Boolean);
}

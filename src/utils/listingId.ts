// Stable, human-friendly public listing ID derived from the immutable slug.
// Deterministic (no randomness / no Date) -> same slug always yields the same code
// across builds, so it is safe to display, search by, and quote in messages.
// Format: CMV-##### (5 digits). The slug stays the canonical URL id; this is the
// "cod anunț" the client and visitors reference verbally / in the contact form.
export function listingId(slug: string): string {
  let h = 2166136261; // FNV-1a basis
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const n = 10000 + ((h >>> 0) % 90000); // 10000..99999, stable
  return `CMV-${n}`;
}

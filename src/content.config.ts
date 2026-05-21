import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Helpers: CMS writes `null` and `""` for empty fields. Normalize to undefined.
const optStr = z.preprocess(
  (v) => (v === null || v === '' ? undefined : v),
  z.string().optional()
);
const optNum = z.preprocess(
  (v) => (v === null || v === '' ? undefined : v),
  z.number().optional()
);
const optBool = (def: boolean) => z.preprocess(
  (v) => (v === null || v === '' ? def : v),
  z.boolean().default(def)
);

// Required enum with null-safe preprocess (Sveltia writes null for empty selects).
const reqEnum = <T extends readonly [string, ...string[]]>(values: T, fallback: T[number]) =>
  z.preprocess((v) => (v === null || v === '' ? fallback : v), z.enum(values));

const proprietati = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proprietati" }),
  schema: z.object({
    title: z.string().min(1, 'Titlul nu poate fi gol'),
    status: reqEnum(['Vânzare', 'Închiriere'] as const, 'Vânzare'),
    price: z.preprocess((v) => (v === null || v === '' ? 0 : v), z.number().nonnegative()),
    currency: reqEnum(['EUR', 'RON'] as const, 'EUR'),
    pricePerUnit: optStr,
    location: z.string().min(1, 'Locația nu poate fi goală'),
    zone: optStr,
    street: optStr,
    propertyType: reqEnum(['Apartament', 'Casă', 'Teren', 'Spațiu Comercial'] as const, 'Apartament'),
    rooms: optNum,
    bathrooms: optNum,
    surface: optNum,
    landSurface: optNum,
    floor: optStr,
    yearBuilt: optNum,
    features: z.preprocess((v) => (v === null ? [] : v), z.array(z.string()).default([])),
    featuredImage: optStr,
    gallery: z.preprocess((v) => (v === null ? [] : v), z.array(z.string()).default([])),
    exclusive: optBool(false),
    comisionZero: optBool(true),
    listingStatus: z.preprocess(
      (v) => (v === null || v === '' || v === undefined ? 'Activ' : v),
      z.enum(['Activ', 'Rezervat', 'Vândut', 'Retras']).default('Activ')
    ),
    updatedAt: optStr,
    // coords: legacy [lat,lng] tuple OR Sveltia GeoJSON Point string OR garbage (handled at runtime).
    coords: z.unknown().optional(),
    videoUrl: optStr,
    virtualTourUrl: optStr,
    floorPlan: optStr,
    privateOwnerContact: optStr,
    privateNotes: optStr,
  }),
});

export const collections = { proprietati };

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

const proprietati = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proprietati" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['Vânzare', 'Închiriere']),
    price: z.number(),
    currency: z.enum(['EUR', 'RON']).default('EUR'),
    pricePerUnit: optStr,
    location: z.string(),
    zone: optStr,
    street: optStr,
    propertyType: z.enum(['Apartament', 'Casă', 'Teren', 'Spațiu Comercial']),
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
    listingStatus: z.enum(['Activ', 'Rezervat', 'Vândut', 'Retras']).default('Activ'),
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

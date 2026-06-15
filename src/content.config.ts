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

// Grouped per-type characteristic objects from the CMS (apartment/house/land).
// Sveltia has no conditional fields, so each type has its own collapsible object;
// values are booleans. Optional + record(unknown) → existing listings need no migration.
const optObj = z.preprocess(
  (v) => (v === null || v === '' ? undefined : v),
  z.record(z.unknown()).optional()
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
      z.enum(['Activ', 'Rezervat', 'Vândut', 'Închiriat', 'Retras']).default('Activ')
    ),
    updatedAt: optStr,
    // coords: legacy [lat,lng] tuple OR Sveltia GeoJSON Point string OR garbage (handled at runtime).
    coords: z.unknown().optional(),
    videoUrl: optStr,
    virtualTourUrl: optStr,
    floorPlan: optStr,
    privateOwnerContact: optStr,
    privateNotes: optStr,

    // Câmpuri Romania-specifice (2025-2026 per Storia/Imobiliare best practices).
    // Toate optional — proprietățile existente nu necesită migrare.
    energyClass: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'în curs de obținere']).optional()
    ),
    intabulat: z.preprocess(
      (v) => {
        if (v === null || v === '' || v === undefined) return undefined;
        if (v === 'true' || v === true) return true;
        if (v === 'false' || v === false) return false;
        return v;
      },
      z.boolean().optional()
    ),
    cadastralNumber: optStr,
    compartimentare: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['Decomandat', 'Semidecomandat', 'Nedecomandat', 'Circular', 'Open-space']).optional()
    ),
    floorsTotal: optNum,
    heatingType: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['Centrală proprie pe gaz', 'Centrală proprie pe lemne/peleți', 'Termoficare', 'Centrală de bloc', 'Sobă', 'Altă sursă']).optional()
    ),
    orientation: optStr,
    parking: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['Garaj', 'Loc subteran', 'Loc suprateran', 'Stradă', 'Niciun loc']).optional()
    ),
    balconies: optNum,
    balconySurface: optNum,
    condition: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['Nou', 'Renovat recent', 'Bună stare', 'Necesită renovare']).optional()
    ),
    surfaceUtila: optNum,
    surfaceConstruita: optNum,
    availableFrom: optStr,
    buildingType: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['Bloc', 'Vilă', 'Casă', 'Ansamblu rezidențial', 'Clădire de birouri']).optional()
    ),
    structureType: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['Cărămidă', 'BCA', 'Panou prefabricat', 'Mixt', 'Lemn']).optional()
    ),
    confortClass: z.preprocess(
      (v) => (v === null || v === '' ? undefined : v),
      z.enum(['Confort 1', 'Confort 1 sporit', 'Confort 2', 'Confort 3']).optional()
    ),

    // Caracteristici grupate pe tip (din CMS). Bifate = true; afișate în „Facilități și caracteristici".
    caracteristiciApartament: optObj,
    caracteristiciCasa: optObj,
    caracteristiciTeren: optObj,
  }),
});

export const collections = { proprietati };

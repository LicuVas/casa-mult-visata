import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const proprietati = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/proprietati" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['Vânzare', 'Închiriere']),
    price: z.number(),
    currency: z.enum(['EUR', 'RON']).default('EUR'),
    pricePerUnit: z.string().optional(), // e.g. "35 €/mp"
    location: z.string(),
    zone: z.string().optional(), // zona din Piatra Neamț sau sat
    propertyType: z.enum(['Apartament', 'Casă', 'Teren', 'Spațiu Comercial']),
    rooms: z.number().optional(),
    bathrooms: z.number().optional(),
    surface: z.number().optional(), // mp construiți
    landSurface: z.number().optional(), // mp teren
    floor: z.string().optional(),
    yearBuilt: z.number().optional(),
    features: z.array(z.string()).default([]),
    featuredImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    exclusive: z.boolean().default(false),
    comisionZero: z.boolean().default(true),
    // PRIVATE - NOT rendered on frontend
    privateOwnerContact: z.string().optional(),
    privateNotes: z.string().optional(),
  }),
});

export const collections = { proprietati };

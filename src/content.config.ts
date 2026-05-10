import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

const roleSchema = z.object({
  role: z.string().min(1),
  start: z.string().regex(/^[A-Z][a-z]{2} \d{4}$/, "Format: 'Jan 2024'"),
  end: z.union([
    z.string().regex(/^[A-Z][a-z]{2} \d{4}$/),
    z.literal("Present"),
  ]),
  tech: z.array(z.string()).min(1),
});

const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  roles: z.array(roleSchema),
});

const experience = defineCollection({
  loader: file("src/data/experience.json"),
  schema: experienceSchema,
});

export const collections = { experience };

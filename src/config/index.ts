import { z } from "astro/zod";

const configSchema = z.object({
  name: z.object({
    first: z.string(),
    last: z.string(),
    full: z.string(),
  }),
  location: z.string(),
  links: z.object({
    email: z.email(),
    github: z.url(),
    linkedin: z.url(),
    personal: z.string(),
    repoUrl: z.string(),
  }),
  bio: z.string(),
  roles: z.array(z.string()).min(1),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const config = configSchema.parse({
  name: {
    first: "Ričardas",
    last: "Brazdžius",
    full: "Ričardas Brazdžius",
  },
  location: "Vilnius, Lithuania",
  links: {
    email: "ricardas.brazdzius@gmail.com",
    github: "https://github.com/BMRicardas",
    linkedin: "https://www.linkedin.com/in/ricardas-brazdzius",
    personal: "https://ricardas.io",
    repoUrl: "https://github.com/BMRicardas/ricardas-io-v3",
  },
  bio: "JavaScript engineer based in Vilnius. I build clean, fast interfaces with React and TypeScript.",
  roles: [
    "JavaScript Engineer",
    "TypeScript Developer",
    "React Specialist",
    "Frontend Developer",
  ],
  seo: {
    title: "Ričardas Brazdžius — JavaScript Engineer",
    description:
      "JavaScript engineer based in Vilnius, Lithuania. React, TypeScript, frontend development.",
  },
});

export type Config = z.infer<typeof configSchema>;

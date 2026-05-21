import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";
import { formatDuration } from "@/lib/format-duration";

const roleSchema = z.object({
  role: z.string().min(1),
  start: z.string().regex(/^[A-Z][a-z]{2} \d{4}$/, "Format: 'Jan 2024'"),
  end: z.union([
    z.string().regex(/^[A-Z][a-z]{2} \d{4}$/, "Format: 'Jan 2024'"),
    z.literal("Present"),
  ]),
  tech: z.array(z.string()).min(1),
});

const experienceSchema = z
  .object({
    id: z.string(),
    company: z.string(),
    roles: z.array(roleSchema),
  })
  .transform((exp) => {
    const enrichedRoles = exp.roles.map((role) => ({
      ...role,
      duration: formatDuration(role.start, role.end),
      period: `${role.start} — ${role.end}`,
      isCurrent: role.end === "Present",
    }));

    const newest = enrichedRoles[0];
    const oldest = enrichedRoles[enrichedRoles.length - 1];

    const totalDuration = formatDuration(oldest.start, newest.end);
    const period = `${oldest.start} — ${newest.end}`;
    const isGrouped = enrichedRoles.length > 1;
    const isCurrent = newest.isCurrent;
    const subtitle = isGrouped
      ? `${totalDuration} · ${enrichedRoles.length} roles`
      : totalDuration;

    return {
      ...exp,
      roles: enrichedRoles,
      totalDuration,
      period,
      isGrouped,
      isCurrent,
      subtitle,
    };
  });

const experience = defineCollection({
  loader: file("src/data/experience.json"),
  schema: experienceSchema,
});

export const collections = { experience };

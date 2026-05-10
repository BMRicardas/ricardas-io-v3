import type { CollectionEntry } from "astro:content";

export type Experience = CollectionEntry<"experience">["data"];
export type ExperienceRole = Experience["roles"][number];

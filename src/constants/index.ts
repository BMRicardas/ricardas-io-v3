import { config } from "@/config";
import Icon from "@/components/ui/icon.astro";
import type { ComponentProps } from "astro/types";

type ContactLink = {
  href: string;
  label: string;
  external: boolean;
  tooltips: string[];
  icon: ComponentProps<typeof Icon>;
};

export const CONTACT_LINKS = [
  {
    href: config.links.github,
    label: "GitHub",
    external: true,
    tooltips: [
      "Where the magic happens ✨",
      "Yes, I do commit on weekends",
      "git push --force 🫣",
      "My second home",
    ],
    icon: { name: "github" },
  },
  {
    href: config.links.linkedin,
    label: "LinkedIn",
    external: true,
    tooltips: [
      "Let's connect! 🤝",
      "I accept everyone, no worries",
      "Professional vibes only 💼",
      "Endorsements welcome 😏",
    ],
    icon: { name: "linkedin" },
  },
  {
    href: `mailto:${config.links.email}`,
    label: "Email",
    external: false,
    tooltips: [
      "Old school, I like it 📧",
      "Slide into my inbox",
      "I actually reply fast ⚡",
      "No spam pls 🙏",
    ],
    icon: { name: "mail-outline" },
  },
] satisfies ContactLink[];

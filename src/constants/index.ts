import { config } from "@/config";
import type { IconName } from "@/lib/icons";

type ContactLink = {
  href: string;
  label: string;
  external: boolean;
  tooltips: string[];
  icon: IconName;
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
    icon: "github",
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
    icon: "linkedin",
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
    icon: "mail",
  },
] satisfies ContactLink[];

// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ricardas.io",
  integrations: [react(), sitemap()],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-sans",
    },
  ],
  env: {
    schema: {
      PUBLIC_FORMSPREE_URL: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
});

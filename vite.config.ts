import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitro } from "nitro/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    nitro({
      vercel: {
        config: {
          version: 3,
          images: {
            domains: ["filosamtale.no", "filosamtale.vercel.app"],
            // ✨ Provide standard device widths to satisfy the Vercel typing contract
            sizes: [256, 384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            minimumCacheTTL: 60,
            formats: ["image/webp"],
          },
        },
      },
    }),
    viteReact(),
  ],
});

export default config;

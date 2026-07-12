import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),

    tanstackStart({
      server: {
        entry: "server",
      },
    }),

    cloudflare({
      viteEnvironment: {
        name: "ssr",
      },
    }),

    viteReact(),
  ],
});

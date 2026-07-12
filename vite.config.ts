import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),

    tanstackStart({
      // Preserve the existing custom SSR server entry:
      // src/server.ts
      server: {
        entry: "server",
      },
    }),

    // Must come after tanstackStart().
    viteReact(),
  ],
});

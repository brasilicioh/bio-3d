import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/bio-3d/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@models": fileURLToPath(new URL("./src/assets/models", import.meta.url)),
    },
  },
});

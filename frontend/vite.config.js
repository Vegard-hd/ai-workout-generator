import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

export default defineConfig({
  plugins: [tailwindcss(), preact()],
  server: {
    allowedHosts: [
      ".my-public-apps-aiworkoutgenerator-lpwjh8-0cee82-51-68-234-12.traefik.me",
      ".localhost:3008/*",
      ".localhost:4173",
      ".localhost:3000",
    ],
    host: "0.0.0.0",
    port: 4173,
    watch: {
      usePolling: true,
    },
  },
});

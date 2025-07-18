import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

export default defineConfig({
  plugins: [tailwindcss(), preact()],
  build: {
    outDir: "dist", // This should be 'dist'
  },
  server: {
    allowedHosts: [
      ".my-public-apps-aiworkoutgenerator-lpwjh8-0cee82-51-68-234-12.traefik.me",
    ],
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});

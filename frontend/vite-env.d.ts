/// <reference types="vite/client" />

// Ensure TS knows about Vite's env object and our variables
interface ImportMetaEnv {
  readonly VITE_BACKEND_API_URL: string;
  // add more env vars here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

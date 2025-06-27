import express from "express";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import { existsSync, readdirSync } from "fs";

const app = express();
const PORT = process.env.PORT || 3009;

const __dirname = dirname(fileURLToPath(import.meta.url));

// Debug: Check what's in the current directory
console.log("Current directory contents:", readdirSync(__dirname));
console.log("Current directory ../", readdirSync(__dirname));

// Debug: Check if dist exists
const distPath = join(__dirname, "dist");

const testPath = join("../", __dirname);
console.log("test path is . ... ", testPath);

console.log("Dist path:", distPath);
console.log("Dist exists:", existsSync(distPath));

if (existsSync(distPath)) {
  console.log("Dist contents:", readdirSync(distPath));
}

// Serve static files from the dist directory
app.use(express.static(join(__dirname, "dist")));

// ... rest of your server code

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3009;

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the dist directory
app.use(express.static(join(__dirname, "dist")));

// Handle SPA routing - all routes should serve index.html
app.get(/.*/, (req, res) => {
  const indexPath = resolve(__dirname, "dist", "index.html");

  // Check if index.html exists
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Not found: dist/index.html does not exist");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Current directory: ${__dirname}`);

  // Debug: List files in dist directory
  try {
    const files = fs.readdirSync(join(__dirname, "dist"));
    console.log("Files in dist directory:", files);
  } catch (error) {
    console.error("Error reading dist directory:", error);
  }
});

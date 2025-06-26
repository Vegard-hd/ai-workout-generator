import express from "express";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const app = express();
const PORT = process.env.PORT || 3009;

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the dist directory
app.use(express.static(join(__dirname, "dist")));

const htmlServing = resolve(__dirname, "../", "dist", "index.html");
console.log("html is serving,", htmlServing);
// Handle SPA routing - all routes should serve index.html
app.get("/{*splat}", (req, res) => {
  try {
    const indexPath = resolve(__dirname, "dist", "index.html");
    res.sendFile(indexPath);
  } catch (error) {
    console.warn(error);
    res.status(500).send("Failed to send html file with error: ", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Current directory: ${__dirname}`);

  // Debug: List files in dist directory
});

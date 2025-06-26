import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3009;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// This wildcard route is essential for react-router to work correctly.
// It sends the 'index.html' file for any request that doesn't match a static file.
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

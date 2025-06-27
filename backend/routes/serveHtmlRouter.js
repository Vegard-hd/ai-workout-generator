import { Router, static as static_ } from "express";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";
const router = Router();

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../frontend/dist");

// Serve all static assets in dist
router.use(static_(distDir));
console.log(distDir);

// Send index.html for the root path ("/")
router.get("/", (req, res, next) => {
  res.sendFile(join(distDir, "index.html"), (err) => {
    if (err) next(err);
  });
});

// Optional: SPA fallback (send index.html for all client-side routes)
// Uncomment if you want all non-file requests to be handled by the SPA
// router.get("*", (req, res, next) => {
//   res.sendFile(join(distDir, "index.html"), (err) => {
//     if (err) next(err);
//   });
// });

export default router;

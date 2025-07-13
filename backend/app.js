import helmet from "helmet";
import createError from "http-errors";
import express, { json, urlencoded, static as static_ } from "express";
import { fileURLToPath } from "url";
import compression from "compression";
import { join, dirname, resolve } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";
import { config } from "dotenv";
config();
const app = express();

app.set("trust proxy", 1);

const isNodeEnvProduction = () => process.env.NODE_ENV === "production";

// Define your CORS options
const corsOptions = {
  origin: "*", // Allow only this origin
  methods: ["GET", "POST", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: [
    "Content-Type", // Allows the client to send the Content-Type header
    "Authorization", // Allows the client to send the Authorization header (if you use it)
    // Add any other custom header names your client might send
  ],

  optionsSuccessStatus: 200, // For legacy browser support
};

if (!isNodeEnvProduction()) {
  app.use(cors(corsOptions));
}

app.use(logger(isNodeEnvProduction() ? "short" : "dev"));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "defaultSrc": ["'self'"],
        "scriptSrc": [
          "'self'",
          // External analytics domain
          "https://required.vegardhaglund.website",
          "https://vegardhaglund.dev",
          // The exact SRI hash that must match your script:
          "'sha256-vWy/FtNaC22Y9pupfppguZSbSAYgSEtIRR8f2eutk2w='",

          "'sha256-rikP6O8OvZlYRMZkxJ9ZM9m/LxculWr4DxAXvwZAF7c='",
          // Hash for the second inline script
          "'sha256-aC3TtldQSJT6BYG+YLmdIrmIMN9A3u57ew6QfF5IEzk='",
        ],
        "connectSrc": [
          "'self'",
          "https://required.vegardhaglund.website",
          "https://vegardhaglund.dev",
        ],
        // Optionally specify other directives, e.g. for styles:
        "styleSrc": ["'self'"],
        "img-src": [
          "'self'",
          "https://vegardhaglund.dev",
          "https://outdoorworkoutgenerator.app",
        ],
      },
    },
  }),
);

app.use(
  compression({
    level: 8,
  }),
);

app.use(json());
app.use(urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies
app.use(cookieParser());

// api endpoint - serve before everything else for frontend to work
app.use("/api", indexRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));

// public files and node modules
app.use(express.static(join(__dirname, "public")));

// dist files generated from vite build
const distDir = resolve(__dirname, "./frontend/dist");

// Serve all static assets in dist
app.use(static_(distDir));

// Send index.html for the root path
app.get("/{*splat}", (req, res, next) => {
  try {
    res.sendFile(join(distDir, "index.html"), (err) => {
      if (err) next(err);
    });
  } catch (error) {
    console.warn(error);
    throw new Error("Failed to send index.html");
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.warn("forward error middleware called");
  next(createError[404]("Not found"));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json("Something went wrong with error", err.statusCode);
});

export default app;

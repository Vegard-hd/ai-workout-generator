import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import indexRouter from "./routes/index";

const app = express();

// Define your CORS options
const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  methods: ["GET", "POST", "OPTIONS"], // Allow these HTTP methods
  allowedHeaders: [
    "Content-Type", // Allows the client to send the Content-Type header
    "Authorization", // Allows the client to send the Authorization header (if you use it)
    // Add any other custom header names your client might send
  ],
  optionsSuccessStatus: 200, // For legacy browser support
};

// Enable CORS with specific options
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: true })); // Add this line to parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());

// public files and node modules
app.use(express.static(join(__dirname, "public")));

// router endpoint binding
app.use("/api", indexRouter);

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

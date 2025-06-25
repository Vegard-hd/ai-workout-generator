import { Router } from "express";
const router = Router();
import { rateLimit } from "express-rate-limit";

import GeminiService from "../services/GeminiService";
import { WorkoutModel } from "../models/WorkoutModel";
const workoutModel = new WorkoutModel();
import { parseTrainingData } from "../functions/parseTrainingData";

/* async function createDelay(timer = 2500) {
  const myPromise = new Promise((resolve, reject) => {
    try {
      setInterval(() => {
        resolve();
      }, timer);
    } catch (error) {
      if (error) reject();
    }
  });
  return await myPromise;
} */

router.get("/workout", async (req, res, next) => {
  try {
    const workouts = "";
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});
router.get("/workout/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const workoutData = await workoutModel.getWorkout({ _id: id });
    console.dir(workoutData);
    res.json(workoutData);
  } catch (error) {
    next(error);
  }
});

router.post("/like", async (req, res, next) => {
  try {
    const { workoutId } = req.body;
    console.log("workoutid is ... ", typeof workoutId?.workoutId);
    if (typeof workoutId?.workoutId !== "string") {
      throw new Error("The workout id must be a valid string ");
    }
    return await workoutModel
      .updateLikes(workoutId?.workoutId)
      .then((data) => {
        console.dir(data);
        return res.status(201).json({ success: true });
      })
      .catch((err) => {
        console.warn(err);
        return res.status(400).json({ success: false });
      });
  } catch (error) {
    next(error);
  }
});

router.post("/unlike", async (req, res, next) => {
  try {
    const { workoutId } = req.body;
    return await workoutModel
      .decrementLikes(workoutId)
      .then((data) => {
        return res.status(201).json({ data: JSON.parse(data) });
      })
      .catch((err) => {
        console.warn(err);
        return res.status(400).json({ data: false });
      });
  } catch (error) {
    next(error);
  }
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // skip: (req) => req.url === "/api/like",
  // store: ... , // Redis, Memcached, etc. See below.
});

// Apply the rate limiting middleware to all requests.
router.use(limiter);

router.post("/workout", async (req, res, next) => {
  try {
    const { activity, duration, focus, freshness, motivation } = req.body;

    if (!activity || !duration || !focus || !freshness || !motivation) {
      return res
        .status(400)
        .json({ error: "Missing required workout options" });
    }
    const workoutDetilsObj = {
      activity: activity,
      duration: duration,
      focus: focus,
      freshness: freshness,
      motivation: motivation,
    };
    // const geminiAiResult = await GeminiService.generateWorkout(req.body);

    const workoutName = await GeminiService.generateWorkoutName().then((data) =>
      data.trim(),
    );
    console.log(workoutName);

    // console.log(geminiAiResult);
    const mockResult = [
      {
        duration: 5,
        zone: 1,
        description: "Easy warm-up, gentle pedaling.",
      },
      {
        duration: 5,
        zone: 2,
        description: "Light spinning, focusing on smooth pedal strokes.",
      },
      {
        duration: 5,
        zone: 1,
        description: "Active recovery, very light resistance.",
      },
      {
        duration: 5,
        zone: 2,
        description: "Increase cadence slightly, maintain low resistance.",
      },
    ];
    res.header("Content-Type: application/json");

    const workoutDuration = await parseTrainingData(mockResult);
    return await workoutModel
      .createWorkout({
        workout: JSON.stringify(mockResult),
        duration: JSON.stringify(workoutDuration),
        title: JSON.stringify(workoutName),
        details: JSON.stringify(workoutDetilsObj),
      })
      .then((data) => {
        return res.status(201).json({ success: true, id: data._id });
      })
      .catch((err) => {
        console.warn(err);
        return res.status(400).json({ success: false, id: null });
      });
    /* 
    1. insert into mongodb
    2. return the mongoID + 201
    2.5 redirect the client to /workout/:id 
    3. client fetch(/workout/:id)
    
    */
  } catch (error) {
    console.error("Error generating workout:", error);
    next(error);
  }
});

export default router;

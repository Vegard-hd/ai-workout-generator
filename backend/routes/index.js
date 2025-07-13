import { Router } from "express";
const router = Router();
import { rateLimit } from "express-rate-limit";

import GeminiService from "../services/GeminiService";

import { parseTrainingData } from "../functions/parseTrainingData";

import { validateNewWorkout } from "../validation/validateNewWorkout";

import { PocketBaseService } from "../pocketbase/workouts";

const pocketBaseService = new PocketBaseService();

// returns the most popular workouts sorted by likes
router.get("/workout", async (req, res, next) => {
  try {
    const workouts = await pocketBaseService.getMostPopularWorkouts();
    console.dir(workouts);
    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
});
router.get("/workout/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const workoutData = await pocketBaseService.getOneWithId(id);
    res.json(workoutData);
  } catch (error) {
    next(error);
  }
});

router.post("/like", async (req, res, next) => {
  try {
    const { workoutId } = req.body;
    if (typeof workoutId?.workoutId !== "string") {
      throw new Error("The workout id must be a valid string ");
    }
    return await pocketBaseService
      .incrementLike(workoutId?.workoutId)
      .then((data) => {
        console.dir(data);
        return res.status(201).json({ success: true, data: data });
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
    res.send("todo... finish this API", workoutId);
  } catch (error) {
    next(error);
  }
});

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.

  // skip: (req) => req.url === "/api/like",
  // store: ... , // Redis, Memcached, etc. See below.
});

router.post(
  "/workout",
  aiLimiter,
  validateNewWorkout,
  async (req, res, next) => {
    try {
      const { activity, duration, focus, freshness, motivation } = req.body;

      const workoutDetilsObj = {
        activity: activity,
        duration: duration,
        focus: focus,
        freshness: freshness,
        motivation: motivation,
      };

      const workoutName = await GeminiService.generateWorkoutName(
        workoutDetilsObj.focus,
        workoutDetilsObj.activity,
      ).then((data) => data.trim());

      const generatedWorkout =
        await GeminiService.generateWorkout(workoutDetilsObj);

      console.log(generatedWorkout);

      res.header("Content-Type: application/json");

      const workoutDuration = await parseTrainingData(generatedWorkout);
      return await pocketBaseService
        .createWorkout({
          title: JSON.stringify(workoutName),
          duration: JSON.stringify(workoutDuration),
          workout: JSON.stringify(generatedWorkout),
          details: JSON.stringify(workoutDetilsObj),
          likes: 1,
        })
        .then((data) => {
          console.dir(data);
          return res.status(201).json({ success: true, id: data.id });
        })
        .catch((err) => {
          console.warn(err);
          return res.status(400).json({ success: false, id: null });
        });
    } catch (error) {
      console.error("Error generating workout:", error);
      next(error);
    }
  },
);

export default router;

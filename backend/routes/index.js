import { Router } from "express";
const router = Router();

import GeminiService from "../services/GeminiService";

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

router.post("/generateworkout", async (req, res, next) => {
  try {
    // await createDelay();
    // 1. Extract and validate workout options from the request body
    const { activity, duration, focus, freshness, motivation } = req.body;
    console.log(req.body);
    // Basic validation (you might want to add more robust validation)
    if (!activity || !duration || !focus || !freshness || !motivation) {
      return res
        .status(400)
        .json({ error: "Missing required workout options" });
    }
    const geminiAiResult = await GeminiService.generateWorkout(req.body);

    // For now, let's return a mock workout plan
    // const geminiAiResult = await exampleRes.text();

    // 4. Send the generated workout back to the client
    res.header("Content-Type: application/json");
    const parseTrainingData = (trainingData = []) => {
      function getSumOfObj(trainingData = [], zoneKey) {
        return trainingData
          .filter((e) => e.zone === zoneKey)
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue.duration,
            0,
          );
      }

      const sum = trainingData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.duration,
        0,
      );

      return {
        totalDuration: sum,
        totalZ1: getSumOfObj(trainingData, 1),
        totalZ2: getSumOfObj(trainingData, 2),
        totalZ3: getSumOfObj(trainingData, 3),
        totalZ4: getSumOfObj(trainingData, 4),
        totalZ5: getSumOfObj(trainingData, 5),
      };
    };
    console.log("geminiAIResult is ... ", geminiAiResult);
    const workoutDuration = parseTrainingData(geminiAiResult);
    res.json({
      workout: JSON.stringify(geminiAiResult),
      workoutDuration: workoutDuration,
    }); // Replace mockWorkoutPlan with 'workoutPlan' from Gemini
  } catch (error) {
    console.error("Error generating workout:", error);
    // Pass the error to the Express error handler
    next(error);
  }
});

export default router;

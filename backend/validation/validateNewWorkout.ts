import { isNumeric } from "validator";
import type { Request, Response, NextFunction } from "express";

const activityOptions = ["cycling", "running"];

const focusOptions = [
  "recovery",
  "endurance",
  "threshold",
  "short climbs",
  "max power",
];
const freshnessOptions = [
  "fully recovered",
  "well rested",
  "moderately fatigued",
  "significantly fatigued",
  "very drained",
];
const motivationOptions = [
  "motivated",
  "extremely motivated",
  "just want to get it done",
  "not motivated",
];
const durationOptions = [
  "20",
  "30",
  "45",
  "60",
  "75",
  "90",
  "120",
  "150",
  "180",
];

export function validateNewWorkout(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { activity, duration, focus, freshness, motivation } = req.body;

  if (!activity || !duration || !focus || !freshness || !motivation) {
    return res.status(409).json({ error: "Missing required workout options" });
  }
  const durationString = `${duration}`;
  const activityString = `${activity}`.toLowerCase();
  const focusString = `${focus}`.toLowerCase();
  const freshnessString = `${freshness}`.toLowerCase();
  const motivationString = `${motivation}`.toLowerCase();
  if (!isNumeric(durationString))
    return res
      .status(409)
      .json({ error: "Duration provided in workout is invalid" });

  const activityIsValid = activityOptions.includes(activityString);
  const focusIsValid = focusOptions.includes(focusString);
  const freshnessIsValid = freshnessOptions.includes(freshnessString);
  const motivationIsValid = motivationOptions.includes(motivationString);
  const durationIsValid = durationOptions.includes(durationString);

  if (!activityIsValid)
    return res.status(409).json({
      error: "Validation of new workout failed. Activity field is invalid",
    });

  if (
    !activityIsValid ||
    !focusIsValid ||
    !freshnessIsValid ||
    !motivationIsValid ||
    !durationIsValid
  ) {
    return res.status(409).json({
      error:
        "Validation of new workout failed. Only provided options are allowed",
    });
  }
  next();
}

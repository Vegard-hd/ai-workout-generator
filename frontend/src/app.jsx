import { SelectDuration } from "./components/SelectDuration";
import { SelectActivity } from "./components/SelectActivity";
import { SelectFocus } from "./components/SelectFocus";
import { SelectFreshness } from "./components/SelectFreshness";
import { SelectMotivation } from "./components/SelectMotivation";
import { WorkoutGenerator } from "./components/WorkoutGenerator";
import { useState } from "preact/hooks";
export function App() {
  const activityOptions = ["Cycling", "Running"];
  const [activity, setActivity] = useState(activityOptions[0]);

  const durationOptions = [20, 30, 45, 60, 75, 90, 120, 150, 180];
  const [duration, setDuration] = useState(durationOptions[0]); // Initialize duration to null
  const focusOptions = [
    "Recovery",
    "Endurance",
    "Threshold",
    "Short climbs",
    "Max power",
  ];
  const [focus, setFocus] = useState(focusOptions[0]); // Initialize duration to null
  const freshnessOptions = [
    "Fully Recovered",
    "Well Rested",
    "Moderately Fatigued",
    "Significantly Fatigued",
    "Very Drained",
  ];
  const [freshness, setFreshness] = useState(freshnessOptions[0]); // Initialize duration to null
  const motivationOptions = [
    "Motivated",
    "Extremely motivated",
    "Just want to get it done",
    "Not motivated",
  ];
  const [motivation, setMotivation] = useState(motivationOptions[0]); // Initialize duration to null
  const userWorkoutConfig = {
    activity: activity,
    duration: duration,
    focus: focus,
    freshness: freshness,
    motivation: motivation,
  };
  return (
    <>
      <h1 className=" flex text-5xl text-center justify-center p-3">
        AI Workout Generator
      </h1>

      <SelectActivity
        currentActivity={activity} // Pass the state value
        onActivityChange={setActivity} // Pass the setter function
        options={activityOptions} // Pass the options to map over
      />

      <div className="grid grid-cols-12 gap-1 max-w-dvw">
        <SelectDuration
          currentDuration={duration}
          onDurationChange={setDuration}
          options={durationOptions}
        />
        <SelectFocus
          currentFocus={focus}
          onFocusChange={setFocus}
          options={focusOptions}
        />
        <SelectFreshness
          currentFreshness={freshness}
          onFreshnessChange={setFreshness}
          options={freshnessOptions}
        />
        <SelectMotivation
          currentMotivation={motivation}
          onMotivationChange={setMotivation}
          options={motivationOptions}
        />
      </div>
      <WorkoutGenerator workoutData={userWorkoutConfig} />
    </>
  );
}

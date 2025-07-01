import { SelectDuration } from "./components/SelectDuration";
import { SelectActivity } from "./components/SelectActivity";
import { SelectFocus } from "./components/SelectFocus";
import { SelectFreshness } from "./components/SelectFreshness";
import { SelectMotivation } from "./components/SelectMotivation";
import { WorkoutGenerator } from "./components/WorkoutGenerator";

import { DisplayListOfWorkouts } from "./components/DisplayListOfWorkouts";

import { useState } from "preact/hooks";

import something from "../public/android-chrome-192x192.png";

export function App() {
  const activityOptions = ["Cycling", "Running"];
  const [activity, setActivity] = useState(activityOptions[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [showCreateWorkoutOptions, setShowCreateWorkoutOptions] =
    useState(false);

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
      <div className="flex justify-center items-center gap-x-5 p-3">
        <h1 className="text-5xl text-center">AI Workout Generator</h1>
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img src={something} alt="Avatar" />
          </div>
        </div>
      </div>

      <button
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setShowCreateWorkoutOptions(true);
        }}
        style={{ cursor: "pointer" }}
        className={`
          flex place-self-center mb-8 p-5 text-xl mt-15 mb-15 font-bold border-3 border-primary-content 
          bg-primary text-primary-content rounded-full transition-transform duration-200 ${
            showCreateWorkoutOptions ? " hidden" : ""
          } `}
        type="button" // Change to type="button" to prevent form submission if it's inside a form
      >
        Create new workout!
      </button>

      <div
        className={`divider ${showCreateWorkoutOptions ? " hidden" : ""}`}
      ></div>

      <h2
        className={`text-center text-pretty text-base-content mt-15 text-2xl transition-transform duration-200
        ${showCreateWorkoutOptions ? " hidden" : ""} }
        
        `}
      >
        Or view the most popular workouts below:
      </h2>

      <section className={`${showCreateWorkoutOptions ? "" : " hidden"}`}>
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
      </section>

      <section className="mt-15">
        <DisplayListOfWorkouts />
      </section>
    </>
  );
}

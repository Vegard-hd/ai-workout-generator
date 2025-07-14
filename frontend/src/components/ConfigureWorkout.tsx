import { useState } from "preact/hooks";
import { GenerateAndNavigateWorkout } from "./GenerateAndNavigateWorkout";

import { MyBtn } from "./partials/MyBtn";

export function ConfigureWorkout() {
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
      {/* Select activity type */}
      <section className="flex justify-center bg-base text-base-content pb-5 ">
        <div className="max-w-2/3">
          <h2 className=" text-2xl font-semibold m-5 mb-10 text-center flex justify-center text-pretty">
            Choose activity type
          </h2>
          <div className="flex justify-center gap-2 flex-wrap w-2/ items-center self-center">
            {activityOptions.map((e) => (
              <MyBtn
                onUpdate={setActivity}
                callBackFromOptions={e}
                value={activity}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-12 gap-1 max-w-dvw">
        {/* Select duration */}
        <section className="flex justify-center bg-base text-base-content col-span-12 lg:col-span-6">
          <div className="pb-5 max-w-2/3">
            <h2 className=" text-2xl font-semibold m-5 mb-10 text-center flex justify-center text-pretty">
              Select duration in minutes
            </h2>
            <div className="flex justify-center gap-2 flex-wrap w-2/ items-center self-center">
              {durationOptions.map((e) => (
                <MyBtn
                  onUpdate={setDuration}
                  callBackFromOptions={e}
                  value={duration}
                  minutes="minutes"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Select focus */}
        <section className="flex justify-center bg-base text-base-content col-span-12 lg:col-span-6">
          <div className="pb-5 max-w-2/3">
            <h2 className=" text-2xl font-semibold m-5 mb-10 text-center flex justify-center text-pretty">
              Select workout focus
            </h2>
            <div className="flex justify-center gap-2 flex-wrap w-2/ items-center self-center">
              {focusOptions.map((e) => (
                <MyBtn
                  onUpdate={setFocus}
                  callBackFromOptions={e}
                  value={focus}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Select freshness */}
        <section className="flex justify-center bg-base text-base-content col-span-12 lg:col-span-6">
          <div className="pb-5 max-w-2/3">
            <h2 className=" text-2xl font-semibold m-5 mb-10 text-center flex justify-center text-pretty">
              How recovered are you?
            </h2>
            <div className="flex justify-center gap-2 flex-wrap w-2/ items-center self-center">
              {freshnessOptions.map((e) => (
                <MyBtn
                  onUpdate={setFreshness}
                  callBackFromOptions={e}
                  value={freshness}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Select motivation */}
        <section className="flex justify-center bg-base text-base-content col-span-12 lg:col-span-6">
          <div className="pb-20 max-w-2/3">
            <h2 className=" text-2xl font-semibold m-5 mb-10 text-center flex justify-center text-pretty">
              How motivated are you?
            </h2>
            <div className="flex justify-center gap-2 flex-wrap w-2/ items-center self-center">
              {motivationOptions.map((e) => (
                <MyBtn
                  onUpdate={setMotivation}
                  callBackFromOptions={e}
                  value={motivation}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
      <GenerateAndNavigateWorkout workoutData={userWorkoutConfig} />;
    </>
  );
}

import { ConfigureWorkout } from "./components/ConfigureWorkout";

import { DisplayListOfWorkouts } from "./components/DisplayListOfWorkouts";

import { useState } from "preact/hooks";

import faviconImage from "../src/assets/android-chrome-192x192.png";

export function App() {
  const [isHovered, setIsHovered] = useState(false);
  const [showCreateWorkoutOptions, setShowCreateWorkoutOptions] =
    useState(false);

  return (
    <>
      <div className="flex justify-center items-center ">
        <h1 className="text-5xl text-center">AI Workout Generator</h1>
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img src={faviconImage} alt="Avatar" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          onMouseOver={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            plausible("configureWorkout");
            setShowCreateWorkoutOptions(true);
          }}
          style={{ cursor: "pointer" }}
          className={`
          flex  place-self-center p-5 text-xl mt-15 mb-15 font-bold border-3 border-primary-content 
          bg-primary text-primary-content rounded-full transition-transform duration-200
          ${isHovered ? "bg-success text-success-content" : ""}
          
          ${showCreateWorkoutOptions ? " hidden" : ""} `}
          type="button"
        >
          Create new workout!
        </button>
      </div>

      <div
        className={`divider ${showCreateWorkoutOptions ? " hidden" : ""}`}
      ></div>

      <h2
        className={`text-center text-pretty text-base-content mt-15 text-2xl md:text-3xl xl:text-4xl transition-transform duration-200
        ${showCreateWorkoutOptions ? " hidden" : ""} }
        
        `}
      >
        Or view the most popular workouts below:
      </h2>

      <section className={`${showCreateWorkoutOptions ? "" : " hidden"}`}>
        <ConfigureWorkout />
      </section>

      <section className="mt-15">
        <DisplayListOfWorkouts />
      </section>
    </>
  );
}

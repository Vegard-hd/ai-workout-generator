import { useState } from "preact/hooks";
import { DisplayWorkout } from "./partials/DisplayWorkout";

export function WorkoutGenerator({ workoutData }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayWorkout, setDisplayWorkout] = useState(false);

  return (
    <>
      <section>
        {!displayWorkout && (
          <div className="flex place-self-center justify-center justify-items-center text-center">
            <button
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                setDisplayWorkout(true);
              }}
              style={{ cursor: "pointer" }}
              className={`
          flex place-self-center mb-8 p-5 text-xl font-bold border-3 border-primary-content 
          bg-primary text-primary-content rounded-full ${
            isHovered ? "bg-success text-success-content" : ""
          }
          `}
              type="button" // Change to type="button" to prevent form submission if it's inside a form
            >
              Generate workout!
            </button>
          </div>
        )}
        <div className="divider"></div>
      </section>

      {displayWorkout && <DisplayWorkout workoutData={workoutData} />}
    </>
  );
}

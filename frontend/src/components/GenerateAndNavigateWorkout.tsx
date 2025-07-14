import { useState } from "preact/hooks";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "preact/hooks";

export function GenerateAndNavigateWorkout({ workoutData }) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayWorkout, setDisplayWorkout] = useState(false);

  const activity = workoutData.activity ?? "Cycling";
  const duration = workoutData.duration ?? 20;
  const focus = workoutData.focus ?? "Recovery";
  const freshness = workoutData.freshness ?? "Fully Recovered";
  const motivation = workoutData.motivation ?? "Motivated";
  const navigate = useNavigate();

  type WorkoutRequest = {
    activity: string;
    duration: number;
    focus: string;
    freshness: string;
    motivation: string;
  };

  if (!import.meta.env.VITE_BACKEND_API_URL)
    throw new Error("Missing env.VITE_BACKEND_API_URL  from build process");

  const [navigateWorkout, setNavigateWorkout] = useState(false);

  const params: WorkoutRequest = {
    activity,
    duration: Number(duration), // Convert here if needed!
    focus,
    freshness,
    motivation,
  };

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["repoData", params],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey as [string, WorkoutRequest];
      return fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/workout`, {
        method: "POST",
        body: JSON.stringify(params), // params already has correct types
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    enabled: false,
  });

  const handleButtonClick = () => {
    refetch();
  };

  useEffect(() => {
    if (navigateWorkout && data?.id) navigate(`/workouts/${data?.id}`);
    return () => setNavigateWorkout(false);
  }, [navigateWorkout]);

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
                handleButtonClick();
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
      {isPending && displayWorkout && (
        <>
          <div className="flex  place-self-center justify-center justify-items-center text-center mb-8 p-15">
            <h4 className="text-center text-base-content me-5 text-2xl">
              Generating workout...
            </h4>
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        </>
      )}
      {isError && (
        <span className="text-center text-error text-2xl flex justify-center-safe">
          Error: {error?.message ?? data?.error}
        </span>
      )}

      {displayWorkout && data?.id && setNavigateWorkout(true)}
    </>
  );
}

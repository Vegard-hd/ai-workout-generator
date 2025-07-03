import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function DisplayWorkout(workoutData: {
  activity: string;
  duration: string;
  focus: string;
  freshness: string;
  motivation: string;
}) {
  const activity = workoutData?.activity ?? "cycling";
  const duration = workoutData?.duration ?? "20";
  const focus = workoutData?.focus ?? "recovery";
  const freshness = workoutData?.freshness ?? "Fully Recovered";
  const motivation = workoutData?.motivation ?? "Motivated";
  const navigate = useNavigate();

  if (!import.meta.env.VITE_BACKEND_API_URL)
    throw new Error("Missing env.VITE_BACKEND_API_URL  from build process");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/workout`, {
        method: "POST",
        body: `{"activity":"${activity}","duration":${Number.parseInt(
          duration
        )},"focus":"${focus}","freshness":"${freshness}","motivation":"${motivation}"}`,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
  });

  if (isPending)
    return (
      <>
        <div className="flex  place-self-center justify-center justify-items-center text-center mb-8 p-15">
          <h4 className="text-center text-base-content me-5 text-2xl">
            Generating workout...
          </h4>
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      </>
    );

  if (isError || data?.error) {
    return (
      <span className="text-center text-error text-2xl flex justify-center-safe">
        Error: {error?.message ?? data?.error}
      </span>
    );
  }

  return navigate(`/workouts/${data?.id}`);
}

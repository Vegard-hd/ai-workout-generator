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

        <section
          className={`flex place-self-center-safe max-w-[1200px] opacity-0 transition-opacity duration-500 ease-in-out ${
            isPending ? "opacity-100" : ""
          }`}
        >
          <div className="grid grid-cols-5 gap-0 justify-items-center-safe ">
            <div className="skeleton h-46 w-46 rounded-none bg-gray-500/30"></div>
            <div className="skeleton h-46 w-46 rounded-none bg-green-500/30"></div>
            <div className="skeleton h-46 w-46 rounded-none bg-blue-500/30"></div>
            <div className="skeleton h-46 w-46 rounded-none bg-yellow-500/30"></div>
            <div className="skeleton h-46 w-46 rounded-none bg-red-500/30"></div>
          </div>
        </section>
      </>
    );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return navigate(`/workouts/${data?.id}`);
}

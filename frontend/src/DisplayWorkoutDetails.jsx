import { TrainingPlanTimeline } from "./components/partials/TrainingPlanTimeline";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
export function DisplayWorkoutDetails() {
  const { workoutId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workout", workoutId],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/workout/${workoutId}`
      ).then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      }),
    suspense: true, // Enable Suspense
    enabled: !!workoutId, // only run if workoutID is present
  });
  if (isLoading)
    return (
      <>
        <div className="flex  place-self-center justify-center justify-items-center text-center mb-8 p-15">
          <h4 className="text-center text-base-content me-5 text-2xl">
            Loading workout data
          </h4>
          <span className="loading loading-spinner loading-xl"></span>
        </div>

        <section
          className={`flex place-self-center-safe max-w-[1200px] opacity-0 transition-opacity duration-500 ease-in-out ${
            isLoading ? "opacity-100" : ""
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
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <section className=" ">
      <TrainingPlanTimeline
        blocks={data.workout}
        totalDuration={data.duration}
        details={data.details}
        title={data.title}
      />
    </section>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { DisplayTrainingZonesHelp } from "./partials/DisplayTrainingZonesHelp";

const enum Colors {
  gray = "#6B7280", // gray-500
  blue = "#3B82F6", // blue-500
  yellow = "#FBBF24", // yellow-400
  orange = "#F97316", // orange-500
  red = "#EF4444", // red-500
}

export function DisplayListOfWorkouts() {
  const navigate = useNavigate();
  if (!import.meta.env.VITE_BACKEND_API_URL)
    throw new Error("Missing env.VITE_BACKEND_API_URL  from build process");
  const getColorForZone = (zone: number): Colors => {
    if (zone === 1) return Colors.gray;
    if (zone === 2) return Colors.blue;
    if (zone === 3) return Colors.yellow;
    if (zone === 4) return Colors.orange;
    if (zone === 5) return Colors.red;
    else return Colors.gray;
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["DisplayListOfWorkouts"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/workout`, {
        method: "GET",
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
            Loading workouts ...
          </h4>
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      </>
    );

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const workoutList = data?.items ? data.items : null;
  if (!workoutList) {
    return (
      <span>
        <h1 className="text-2xl text-center">No workouts found</h1>
      </span>
    );
  }
  return (
    <>
      {workoutList.map(
        (
          element: {
            workout: string;
            duration: string;
            title: string;
            id: string;
          },
          index: number
        ) => {
          const parsedBlocks = JSON.parse(element.workout);
          const parsedDuration = JSON.parse(element.duration);
          const parsedTitle = JSON.parse(element.title);
          return (
            <>
              <div
                key={index}
                className={`to-base-300 shadow-2xl/40 rounded-2xl xl:w-11/12 w-screen  flex flex-col place-self-center mb-10
              
                  `}
              >
                <h1 className="text-nowrap text-2xl md:text-3xl xl:text-4xl text-center text-base-content mb-5 mt-3">
                  {parsedTitle}
                </h1>
                <div className=" flex place-self-center xl:w-11/12 w-screen h-20 rounded overflow-hidden mb-10 mt-1 ">
                  {parsedBlocks.map((block: any, index: number) => {
                    // Calculate percentage width based on duration
                    const widthPercentage =
                      (block.duration / parsedDuration.totalDuration) * 100;

                    return (
                      <div
                        key={index}
                        className="tooltip h-full flex items-center justify-center text-center text-sm"
                        style={{
                          width: `${widthPercentage}%`,
                          backgroundColor:
                            block.color || getColorForZone(block.zone),
                          borderRight:
                            index < parsedBlocks.length - 1
                              ? "1px solid white"
                              : "none",
                        }}
                      >
                        <div className="p-2">
                          <div className="font-bold  text-sm">
                            {block.name || `Z${block.zone}`}
                          </div>
                          {/* <div className="text-sm">{block.duration} min</div> */}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Tooltip id="my-tooltip" />
                <DisplayTrainingZonesHelp />

                <button
                  onClick={() => navigate(`/workouts/${element?.id}`)}
                  className={`btn btn-primary btn-md md:btn-lg  flex place-self-center mb-4 rounded-full button-hover-effect `}
                >
                  View details
                </button>
              </div>
            </>
          );
        }
      )}
    </>
  );
}

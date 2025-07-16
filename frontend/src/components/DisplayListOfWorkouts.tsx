import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import questionInfo from "../assets/google-icon-info.svg";

export function DisplayListOfWorkouts() {
  const navigate = useNavigate();
  if (!import.meta.env.VITE_BACKEND_API_URL)
    throw new Error("Missing env.VITE_BACKEND_API_URL  from build process");
  const getColorForZone = (zone: number) => {
    const colors = {
      1: "#6B7280", // gray-500
      2: "#3B82F6", // blue-500
      3: "#FBBF24", // yellow-400
      4: "#F97316", // orange-500
      5: "#EF4444", // red-500
    };
    return colors[zone] || "#D1D5DB"; // Default gray-300
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
          index
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
                  {parsedBlocks.map((block, index) => {
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

                <section className="flex flex-row  ms-20">
                  <div className="flex mb-4 "></div>
                  <h2 className="text-lg font-semibold mb-2">
                    Training Zones{" "}
                    <div className="tooltip">
                      <div className="tooltip-content">
                        <ul className="text-white text-sm text-start">
                          <li>
                            <span style={{ color: getColorForZone(1) }}>
                              Z1:
                            </span>{" "}
                            Recovery (≤55% FTP or very easy pace)
                          </li>
                          <li>
                            <span style={{ color: getColorForZone(2) }}>
                              Z2:
                            </span>{" "}
                            Endurance (56-75% FTP or easy pace)
                          </li>
                          <li>
                            <span style={{ color: getColorForZone(3) }}>
                              Z3:
                            </span>{" "}
                            Tempo (76-90% FTP or moderate pace)
                          </li>
                          <li>
                            <span style={{ color: getColorForZone(4) }}>
                              Z4:
                            </span>{" "}
                            Threshold (91-105% FTP or hard pace)
                          </li>
                          <li>
                            <span style={{ color: getColorForZone(5) }}>
                              Z5:
                            </span>{" "}
                            VO2 Max (&gt;106% FTP or very hard pace)
                          </li>
                        </ul>
                      </div>

                      <img
                        style={{ cursor: "pointer" }} // Inline style for cursor
                        src={questionInfo}
                        alt="info"
                        className="inline w-8 h-8 ml-2"
                      />
                    </div>
                  </h2>
                </section>

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

import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import { DisplayTrainingZonesHelp } from "./DisplayTrainingZonesHelp";
import { Tooltip } from "react-tooltip";

import { useEffect } from "preact/hooks";

export function TrainingPlanTimeline({
  blocks,
  totalDuration,
  details,
  title,
}) {
  const navigate = useNavigate();

  const [displayWorkoutZoom, setDisplayWorkoutZoom] = useState(1);

  const [navigateMainPage, setNavigateMainPage] = useState(false);

  const location = window.location.pathname.split("/").at(-1);

  useEffect(() => {
    if (navigateMainPage) navigate("/");
    return () => setNavigateMainPage(false);
  }, [navigateMainPage]);

  const getColorForZone = (zone) => {
    const colors = {
      1: "#6B7280", // gray-500
      2: "#3B82F6", // blue-500
      3: "#FBBF24", // yellow-400
      4: "#F97316", // orange-500
      5: "#EF4444", // red-500
    };
    return colors[zone] || "#D1D5DB"; // Default gray-300
  };
  const parsedBlocks = JSON.parse(blocks);
  const parsedDuration = JSON.parse(totalDuration);
  const parsedDetails = JSON.parse(details);
  const parsedTitle = JSON.parse(title);
  return (
    <>
      <Tooltip id="my-tooltip" />

      <section className="grid grid-flow-col grid-rows-2">
        <div>
          <h1 className="text-center text-xl sm:text-3xl xl:text-5xl text-nowrap font-semibold">
            {parsedTitle}
          </h1>
          <ul className="list-none text-center space-y-2 mt-5">
            <li>
              <span className="font-semibold">Activity:</span>{" "}
              {parsedDetails.activity ?? "N/A"}
            </li>
            <li>
              <span className="font-semibold">Duration:</span>{" "}
              {parsedDetails.duration ?? "N/A"}
            </li>
            <li>
              <span className="font-semibold">Focus:</span>{" "}
              {parsedDetails.focus ?? "N/A"}
            </li>
            <li>
              <span className="font-semibold">Freshness:</span>{" "}
              {parsedDetails.freshness ?? "N/A"}
            </li>
            <li>
              <span className="font-semibold">Motivation:</span>{" "}
              {parsedDetails.motivation ?? "N/A"}
            </li>
          </ul>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto overflow-x-auto mb-10">
        <div className="flex h-20 rounded">
          {parsedBlocks.map((block, index) => {
            // Calculate width in pixels based on duration. e.g., 10px per minute
            let widthInPixels = block.duration * 20;

            const widthPercentage =
              (block.duration / parsedDuration.totalDuration) *
              100 *
              displayWorkoutZoom;

            return (
              <div
                data-tooltip-id={"my-tooltip"}
                data-tooltip-content={block.description}
                key={index}
                className="h-full flex-shrink-0 flex items-center justify-center text-center"
                style={{
                  width: `${widthPercentage}%`,
                  backgroundColor: block.color || getColorForZone(block.zone),
                  borderRight:
                    index < parsedBlocks.length - 1
                      ? "1px solid white"
                      : "none",
                }}
              >
                <div className="p-2">
                  <div className="font-bold text-sm text-white">
                    {block.name || `Z${block.zone}`}
                  </div>
                  <div className="text-sm text-white">{block.duration} min</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <section className="flex justify-end  space-x-2 me-5 md:me-15 xl:me-30 pb-5">
        <DisplayTrainingZonesHelp getColorForZone={getColorForZone} />
      </section>
      <section className="flex justify-end mt-4 space-x-2 me-5 md:me-15 xl:me-30 pb-15">
        <button
          onClick={() => {
            setDisplayWorkoutZoom(displayWorkoutZoom + 0.1);
          }}
          className="btn rounded-full  font-medium  shadow-lg  "
        >
          Zoom in
        </button>
        <button
          onClick={() => {
            setDisplayWorkoutZoom(displayWorkoutZoom - 0.1);
          }}
          className="btn rounded-full  font-medium  shadow-lg  "
        >
          Zoom out
        </button>
        <button
          onClick={() => {
            setDisplayWorkoutZoom(1);
          }}
          className="btn  rounded-full  font-medium  shadow-lg "
        >
          Reset zoom
        </button>
      </section>

      <div className="w-full flex justify-center mb-6">
        <LikeButton workoutId={location} />
      </div>
      <button
        onClick={() => setNavigateMainPage(true)}
        style={{ cursor: "pointer" }}
        className={
          "btn mb-8 pb-12 pt-4 text-xl font-bold border-3 border-primary-content bg-primary text-primary-content rounded-full button-hover-effect block mx-auto"
        }
        type="button" // Change to type="button" to prevent form submission if it's inside a form
      >
        Generate a new workout!
      </button>
    </>
  );
}

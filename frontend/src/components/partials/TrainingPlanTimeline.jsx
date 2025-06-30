import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { LikeButton } from "./LikeButton";
export function TrainingPlanTimeline({
  blocks,
  totalDuration,
  details,
  title,
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const location = window.location.pathname.split("/").at(-1);

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
      <h1 className="text-center text-xl sm:text-3xl xl:text-5xl p-8 text-nowrap">
        {parsedTitle}
      </h1>
      <ul className="list-none text-center space-y-2">
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
      <div className=" flex place-self-center w-11/12  lg:w-4/5 h-20 rounded overflow-hidden mb-10 mt-10 ">
        {parsedBlocks.map((block, index) => {
          // Calculate percentage width based on duration
          const widthPercentage =
            (block.duration / parsedDuration.totalDuration) * 100;
          return (
            <div
              key={index}
              className="tooltip h-full flex items-center justify-center text-center"
              style={{
                width: `${widthPercentage}%`,
                backgroundColor: block.color || getColorForZone(block.zone),
                borderRight:
                  index < blocks.length - 1 ? "1px solid white" : "none",
              }}
            >
              <div className="p-2">
                <div className="font-bold">
                  {block.name || `Zone ${block.zone}`}
                </div>
                <div className="text-sm">{block.duration} min</div>
              </div>
            </div>
          );
        })}
      </div>
      <LikeButton workoutId={location} />
      <button
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
        className={`
          flex place-self-center mb-8 p-5 text-xl font-bold border-3 border-primary-content 
          bg-primary text-primary-content rounded-full ${
            isHovered ? "bg-success text-success-content" : ""
          }
          `}
        type="button" // Change to type="button" to prevent form submission if it's inside a form
      >
        Generate a new workout!
      </button>
    </>
  );
}

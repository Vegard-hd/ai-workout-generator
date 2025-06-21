import { useState } from "preact/hooks";
export function TrainingPlanTimeline({ blocks, totalDuration }) {
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

  return (
    <>
      <div className=" flex place-self-center w-full lg:w-4/5 h-20 rounded overflow-hidden mb-10  ">
        {blocks.map((block, index) => {
          // Calculate percentage width based on duration
          const widthPercentage = (block.duration / totalDuration) * 100;

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
    </>
  );
}

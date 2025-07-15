import { useState } from "preact/hooks";
import type { VNode } from "preact";

export function MyBtn({
  value,
  onUpdate,
  callBackFromOptions,
  minutes,
}: {
  value: string | number;
  onUpdate: Function;
  callBackFromOptions: string | number;
  minutes?: string | undefined;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      //   onMouseOver={(callBackFromOptions) => {
      //     setIsHovered(true);
      //     callBackFromOptions.target.style.cursor = "pointer"; // Or 'help', 'crosshair', etc.
      //   }}
      onMouseOver={() => {
        if (value !== callBackFromOptions) {
          setIsHovered(true);
        }
      }}
      style={{ cursor: "pointer" }} // Inline style for cursor
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      key={value}
      onClick={() => {
        setIsHovered(false);
        onUpdate(callBackFromOptions);
      }}
      aria-pressed={value === callBackFromOptions}
      className={`px-6 py-3 rounded-full  font-medium 
            ${
              value === callBackFromOptions
                ? " shadow-lg bg-secondary text-secondary-content "
                : " text-neutral-content bg-neutral/70 button-hover-effect-strong"
            }
            `}
    >
      {callBackFromOptions} {(minutes = minutes ?? "")}
    </button>
  );
}

import { useState } from "preact/hooks";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export function LikeButton() {
  const workoutId = useParams();
  const [isLikeBtnHovered, setIsLikeBtnHovered] = useState(false);
  const likeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workoutId }),
      });
      if (!res.ok) throw new Error("Failed to like workout");
    },
  });

  const handleLike = () => {
    if (!likeMutation.isPending && !likeMutation.isSuccess) {
      likeMutation.mutate();
    }
  };

  return (
    <button
      onMouseEnter={() => setIsLikeBtnHovered(true)}
      onMouseLeave={() => setIsLikeBtnHovered(false)}
      onClick={handleLike}
      disabled={likeMutation.isPending || likeMutation.isSuccess}
      className={`flex place-self-center mb-8 p-5 text-xl font-bold border-3 border-primary-content 
        bg-primary text-primary-content rounded-full min-w-35 place-content-center transition-colors duration-200
        ${isLikeBtnHovered ? "bg-success text-success-content" : ""}
        ${
          likeMutation.isPending || likeMutation.isSuccess
            ? "opacity-50 cursor-not-allowed"
            : ""
        }
      `}
    >
      {likeMutation.isSuccess ? "Liked" : "Like"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="size-[1.2em] ms-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </button>
  );
}

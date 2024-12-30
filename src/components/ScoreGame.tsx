"use client";

import { PiFlagLight } from "react-icons/pi";

const PixelHeart = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 128 128"
    className={`size-16 -ml-4 ${filled ? "text-red-500" : "text-gray-800"}`}
  >
    <path
      d="M64 112L16 64C0 48 0 24 16 8C32 -8 56 -8 72 8L64 16L56 8C40 -8 16 -8 0 8C-16 24 -16 48 0 64L48 112L64 96L80 112L128 64C144 48 144 24 128 8C112 -8 88 -8 72 8L64 16L56 8"
      fill="currentColor"
      transform="translate(64 64) scale(0.35) translate(-64 -64)"
    />
  </svg>
);

function ScoreGame({ lives, score }: ScoreGameProps) {
  return (
    <div className="mt-4 flex space-x-4">
      {/* Affichage des cœurs */}
      <div className="flex items-center">
        {[...Array(3)].map((_, index) => (
          <PixelHeart key={index} filled={index < lives} />
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <PiFlagLight className="size-8" />
        <span className="text-lg font-bold text-green-500">{score}</span>
      </div>
    </div>
  );
}

export default ScoreGame;

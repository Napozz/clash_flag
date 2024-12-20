"use client";

import FlagMenu from "@/components/FlagMenu";

export default function GuessFlagGame() {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex-grow flex items-center justify-center">
        <FlagMenu />
      </div>
    </div>
  );
}

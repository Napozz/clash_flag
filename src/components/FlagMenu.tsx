import { useState } from "react";
import Flag4 from "./Flag4";
import FlagGame from "./FlagGame";

interface FlagMenuProps {
  flags: {
    name: string;
    code2l: string;
    names: { [key: string]: { name: string; name_official: string } };
  }[];
  language: string;
}

export default function FlagMenu({ flags, language }: FlagMenuProps) {
  const [selectedGame, setSelectedGame] = useState<"Flag4" | "FlagGame" | null>(
    null
  );

  return (
    <div className="flex flex-col items-center">
      {selectedGame === null ? (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold mb-4">Choose a Game</h2>
          <button
            onClick={() => setSelectedGame("Flag4")}
            className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-64"
          >
            Game with Four Choices
          </button>
          <button
            onClick={() => setSelectedGame("FlagGame")}
            className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-64"
          >
            Guess the Flag
          </button>
        </div>
      ) : selectedGame === "Flag4" ? (
        <Flag4 flags={flags} language={language} />
      ) : (
        <FlagGame flags={flags} language={language} />
      )}
    </div>
  );
}

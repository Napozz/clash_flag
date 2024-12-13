import { useState } from "react";
import Image from "next/image";

const flags = [
  { name: "France", src: "/flags/france.png" },
  { name: "Germany", src: "/flags/germany.png" },
  { name: "Italy", src: "/flags/italy.png" },
  // Add more flags as needed
];

export default function GuessFlagGame() {
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);

  const handleGuess = () => {
    if (
      userGuess.toLowerCase() === flags[currentFlagIndex].name.toLowerCase()
    ) {
      setScore(score + 1);
      setCurrentFlagIndex((currentFlagIndex + 1) % flags.length);
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        alert("Game Over! Your score: " + score);
        setLives(3);
        setScore(0);
        setCurrentFlagIndex(0);
      }
    }
    setUserGuess("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Guess the Flag</h1>
      <Image
        src={flags[currentFlagIndex].src}
        alt="Flag"
        width={200}
        height={100}
        className="mb-4"
      />
      <input
        type="text"
        value={userGuess}
        onChange={(e) => setUserGuess(e.target.value)}
        className="border p-2 mb-4"
        placeholder="Enter country name"
      />
      <button
        onClick={handleGuess}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Submit Guess
      </button>
      <div className="mt-4">
        <p>Lives: {lives}</p>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

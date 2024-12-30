"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useIsClient from "@/hooks/isClientHook";
import ScoreGame from "./ScoreGame";
import GameOver from "./GameOver";
import { shuffleArray } from "@/lib/utils";

function Flag4({ flags, language }: Flag4Props) {
  const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(() =>
    Math.floor(Math.random() * flags.length)
  );
  const [shownFlags, setShownFlags] = useState<number[]>([currentFlagIndex]);
  const [options, setOptions] = useState<string[]>([]);
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const isClient = useIsClient();

  useEffect(() => {
    generateOptions();
  }, [currentFlagIndex]);

  const getRandomFlagIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flags.length);
    } while (shownFlags.includes(randomIndex));
    return randomIndex;
  };

  const generateOptions = () => {
    const correctName =
      language === "en"
        ? flags[currentFlagIndex].name
        : flags[currentFlagIndex].names[language]?.name;
    const optionsSet = new Set<string>();
    optionsSet.add(correctName || "");

    while (optionsSet.size < 4) {
      const randomIndex = Math.floor(Math.random() * flags.length);
      const randomName =
        language === "en"
          ? flags[randomIndex].name
          : flags[randomIndex].names[language]?.name;
      optionsSet.add(randomName || "");
    }

    const optionsArray = Array.from(optionsSet);
    setOptions(shuffleArray(optionsArray));
  };

  const handleGuess = (guess: string) => {
    const correctName =
      language === "en"
        ? flags[currentFlagIndex].name
        : flags[currentFlagIndex].names[language]?.name;
    if (guess === correctName || "") {
      setScore(score + 1);
      const newFlagIndex = getRandomFlagIndex();
      setCurrentFlagIndex(newFlagIndex);
      setShownFlags([...shownFlags, newFlagIndex]);
    } else {
      setLives(lives - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isClient && lives > 0 ? (
        <>
          <div className="relative w-64 h-40 mb-4 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <Image
              src={`/flags/${flags[currentFlagIndex].code2l}.svg`}
              alt="Flag"
              fill={true}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleGuess(option)}
                className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                {option}
              </button>
            ))}
          </div>
          <ScoreGame lives={lives} score={score} />
        </>
      ) : (
        <GameOver />
      )}
    </div>
  );
}

export default Flag4;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useIsClient from "@/hooks/isClientHook";
import ScoreGame from "./ScoreGame";
import GameOver from "./GameOver";
import { shuffleArray } from "@/lib/utils";

function Country4({ flags, language }: Country4Props) {
  const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(() =>
    Math.floor(Math.random() * flags.length)
  );
  const [shownFlags, setShownFlags] = useState<number[]>([currentFlagIndex]);
  const [options, setOptions] = useState<number[]>([]);
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
    const optionsSet = new Set<number>();
    optionsSet.add(currentFlagIndex);

    while (optionsSet.size < 4) {
      const randomIndex = Math.floor(Math.random() * flags.length);
      optionsSet.add(randomIndex);
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
      if (lives - 1 === 0) {
        alert("Game Over! Your score: " + score);
        setLives(3);
        setScore(0);
        const newFlagIndex = getRandomFlagIndex();
        setCurrentFlagIndex(newFlagIndex);
        setShownFlags([newFlagIndex]);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isClient && lives > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-4">
            {language === "en"
              ? flags[currentFlagIndex].name
              : flags[currentFlagIndex].names[language]?.name}
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleGuess(flags[option].names[language]?.name)}
                className="relative w-32 h-20 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={`/flags/${flags[option].code2l}.svg`}
                  alt="Flag"
                  layout="fill"
                  objectFit="cover"
                />
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

export default Country4;

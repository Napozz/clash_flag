"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import useIsClient from "@/hooks/isClientHook";

interface Flag4Props {
  flags: {
    name: string;
    code2l: string;
    names: { [key: string]: { name: string; name_official: string } };
  }[];
  language: string;
}

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

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
      {isClient && (
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
          <div className="mt-4 flex space-x-4">
            {/* Affichage des cœurs */}
            <div className="flex items-center">
              {[...Array(3)].map((_, index) => (
                <PixelHeart key={index} filled={index < lives} />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">Score:</span>
              <span className="text-lg font-bold text-green-500">{score}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Flag4;

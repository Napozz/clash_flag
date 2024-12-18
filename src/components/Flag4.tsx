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
          <div className="relative w-64 h-40 mb-4 border-4 border-gray-300 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
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
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">Lives:</span>
              <span className="text-lg font-bold text-red-500">{lives}</span>
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

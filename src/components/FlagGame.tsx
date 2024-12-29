"use client";

import React, { useState } from "react";
import Image from "next/image";
import useIsClient from "../hooks/isClientHook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizeString } from "@/lib/utils";

function FlagGame({ flags, language }: FlagGameProps) {
  const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(() =>
    Math.floor(Math.random() * flags.length)
  );
  const [shownFlags, setShownFlags] = useState<number[]>([currentFlagIndex]);
  const [userGuess, setUserGuess] = useState<string>("");
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);

  const isClient = useIsClient();

  const getRandomFlagIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * flags.length);
    } while (shownFlags.includes(randomIndex));
    return randomIndex;
  };

  const handleGuess = () => {
    const correctName =
      language === "en"
        ? flags[currentFlagIndex].name
        : flags[currentFlagIndex].names[language]?.name;
    if (normalizeString(userGuess) === normalizeString(correctName || "")) {
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
    setUserGuess("");
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
          <Input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="mb-4"
            placeholder="Enter country name"
          />
          <Button onClick={handleGuess} type="submit" className="bg-blue-500">
            Guess
          </Button>
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

export default FlagGame;

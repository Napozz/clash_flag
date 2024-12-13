"use client";

import { useState } from "react";
import Image from "next/image";
import countries from "../../public/countries.json";

interface Country {
  id: string;
  enabled: boolean;
  code3l: string;
  code2l: string;
  name: string;
  name_official: string;
  center: {
    latitude: string;
    longitude: string;
    zoom: string;
  };
  names: {
    [key: string]: {
      name: string;
      name_official: string;
    };
  };
}

export default function GuessFlagGame() {
  const [currentFlagIndex, setCurrentFlagIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>("");
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [language, setLanguage] = useState<string>("en");

  const flags = (countries as Country[]).map((country) => ({
    name: country.name,
    code2l: country.code2l,
    names: country.names,
  }));

  const handleGuess = () => {
    const correctName =
      language === "en"
        ? flags[currentFlagIndex].name
        : flags[currentFlagIndex].names[language]?.name;
    if (userGuess.toLowerCase() === correctName?.toLowerCase()) {
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
        src={`/flags/${flags[currentFlagIndex].code2l}.svg`}
        alt="Flag"
        width={200}
        height={100}
        className="mb-4"
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2 mb-4"
      >
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="it">Italian</option>
        <option value="ru">Russian</option>
        <option value="zh">Chinese</option>
      </select>
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

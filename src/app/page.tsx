"use client";

import { useState } from "react";
import countries from "../../public/countries.json";
import Header from "../components/Header";
import FlagGame from "../components/FlagGame";

export default function GuessFlagGame() {
  const [userGuess, setUserGuess] = useState<string>("");
  const [lives, setLives] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  const [language, setLanguage] = useState<string>("en");

  const flags = (countries as Country[]).map((country) => ({
    name: country.name,
    code2l: country.code2l,
    names: country.names,
  }));

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <Header language={language} setLanguage={setLanguage} />
      <div className="flex-grow flex items-center justify-center">
        <FlagGame
          flags={flags}
          userGuess={userGuess}
          setUserGuess={setUserGuess}
          setLives={setLives}
          setScore={setScore}
          lives={lives}
          score={score}
          language={language}
        />
      </div>
    </div>
  );
}

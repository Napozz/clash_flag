"use client";

import { useState } from "react";
import countries from "../../public/countries.json";
import Header from "../components/Header";
import FlagMenu from "@/components/FlagMenu";

export default function GuessFlagGame() {
  const [language, setLanguage] = useState<string>("fr");

  const flags = (countries as Country[]).map((country) => ({
    name: country.name,
    code2l: country.code2l,
    names: country.names,
  }));

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <Header language={language} setLanguage={setLanguage} />
      <div className="flex-grow flex items-center justify-center">
        <FlagMenu flags={flags} language={language} />
      </div>
    </div>
  );
}

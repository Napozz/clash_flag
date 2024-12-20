"use client";

import { use } from "react";
import Country4 from "@/components/Country4";
import Flag4 from "@/components/Flag4";
import FlagGame from "@/components/FlagGame";
import { notFound } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import countries from "../../../../public/countries.json";

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { language } = useLanguage();

  const flags = (countries as Country[]).map((country) => ({
    name: country.name,
    code2l: country.code2l,
    names: country.names,
  }));

  const renderGame = () => {
    switch (id) {
      case "guess":
        return <FlagGame flags={flags} language={language} />;
      case "countries4":
        return <Flag4 flags={flags} language={language} />;
      case "flags4":
        return <Country4 flags={flags} language={language} />;
      default:
        notFound(); // Affiche une page 404 si l'id ne correspond pas
    }
  };

  return <div>{renderGame()}</div>;
}

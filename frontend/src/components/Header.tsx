"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="w-full flex items-center justify-between p-4">
      <div>
        <Link href="/">
          <Image src="/world.svg" alt="Logo" width={96} height={96} />
        </Link>
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Guess the Flag
        </h1>
      </div>
      <div>
        <Select defaultValue={language} onValueChange={(e) => setLanguage(e)}>
          <SelectTrigger className="w-36 bg-white">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="it">Italian</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}

export default Header;

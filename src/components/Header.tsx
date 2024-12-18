import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  return (
    <header className="w-full flex items-center justify-between p-4">
      <div className="flex-1 text-center">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Guess the Flag
        </h1>
      </div>
      <Select defaultValue={language} onValueChange={(e) => setLanguage(e)}>
        <SelectTrigger className="w-36">
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
    </header>
  );
};

export default Header;

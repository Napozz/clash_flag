import React from "react";

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  return (
    <header className="w-full flex items-center justify-between p-4">
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold">Guess the Flag</h1>
      </div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border p-2"
      >
        <option value="en">English</option>
        <option value="ar">Arabic</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="it">Italian</option>
        <option value="ru">Russian</option>
        <option value="zh">Chinese</option>
      </select>
    </header>
  );
};

export default Header;

import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function FlagMenu() {
  const [difficulty, setDifficulty] = useState<string>("all");

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold mb-4">Choose a Game</h2>
        <div>
          <Select
            defaultValue={difficulty}
            onValueChange={(e) => setDifficulty(e)}
          >
            <SelectTrigger className="w-36 bg-white ">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ul className="m-2 text-center">
          <Link href={`/game/guess?difficulty=${difficulty}`}>
            <li className="bg-sky-500 text-white p-4 rounded-lg shadow-md hover:bg-sky-600 transition duration-300 w-64 m-2">
              Guess the flag
            </li>
          </Link>
          <Link href={`/game/countries4?difficulty=${difficulty}`}>
            <li className="bg-indigo-500 text-white p-4 rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 w-64 m-2">
              One flag Four countries
            </li>
          </Link>
          <Link href={`/game/flags4?difficulty=${difficulty}`}>
            <li className="bg-purple-500 text-white p-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-300 w-64 m-2">
              One country four flags
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

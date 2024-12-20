import Link from "next/link";

export default function FlagMenu() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold mb-4">Choose a Game</h2>
        <ul className="m-2 text-center">
          <li className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 w-64 m-2">
            <Link href="/game/guess">Guess the flag</Link>
          </li>
          <li className="bg-green-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-64 m-2 ">
            <Link href="/game/countries4">One flag Four countries</Link>
          </li>
          <li className="bg-violet-500 text-white p-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300 w-64 m-2">
            <Link href="/game/flags4">One country four flags</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

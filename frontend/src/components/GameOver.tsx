import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function GameOver() {
  return (
    <Alert>
      <AlertTitle className="text-center text-2xl font-bold text-red-600">
        Game Over!
      </AlertTitle>
      <AlertDescription className="text-center text-lg text-gray-700">
        You have lost the game. You can{" "}
        <Link href="/" className="underline hover:text-sky-500">
          {" "}
          retry !
        </Link>
      </AlertDescription>
    </Alert>
  );
}

export default GameOver;

interface FlagGameProps {
  flags: {
    name: string;
    code2l: string;
    names: { [key: string]: { name: string; name_official: string } };
  }[];
  userGuess: string;
  setUserGuess: (guess: string) => void;
  setLives: (lives: number) => void;
  setScore: (score: number) => void;
  lives: number;
  score: number;
  language: string;
}

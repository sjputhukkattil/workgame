export type Difficulty = "easy" | "medium" | "hard";

export type Word = {
  id: string;
  answer: string;
  clues: [string, string, string];
  difficulty: Difficulty;
};

export type Guess = {
  text: string;
  correct: boolean;
  at: number;
};

export type Player = {
  id: string;
  name: string;
  color: string;
  score: number;
  isYou: boolean;
  isBot: boolean;
  skill?: number;
};

export type RoundResult = {
  wordId: string;
  answer: string;
  yourGuesses: Guess[];
  yourScore: number;
  yourSolveMs: number | null;
  perPlayerScore: Record<string, number>;
};

export type Phase = "intro" | "playing" | "between" | "gameover";

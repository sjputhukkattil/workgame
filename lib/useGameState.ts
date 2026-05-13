"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Guess, Player, Phase, Word } from "./types";
import { pickRoundWords, clueRevealSchedule } from "./words";
import { pickBots, botSolveTime } from "./bots";

export const ROUND_MS = 30_000;
export const BETWEEN_MS = 3_500;
export const TOTAL_ROUNDS = 10;

export function scoreForSolve(elapsedMs: number, firstTry: boolean): number {
  let base = 0;
  if (elapsedMs <= 5000) base = 200;
  else if (elapsedMs <= 15000) base = 100;
  else base = 50;
  return base + (firstTry ? 50 : 0);
}

export type GameState = {
  phase: Phase;
  words: Word[];
  roundIndex: number;
  currentWord: Word;
  guesses: Guess[];
  input: string;
  youSolvedAt: number | null;
  revealedClues: number;
  timeLeftMs: number;
  betweenLeftMs: number;
  shake: boolean;
  you: Player;
  bots: Player[];
  players: Player[];
};

export type GameActions = {
  setInput: (s: string) => void;
  submitGuess: (raw: string) => void;
  startRound: () => void;
  reset: () => void;
};

export function useGameState(opts: {
  paused: boolean;
  resetKey: number;
  onGameOver?: (yourScore: number) => void;
}): GameState & GameActions {
  const { paused, resetKey, onGameOver } = opts;

  const [phase, setPhase] = useState<Phase>("intro");
  const [words, setWords] = useState<Word[]>(() => pickRoundWords(TOTAL_ROUNDS));
  const [roundIndex, setRoundIndex] = useState(0);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [input, setInput] = useState("");
  const [youSolvedAt, setYouSolvedAt] = useState<number | null>(null);
  const [revealedClues, setRevealedClues] = useState(1);
  const [timeLeftMs, setTimeLeftMs] = useState(ROUND_MS);
  const [betweenLeftMs, setBetweenLeftMs] = useState(BETWEEN_MS);
  const [shake, setShake] = useState(false);

  const [you, setYou] = useState<Player>(() => ({
    id: "you",
    name: "You",
    color: "#1a73e8",
    score: 0,
    isYou: true,
    isBot: false,
  }));
  const [bots, setBots] = useState<Player[]>(() => pickBots(5));

  const players = useMemo(() => [you, ...bots], [you, bots]);
  const currentWord = words[roundIndex];

  const roundStartRef = useRef<number>(0);
  const botTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const youScoreRef = useRef<number>(0);

  useEffect(() => {
    youScoreRef.current = you.score;
  }, [you.score]);

  // Reset
  useEffect(() => {
    if (resetKey === 0) return;
    setPhase("intro");
    setWords(pickRoundWords(TOTAL_ROUNDS));
    setRoundIndex(0);
    setGuesses([]);
    setInput("");
    setYouSolvedAt(null);
    setRevealedClues(1);
    setTimeLeftMs(ROUND_MS);
    setBetweenLeftMs(BETWEEN_MS);
    setBots(pickBots(5).map((b) => ({ ...b, score: 0 })));
    setYou((prev) => ({ ...prev, score: 0 }));
    youScoreRef.current = 0;
  }, [resetKey]);

  const clearBotTimers = useCallback(() => {
    botTimersRef.current.forEach((t) => clearTimeout(t));
    botTimersRef.current = [];
  }, []);

  const startRound = useCallback(() => {
    setGuesses([]);
    setInput("");
    setYouSolvedAt(null);
    setRevealedClues(1);
    setTimeLeftMs(ROUND_MS);
    setPhase("playing");
    roundStartRef.current = Date.now();
  }, []);

  // Bot solves
  useEffect(() => {
    if (phase !== "playing") return;
    clearBotTimers();
    bots.forEach((b, idx) => {
      const t = botSolveTime(b.skill ?? 0.5, currentWord, ROUND_MS);
      if (t == null) return;
      const timer = setTimeout(() => {
        setBots((prev) => {
          if (prev[idx].score === b.score) {
            const points = scoreForSolve(t, Math.random() > 0.4);
            const next = [...prev];
            next[idx] = { ...next[idx], score: next[idx].score + points };
            return next;
          }
          return prev;
        });
      }, t);
      botTimersRef.current.push(timer);
    });
    return clearBotTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, roundIndex]);

  // Difficulty-aware clue reveal
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const [t1ms, t2ms] = clueRevealSchedule(currentWord.difficulty);
    const t1 = setTimeout(() => setRevealedClues((v) => Math.max(v, 2)), t1ms);
    const t2 = setTimeout(() => setRevealedClues((v) => Math.max(v, 3)), t2ms);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, roundIndex, paused, currentWord]);

  // Pause handling
  const pauseStartRef = useRef<number | null>(null);
  useEffect(() => {
    if (paused) {
      pauseStartRef.current = Date.now();
      clearBotTimers();
      if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
    } else {
      if (pauseStartRef.current && phase === "playing") {
        const pausedFor = Date.now() - pauseStartRef.current;
        roundStartRef.current += pausedFor;
        bots.forEach((b, idx) => {
          const remaining = ROUND_MS - (Date.now() - roundStartRef.current);
          if (remaining <= 500) return;
          const t = botSolveTime(b.skill ?? 0.5, currentWord, remaining);
          if (t == null) return;
          if (Math.random() > 0.5) return;
          const timer = setTimeout(() => {
            setBots((prev) => {
              const points = scoreForSolve(ROUND_MS - remaining + t, false);
              const next = [...prev];
              next[idx] = { ...next[idx], score: next[idx].score + points };
              return next;
            });
          }, t);
          botTimersRef.current.push(timer);
        });
      }
      pauseStartRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  // Tick loop
  useEffect(() => {
    if (phase === "playing" && !paused) {
      tickRef.current = setInterval(() => {
        const elapsed = Date.now() - roundStartRef.current;
        const left = Math.max(0, ROUND_MS - elapsed);
        setTimeLeftMs(left);
        if (left <= 0) {
          setPhase("between");
        }
      }, 100);
      return () => {
        if (tickRef.current) clearInterval(tickRef.current);
      };
    }
    if (phase === "between" && !paused) {
      const startedAt = Date.now();
      tickRef.current = setInterval(() => {
        const left = Math.max(0, BETWEEN_MS - (Date.now() - startedAt));
        setBetweenLeftMs(left);
        if (left <= 0) {
          if (roundIndex + 1 >= TOTAL_ROUNDS) {
            setPhase("gameover");
          } else {
            setRoundIndex((r) => r + 1);
            setBetweenLeftMs(BETWEEN_MS);
            startRound();
          }
        }
      }, 100);
      return () => {
        if (tickRef.current) clearInterval(tickRef.current);
      };
    }
  }, [phase, paused, roundIndex, startRound]);

  // Game over callback (once)
  const reportedRef = useRef(false);
  useEffect(() => {
    if (phase === "gameover" && !reportedRef.current) {
      reportedRef.current = true;
      onGameOver?.(youScoreRef.current);
    }
    if (phase !== "gameover") reportedRef.current = false;
  }, [phase, onGameOver]);

  const submitGuess = useCallback((raw: string) => {
    if (phase !== "playing") return;
    const trimmed = raw.trim();
    if (!trimmed) return;
    const guess = trimmed.toUpperCase();
    const correct = guess === currentWord.answer.toUpperCase();
    const elapsed = Date.now() - roundStartRef.current;
    setGuesses((g) => [...g, { text: guess, correct, at: elapsed }]);
    setInput("");
    if (correct && youSolvedAt == null) {
      setYouSolvedAt(elapsed);
      const wrongTries = guesses.filter((g) => !g.correct).length;
      const points = scoreForSolve(elapsed, wrongTries === 0);
      setYou((prev) => ({ ...prev, score: prev.score + points }));
      youScoreRef.current += points;
    } else if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 350);
    }
  }, [phase, currentWord, youSolvedAt, guesses]);

  const reset = useCallback(() => {
    setPhase("intro");
    setRoundIndex(0);
    setGuesses([]);
    setInput("");
    setYouSolvedAt(null);
    setRevealedClues(1);
  }, []);

  return {
    phase,
    words,
    roundIndex,
    currentWord,
    guesses,
    input,
    youSolvedAt,
    revealedClues,
    timeLeftMs,
    betweenLeftMs,
    shake,
    you,
    bots,
    players,
    setInput,
    submitGuess,
    startRound,
    reset,
  };
}

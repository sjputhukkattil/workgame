"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Guess, Player, Phase, Word } from "@/lib/types";
import { pickRoundWords } from "@/lib/words";
import { pickBots, botSolveTime } from "@/lib/bots";
import GameOverPrompt from "./GameOverPrompt";

const ROUND_MS = 30_000;
const BETWEEN_MS = 3_500;
const TOTAL_ROUNDS = 10;

function scoreForSolve(elapsedMs: number, firstTry: boolean): number {
  let base = 0;
  if (elapsedMs <= 5000) base = 200;
  else if (elapsedMs <= 15000) base = 100;
  else base = 50;
  return base + (firstTry ? 50 : 0);
}

type GameProps = {
  paused: boolean;
  onStateChange: (s: { players: Player[]; round: number; totalRounds: number; timeLeftMs: number; phase: Phase }) => void;
  onGameOver: (yourScore: number) => void;
  onPlayAgain: () => void;
  resetKey: number;
};

export default function Game({ paused, onStateChange, onGameOver, onPlayAgain, resetKey }: GameProps) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [words] = useState<Word[]>(() => pickRoundWords(TOTAL_ROUNDS));
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
  const inputRef = useRef<HTMLInputElement>(null);
  const youScoreRef = useRef<number>(0);

  useEffect(() => {
    youScoreRef.current = you.score;
  }, [you.score]);

  // Bubble state to parent for the scoreboard.
  useEffect(() => {
    onStateChange({ players, round: roundIndex + 1, totalRounds: TOTAL_ROUNDS, timeLeftMs, phase });
  }, [players, roundIndex, timeLeftMs, phase, onStateChange]);

  // Reset everything when resetKey changes
  useEffect(() => {
    if (resetKey === 0) return;
    setPhase("intro");
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
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  // Schedule bot solves whenever we enter playing
  useEffect(() => {
    if (phase !== "playing") return;
    clearBotTimers();
    bots.forEach((b, idx) => {
      const t = botSolveTime(b.skill ?? 0.5, currentWord, ROUND_MS);
      if (t == null) return;
      const timer = setTimeout(() => {
        setBots((prev) => {
          if (prev[idx].score === b.score) {
            // Award bot score using same scoring rules
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

  // Reveal clues over time during playing
  useEffect(() => {
    if (phase !== "playing" || paused) return;
    const t1 = setTimeout(() => setRevealedClues((v) => Math.max(v, 2)), 8000);
    const t2 = setTimeout(() => setRevealedClues((v) => Math.max(v, 3)), 18000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, roundIndex, paused]);

  // Pausing — when paused we freeze the timers
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
        // re-schedule bot timers with remaining time
        bots.forEach((b, idx) => {
          // Only schedule if bot hasn't solved this round (we approximate: skip if score increased recently)
          const remaining = ROUND_MS - (Date.now() - roundStartRef.current);
          if (remaining <= 500) return;
          const t = botSolveTime(b.skill ?? 0.5, currentWord, remaining);
          if (t == null) return;
          // Only ~50% of the time re-arm to avoid double-scoring; keep the simulation going
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

  // Notify game over once
  const reportedRef = useRef(false);
  useEffect(() => {
    if (phase === "gameover" && !reportedRef.current) {
      reportedRef.current = true;
      onGameOver(youScoreRef.current);
    }
    if (phase !== "gameover") reportedRef.current = false;
  }, [phase, onGameOver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "playing") return;
    const raw = input.trim();
    if (!raw) return;
    const guess = raw.toUpperCase();
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
  };

  if (phase === "intro") {
    return (
      <DocBody>
        <H1>Untitled document</H1>
        <P>Welcome. This document is, in fact, a game.</P>
        <P>You will be shown three clues. Type the word they describe and press Enter. Get it right to score; faster answers score more. Wrong guesses don't penalize you, so keep trying.</P>
        <P>Ten rounds. Thirty seconds each. Press Esc at any time to look busy.</P>
        <button
          onClick={startRound}
          className="mt-6 px-5 py-2 bg-[var(--color-docs-blue)] text-white rounded text-sm font-medium hover:bg-[var(--color-docs-blue-hover)]"
        >
          Begin
        </button>
      </DocBody>
    );
  }

  if (phase === "gameover") {
    const ranked = [...players].sort((a, b) => b.score - a.score);
    const yourRank = ranked.findIndex((p) => p.isYou) + 1;
    return (
      <DocBody>
        <H1>Final results</H1>
        <P>Game over. Here's how everyone did across {TOTAL_ROUNDS} rounds.</P>
        <ol className="my-4 ml-6 list-decimal space-y-1" style={{ fontFamily: "var(--font-doc)" }}>
          {ranked.map((p) => (
            <li key={p.id} className={p.isYou ? "font-semibold" : ""}>
              {p.isYou ? "You" : p.name} — {p.score} points
            </li>
          ))}
        </ol>
        <P>You finished <strong>#{yourRank}</strong> with <strong>{you.score}</strong> points.</P>
        <GameOverPrompt
          yourScore={you.score}
          totalRounds={TOTAL_ROUNDS}
          onSubmit={() => {}}
          onPlayAgain={onPlayAgain}
        />
      </DocBody>
    );
  }

  return (
    <DocBody>
      <H1>Round {roundIndex + 1}</H1>
      <H2>Clues</H2>
      <ul className="ml-6 list-disc space-y-1.5" style={{ fontFamily: "var(--font-doc)", fontSize: 11 * 1.45 }}>
        {currentWord.clues.slice(0, revealedClues).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
        {revealedClues < currentWord.clues.length && (
          <li className="opacity-40 italic">(more clues unlocking…)</li>
        )}
      </ul>

      {phase === "between" ? (
        <div className="mt-8">
          <P>The answer was <strong className="text-[var(--color-correct)]">{currentWord.answer}</strong>.</P>
          <P className="text-[var(--color-docs-muted)]">Next round in {Math.ceil(betweenLeftMs / 1000)}s…</P>
        </div>
      ) : (
        <>
          <H2 className="mt-8">Your answer</H2>
          {guesses.length > 0 && (
            <ul className="ml-6 list-disc space-y-1" style={{ fontFamily: "var(--font-doc)", fontSize: 11 * 1.45 }}>
              {guesses.map((g, i) => (
                <li
                  key={i}
                  className={
                    "px-1.5 -ml-1.5 rounded inline-block " +
                    (g.correct
                      ? "bg-[var(--color-correct-bg)] text-[var(--color-correct)] font-semibold"
                      : "bg-[var(--color-wrong-bg)] text-[var(--color-wrong)] line-through")
                  }
                >
                  {g.text}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="mt-3">
            <div className={"flex items-center gap-2 " + (shake ? "animate-shake" : "")}>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={youSolvedAt !== null || paused}
                placeholder={youSolvedAt !== null ? "Solved! Waiting on others…" : "Type your guess and press Enter"}
                className="flex-1 px-3 py-2 border border-[var(--color-docs-border)] rounded outline-none focus:border-[var(--color-docs-blue)] disabled:bg-gray-50 disabled:text-gray-400"
                style={{ fontFamily: "var(--font-doc)", fontSize: 11 * 1.45 }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
              />
            </div>
            {youSolvedAt !== null && (
              <P className="text-[var(--color-correct)] mt-2">
                Nice. Solved in {(youSolvedAt / 1000).toFixed(1)}s.
              </P>
            )}
          </form>
        </>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.35s ease-in-out; }
      `}</style>
    </DocBody>
  );
}

function DocBody({ children }: { children: React.ReactNode }) {
  return <div className="text-[var(--color-docs-text)]" style={{ fontFamily: "var(--font-doc)", fontSize: 11 * 1.45 }}>{children}</div>;
}

function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-[26px] font-normal text-[#202124] mt-2 mb-3">{children}</h1>;
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={"text-[20px] font-normal text-[#3c4043] mt-4 mb-2 " + className}>{children}</h2>;
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={"my-2 leading-[1.6] " + className}>{children}</p>;
}

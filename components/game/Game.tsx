"use client";

import { useEffect, useRef } from "react";
import type { Phase, Player } from "@/lib/types";
import { useGameState, TOTAL_ROUNDS } from "@/lib/useGameState";
import GameOverPrompt from "./GameOverPrompt";

type GameProps = {
  paused: boolean;
  onStateChange: (s: { players: Player[]; round: number; totalRounds: number; timeLeftMs: number; phase: Phase }) => void;
  onGameOver: (yourScore: number) => void;
  onPlayAgain: () => void;
  resetKey: number;
};

export default function Game({ paused, onStateChange, onGameOver, onPlayAgain, resetKey }: GameProps) {
  const g = useGameState({ paused, resetKey, onGameOver });
  const inputRef = useRef<HTMLInputElement>(null);

  // Bubble state to parent for the scoreboard.
  useEffect(() => {
    onStateChange({
      players: g.players,
      round: g.roundIndex + 1,
      totalRounds: TOTAL_ROUNDS,
      timeLeftMs: g.timeLeftMs,
      phase: g.phase,
    });
  }, [g.players, g.roundIndex, g.timeLeftMs, g.phase, onStateChange]);

  // Focus input when round starts
  useEffect(() => {
    if (g.phase === "playing") {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [g.phase, g.roundIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    g.submitGuess(g.input);
  };

  if (g.phase === "intro") {
    return (
      <DocBody>
        <H1>Untitled document</H1>
        <P>Welcome. This document is, in fact, a game.</P>
        <P>You will be shown three clues. The first one is cryptic — keep typing if it doesn't click. Faster answers score more, wrong guesses don't penalize you.</P>
        <P>Ten rounds. Thirty seconds each. Press Esc at any time to look busy.</P>
        <button
          onClick={g.startRound}
          className="mt-6 px-5 py-2 bg-[var(--color-docs-blue)] text-white rounded text-sm font-medium hover:bg-[var(--color-docs-blue-hover)]"
        >
          Begin
        </button>
      </DocBody>
    );
  }

  if (g.phase === "gameover") {
    const ranked = [...g.players].sort((a, b) => b.score - a.score);
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
        <P>You finished <strong>#{yourRank}</strong> with <strong>{g.you.score}</strong> points.</P>
        <GameOverPrompt
          yourScore={g.you.score}
          totalRounds={TOTAL_ROUNDS}
          onSubmit={() => {}}
          onPlayAgain={onPlayAgain}
        />
      </DocBody>
    );
  }

  const diffBadge = (() => {
    const d = g.currentWord.difficulty;
    const color =
      d === "easy" ? "bg-green-100 text-green-800"
      : d === "medium" ? "bg-blue-100 text-blue-800"
      : d === "hard" ? "bg-orange-100 text-orange-800"
      : "bg-purple-100 text-purple-800";
    return <span className={"ml-2 align-middle inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wide font-semibold " + color}>{d}</span>;
  })();

  return (
    <DocBody>
      <H1>Round {g.roundIndex + 1}{diffBadge}</H1>
      <H2>Clues</H2>
      <ul className="ml-6 list-disc space-y-1.5" style={{ fontFamily: "var(--font-doc)", fontSize: 11 * 1.45 }}>
        {g.currentWord.clues.slice(0, g.revealedClues).map((c, i) => (
          <li key={i}>{c}</li>
        ))}
        {g.revealedClues < g.currentWord.clues.length && (
          <li className="opacity-40 italic">(more clues unlocking…)</li>
        )}
      </ul>

      {g.phase === "between" ? (
        <div className="mt-8">
          <P>The answer was <strong className="text-[var(--color-correct)]">{g.currentWord.answer}</strong>.</P>
          <P className="text-[var(--color-docs-muted)]">Next round in {Math.ceil(g.betweenLeftMs / 1000)}s…</P>
        </div>
      ) : (
        <>
          <H2 className="mt-8">Your answer</H2>
          {g.guesses.length > 0 && (
            <ul className="ml-6 list-disc space-y-1" style={{ fontFamily: "var(--font-doc)", fontSize: 11 * 1.45 }}>
              {g.guesses.map((guess, i) => (
                <li
                  key={i}
                  className={
                    "px-1.5 -ml-1.5 rounded inline-block " +
                    (guess.correct
                      ? "bg-[var(--color-correct-bg)] text-[var(--color-correct)] font-semibold"
                      : "bg-[var(--color-wrong-bg)] text-[var(--color-wrong)] line-through")
                  }
                >
                  {guess.text}
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="mt-3">
            <div className={"flex items-center gap-2 " + (g.shake ? "animate-shake" : "")}>
              <input
                ref={inputRef}
                value={g.input}
                onChange={(e) => g.setInput(e.target.value)}
                disabled={g.youSolvedAt !== null || paused}
                placeholder={g.youSolvedAt !== null ? "Solved! Waiting on others…" : "Type your guess and press Enter"}
                className="flex-1 min-w-0 px-3 py-2 border border-[var(--color-docs-border)] rounded outline-none focus:border-[var(--color-docs-blue)] disabled:bg-gray-50 disabled:text-gray-400"
                style={{ fontFamily: "var(--font-doc)", fontSize: 16 }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="characters"
                inputMode="text"
                enterKeyHint="send"
              />
            </div>
            {g.youSolvedAt !== null && (
              <P className="text-[var(--color-correct)] mt-2">
                Nice. Solved in {(g.youSolvedAt / 1000).toFixed(1)}s.
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

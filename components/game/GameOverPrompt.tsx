"use client";

import { useState } from "react";
import { loadHandle, saveHandle, saveScore } from "@/lib/leaderboard";

type Props = {
  yourScore: number;
  totalRounds: number;
  onSubmit: () => void;
  onPlayAgain: () => void;
};

export default function GameOverPrompt({ yourScore, totalRounds, onSubmit, onPlayAgain }: Props) {
  const [name, setName] = useState(() => loadHandle() || "");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim() || "Anonymous";
    saveHandle(trimmed);
    saveScore({ name: trimmed, score: yourScore, rounds: totalRounds, at: Date.now() });
    setSubmitted(true);
    onSubmit();
  };

  return (
    <div className="mt-6 p-4 border border-[var(--color-docs-border)] rounded bg-[#f8fafc]">
      {!submitted ? (
        <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-sm text-[var(--color-docs-muted)]">Save score as:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Anonymous"
            className="flex-1 px-3 py-1.5 border border-[var(--color-docs-border)] rounded outline-none focus:border-[var(--color-docs-blue)] text-base sm:text-sm"
            spellCheck={false}
            maxLength={24}
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-[var(--color-docs-blue)] text-white rounded text-sm font-medium hover:bg-[var(--color-docs-blue-hover)]"
          >
            Save to leaderboard
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-[var(--color-correct)]">Score saved.</div>
          <button
            onClick={onPlayAgain}
            className="px-4 py-1.5 bg-[var(--color-docs-blue)] text-white rounded text-sm font-medium hover:bg-[var(--color-docs-blue-hover)]"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

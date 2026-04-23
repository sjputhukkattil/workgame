"use client";

import { useEffect, useState } from "react";
import { loadLeaderboard, type LeaderboardEntry } from "@/lib/leaderboard";

type Props = { open: boolean; onClose: () => void };

export default function Leaderboard({ open, onClose }: Props) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (open) setEntries(loadLeaderboard());
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-[640px] max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="px-6 py-4 border-b border-[var(--color-docs-border)] flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--color-docs-muted)]">Linked sheet</div>
            <div className="text-lg">Leaderboard</div>
          </div>
          <button onClick={onClose} className="text-[var(--color-docs-muted)] hover:text-[var(--color-docs-text)] text-xl px-2">×</button>
        </header>
        <div className="flex-1 overflow-y-auto">
          {entries.length === 0 ? (
            <div className="p-10 text-center text-[var(--color-docs-muted)]">
              No scores yet. Finish a game to add yours.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-[var(--color-docs-toolbar)] text-[var(--color-docs-muted)]">
                <tr>
                  <th className="text-left px-4 py-2 font-medium w-12">#</th>
                  <th className="text-left px-4 py-2 font-medium">Name</th>
                  <th className="text-right px-4 py-2 font-medium">Score</th>
                  <th className="text-right px-4 py-2 font-medium">Rounds</th>
                  <th className="text-right px-4 py-2 font-medium">When</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e, i) => (
                  <tr key={i} className="border-t border-[var(--color-docs-border)]">
                    <td className="px-4 py-2 text-[var(--color-docs-muted)] tabular-nums">{i + 1}</td>
                    <td className="px-4 py-2">{e.name}</td>
                    <td className="px-4 py-2 text-right tabular-nums font-medium">{e.score}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{e.rounds}</td>
                    <td className="px-4 py-2 text-right text-[var(--color-docs-muted)]">{relativeTime(e.at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

"use client";

import Avatar from "../chrome/Avatar";
import type { Player } from "@/lib/types";

type Props = {
  players: Player[];
  round: number;
  totalRounds: number;
  timeLeftMs: number;
};

export default function Scoreboard({ players, round, totalRounds, timeLeftMs }: Props) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const seconds = Math.max(0, Math.ceil(timeLeftMs / 1000));
  const mm = Math.floor(seconds / 60);
  const ss = (seconds % 60).toString().padStart(2, "0");

  return (
    <aside className="w-72 shrink-0 bg-white border-l border-[var(--color-docs-border)] flex flex-col">
      <header className="px-4 py-3 border-b border-[var(--color-docs-border)] flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-[var(--color-docs-text)]">Collaborators</div>
          <div className="text-xs text-[var(--color-docs-muted)]">Round {round} of {totalRounds}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-[var(--color-docs-muted)]">Time</div>
          <div className={"text-sm font-mono tabular-nums " + (seconds <= 5 ? "text-[var(--color-wrong)]" : "text-[var(--color-docs-text)]")}>
            {mm}:{ss}
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {sorted.map((p, i) => (
          <div key={p.id} className={"flex items-center gap-3 px-4 py-2.5 " + (p.isYou ? "bg-[#e8f0fe]" : "")}>
            <div className="w-5 text-xs text-[var(--color-docs-muted)] tabular-nums">{i + 1}.</div>
            <Avatar name={p.name} color={p.color} size={28} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">
                {p.isYou ? "You" : p.name}
              </div>
              <div className="text-xs text-[var(--color-docs-muted)]">
                {p.isYou ? "Editing" : p.isBot ? "Editing" : "Viewing"}
              </div>
            </div>
            <div className="text-sm font-medium tabular-nums">{p.score}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import Avatar from "../chrome/Avatar";
import { Trophy } from "../chrome/Icons";
import type { Player } from "@/lib/types";

type Props = {
  players: Player[];
  round: number;
  totalRounds: number;
  timeLeftMs: number;
  variant?: "side" | "bar";
  className?: string;
  onOpenLeaderboard?: () => void;
  onTogglePause?: () => void;
  paused?: boolean;
};

export default function Scoreboard({
  players,
  round,
  totalRounds,
  timeLeftMs,
  variant = "side",
  className = "",
  onOpenLeaderboard,
  onTogglePause,
  paused,
}: Props) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const seconds = Math.max(0, Math.ceil(timeLeftMs / 1000));
  const mm = Math.floor(seconds / 60);
  const ss = (seconds % 60).toString().padStart(2, "0");
  const you = sorted.find((p) => p.isYou);
  const yourRank = you ? sorted.findIndex((p) => p.isYou) + 1 : null;

  if (variant === "bar") {
    return <BarScoreboard
      sorted={sorted}
      round={round}
      totalRounds={totalRounds}
      mm={mm}
      ss={ss}
      seconds={seconds}
      you={you}
      yourRank={yourRank}
      className={className}
      onOpenLeaderboard={onOpenLeaderboard}
      onTogglePause={onTogglePause}
      paused={paused}
    />;
  }

  return (
    <aside className={"w-72 shrink-0 bg-white border-l border-[var(--color-docs-border)] flex-col " + className}>
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

function BarScoreboard({
  sorted,
  round,
  totalRounds,
  mm,
  ss,
  seconds,
  you,
  yourRank,
  className,
  onOpenLeaderboard,
  onTogglePause,
  paused,
}: {
  sorted: Player[];
  round: number;
  totalRounds: number;
  mm: number;
  ss: string;
  seconds: number;
  you: Player | undefined;
  yourRank: number | null;
  className: string;
  onOpenLeaderboard?: () => void;
  onTogglePause?: () => void;
  paused?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={"bg-white border-b border-[var(--color-docs-border)] " + className}>
      <div className="flex items-center gap-2 px-3 py-2 text-xs">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
        >
          <span className="text-[var(--color-docs-muted)]">
            Round <span className="text-[var(--color-docs-text)] font-medium">{round}/{totalRounds}</span>
          </span>
          <span className={"font-mono tabular-nums " + (seconds <= 5 ? "text-[var(--color-wrong)]" : "text-[var(--color-docs-text)]")}>
            {mm}:{ss}
          </span>
          {you && yourRank != null && (
            <span className="ml-auto px-1.5 py-0.5 rounded bg-[#e8f0fe] text-[var(--color-docs-blue)] font-medium tabular-nums">
              #{yourRank} · {you.score}
            </span>
          )}
          <svg
            className={"w-3.5 h-3.5 text-[var(--color-docs-muted)] transition-transform " + (expanded ? "rotate-180" : "")}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <button
          onClick={onOpenLeaderboard}
          className="p-1.5 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]"
          title="Leaderboard"
          aria-label="Open leaderboard"
        >
          <Trophy />
        </button>
        <button
          onClick={onTogglePause}
          className={"p-1.5 rounded-full hover:bg-black/5 " + (paused ? "text-[var(--color-docs-blue)]" : "text-[var(--color-docs-muted)]")}
          title={paused ? "Resume" : "Look busy"}
          aria-label={paused ? "Resume game" : "Look busy"}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {paused ? (
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
            ) : (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            )}
          </svg>
        </button>
      </div>
      {expanded && (
        <div className="max-h-60 overflow-y-auto border-t border-[var(--color-docs-border)]">
          {sorted.map((p, i) => (
            <div key={p.id} className={"flex items-center gap-2 px-3 py-2 " + (p.isYou ? "bg-[#e8f0fe]" : "")}>
              <div className="w-4 text-xs text-[var(--color-docs-muted)] tabular-nums">{i + 1}.</div>
              <Avatar name={p.name} color={p.color} size={22} />
              <div className="flex-1 min-w-0 text-xs font-medium truncate">
                {p.isYou ? "You" : p.name}
              </div>
              <div className="text-xs font-medium tabular-nums">{p.score}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

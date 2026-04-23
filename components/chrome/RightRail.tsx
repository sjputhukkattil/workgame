"use client";

import { Calendar, CheckCircle, Plus, Trophy } from "./Icons";

type Props = {
  onOpenLeaderboard: () => void;
};

const RailBtn = ({ children, title, onClick, active }: { children: React.ReactNode; title: string; onClick?: () => void; active?: boolean }) => (
  <button
    title={title}
    onClick={onClick}
    className={"w-9 h-9 rounded-full inline-flex items-center justify-center text-[var(--color-docs-muted)] hover:bg-black/5 " + (active ? "bg-black/5" : "")}
  >
    {children}
  </button>
);

export default function RightRail({ onOpenLeaderboard }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 py-2 w-12 bg-[var(--color-rail-bg)] border-l border-[var(--color-docs-border)]">
      <RailBtn title="Calendar"><Calendar /></RailBtn>
      <RailBtn title="Keep">
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M5 6l3 3M19 6l-3 3M6 13a6 6 0 1 1 12 0c0 2.5-1.5 4-2 5v2H8v-2c-.5-1-2-2.5-2-5z" />
        </svg>
      </RailBtn>
      <RailBtn title="Tasks">
        <CheckCircle />
      </RailBtn>
      <RailBtn title="Leaderboard" onClick={onOpenLeaderboard}>
        <Trophy />
      </RailBtn>
      <div className="my-1 w-6 h-px bg-[var(--color-docs-border)]" />
      <RailBtn title="Get add-ons"><Plus /></RailBtn>
    </div>
  );
}

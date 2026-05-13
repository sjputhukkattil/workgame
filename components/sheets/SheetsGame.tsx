"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Phase, Player } from "@/lib/types";
import { useGameState, TOTAL_ROUNDS } from "@/lib/useGameState";
import { buildSheet, type SheetBuild } from "@/lib/sheetData";
import Grid from "./Grid";
import { FxIcon } from "../chrome/Icons";
import GameOverPrompt from "../game/GameOverPrompt";

type Props = {
  paused: boolean;
  onStateChange: (s: { players: Player[]; round: number; totalRounds: number; timeLeftMs: number; phase: Phase }) => void;
  onGameOver: (yourScore: number) => void;
  onPlayAgain: () => void;
  resetKey: number;
};

export default function SheetsGame({ paused, onStateChange, onGameOver, onPlayAgain, resetKey }: Props) {
  const g = useGameState({ paused, resetKey, onGameOver });
  const [selectedAddr, setSelectedAddr] = useState<string | null>(null);
  const formulaRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onStateChange({
      players: g.players,
      round: g.roundIndex + 1,
      totalRounds: TOTAL_ROUNDS,
      timeLeftMs: g.timeLeftMs,
      phase: g.phase,
    });
  }, [g.players, g.roundIndex, g.timeLeftMs, g.phase, onStateChange]);

  const sheet: SheetBuild = useMemo(() => {
    if (!g.currentWord) {
      return buildSheet({
        clues: ["", "", ""],
        showClueCount: 0,
        difficulty: "easy",
        round: 1,
        totalRounds: TOTAL_ROUNDS,
      });
    }
    return buildSheet({
      clues: g.currentWord.clues,
      showClueCount: g.revealedClues,
      difficulty: g.currentWord.difficulty,
      round: g.roundIndex + 1,
      totalRounds: TOTAL_ROUNDS,
    });
  }, [g.currentWord, g.revealedClues, g.roundIndex]);

  // Auto-select answer cell when round starts
  useEffect(() => {
    if (g.phase === "playing" && sheet.answerAddr) {
      setSelectedAddr(sheet.answerAddr);
      setTimeout(() => formulaRef.current?.focus(), 60);
    }
  }, [g.phase, g.roundIndex, sheet.answerAddr]);

  // Patch live data into sheet (timer, score, answer cell content)
  const overrides: Record<string, React.ReactNode> = {};
  const seconds = Math.max(0, Math.ceil(g.timeLeftMs / 1000));
  const mm = Math.floor(seconds / 60);
  const ss = (seconds % 60).toString().padStart(2, "0");
  overrides[sheet.timerAddr] = (
    <span className={"tabular-nums " + (seconds <= 5 ? "text-[#c5221f]" : "")}>
      {mm.toString().padStart(2, "0")}:{ss}
    </span>
  );
  // Score rows
  const ranked = [...g.players].sort((a, b) => b.score - a.score);
  ranked.slice(0, 6).forEach((p, i) => {
    const r = sheet.scoreStartRow + i;
    const nameAddr = `${String.fromCharCode(65 + sheet.scoreCol)}${r + 1}`;
    const scoreAddr = `${String.fromCharCode(65 + sheet.scoreCol + 1)}${r + 1}`;
    overrides[nameAddr] = (
      <span className={p.isYou ? "font-semibold text-[#1a73e8]" : ""}>
        {p.isYou ? "You" : p.name}
      </span>
    );
    overrides[scoreAddr] = (
      <span className="tabular-nums text-right block">{p.score}</span>
    );
  });

  // Answer cell — show typed text + a blinking caret if not solved
  const isAnswerSelected = selectedAddr === sheet.answerAddr;
  overrides[sheet.answerAddr] = g.youSolvedAt !== null ? (
    <span className="text-[#188038] font-semibold">{g.currentWord?.answer}</span>
  ) : (
    <span>
      {g.input}
      {isAnswerSelected && g.phase === "playing" && (
        <span className="docs-caret" style={{ height: "0.9em" }} />
      )}
    </span>
  );

  const handleFormulaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAddr === sheet.answerAddr) {
      g.submitGuess(g.input);
    }
  };

  const selectedCell = useMemo(() => {
    if (!selectedAddr) return null;
    // Parse "A1" -> col, row
    const m = selectedAddr.match(/^([A-Z]+)(\d+)$/);
    if (!m) return null;
    const col = m[1].split("").reduce((acc, ch) => acc * 26 + (ch.charCodeAt(0) - 64), 0) - 1;
    const row = parseInt(m[2], 10) - 1;
    return sheet.rows[row]?.[col] ?? null;
  }, [selectedAddr, sheet]);

  // Intro screen
  if (g.phase === "intro") {
    return (
      <IntroSheet onBegin={g.startRound} />
    );
  }

  // Game over screen
  if (g.phase === "gameover") {
    const sorted = [...g.players].sort((a, b) => b.score - a.score);
    const yourRank = sorted.findIndex((p) => p.isYou) + 1;
    return (
      <div className="h-full overflow-auto bg-white p-6">
        <h1 className="text-[20px] font-medium text-[#0f9d58] mb-4">FY26 Audit — Final Workbook</h1>
        <table className="border-collapse text-sm">
          <thead>
            <tr className="bg-[#e8eaed]">
              <th className="border border-[#c4c7c5] px-3 py-1.5 text-left font-medium">Rank</th>
              <th className="border border-[#c4c7c5] px-3 py-1.5 text-left font-medium">Auditor</th>
              <th className="border border-[#c4c7c5] px-3 py-1.5 text-right font-medium">Score</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.id} className={p.isYou ? "bg-[#e6f4ea] font-semibold" : ""}>
                <td className="border border-[#c4c7c5] px-3 py-1.5">{i + 1}</td>
                <td className="border border-[#c4c7c5] px-3 py-1.5">{p.isYou ? "You" : p.name}</td>
                <td className="border border-[#c4c7c5] px-3 py-1.5 text-right tabular-nums">{p.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm">You finished <strong>#{yourRank}</strong> with <strong>{g.you.score}</strong> points.</p>
        <div className="mt-6 max-w-md">
          <GameOverPrompt
            yourScore={g.you.score}
            totalRounds={TOTAL_ROUNDS}
            onSubmit={() => {}}
            onPlayAgain={onPlayAgain}
          />
        </div>
      </div>
    );
  }

  // Between rounds banner overlay
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Formula / name box bar */}
      <div className="flex items-center gap-0 border-b border-[#c4c7c5] bg-white">
        <div className="px-2 py-1 w-24 text-sm text-[#202124] border-r border-[#c4c7c5] tabular-nums">
          {selectedAddr ?? "A1"}
        </div>
        <div className="px-2 py-1 text-[#5f6368] border-r border-[#c4c7c5]" title="Functions">
          <FxIcon width={16} height={16} />
        </div>
        <form onSubmit={handleFormulaSubmit} className="flex-1 flex items-center">
          {isAnswerSelected && g.phase === "playing" && g.youSolvedAt === null ? (
            <input
              ref={formulaRef}
              value={g.input}
              onChange={(e) => g.setInput(e.target.value)}
              disabled={paused}
              placeholder="Type the audit conclusion and press Enter"
              className={"flex-1 min-w-0 px-2 py-1 outline-none text-sm bg-transparent " + (g.shake ? "animate-shake" : "")}
              style={{ fontSize: 14 }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="characters"
              inputMode="text"
              enterKeyHint="send"
            />
          ) : (
            <div className="flex-1 px-2 py-1 text-sm text-[#5f6368] truncate">
              {selectedCell?.value || (g.youSolvedAt !== null ? g.currentWord?.answer : "")}
            </div>
          )}
        </form>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <Grid
          rows={sheet.rows}
          cols={14}
          selectedAddr={selectedAddr}
          onSelect={(a) => {
            setSelectedAddr(a);
            if (a === sheet.answerAddr) {
              setTimeout(() => formulaRef.current?.focus(), 0);
            }
          }}
          renderOverride={overrides}
        />

        {g.phase === "between" && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white border border-[#c4c7c5] rounded shadow-lg px-6 py-4 max-w-md">
              <div className="text-xs text-[#5f6368] uppercase tracking-wide font-medium mb-1">Audit conclusion</div>
              <div className="text-lg font-semibold text-[#188038] mb-2">{g.currentWord?.answer}</div>
              <div className="text-xs text-[#5f6368]">Next workbook in {Math.ceil(g.betweenLeftMs / 1000)}s…</div>
            </div>
          </div>
        )}
      </div>

      <SheetTabs />

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.35s ease-in-out; }
      `}</style>
    </div>
  );
}

function SheetTabs() {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-[#f8f9fa] border-t border-[#c4c7c5] text-xs">
      <button className="p-1 rounded hover:bg-black/5" title="All sheets">≡</button>
      <button className="p-1 rounded hover:bg-black/5" title="Add sheet">+</button>
      <div className="mx-2 w-px h-4 bg-[#c4c7c5]" />
      <button className="px-3 py-1 rounded-t border border-[#c4c7c5] border-b-transparent bg-white font-medium">Audit Q1</button>
      <button className="px-3 py-1 hover:bg-black/5 text-[#5f6368]">Audit Q2</button>
      <button className="px-3 py-1 hover:bg-black/5 text-[#5f6368]">Audit Q3</button>
      <button className="px-3 py-1 hover:bg-black/5 text-[#5f6368]">Audit Q4</button>
      <button className="px-3 py-1 hover:bg-black/5 text-[#5f6368]">Pivot</button>
    </div>
  );
}

function IntroSheet({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="h-full overflow-auto bg-white p-6">
      <h1 className="text-[22px] font-medium text-[#0f9d58] mb-2">FY26 Audit Workbook</h1>
      <p className="text-sm text-[#3c4043] max-w-lg mb-3">
        This workbook is, in fact, a game. Each round opens a new "audit." Three cells in the
        <span className="px-1 mx-0.5 inline-block bg-[#fff8c5] border border-[#e0c54b]">Audit note</span> column hold
        cryptic clues. Type your conclusion in the highlighted answer cell and press Enter.
      </p>
      <p className="text-sm text-[#3c4043] max-w-lg mb-3">
        Faster answers score more. Bot auditors compete with you for top score. Esc looks busy.
      </p>
      <p className="text-sm text-[#3c4043] max-w-lg mb-5">
        Ten rounds. Thirty seconds each. Difficulty escalates across the workbook.
      </p>
      <button
        onClick={onBegin}
        className="px-5 py-2 bg-[#0f9d58] text-white rounded text-sm font-medium hover:bg-[#0d8a4f]"
      >
        Open first audit
      </button>
    </div>
  );
}

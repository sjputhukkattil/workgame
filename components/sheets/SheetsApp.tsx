"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import SheetsTopBar from "./SheetsTopBar";
import SheetsToolbar from "./SheetsToolbar";
import SheetsGame from "./SheetsGame";
import DecoySheet from "./DecoySheet";
import Scoreboard from "../game/Scoreboard";
import Leaderboard from "../game/Leaderboard";
import RightRail from "../chrome/RightRail";
import type { AppMode, Phase, Player } from "@/lib/types";

type GameSnapshot = {
  players: Player[];
  round: number;
  totalRounds: number;
  timeLeftMs: number;
  phase: Phase;
};

const INITIAL_SNAPSHOT: GameSnapshot = {
  players: [],
  round: 1,
  totalRounds: 10,
  timeLeftMs: 30000,
  phase: "intro",
};

type Props = {
  mode: AppMode;
  onModeChange: (m: AppMode) => void;
};

export default function SheetsApp({ mode, onModeChange }: Props) {
  const [title, setTitle] = useState("FY26 Audit Workbook");
  const [paused, setPaused] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(INITIAL_SNAPSHOT);

  const togglePause = useCallback(() => setPaused((p) => !p), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (e.ctrlKey && e.shiftKey) {
          setPaused(true);
          setResetKey((k) => k + 1);
          return;
        }
        e.preventDefault();
        togglePause();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [togglePause]);

  const handleStateChange = useCallback((s: GameSnapshot) => setSnapshot(s), []);
  const handleGameOver = useCallback((_: number) => {}, []);
  const handlePlayAgain = useCallback(() => setResetKey((k) => k + 1), []);

  const playersForChrome = useMemo(
    () => snapshot.players.filter((p) => !p.isYou),
    [snapshot.players]
  );

  const showScoreboard = !paused && snapshot.players.length > 0;

  return (
    <div className="h-[100dvh] w-screen flex flex-col overflow-hidden bg-white">
      <SheetsTopBar
        title={paused ? "FY26 Operating Audit — confidential" : title}
        onTitleChange={setTitle}
        players={paused ? [] : playersForChrome}
        mode={mode}
        onModeChange={onModeChange}
      />
      <div className="px-0 sm:px-3 pb-1 sm:pb-2">
        <SheetsToolbar />
      </div>

      {showScoreboard && (
        <Scoreboard
          variant="bar"
          className="md:hidden"
          players={snapshot.players}
          round={snapshot.round}
          totalRounds={snapshot.totalRounds}
          timeLeftMs={snapshot.timeLeftMs}
          onOpenLeaderboard={() => setLeaderboardOpen(true)}
          onTogglePause={togglePause}
          paused={paused}
        />
      )}

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {paused ? (
            <DecoySheet />
          ) : (
            <SheetsGame
              paused={paused}
              onStateChange={handleStateChange}
              onGameOver={handleGameOver}
              onPlayAgain={handlePlayAgain}
              resetKey={resetKey}
            />
          )}
        </div>

        {showScoreboard && (
          <Scoreboard
            variant="side"
            className="hidden md:flex"
            players={snapshot.players}
            round={snapshot.round}
            totalRounds={snapshot.totalRounds}
            timeLeftMs={snapshot.timeLeftMs}
          />
        )}

        <div className="hidden md:flex">
          <RightRail onOpenLeaderboard={() => setLeaderboardOpen(true)} />
        </div>
      </div>

      <Leaderboard open={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} />

      {!paused && (
        <div className="hidden md:block absolute bottom-2 right-2 text-[10px] text-[#5f6368] select-none pointer-events-none opacity-60">
          press <kbd className="px-1 border border-[#c4c7c5] rounded">Esc</kbd> to look busy
        </div>
      )}
    </div>
  );
}

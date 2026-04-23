"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import TopBar from "./chrome/TopBar";
import Toolbar from "./chrome/Toolbar";
import RightRail from "./chrome/RightRail";
import PageCanvas from "./chrome/PageCanvas";
import Game from "./game/Game";
import Scoreboard from "./game/Scoreboard";
import Leaderboard from "./game/Leaderboard";
import DecoyDoc from "./panic/DecoyDoc";
import { pickDecoy, type Decoy } from "@/lib/decoys";
import type { Phase, Player } from "@/lib/types";

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

export default function DocsApp() {
  const [title, setTitle] = useState("Untitled document");
  const [paused, setPaused] = useState(false);
  const [decoy, setDecoy] = useState<Decoy | null>(null);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(INITIAL_SNAPSHOT);

  // Boss-key: Esc toggles the decoy. Ctrl+Shift+Esc clears everything.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (e.ctrlKey && e.shiftKey) {
          // Hard reset
          setPaused(true);
          setDecoy(pickDecoy());
          setResetKey((k) => k + 1);
          return;
        }
        e.preventDefault();
        setPaused((p) => {
          const next = !p;
          if (next) setDecoy(pickDecoy());
          else setDecoy(null);
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleStateChange = useCallback((s: GameSnapshot) => {
    setSnapshot(s);
  }, []);

  const handleGameOver = useCallback((_: number) => {
    // No-op for now; GameOverPrompt handles persistence
  }, []);

  const handlePlayAgain = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  const playersForChrome = useMemo(
    () => snapshot.players.filter((p) => !p.isYou),
    [snapshot.players]
  );

  const showScoreboard = !paused && snapshot.players.length > 0;

  return (
    <div className="h-screen w-screen flex flex-col">
      <TopBar
        title={paused && decoy ? decoy.title : title}
        onTitleChange={setTitle}
        players={paused ? [] : playersForChrome}
      />
      <div className="px-3 pb-2">
        <Toolbar />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <PageCanvas pageNumber={paused ? 1 : snapshot.round} totalPages={paused ? 1 : snapshot.totalRounds}>
            {paused && decoy ? (
              <DecoyDoc decoy={decoy} caretLineIndex={Math.floor(decoy.body.length / 2)} />
            ) : (
              <Game
                paused={paused}
                onStateChange={handleStateChange}
                onGameOver={handleGameOver}
                onPlayAgain={handlePlayAgain}
                resetKey={resetKey}
              />
            )}
          </PageCanvas>
        </div>

        {showScoreboard && (
          <Scoreboard
            players={snapshot.players}
            round={snapshot.round}
            totalRounds={snapshot.totalRounds}
            timeLeftMs={snapshot.timeLeftMs}
          />
        )}

        <RightRail onOpenLeaderboard={() => setLeaderboardOpen(true)} />
      </div>

      <Leaderboard open={leaderboardOpen} onClose={() => setLeaderboardOpen(false)} />

      {!paused && (
        <div className="absolute bottom-2 right-2 text-[10px] text-[var(--color-docs-muted)] select-none pointer-events-none opacity-60">
          press <kbd className="px-1 border border-[var(--color-docs-border)] rounded">Esc</kbd> to look busy
        </div>
      )}
    </div>
  );
}

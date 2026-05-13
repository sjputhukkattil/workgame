"use client";

import { useCallback, useEffect, useState } from "react";
import DocsApp from "./DocsApp";
import SheetsApp from "./sheets/SheetsApp";
import type { AppMode } from "@/lib/types";

const STORAGE_KEY = "work-game-mode";

export default function RootApp() {
  const [mode, setMode] = useState<AppMode>("docs");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "docs" || saved === "sheets") setMode(saved);
    } catch {}
    setHydrated(true);
  }, []);

  const handleModeChange = useCallback((m: AppMode) => {
    setMode(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {}
  }, []);

  if (!hydrated) {
    return <DocsApp mode="docs" onModeChange={handleModeChange} />;
  }

  return mode === "sheets" ? (
    <SheetsApp mode={mode} onModeChange={handleModeChange} />
  ) : (
    <DocsApp mode={mode} onModeChange={handleModeChange} />
  );
}

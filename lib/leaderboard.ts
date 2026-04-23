const KEY = "untitled-doc:leaderboard";
const MAX_ENTRIES = 25;

export type LeaderboardEntry = {
  name: string;
  score: number;
  rounds: number;
  at: number;
};

export function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return parsed.sort((a, b) => b.score - a.score);
  } catch {
    return [];
  }
}

export function saveScore(entry: LeaderboardEntry): LeaderboardEntry[] {
  const existing = loadLeaderboard();
  const next = [...existing, entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_ENTRIES);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore quota errors */
  }
  return next;
}

export function loadHandle(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("untitled-doc:handle") ?? "";
}

export function saveHandle(name: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("untitled-doc:handle", name);
}

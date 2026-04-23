import type { Player, Word } from "./types";

const BOT_POOL: { name: string; color: string; skill: number }[] = [
  { name: "Anonymous Otter", color: "#f59e0b", skill: 0.78 },
  { name: "Anonymous Cat", color: "#8b5cf6", skill: 0.65 },
  { name: "Anonymous Fox", color: "#3b82f6", skill: 0.72 },
  { name: "Anonymous Bear", color: "#10b981", skill: 0.55 },
  { name: "Anonymous Owl", color: "#ec4899", skill: 0.84 },
  { name: "Anonymous Wolf", color: "#ef4444", skill: 0.6 },
];

export function pickBots(count: number): Player[] {
  const shuffled = [...BOT_POOL].sort(() => Math.random() - 0.5).slice(0, count);
  return shuffled.map((b, i) => ({
    id: `bot-${i}`,
    name: b.name,
    color: b.color,
    score: 0,
    isYou: false,
    isBot: true,
    skill: b.skill,
  }));
}

// Returns the time (in ms after round start) the bot will solve the word, or null if it never solves.
// Bots get progressively faster as more clues are revealed.
export function botSolveTime(skill: number, word: Word, roundDurationMs: number): number | null {
  // Skill 0.5: ~50% chance of solving. Skill 0.9: ~95%.
  if (Math.random() > skill + 0.1) return null;

  // Difficulty multiplier
  const difficultyMul = word.difficulty === "easy" ? 0.7 : word.difficulty === "medium" ? 1 : 1.4;

  // Base time: skill 1.0 -> ~3s, skill 0.5 -> ~18s
  const base = (1 - skill) * 28000 + 2500;
  const jitter = (Math.random() - 0.5) * 6000;
  const t = (base + jitter) * difficultyMul;
  return Math.min(Math.max(t, 1500), roundDurationMs - 500);
}

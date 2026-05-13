"use client";

import { useMemo } from "react";
import { buildSheet } from "@/lib/sheetData";
import Grid from "./Grid";

// Boss-key decoy: a fake audit sheet, no clue highlights, no answer cell.
export default function DecoySheet() {
  const sheet = useMemo(() => {
    const build = buildSheet({
      clues: ["", "", ""],
      showClueCount: 0,
      difficulty: "audit",
      round: Math.floor(Math.random() * 4) + 1,
      totalRounds: 4,
    });
    // Strip game-specific roles (clue + answer cell highlights)
    const rows = build.rows.map((row) =>
      row.map((cell) => {
        if (cell.role === "clue") {
          return {
            value: "see ref.",
            fmt: { fg: "#5f6368", italic: true, align: "left" as const },
          };
        }
        if (cell.role === "answer") {
          return { value: "" };
        }
        return cell;
      })
    );
    // Title becomes generic
    rows[0][0] = { ...rows[0][0], value: "  FY26 Quarterly Operating Audit — confidential" };
    rows[0][8] = { ...rows[0][8], value: "" };
    // Score rows wiped
    for (let i = 0; i < 8; i++) {
      const r = 4 + i;
      if (rows[r]) {
        rows[r][10] = { value: "" };
        rows[r][11] = { value: "" };
        rows[r][12] = { value: "" };
      }
    }
    rows[2][10] = { value: "" };
    rows[2][11] = { value: "" };
    rows[3][10] = { value: "" };
    rows[3][11] = { value: "" };
    return rows;
  }, []);

  return (
    <Grid
      rows={sheet}
      cols={14}
      selectedAddr={"B3"}
      onSelect={() => {}}
    />
  );
}

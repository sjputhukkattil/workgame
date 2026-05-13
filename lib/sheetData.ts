// Generates a fake-looking financial ledger that hosts the word game.
// The clue cells and answer cell are highlighted to stand out from the noise.

export type CellFmt = {
  bg?: string;
  fg?: string;
  bold?: boolean;
  italic?: boolean;
  align?: "left" | "right" | "center";
  border?: boolean;       // thicker border (for answer cell)
  comment?: boolean;      // yellow corner triangle
  ringColor?: string;     // outline color
  numberFmt?: "currency" | "percent" | "plain";
};

export type SheetCell = {
  value: string;
  fmt?: CellFmt;
  role?: "clue" | "answer" | "header" | "title" | "score" | "timer" | "round";
  clueIndex?: number;
};

export type SheetRow = SheetCell[];

export const COLS = 14;         // A..N
export const ROWS = 32;

export function colLetter(idx: number): string {
  // idx is 0-based
  let n = idx;
  let s = "";
  while (n >= 0) {
    s = String.fromCharCode(65 + (n % 26)) + s;
    n = Math.floor(n / 26) - 1;
  }
  return s;
}

// Cell address from row (0-based) + col (0-based). Rows are 1-based in display.
export function cellAddr(row: number, col: number): string {
  return `${colLetter(col)}${row + 1}`;
}

const ITEMS = [
  "Salaries & benefits", "Cloud infrastructure", "SaaS subscriptions", "Office lease",
  "Legal & accounting", "Marketing — paid", "Marketing — content", "Travel & lodging",
  "Hardware refresh", "Recruiting fees", "R&D — exploratory", "Training & dev",
  "Insurance", "Utilities", "Contract dev", "Conference budget", "Customer events",
  "Misc supplies", "Bank fees", "Tax provisioning", "Equipment rental",
];

const STATUSES = ["on track", "under review", "approved", "pending", "flagged", "deferred", "Q3 carry"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fmtMoney(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function randMoney(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) / 100) * 100;
}

function randDelta(): { text: string; positive: boolean } {
  const v = (Math.random() - 0.45) * 30;
  const positive = v >= 0;
  return {
    text: (positive ? "+" : "") + v.toFixed(1) + "%",
    positive,
  };
}

export type SheetBuild = {
  rows: SheetRow[];
  clueAddrs: [string, string, string];
  answerAddr: string;
  timerAddr: string;
  roundAddr: string;
  scoreStartRow: number;     // 0-based row index where score list starts
  scoreCol: number;          // 0-based col index
};

const HEADER_BG = "#e8eaed";
const TITLE_BG = "#0f9d58";

// Build the sheet for one round. The three clue cells live in column G (index 6),
// in fixed rows so the game UI can address them.
export function buildSheet(opts: {
  clues: [string, string, string];
  showClueCount: number;     // how many clues revealed
  difficulty: string;
  round: number;
  totalRounds: number;
}): SheetBuild {
  const { clues, showClueCount, difficulty, round, totalRounds } = opts;

  // Initialize empty grid
  const rows: SheetRow[] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ value: "" } as SheetCell))
  );

  // Title row 0 spanning ~7 cols — we just put text in A1
  rows[0][0] = {
    value: `  FY26 Q${(round % 4) + 1} Audit Workbook — round ${round} of ${totalRounds}`,
    fmt: { bg: TITLE_BG, fg: "#ffffff", bold: true, align: "left" },
    role: "title",
  };
  for (let c = 1; c < 8; c++) {
    rows[0][c] = { value: "", fmt: { bg: TITLE_BG } };
  }
  // Difficulty badge in title
  rows[0][8] = {
    value: difficulty.toUpperCase(),
    fmt: { bg: TITLE_BG, fg: "#ffffff", bold: true, align: "center" },
  };
  for (let c = 9; c < COLS; c++) {
    rows[0][c] = { value: "", fmt: { bg: TITLE_BG } };
  }

  // Row 1: column headers
  const headers = ["Line item", "Q1 Spend", "Q2 Spend", "Q3 Spend", "Q4 Plan", "Δ YoY", "Audit note", "Status", "Owner", ""];
  headers.forEach((h, c) => {
    rows[1][c] = {
      value: h,
      fmt: { bg: HEADER_BG, bold: true, align: c === 0 || c === 6 || c === 7 || c === 8 ? "left" : "right" },
      role: "header",
    };
  });
  for (let c = headers.length; c < COLS; c++) {
    rows[1][c] = { value: "", fmt: { bg: HEADER_BG } };
  }

  // Clue rows positions (in column G = index 6) — these will host clue text.
  const clueRows = [3, 9, 16]; // rows 4, 10, 17 in 1-based

  // Data rows 2..27 — fake ledger
  for (let r = 2; r < 28; r++) {
    rows[r][0] = { value: pick(ITEMS), fmt: { align: "left" } };
    const q1 = randMoney(2000, 200000);
    const q2 = randMoney(2000, 200000);
    const q3 = randMoney(2000, 200000);
    const q4 = randMoney(2000, 200000);
    rows[r][1] = { value: fmtMoney(q1), fmt: { align: "right" } };
    rows[r][2] = { value: fmtMoney(q2), fmt: { align: "right" } };
    rows[r][3] = { value: fmtMoney(q3), fmt: { align: "right" } };
    rows[r][4] = { value: fmtMoney(q4), fmt: { align: "right" } };
    const delta = randDelta();
    rows[r][5] = {
      value: delta.text,
      fmt: { align: "right", fg: delta.positive ? "#188038" : "#c5221f", bold: false },
    };
    // Audit note column (6) — empty unless this is a clue row
    if (clueRows.includes(r)) {
      const idx = clueRows.indexOf(r);
      const visible = idx < showClueCount;
      rows[r][6] = {
        value: visible ? clues[idx] : "(pending review)",
        fmt: {
          bg: "#fff8c5",
          fg: visible ? "#3c4043" : "#9aa0a6",
          italic: !visible,
          align: "left",
          comment: true,
        },
        role: "clue",
        clueIndex: idx,
      };
    } else {
      rows[r][6] = { value: pick(["—", "see ref.", "auto-renew", "vendor confirmed", "carry forward", "see Q4 ledger", "approved", "—", "—"]), fmt: { align: "left", fg: "#5f6368", italic: true } };
    }
    rows[r][7] = { value: pick(STATUSES), fmt: { align: "left" } };
    rows[r][8] = { value: pick(["A. Patel", "M. Chen", "S. Ortiz", "K. Nakamura", "R. Singh", "L. Johnson", "T. Williams"]), fmt: { align: "left" } };
  }

  // Totals row 28
  rows[28][0] = { value: "TOTAL", fmt: { bold: true, align: "left", bg: HEADER_BG } };
  for (let c = 1; c <= 4; c++) {
    rows[28][c] = { value: fmtMoney(randMoney(800000, 2000000)), fmt: { bold: true, align: "right", bg: HEADER_BG } };
  }
  const totalDelta = randDelta();
  rows[28][5] = {
    value: totalDelta.text,
    fmt: { bold: true, align: "right", bg: HEADER_BG, fg: totalDelta.positive ? "#188038" : "#c5221f" },
  };
  for (let c = 6; c <= 8; c++) {
    rows[28][c] = { value: "", fmt: { bg: HEADER_BG } };
  }

  // ANSWER row — row 30
  rows[30][0] = { value: "Audit conclusion:", fmt: { bold: true, align: "right" } };
  rows[30][1] = {
    value: "", // filled by component (typed text)
    fmt: {
      bg: "#e8f0fe",
      ringColor: "#1a73e8",
      align: "left",
      bold: true,
      border: true,
    },
    role: "answer",
  };
  for (let c = 2; c < 5; c++) rows[30][c] = { value: "", fmt: { bg: "#e8f0fe" } };

  // Top-right: TIMER + ROUND mini-block in columns J..L (9..11), rows 2-3
  rows[2][10] = { value: "Time left", fmt: { bg: HEADER_BG, fg: "#5f6368", align: "right", bold: false } };
  rows[2][11] = { value: "00:30", fmt: { bg: "#ffffff", align: "right", bold: true, border: true }, role: "timer" };
  rows[3][10] = { value: "Round", fmt: { bg: HEADER_BG, fg: "#5f6368", align: "right" } };
  rows[3][11] = { value: `${round}/${totalRounds}`, fmt: { bg: "#ffffff", align: "right", bold: true }, role: "round" };

  // Leaderboard sidebar columns J..L, rows 5..12
  const scoreStartRow = 5;
  const scoreCol = 10;
  rows[scoreStartRow - 1][scoreCol] = {
    value: "Leaderboard",
    fmt: { bg: HEADER_BG, bold: true, align: "left" },
  };
  rows[scoreStartRow - 1][scoreCol + 1] = { value: "Score", fmt: { bg: HEADER_BG, bold: true, align: "right" } };
  rows[scoreStartRow - 1][scoreCol + 2] = { value: "", fmt: { bg: HEADER_BG } };

  return {
    rows,
    clueAddrs: [
      cellAddr(clueRows[0], 6),
      cellAddr(clueRows[1], 6),
      cellAddr(clueRows[2], 6),
    ],
    answerAddr: cellAddr(30, 1),
    timerAddr: cellAddr(2, 11),
    roundAddr: cellAddr(3, 11),
    scoreStartRow,
    scoreCol,
  };
}

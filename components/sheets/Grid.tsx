"use client";

import { colLetter, type SheetCell, type SheetRow } from "@/lib/sheetData";

type Props = {
  rows: SheetRow[];
  cols: number;
  selectedAddr: string | null;
  onSelect: (addr: string) => void;
  // Optional render override per cell, keyed by address
  renderOverride?: Record<string, React.ReactNode>;
};

const COL_W = 96;
const FIRST_COL_W = 168; // wider for "Line item"
const ROW_H = 22;
const HEADER_H = 22;
const ROW_GUTTER_W = 36;

function colWidth(c: number): number {
  if (c === 0) return FIRST_COL_W;
  if (c === 6) return 220; // audit note column — extra wide for clue text
  if (c === 8) return 110;
  if (c === 10) return 110;
  return COL_W;
}

export default function Grid({ rows, cols, selectedAddr, onSelect, renderOverride }: Props) {
  return (
    <div className="h-full w-full overflow-auto bg-white">
      <table className="border-collapse text-[12px]" style={{ fontFamily: "Arial, sans-serif" }}>
        <thead>
          <tr>
            <th
              className="sticky top-0 left-0 z-30 bg-[#f8f9fa] border border-[#c4c7c5] text-[11px] font-normal text-[#5f6368]"
              style={{ width: ROW_GUTTER_W, height: HEADER_H, minWidth: ROW_GUTTER_W }}
            />
            {Array.from({ length: cols }).map((_, c) => (
              <th
                key={c}
                className="sticky top-0 z-20 bg-[#f8f9fa] border border-[#c4c7c5] text-[11px] font-normal text-[#5f6368] tabular-nums"
                style={{ width: colWidth(c), minWidth: colWidth(c), height: HEADER_H }}
              >
                {colLetter(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              <td
                className="sticky left-0 z-10 bg-[#f8f9fa] border border-[#c4c7c5] text-[11px] font-normal text-[#5f6368] text-center tabular-nums"
                style={{ width: ROW_GUTTER_W, minWidth: ROW_GUTTER_W, height: ROW_H }}
              >
                {r + 1}
              </td>
              {row.slice(0, cols).map((cell, c) => {
                const addr = `${colLetter(c)}${r + 1}`;
                const selected = selectedAddr === addr;
                return (
                  <CellView
                    key={c}
                    cell={cell}
                    addr={addr}
                    selected={selected}
                    width={colWidth(c)}
                    onSelect={onSelect}
                    override={renderOverride?.[addr]}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CellView({
  cell,
  addr,
  selected,
  width,
  onSelect,
  override,
}: {
  cell: SheetCell;
  addr: string;
  selected: boolean;
  width: number;
  onSelect: (addr: string) => void;
  override?: React.ReactNode;
}) {
  const fmt = cell.fmt ?? {};
  const style: React.CSSProperties = {
    width,
    minWidth: width,
    height: ROW_H,
    background: fmt.bg ?? "#ffffff",
    color: fmt.fg ?? "#202124",
    fontWeight: fmt.bold ? 600 : 400,
    fontStyle: fmt.italic ? "italic" : "normal",
    textAlign: fmt.align ?? "left",
    padding: "0 6px",
    position: "relative",
    cursor: "cell",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
  const ringColor = selected ? "#1a73e8" : fmt.ringColor;
  return (
    <td
      onClick={() => onSelect(addr)}
      className="border border-[#e0e0e0]"
      style={{
        ...style,
        outline: ringColor ? `2px solid ${ringColor}` : undefined,
        outlineOffset: ringColor ? "-2px" : undefined,
      }}
    >
      {fmt.comment && (
        <span
          className="absolute top-0 right-0"
          style={{
            width: 0,
            height: 0,
            borderTop: "6px solid #f59e0b",
            borderLeft: "6px solid transparent",
          }}
        />
      )}
      {override ?? cell.value}
    </td>
  );
}

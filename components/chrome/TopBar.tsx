"use client";

import { DocsLogo, SheetsLogo, Star, Folder, Cloud, Comment, VideoCam, Lock, Grid9 } from "./Icons";
import Avatar from "./Avatar";
import type { AppMode, Player } from "@/lib/types";

type Props = {
  title: string;
  onTitleChange: (s: string) => void;
  players: Player[];
  mode?: AppMode;
  onModeChange?: (m: AppMode) => void;
};

export default function TopBar({ title, onTitleChange, players, mode = "docs", onModeChange }: Props) {
  const others = players.filter((p) => !p.isYou).slice(0, 4);
  return (
    <div className="flex items-center px-3 py-1.5 gap-2 bg-[var(--color-docs-bg)]">
      <div className="relative group shrink-0">
        <button
          className="p-1 rounded hover:bg-black/5 inline-flex items-center gap-1"
          title={onModeChange ? "Switch to Sheets" : "Docs"}
          aria-label="Switch app"
          onClick={() => onModeChange?.("sheets")}
        >
          <DocsLogo />
          {onModeChange && <Grid9 width={14} height={14} />}
        </button>
        {onModeChange && (
          <div className="hidden sm:group-hover:flex absolute left-0 top-full mt-1 bg-white border border-[var(--color-docs-border)] rounded shadow-lg p-1 gap-1 z-50">
            <button
              onClick={() => onModeChange("docs")}
              className={"flex flex-col items-center px-3 py-2 rounded hover:bg-black/5 " + (mode === "docs" ? "bg-blue-50" : "")}
              title="Open in Docs"
            >
              <DocsLogo width={32} height={32} />
              <span className="text-[10px] text-[var(--color-docs-muted)] mt-1">Docs</span>
            </button>
            <button
              onClick={() => onModeChange("sheets")}
              className={"flex flex-col items-center px-3 py-2 rounded hover:bg-black/5 " + (mode === "sheets" ? "bg-green-50" : "")}
              title="Open in Sheets"
            >
              <SheetsLogo width={32} height={32} />
              <span className="text-[10px] text-[var(--color-docs-muted)] mt-1">Sheets</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-base sm:text-lg leading-none px-1.5 py-0.5 -ml-1.5 rounded outline-none border border-transparent hover:border-[var(--color-docs-border)] focus:border-[var(--color-docs-blue)] bg-transparent min-w-0 flex-1 max-w-md font-normal"
            spellCheck={false}
          />
          <button className="hidden sm:inline-flex p-1 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Star">
            <Star width={16} height={16} />
          </button>
          <button className="hidden sm:inline-flex p-1 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Move">
            <Folder width={16} height={16} />
          </button>
          <button className="hidden sm:inline-flex p-1 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Saved to Drive">
            <Cloud width={16} height={16} />
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-3.5 text-xs text-[var(--color-docs-muted)] pl-1.5 -mt-0.5">
          <button className="hover:text-[var(--color-docs-text)]">File</button>
          <button className="hover:text-[var(--color-docs-text)]">Edit</button>
          <button className="hover:text-[var(--color-docs-text)]">View</button>
          <button className="hover:text-[var(--color-docs-text)]">Insert</button>
          <button className="hover:text-[var(--color-docs-text)]">Format</button>
          <button className="hover:text-[var(--color-docs-text)]">Tools</button>
          <button className="hover:text-[var(--color-docs-text)]">Extensions</button>
          <button className="hover:text-[var(--color-docs-text)]">Help</button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div className="hidden sm:flex -space-x-1.5 mr-2">
          {others.map((p) => (
            <Avatar key={p.id} name={p.name} color={p.color} size={26} outline />
          ))}
        </div>
        <button className="hidden md:inline-flex p-1.5 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Open comment history">
          <Comment width={18} height={18} />
        </button>
        <button className="hidden md:inline-flex p-1.5 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Meet">
          <VideoCam width={18} height={18} />
        </button>
        <button className="hidden sm:inline-flex ml-1 items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c2e7ff] text-[#001d35] text-sm font-medium hover:shadow">
          <Lock width={16} height={16} />
          Share
        </button>
        <Avatar name="You" color="#1a73e8" size={28} />
      </div>
    </div>
  );
}

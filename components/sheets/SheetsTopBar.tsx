"use client";

import { SheetsLogo, DocsLogo, Star, Folder, Cloud, Comment, VideoCam, Lock, Grid9 } from "../chrome/Icons";
import Avatar from "../chrome/Avatar";
import type { Player, AppMode } from "@/lib/types";

type Props = {
  title: string;
  onTitleChange: (s: string) => void;
  players: Player[];
  mode: AppMode;
  onModeChange: (m: AppMode) => void;
};

export default function SheetsTopBar({ title, onTitleChange, players, mode, onModeChange }: Props) {
  const others = players.filter((p) => !p.isYou).slice(0, 4);
  return (
    <div className="flex items-center px-3 py-1.5 gap-2 bg-white">
      <ModeSwitch mode={mode} onChange={onModeChange} />

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-base sm:text-lg leading-none px-1.5 py-0.5 -ml-1.5 rounded outline-none border border-transparent hover:border-[#c4c7c5] focus:border-[#0f9d58] bg-transparent min-w-0 flex-1 max-w-md font-normal"
            spellCheck={false}
          />
          <button className="hidden sm:inline-flex p-1 rounded-full hover:bg-black/5 text-[#5f6368]" title="Star">
            <Star width={16} height={16} />
          </button>
          <button className="hidden sm:inline-flex p-1 rounded-full hover:bg-black/5 text-[#5f6368]" title="Move">
            <Folder width={16} height={16} />
          </button>
          <button className="hidden sm:inline-flex p-1 rounded-full hover:bg-black/5 text-[#5f6368]" title="Saved to Drive">
            <Cloud width={16} height={16} />
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-3.5 text-xs text-[#5f6368] pl-1.5 -mt-0.5">
          <button className="hover:text-[#202124]">File</button>
          <button className="hover:text-[#202124]">Edit</button>
          <button className="hover:text-[#202124]">View</button>
          <button className="hover:text-[#202124]">Insert</button>
          <button className="hover:text-[#202124]">Format</button>
          <button className="hover:text-[#202124]">Data</button>
          <button className="hover:text-[#202124]">Tools</button>
          <button className="hover:text-[#202124]">Extensions</button>
          <button className="hover:text-[#202124]">Help</button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <div className="hidden sm:flex -space-x-1.5 mr-2">
          {others.map((p) => (
            <Avatar key={p.id} name={p.name} color={p.color} size={26} outline />
          ))}
        </div>
        <button className="hidden md:inline-flex p-1.5 rounded-full hover:bg-black/5 text-[#5f6368]" title="Open comment history">
          <Comment width={18} height={18} />
        </button>
        <button className="hidden md:inline-flex p-1.5 rounded-full hover:bg-black/5 text-[#5f6368]" title="Meet">
          <VideoCam width={18} height={18} />
        </button>
        <button className="hidden sm:inline-flex ml-1 items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c8e6c9] text-[#0b5e34] text-sm font-medium hover:shadow">
          <Lock width={16} height={16} />
          Share
        </button>
        <Avatar name="You" color="#1a73e8" size={28} />
      </div>
    </div>
  );
}

function ModeSwitch({ mode, onChange }: { mode: AppMode; onChange: (m: AppMode) => void }) {
  return (
    <div className="relative group shrink-0">
      <button
        className="p-1 rounded hover:bg-black/5 inline-flex items-center gap-1"
        title="Switch to Docs"
        aria-label="Switch app"
        onClick={() => onChange("docs")}
      >
        {mode === "sheets" ? <SheetsLogo /> : <DocsLogo />}
        <Grid9 width={14} height={14} />
      </button>
      <div className="hidden sm:group-hover:flex absolute left-0 top-full mt-1 bg-white border border-[#c4c7c5] rounded shadow-lg p-1 gap-1 z-50">
        <button
          onClick={() => onChange("docs")}
          className={"flex flex-col items-center px-3 py-2 rounded hover:bg-black/5 " + (mode === "docs" ? "bg-blue-50" : "")}
          title="Open in Docs"
        >
          <DocsLogo width={32} height={32} />
          <span className="text-[10px] text-[#5f6368] mt-1">Docs</span>
        </button>
        <button
          onClick={() => onChange("sheets")}
          className={"flex flex-col items-center px-3 py-2 rounded hover:bg-black/5 " + (mode === "sheets" ? "bg-green-50" : "")}
          title="Open in Sheets"
        >
          <SheetsLogo width={32} height={32} />
          <span className="text-[10px] text-[#5f6368] mt-1">Sheets</span>
        </button>
      </div>
    </div>
  );
}

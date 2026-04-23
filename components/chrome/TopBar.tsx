"use client";

import { DocsLogo, Star, Folder, Cloud, Comment, VideoCam, Lock } from "./Icons";
import Avatar from "./Avatar";
import type { Player } from "@/lib/types";

type Props = {
  title: string;
  onTitleChange: (s: string) => void;
  players: Player[];
};

export default function TopBar({ title, onTitleChange, players }: Props) {
  const others = players.filter((p) => !p.isYou).slice(0, 4);
  return (
    <div className="flex items-center px-3 py-1.5 gap-2 bg-[var(--color-docs-bg)]">
      <div className="shrink-0">
        <DocsLogo />
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-lg leading-none px-1.5 py-0.5 -ml-1.5 rounded outline-none border border-transparent hover:border-[var(--color-docs-border)] focus:border-[var(--color-docs-blue)] bg-transparent min-w-0 flex-1 max-w-md font-normal"
            spellCheck={false}
          />
          <button className="p-1 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Star">
            <Star width={16} height={16} />
          </button>
          <button className="p-1 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Move">
            <Folder width={16} height={16} />
          </button>
          <button className="p-1 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Saved to Drive">
            <Cloud width={16} height={16} />
          </button>
        </div>
        <div className="flex items-center gap-3.5 text-xs text-[var(--color-docs-muted)] pl-1.5 -mt-0.5">
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
        <div className="flex -space-x-1.5 mr-2">
          {others.map((p) => (
            <Avatar key={p.id} name={p.name} color={p.color} size={26} outline />
          ))}
        </div>
        <button className="p-1.5 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Open comment history">
          <Comment width={18} height={18} />
        </button>
        <button className="p-1.5 rounded-full hover:bg-black/5 text-[var(--color-docs-muted)]" title="Meet">
          <VideoCam width={18} height={18} />
        </button>
        <button className="ml-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c2e7ff] text-[#001d35] text-sm font-medium hover:shadow">
          <Lock width={16} height={16} />
          Share
        </button>
        <Avatar name="You" color="#1a73e8" size={28} />
      </div>
    </div>
  );
}

"use client";

import {
  Undo, Redo, Print, Spell, PaintFormat,
  Bold, Italic, Underline, Link, Image, ChevronDown,
} from "./Icons";

const ToolbarBtn = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <button title={title} className="p-1.5 rounded hover:bg-black/5 text-[var(--color-docs-text)] inline-flex items-center gap-0.5">
    {children}
  </button>
);

const Sep = () => <div className="w-px h-5 bg-[var(--color-docs-border)] mx-1" />;

export default function Toolbar() {
  return (
    <div className="no-scrollbar flex items-center gap-0.5 px-3 py-1 mx-0 sm:mx-3 bg-[var(--color-docs-toolbar)] rounded-full text-[var(--color-docs-text)] text-sm overflow-x-auto whitespace-nowrap [&>*]:shrink-0">
      <ToolbarBtn title="Undo"><Undo /></ToolbarBtn>
      <ToolbarBtn title="Redo"><Redo /></ToolbarBtn>
      <ToolbarBtn title="Print"><Print /></ToolbarBtn>
      <ToolbarBtn title="Spelling and grammar check"><Spell /></ToolbarBtn>
      <ToolbarBtn title="Paint format"><PaintFormat /></ToolbarBtn>
      <Sep />

      <button className="px-2 py-1 rounded hover:bg-black/5 inline-flex items-center gap-1 text-sm">
        100%
        <ChevronDown width={14} height={14} />
      </button>
      <Sep />

      <button className="px-2 py-1 rounded hover:bg-black/5 inline-flex items-center gap-1 text-sm min-w-[110px] justify-between">
        Normal text
        <ChevronDown width={14} height={14} />
      </button>
      <Sep />

      <button className="px-2 py-1 rounded hover:bg-black/5 inline-flex items-center gap-1 text-sm min-w-[80px] justify-between">
        Arial
        <ChevronDown width={14} height={14} />
      </button>
      <Sep />

      <button className="w-6 h-6 rounded hover:bg-black/5 text-sm">−</button>
      <div className="w-6 h-6 inline-flex items-center justify-center text-sm border border-[var(--color-docs-border)] rounded">11</div>
      <button className="w-6 h-6 rounded hover:bg-black/5 text-sm">+</button>
      <Sep />

      <ToolbarBtn title="Bold"><Bold /></ToolbarBtn>
      <ToolbarBtn title="Italic"><Italic /></ToolbarBtn>
      <ToolbarBtn title="Underline"><Underline /></ToolbarBtn>

      <Sep />
      <ToolbarBtn title="Insert link"><Link /></ToolbarBtn>
      <ToolbarBtn title="Insert image"><Image /></ToolbarBtn>
    </div>
  );
}

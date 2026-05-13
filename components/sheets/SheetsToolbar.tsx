"use client";

import { Undo, Redo, Print, PaintFormat, Sigma, ChevronDown, Bold, Italic } from "../chrome/Icons";

const Btn = ({ children, title }: { children: React.ReactNode; title?: string }) => (
  <button title={title} className="p-1.5 rounded hover:bg-black/5 text-[#202124]">
    {children}
  </button>
);

const Sep = () => <div className="w-px h-5 bg-[#c4c7c5] mx-1" />;

export default function SheetsToolbar() {
  return (
    <div className="no-scrollbar flex items-center gap-0.5 px-3 py-1 mx-0 sm:mx-3 bg-[#f1f3f4] rounded-full text-[#202124] text-sm overflow-x-auto whitespace-nowrap [&>*]:shrink-0">
      <Btn title="Undo"><Undo /></Btn>
      <Btn title="Redo"><Redo /></Btn>
      <Btn title="Print"><Print /></Btn>
      <Btn title="Paint format"><PaintFormat /></Btn>
      <Sep />
      <button className="px-2 py-1 rounded hover:bg-black/5 inline-flex items-center gap-1 text-sm">
        100%
        <ChevronDown width={14} height={14} />
      </button>
      <Sep />
      <Btn title="Currency">$</Btn>
      <Btn title="Percent">%</Btn>
      <button className="px-2 py-1 rounded hover:bg-black/5 inline-flex items-center text-xs">.0<ChevronDown width={12} height={12} /></button>
      <Sep />
      <button className="px-2 py-1 rounded hover:bg-black/5 inline-flex items-center gap-1 text-sm min-w-[80px] justify-between">
        Default
        <ChevronDown width={14} height={14} />
      </button>
      <Sep />
      <button className="w-6 h-6 rounded hover:bg-black/5 text-sm">−</button>
      <div className="w-6 h-6 inline-flex items-center justify-center text-sm border border-[#c4c7c5] rounded">10</div>
      <button className="w-6 h-6 rounded hover:bg-black/5 text-sm">+</button>
      <Sep />
      <Btn title="Bold"><Bold /></Btn>
      <Btn title="Italic"><Italic /></Btn>
      <Sep />
      <Btn title="Functions"><Sigma /></Btn>
    </div>
  );
}

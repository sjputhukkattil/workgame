"use client";

import type { ReactNode } from "react";

type Props = {
  pageNumber: number;
  totalPages: number;
  children: ReactNode;
};

export default function PageCanvas({ pageNumber, totalPages, children }: Props) {
  return (
    <div className="h-full overflow-y-auto bg-[var(--color-docs-bg)]">
      {/* Ruler */}
      <div className="sticky top-0 z-10 bg-[var(--color-docs-bg)] border-b border-transparent">
        <div className="mx-auto" style={{ width: 816 }}>
          <div className="h-6 flex items-center text-[10px] text-[var(--color-docs-muted)] select-none">
            <div className="px-2 flex-1 border-b border-[var(--color-docs-border)] flex justify-between">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i}>|</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 flex justify-center">
        <div
          className="bg-white shadow-md"
          style={{
            width: 816,
            minHeight: 1056,
            padding: "96px 96px 96px 96px",
          }}
        >
          {children}
          <div className="mt-16 text-center text-xs text-[var(--color-docs-muted)] select-none">
            Page {pageNumber} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}

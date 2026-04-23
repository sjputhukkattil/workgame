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
      {/* Ruler — hidden on narrow screens where it's just visual clutter */}
      <div className="sticky top-0 z-10 bg-[var(--color-docs-bg)] border-b border-transparent hidden sm:block">
        <div className="mx-auto" style={{ maxWidth: 816, width: "100%" }}>
          <div className="h-6 flex items-center text-[10px] text-[var(--color-docs-muted)] select-none">
            <div className="px-2 flex-1 border-b border-[var(--color-docs-border)] flex justify-between">
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i}>|</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-3 sm:py-6 flex justify-center">
        <div
          className="bg-white shadow-md w-full sm:w-[816px] sm:max-w-[calc(100vw-2rem)] px-5 py-8 sm:px-24 sm:py-24"
          style={{
            minHeight: "min(1056px, calc(100vh - 180px))",
          }}
        >
          {children}
          <div className="mt-10 sm:mt-16 text-center text-xs text-[var(--color-docs-muted)] select-none">
            Page {pageNumber} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}

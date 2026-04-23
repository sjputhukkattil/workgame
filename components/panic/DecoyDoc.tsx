"use client";

import type { Decoy } from "@/lib/decoys";

export default function DecoyDoc({ decoy, caretLineIndex }: { decoy: Decoy; caretLineIndex: number }) {
  return (
    <div className="text-[var(--color-docs-text)]" style={{ fontFamily: "var(--font-doc)", fontSize: 11 * 1.45 }}>
      {decoy.body.map((b, i) => {
        const isCaret = i === caretLineIndex;
        const tail = isCaret ? <span className="docs-caret" /> : null;
        if (b.type === "h1") {
          return (
            <h1 key={i} className="text-[26px] font-normal text-[#202124] mt-2 mb-3">
              {b.text}{tail}
            </h1>
          );
        }
        if (b.type === "h2") {
          return (
            <h2 key={i} className="text-[20px] font-normal text-[#3c4043] mt-4 mb-2">
              {b.text}{tail}
            </h2>
          );
        }
        if (b.type === "li") {
          return (
            <ul key={i} className="list-disc pl-7 my-1">
              <li>{b.text}{tail}</li>
            </ul>
          );
        }
        return (
          <p key={i} className="my-2 leading-[1.6]">
            {b.text}{tail}
          </p>
        );
      })}
    </div>
  );
}

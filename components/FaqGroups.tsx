"use client";

import { useState } from "react";

export type QA = { q: string; a: string };
export type FaqGroup = { title: string; items: QA[] };

export default function FaqGroups({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <div className="max-w-[760px] mx-auto flex flex-col gap-12">
      {groups.map((g, gi) => (
        <div key={g.title}>
          <div className="font-mono text-[11px] tracking-[.14em] text-[#6B726C] mb-4 px-1">
            {g.title.toUpperCase()}
          </div>
          <div className="flex flex-col gap-3">
            {g.items.map((f, ii) => {
              const key = `${gi}-${ii}`;
              const isOpen = open === key;
              return (
                <div
                  key={f.q}
                  className={`card overflow-hidden transition-colors ${
                    isOpen ? "border-[#5AE48E]/25" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : key)}
                    className="w-full bg-none border-none cursor-pointer text-left flex items-center justify-between gap-5 py-5 px-6 font-display font-semibold text-[17px] text-[#F4F1EA]"
                  >
                    <span>{f.q}</span>
                    <span className="text-[#5AE48E] text-2xl flex-none leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-6 text-[15px] leading-[1.65] text-[#AEB5AF]">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

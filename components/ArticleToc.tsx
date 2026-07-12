"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export default function ArticleToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: 0 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav className="flex flex-col gap-1">
      <div className="font-mono text-[10px] tracking-[.14em] text-[#6B726C] mb-3">
        TABLE OF CONTENTS
      </div>
      {items.map((i) => {
        const on = active === i.id;
        return (
          <a
            key={i.id}
            href={`#${i.id}`}
            className={`text-[13.5px] leading-[1.4] py-1.5 border-l-2 pl-3 transition-colors ${
              on
                ? "border-[#5AE48E] text-[#F4F1EA]"
                : "border-[#F4F1EA]/10 text-[#8A918B] hover:text-[#C7CDC8]"
            }`}
          >
            {i.label}
          </a>
        );
      })}
    </nav>
  );
}

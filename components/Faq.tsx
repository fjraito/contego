"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "Will the AI UGC actually look realistic?",
    a: "Yes. Contego focuses on natural facial movement, believable voice delivery, realistic pacing, and creator-style settings. The goal is simple: viewers should focus on your message, not question whether the video was generated with AI.",
  },
  {
    q: "Is Contego an AI UGC tool?",
    a: "No. Contego is a full-service AI UGC agency. You do not need to learn software or produce anything yourself. We handle the concept, script, production, editing, and final delivery.",
  },
  {
    q: "What is included in the free AI UGC sample?",
    a: "You receive one custom AI UGC video created around your product or campaign brief. It gives you a chance to review Contego's quality and realism before committing to a paid project.",
  },
  {
    q: "How long does AI UGC production take?",
    a: "Turnaround depends on the video length, creative requirements, and feedback process. Once we review your brief, we will confirm the expected delivery schedule before production begins.",
  },
  {
    q: "Which platforms can you create AI UGC for?",
    a: "Contego creates AI UGC for TikTok, Instagram, Facebook, YouTube, LinkedIn, X, Snapchat, Pinterest, Reddit, Threads, and other short-form social placements. Videos can also be produced for landing pages and product explainers.",
  },
];

export default function Faq({
  heading = "What to know before working with Contego.",
  items = FAQS,
}: {
  heading?: string;
  items?: QA[];
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-[100px] px-[28px]">
      <div className="max-w-[760px] mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <h2 className="font-display font-medium text-[clamp(23px,3.6vw,46px)] leading-[1.12] tracking-[-.02em] text-[#F4F1EA] text-balance">
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {items.map((f, i) => {
            const open = openIndex === i;
            return (
              <div
                key={f.q}
                className={`card overflow-hidden transition-colors ${
                  open ? "border-[#5AE48E]/25" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="w-full bg-none border-none cursor-pointer text-left flex items-center justify-between gap-5 py-5 px-6 font-display font-semibold text-[18px] text-[#F4F1EA]"
                >
                  <span>{f.q}</span>
                  <span className="text-[#5AE48E] text-2xl flex-none leading-none">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <p className="px-6 pb-6 text-[15px] leading-[1.65] text-[#AEB5AF]">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

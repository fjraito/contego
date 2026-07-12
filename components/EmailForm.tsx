"use client";

import { useState } from "react";

export default function EmailForm({
  buttonLabel = "Claim my sample",
  note,
  className = "",
}: {
  buttonLabel?: string;
  note?: string;
  className?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={className}>
      {submitted ? (
        <div className="inline-flex items-center gap-2 bg-[#5AE48E]/12 border border-[#5AE48E]/40 rounded-xl py-[14px] px-6 text-[15px] text-[#5AE48E]">
          Got it. We&apos;ll be in touch within one business day.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex gap-[10px] flex-nowrap max-w-[560px] mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-1 min-w-0 bg-[#0f1211] border border-[#F4F1EA]/14 text-[#F4F1EA] font-body text-[14px] sm:text-[15px] py-[15px] px-4 rounded-[12px] outline-none focus:border-[#5AE48E]/50 transition-colors"
          />
          <button
            type="submit"
            className="bg-[#5AE48E] text-[#07130C] border-none font-display font-bold text-[13px] sm:text-[15px] py-[15px] px-4 sm:px-6 rounded-[12px] cursor-pointer whitespace-nowrap hover:bg-[#7EEBA8] transition-colors"
          >
            {buttonLabel}
          </button>
        </form>
      )}
      {note && (
        <p className="mt-5 font-mono text-[11px] text-[#6B726C] tracking-[.04em] text-center">
          {note}
        </p>
      )}
    </div>
  );
}

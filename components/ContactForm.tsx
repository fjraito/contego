"use client";

import { useState } from "react";

const field =
  "w-full bg-[#0f1211] border border-[#F4F1EA]/14 text-[#F4F1EA] font-body text-[15px] py-[13px] px-4 rounded-[12px] outline-none focus:border-[#5AE48E]/50 transition-colors placeholder:text-[#565C57]";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="card card-sheen p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#5AE48E]/12 border border-[#5AE48E]/40 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5AE48E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12l5 5L20 6" />
          </svg>
        </div>
        <div className="font-display font-semibold text-[19px] text-[#F4F1EA] mb-2">
          Message sent.
        </div>
        <p className="text-[15px] leading-[1.6] text-[#AEB5AF]">
          Thanks. We reply within one business day, usually with a free sample
          idea for your offer.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="card card-sheen p-7 flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] tracking-[.08em] text-[#8A918B] mb-2">
            NAME
          </label>
          <input className={field} required placeholder="Your name" />
        </div>
        <div>
          <label className="block font-mono text-[10px] tracking-[.08em] text-[#8A918B] mb-2">
            WORK EMAIL
          </label>
          <input className={field} type="email" required placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[.08em] text-[#8A918B] mb-2">
          COMPANY OR WEBSITE
        </label>
        <input className={field} placeholder="company.com" />
      </div>

      <div>
        <label className="block font-mono text-[10px] tracking-[.08em] text-[#8A918B] mb-2">
          WHAT DO YOU NEED?
        </label>
        <textarea
          className={`${field} min-h-[120px] resize-y`}
          required
          placeholder="Tell us about your product, offer, and where you run ads."
        />
      </div>

      <button
        type="submit"
        className="mt-1 bg-[#5AE48E] text-[#07130C] font-display font-bold text-[15px] py-[14px] rounded-[12px] cursor-pointer hover:bg-[#7EEBA8] transition-colors"
      >
        Send message
      </button>
      <p className="text-center font-mono text-[10px] text-[#565C57] tracking-[.04em]">
        NO COST · NO CATCH · ONE FREE SAMPLE ON US
      </p>
    </form>
  );
}

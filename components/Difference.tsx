import SectionHead from "./SectionHead";

const BAD = ["Plastic expressions", "Flat delivery", "Unnatural motion", "Instant skepticism"];
const GOOD = ["Human-like performance", "Natural pacing", "Realistic movement", "Creator-style credibility"];

export default function Difference() {
  return (
    <section id="difference" className="relative py-[100px] px-[28px]">
      <div
        className="absolute -bottom-[260px] -left-[220px] w-[820px] h-[820px] blur-[70px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(90,228,142,.12), rgba(90,228,142,.04) 45%, transparent 72%)",
        }}
      />
      <div className="max-w-[1000px] mx-auto relative">
        <SectionHead
          n="2"
          label="SEE THE DIFFERENCE"
          title="The best AI UGC does not look AI-generated."
          sub="Cheap-looking AI UGC can weaken trust before your message lands. Contego combines lower production friction with the realism audiences expect from human creators."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card p-7">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#C25A4E]" />
              <span className="font-mono text-[12px] text-[#8A918B] tracking-[.06em]">
                LOW QUALITY AI UGC
              </span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {BAD.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px] text-[#AEB5AF]">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
                    <circle cx="8" cy="8" r="8" fill="#C25A4E" fillOpacity="0.14" />
                    <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" fill="none" stroke="#C25A4E" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="card card-sheen p-7 border-[#5AE48E]/25">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#5AE48E]" />
              <span className="font-mono text-[12px] text-[#5AE48E] tracking-[.06em]">
                CONTEGO AI UGC
              </span>
            </div>
            <ul className="flex flex-col gap-3.5">
              {GOOD.map((g) => (
                <li key={g} className="flex items-center gap-3 text-[15px] text-[#C7CDC8]">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
                    <circle cx="8" cy="8" r="8" fill="#5AE48E" fillOpacity="0.14" />
                    <path d="M4.5 8l2.2 2.2L11.5 5.5" fill="none" stroke="#5AE48E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

import SectionHead from "./SectionHead";

const METRICS = [
  { label: "ROAS lift", accent: true },
  { label: "Cost per result", accent: false },
  { label: "Hook rate", accent: false },
  { label: "Videos shipped / month", accent: false },
  { label: "Thumb-stop rate", accent: false },
  { label: "Winning variants", accent: true },
];

export default function Proof() {
  return (
    <section id="proof" className="py-[100px] px-[28px]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHead
          label="PROOF"
          title="The only score that counts is whether it sells."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className={`rounded-[18px] p-7 min-h-[150px] flex flex-col justify-between ${
                m.accent
                  ? "card-sheen border border-[#5AE48E]/30 bg-[#5AE48E]/[.07]"
                  : "card"
              }`}
            >
              <div
                className={`rounded-[10px] h-[52px] flex items-center justify-center font-mono text-[11px] tracking-[.06em] border border-dashed ${
                  m.accent
                    ? "border-[#5AE48E]/40 text-[#5AE48E]"
                    : "border-[#F4F1EA]/20 text-[#6B726C]"
                }`}
              >
                add result
              </div>
              <div className="font-display font-bold text-[15px] text-[#F4F1EA] mt-4">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center font-mono text-[12px] text-[#6B726C] mt-7 tracking-[.03em]">
          Placeholders. We only publish results we can prove.
        </p>
      </div>
    </section>
  );
}

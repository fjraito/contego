import SectionHead from "./SectionHead";

type Cell = boolean | string;
type Row = { label: string; vals: [Cell, Cell, Cell] };
type Group = { title: string; rows: Row[] };

const GROUPS: Group[] = [
  {
    title: "Production",
    rows: [
      { label: "AI UGC videos per month", vals: ["8", "20", "30+"] },
      { label: "Maximum video length", vals: ["30 seconds", "45 seconds", "Custom"] },
      { label: "AI creator profiles", vals: ["2", "5", "Unlimited"] },
      { label: "Revision rounds per video", vals: ["1", "2", "Custom"] },
      { label: "Editing and captions", vals: [true, true, true] },
      { label: "Platform-ready delivery", vals: [true, true, true] },
    ],
  },
  {
    title: "Creative",
    rows: [
      { label: "Creative direction", vals: [true, true, true] },
      { label: "Conversion-focused scripts", vals: [true, true, true] },
      { label: "Creator and setting selection", vals: [true, true, true] },
      { label: "Brand tone matching", vals: [true, true, true] },
      { label: "Monthly creative planning", vals: [false, true, true] },
      { label: "Dedicated creative strategist", vals: [false, false, true] },
    ],
  },
  {
    title: "Delivery",
    rows: [
      { label: "Standard turnaround", vals: ["5–7 business days", "3–5 business days", "Priority"] },
      { label: "Priority production", vals: [false, true, true] },
      { label: "Rush delivery", vals: ["Add-on", "Add-on", "Available"] },
      { label: "Commercial usage rights", vals: [true, true, true] },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Email support", vals: [true, true, true] },
      { label: "Priority support", vals: [false, true, true] },
      { label: "Dedicated account manager", vals: [false, false, true] },
      { label: "Multi-brand management", vals: [false, false, true] },
      { label: "White-label delivery", vals: [false, false, true] },
    ],
  },
];

const GRID = "grid grid-cols-[1.7fr_1fr_1fr_1fr]";

function CellView({ v, accent }: { v: Cell; accent?: boolean }) {
  if (v === true)
    return (
      <svg width="17" height="17" viewBox="0 0 16 16" className="mx-auto">
        <path d="M3.5 8l3 3 6-7" fill="none" stroke={accent ? "#5AE48E" : "#7c9c88"} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (v === false) return <span className="text-[#4a504b]">–</span>;
  return <span className={`text-[13.5px] ${accent ? "text-[#F4F1EA]" : "text-[#C7CDC8]"}`}>{v}</span>;
}

export default function ComparePlans() {
  return (
    <section className="py-[110px] px-[28px]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHead
          label="COMPARE"
          title="Compare every plan."
          sub="Every plan includes the same Contego production standard. Choose based on the volume, turnaround, and support your team needs."
        />

        <div className="overflow-x-auto">
          <div className="min-w-[680px] rounded-[20px] border border-[#F4F1EA]/10 overflow-hidden bg-[#0c0f0e]">
            {/* header */}
            <div className={`${GRID} items-stretch`}>
              <div className="p-5" />
              <div className="p-5 text-center font-display font-semibold text-[16px] text-[#F4F1EA]">
                Starter
              </div>
              <div className="p-5 text-center font-display font-semibold text-[16px] text-[#5AE48E] bg-[#5AE48E]/[.06] border-x border-[#5AE48E]/20">
                Growth
              </div>
              <div className="p-5 text-center font-display font-semibold text-[16px] text-[#F4F1EA]">
                Scale
              </div>
            </div>

            {GROUPS.map((g) => (
              <div key={g.title}>
                {/* group label row */}
                <div className={`${GRID} items-stretch border-t border-[#F4F1EA]/8`}>
                  <div className="px-5 pt-5 pb-2 font-mono text-[10.5px] tracking-[.14em] text-[#6B726C] bg-[#F4F1EA]/[.02]">
                    {g.title.toUpperCase()}
                  </div>
                  <div className="bg-[#F4F1EA]/[.02]" />
                  <div className="bg-[#5AE48E]/[.06] border-x border-[#5AE48E]/20" />
                  <div className="bg-[#F4F1EA]/[.02]" />
                </div>
                {/* rows */}
                {g.rows.map((r) => (
                  <div key={r.label} className={`${GRID} items-center border-t border-[#F4F1EA]/6`}>
                    <div className="px-5 py-3.5 text-[14px] text-[#AEB5AF]">{r.label}</div>
                    <div className="px-4 py-3.5 text-center">
                      <CellView v={r.vals[0]} />
                    </div>
                    <div className="px-4 py-3.5 text-center bg-[#5AE48E]/[.06] border-x border-[#5AE48E]/20 h-full flex items-center justify-center">
                      <CellView v={r.vals[1]} accent />
                    </div>
                    <div className="px-4 py-3.5 text-center">
                      <CellView v={r.vals[2]} />
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* bottom cap for the highlighted column */}
            <div className={`${GRID}`}>
              <div />
              <div />
              <div className="h-2 bg-[#5AE48E]/[.06] border-x border-b border-[#5AE48E]/20 rounded-b-[6px]" />
              <div />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

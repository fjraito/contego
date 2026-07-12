import type { Row } from "@/lib/comparisons";

function Cell({ v, accent }: { v: string | boolean; accent?: boolean }) {
  if (v === true)
    return (
      <svg width="17" height="17" viewBox="0 0 16 16" className="mx-auto">
        <path d="M3.5 8l3 3 6-7" fill="none" stroke={accent ? "#5AE48E" : "#8A918B"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (v === false) return <span className="text-[#565C57]">–</span>;
  return <span className={`text-[13px] ${accent ? "text-[#F4F1EA]" : "text-[#AEB5AF]"}`}>{v}</span>;
}

export default function CompareTable({
  colA,
  colB,
  rows,
  highlightA = false,
}: {
  colA: string;
  colB: string;
  rows: Row[];
  highlightA?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[560px] card overflow-hidden">
        {/* header */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b border-[#F4F1EA]/8">
          <div className="p-4" />
          <div
            className={`p-4 text-center font-display font-semibold text-[15px] ${
              highlightA ? "text-[#5AE48E] bg-[#5AE48E]/[.05]" : "text-[#F4F1EA]"
            }`}
          >
            {colA}
          </div>
          <div className="p-4 text-center font-display font-semibold text-[15px] text-[#F4F1EA]">
            {colB}
          </div>
        </div>

        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-[1.4fr_1fr_1fr] items-center ${
              i % 2 ? "bg-[#F4F1EA]/[.015]" : ""
            }`}
          >
            <div className="p-4 text-[13.5px] text-[#AEB5AF]">{r.label}</div>
            <div className={`p-4 text-center ${highlightA ? "bg-[#5AE48E]/[.05]" : ""}`}>
              <Cell v={r.a} accent={highlightA} />
            </div>
            <div className="p-4 text-center">
              <Cell v={r.b} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Card illustrations — refined and minimal. One idea per card, generous
   whitespace, thin lines, muted palette with a single green accent. Subtle
   motion only, reacting to hovering the parent .card (see globals.css .viz-*). */

const LINE = "rgba(244,241,234,0.16)";

function Frame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`card-inset relative overflow-hidden h-[168px] flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
}

function Play({ size = 15 }: { size?: number }) {
  return (
    <span
      className="rounded-full bg-[#5AE48E] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 10 12">
        <path d="M0 0l10 6-10 6z" fill="#07130c" />
      </svg>
    </span>
  );
}

/* thin outlined video frame */
function VideoFrame({
  cls,
  label,
  accent,
  play = true,
}: {
  cls: string;
  label: string;
  accent?: boolean;
  play?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`viz-pop ${cls} rounded-[8px] border flex items-center justify-center`}
        style={{ borderColor: accent ? "rgba(90,228,142,0.45)" : LINE }}
      >
        {play && <Play size={accent ? 18 : 14} />}
      </div>
      <span className="font-mono text-[9px] text-[#8A918B]">{label}</span>
    </div>
  );
}

/* ---- 1 · Start with one free sample -------------------------------- */
export function VisSample() {
  return (
    <Frame>
      <div className="viz-pop relative w-[62px] aspect-[9/16] rounded-[13px] border border-[#5AE48E]/40 flex items-center justify-center">
        <Play size={26} />
      </div>
      <span className="absolute top-4 right-4 font-mono text-[10px] text-[#5AE48E] px-2.5 py-1 rounded-full border border-[#5AE48E]/35">
        1 free
      </span>
    </Frame>
  );
}

/* ---- 2 · No tools to learn (brief -> produce -> deliver) ----------- */
export function VisAgency() {
  const steps = [
    { label: "brief" },
    { label: "produce" },
    { label: "deliver", accent: true },
  ];
  return (
    <Frame className="flex-col">
      <div className="relative flex items-start justify-center gap-9">
        <div
          className="absolute top-[7px] left-8 right-8 h-px"
          style={{ background: LINE }}
        />
        {steps.map((s) => (
          <div key={s.label} className="relative flex flex-col items-center gap-2.5">
            <span
              className={`w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center ${
                s.accent
                  ? "border-[#5AE48E] bg-[#5AE48E]"
                  : "border-[#565C57] bg-[#0b0e0d]"
              }`}
            >
              {s.accent && (
                <svg width="8" height="8" viewBox="0 0 10 10">
                  <path d="M2 5l2 2 4-5" fill="none" stroke="#07130c" strokeWidth="1.6" />
                </svg>
              )}
            </span>
            <span className="font-mono text-[10px] text-[#8A918B]">{s.label}</span>
          </div>
        ))}
      </div>
      <span className="mt-6 font-mono text-[9px] text-[#565C57] tracking-[.08em]">
        nothing to log into
      </span>
    </Frame>
  );
}

/* ---- 3 · Finished, ad-ready files ---------------------------------- */
export function VisFormats() {
  return (
    <Frame className="flex-col gap-5">
      <div className="flex items-center gap-2 font-mono text-[11px]">
        <span className="text-[#8A918B]">final.mp4</span>
        <span className="text-[#5AE48E]">ready ✓</span>
      </div>
      <div className="flex items-end gap-4">
        <VideoFrame cls="w-[24px] h-[42px]" label="9:16" accent />
        <VideoFrame cls="w-[40px] h-[40px]" label="1:1" />
        <VideoFrame cls="w-[54px] h-[30px]" label="16:9" />
      </div>
    </Frame>
  );
}

/* ---- 4 · Built for paid social ------------------------------------- */
export function VisPlatforms() {
  const icons = [
    <svg key="t" width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
      <path d="M10 3v7.5a2.8 2.8 0 1 1-2.6-2.8" />
      <path d="M10 3c.3 1.8 1.6 3.1 3.4 3.3" />
    </svg>,
    <svg key="m" width="22" height="20" viewBox="0 0 20 18" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 12c1.4 2.4 4.4 2.4 5.6 0 1.4-2.8 2.4-6 4.8-6 2 0 3 2 3 4s-1 4-3 4c-2.4 0-3.4-3.2-4.8-6C7.4 5.6 4.4 5.6 3 8s0 4 0 4z" />
    </svg>,
    <svg key="s" width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="4" y="3" width="10" height="12" rx="4" transform="rotate(20 9 9)" />
      <path d="M8 7l3 2-3 2z" fill="currentColor" stroke="none" />
    </svg>,
  ];
  return (
    <Frame className="flex-col gap-5">
      <div className="flex items-center gap-8 text-[#AEB5AF]">
        {icons.map((ic, i) => (
          <span key={i} className="viz-pop">
            {ic}
          </span>
        ))}
      </div>
      <span className="font-mono text-[9px] text-[#565C57] tracking-[.08em]">
        vertical · hook-led
      </span>
    </Frame>
  );
}

/* ---- Funnel · one master clip, cut to every ratio ------------------ */
export function VisFunnel() {
  const outs = [
    { cls: "w-[54px] aspect-[9/16]", label: "9:16", accent: true },
    { cls: "w-[64px] aspect-square", label: "1:1" },
    { cls: "w-[76px] aspect-video", label: "16:9" },
  ];
  return (
    <div className="relative w-full flex items-center justify-center gap-6 py-6">
      <div className="flex flex-col items-center gap-2.5 shrink-0">
        <div className="viz-pop relative w-[68px] aspect-[9/16] rounded-[12px] border border-[#5AE48E]/40 flex items-center justify-center">
          <Play size={22} />
        </div>
        <span className="font-mono text-[10px] text-[#8A918B]">1 master</span>
      </div>
      <svg viewBox="0 0 56 140" className="w-[50px] h-[150px] shrink-0" fill="none">
        <g stroke="#5AE48E" strokeOpacity="0.5" strokeWidth="1.4">
          <path className="viz-draw" d="M0 70 C32 70 24 30 56 30" />
          <path className="viz-draw" style={{ transitionDelay: "0.12s" }} d="M0 70 H56" />
          <path className="viz-draw" style={{ transitionDelay: "0.24s" }} d="M0 70 C32 70 24 110 56 110" />
        </g>
      </svg>
      <div className="flex flex-col gap-4 items-start shrink-0">
        {outs.map((o) => (
          <div key={o.label} className="flex items-center gap-3">
            <div
              className="viz-pop rounded-[8px] border flex items-center justify-center"
              style={{
                borderColor: o.accent ? "rgba(90,228,142,0.45)" : LINE,
              }}
            >
              <div className={`${o.cls} flex items-center justify-center`}>
                <Play size={o.accent ? 16 : 13} />
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#8A918B]">{o.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Strategy · offer branches into tested angles ------------------ */
export function VisStrategy() {
  const angles = ["problem-first", "proof-first", "unboxing"];
  const ys = [30, 60, 90];
  return (
    <Frame>
      <svg viewBox="0 0 230 120" className="w-[220px] h-[112px]">
        <g fill="none" stroke="#5AE48E" strokeOpacity="0.45" strokeWidth="1.4">
          {ys.map((y, i) => (
            <path
              key={y}
              className="viz-draw"
              style={{ transitionDelay: `${i * 0.1}s` }}
              d={`M46 60 C86 60 82 ${y} 120 ${y}`}
            />
          ))}
        </g>
        <circle cx="46" cy="60" r="5" fill="#5AE48E" />
        <text x="46" y="82" fill="#8A918B" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">offer</text>
        {ys.map((y, i) => (
          <text key={y} x="126" y={y + 3.5} fill="#AEB5AF" fontSize="10" fontFamily="var(--font-mono)">
            {angles[i]}
          </text>
        ))}
      </svg>
    </Frame>
  );
}

/* ---- Scripts · hook / body / CTA ----------------------------------- */
export function VisScripts() {
  const rows = [
    { label: "HOOK", w: "58%", accent: true },
    { label: "BODY", w: "82%" },
    { label: "CTA", w: "44%" },
  ];
  return (
    <Frame className="px-8">
      <div className="w-full space-y-3.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3">
            <span className="font-mono text-[8px] text-[#565C57] w-9">{r.label}</span>
            <div
              className={`h-[5px] rounded-full ${r.accent ? "viz-fill bg-[#5AE48E]" : "bg-[#F4F1EA]/12"}`}
              style={r.accent ? undefined : { width: r.w }}
            />
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ---- Production · realism gauge (no face) -------------------------- */
export function VisProduction() {
  return (
    <Frame className="flex-col gap-4 px-8">
      <div className="w-full flex items-baseline justify-between">
        <span className="font-mono text-[9px] text-[#565C57] tracking-[.12em]">REALISM</span>
        <span className="font-display font-medium text-[22px] text-[#5AE48E] leading-none">98%</span>
      </div>
      <div className="w-full h-[6px] rounded-full bg-[#F4F1EA]/8 overflow-hidden">
        <div className="viz-fill h-full rounded-full bg-[#5AE48E]" />
      </div>
      <div className="w-full flex gap-5">
        <span className="font-mono text-[8.5px] text-[#8A918B]">no plastic faces</span>
        <span className="font-mono text-[8.5px] text-[#8A918B]">natural voice</span>
      </div>
    </Frame>
  );
}

/* ---- Testing · weekly hook-rate variants --------------------------- */
export function VisTesting() {
  const bars = [
    { h: 44, w: "W1" },
    { h: 64, w: "W2" },
    { h: 36, w: "W3" },
    { h: 92, w: "W4", win: true },
    { h: 56, w: "W5" },
  ];
  return (
    <Frame className="flex-col gap-3 px-8">
      <div className="flex items-center justify-between w-full">
        <span className="font-mono text-[8.5px] text-[#565C57] tracking-[.1em]">HOOK RATE</span>
        <span className="font-mono text-[9px] text-[#5AE48E]">winner</span>
      </div>
      <div className="flex items-end justify-between w-full h-[70px]">
        {bars.map((b, i) => (
          <div key={b.w} className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full flex justify-center items-end h-[58px]">
              <div
                style={{ height: `${b.h}%`, transitionDelay: `${i * 0.06}s` }}
                className={`viz-grow w-[12px] rounded-t-[2px] ${b.win ? "bg-[#5AE48E]" : "bg-[#F4F1EA]/14"}`}
              />
            </div>
            <span className="font-mono text-[7px] text-[#565C57]">{b.w}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* Placeholder brand logos in the Logo Ipsum style (generic mark + wordmark).
   Inline SVG so they are self-contained — swap for real client logos later.
   All use currentColor, tinted muted and brightening on hover. */

const WORDS = [
  "logoipsum",
  "Logoipsum",
  "LOGO",
  "logoipsum",
  "Ipsum",
  "logoipsum",
  "LogoIpsum",
  "ipsum",
  "logoipsum",
];

function mark(i: number) {
  switch (i % 9) {
    case 0:
      return (
        <>
          <circle cx="11" cy="14" r="8" fill="currentColor" opacity="0.55" />
          <circle cx="18" cy="14" r="8" fill="currentColor" />
        </>
      );
    case 1:
      return (
        <rect x="3" y="6" width="16" height="16" rx="5" fill="currentColor" />
      );
    case 2:
      return <path d="M11 4l9 18H2z" fill="currentColor" />;
    case 3:
      return (
        <path
          d="M11 3l7 4v10l-7 4-7-4V7z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
      );
    case 4:
      return (
        <>
          <path
            d="M4 14a8 8 0 0 1 16 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
          />
          <circle cx="12" cy="17" r="2.6" fill="currentColor" />
        </>
      );
    case 5:
      return (
        <g fill="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="13" y="3" width="7" height="7" rx="1.5" opacity="0.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" opacity="0.5" />
          <rect x="13" y="14" width="7" height="7" rx="1.5" />
        </g>
      );
    case 6:
      return (
        <g fill="currentColor">
          <rect x="3" y="15" width="4" height="7" rx="1" />
          <rect x="9" y="10" width="4" height="12" rx="1" />
          <rect x="15" y="4" width="4" height="18" rx="1" />
        </g>
      );
    case 7:
      return (
        <path
          d="M11 2l2.6 6.4L20 11l-6.4 2.6L11 20l-2.6-6.4L2 11l6.4-2.6z"
          fill="currentColor"
        />
      );
    default:
      return (
        <>
          <circle
            cx="11"
            cy="14"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
          />
          <circle cx="11" cy="14" r="3" fill="currentColor" />
        </>
      );
  }
}

function Logo({ i }: { i: number }) {
  return (
    <div className="text-[#6B726C] hover:text-[#C7CDC8] transition-colors duration-300">
      <svg
        viewBox="0 0 140 28"
        className="h-7 w-auto"
        role="img"
        aria-label="Placeholder logo"
      >
        <g transform="translate(0,3)">{mark(i)}</g>
        <text
          x="30"
          y="20"
          fill="currentColor"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fontSize="16"
          letterSpacing="-0.3"
        >
          {WORDS[i % WORDS.length]}
        </text>
      </svg>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section className="py-14 px-[28px]">
      <p className="text-center font-mono text-[11px] tracking-[.14em] text-[#6B726C] mb-9">
        TRUSTED BY GROWTH TEAMS RUNNING PAID SOCIAL
      </p>
      <div className="max-w-[900px] mx-auto flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-7">
          {[0, 1, 2, 3, 4].map((i) => (
            <Logo key={i} i={i} />
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-7">
          {[5, 6, 7, 8].map((i) => (
            <Logo key={i} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

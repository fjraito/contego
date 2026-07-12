import Nav from "./Nav";
import Footer from "./Footer";
import Claim from "./Claim";
import Faq from "./Faq";
import CompareTable from "./CompareTable";
import type { CompareEntry } from "@/lib/comparisons";

function Check({ tone = "#5AE48E" }: { tone?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none mt-[3px]">
      <circle cx="8" cy="8" r="8" fill={tone} fillOpacity="0.14" />
      <path d="M4.5 8l2.2 2.2L11.5 5.5" fill="none" stroke={tone} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Cross() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none mt-[3px]">
      <circle cx="8" cy="8" r="8" fill="#c25a4e" fillOpacity="0.14" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" fill="none" stroke="#c25a4e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const SEC = "px-[28px] py-[60px]";
const H2 = "font-display font-medium text-[clamp(26px,3.4vw,38px)] leading-[1.14] tracking-[-.02em] text-[#F4F1EA]";
const EYE = "font-mono text-[11px] tracking-[.12em] text-[#6B726C] mb-4";

export default function ComparePage({ entry }: { entry: CompareEntry }) {
  const isAlt = entry.kind === "alternative";
  const crumbHref = isAlt ? "/alternatives" : "/compare";
  const crumbLabel = isAlt ? "ALTERNATIVES" : "COMPARE";

  return (
    <>
      <Nav />

      {/* hero */}
      <section className="pt-[120px] pb-[50px] px-[28px]">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="flex justify-center items-center gap-2 mb-6 font-mono text-[11px] tracking-[.1em] text-[#6B726C]">
            <a href={crumbHref} className="hover:text-[#AEB5AF] transition-colors">{crumbLabel}</a>
            <span>/</span>
            <span className="text-[#5AE48E]">{entry.eyebrow}</span>
          </div>
          <h1 className="font-display font-medium text-[clamp(34px,5vw,54px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            {entry.title}
          </h1>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#AEB5AF]">{entry.intro}</p>
          {isAlt && (
            <div className="mt-8">
              <a href="/#claim" className="bg-[#5AE48E] text-[#07130C] font-display font-bold text-[15px] py-[14px] px-[26px] rounded-[12px] hover:bg-[#7EEBA8] transition-colors">
                Claim your free sample
              </a>
            </div>
          )}
        </div>
      </section>

      {/* quick take */}
      <section className="px-[28px] pb-[20px]">
        <div className="max-w-[880px] mx-auto card card-sheen p-8">
          <div className={EYE}>QUICK TAKE</div>
          <p className="text-[17px] leading-[1.7] text-[#C7CDC8] mb-6">{entry.quickTake.summary}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-[12px] border border-[#5AE48E]/25 bg-[#5AE48E]/[.05] p-5">
              <div className="font-display font-semibold text-[15px] text-[#5AE48E] mb-1.5">
                {entry.aName} is best for
              </div>
              <div className="text-[14px] leading-[1.55] text-[#C7CDC8]">{entry.quickTake.bestA}</div>
            </div>
            <div className="rounded-[12px] border border-[#F4F1EA]/10 bg-[#0f1211] p-5">
              <div className="font-display font-semibold text-[15px] text-[#F4F1EA] mb-1.5">
                {entry.bName} is best for
              </div>
              <div className="text-[14px] leading-[1.55] text-[#AEB5AF]">{entry.quickTake.bestB}</div>
            </div>
          </div>
        </div>
      </section>

      {/* at a glance table */}
      <section className={SEC}>
        <div className="max-w-[880px] mx-auto">
          <div className="text-center mb-8">
            <div className={EYE + " mb-3"}>AT A GLANCE</div>
            <h2 className={H2}>How they compare</h2>
          </div>
          <CompareTable colA={entry.aName} colB={entry.bName} rows={entry.table} highlightA={isAlt} />
          <p className="text-center font-mono text-[11px] text-[#565C57] tracking-[.04em] mt-5">
            {isAlt
              ? `Reflects our positioning. Verify ${entry.bName} details on their site — offerings change.`
              : "Snapshot for July 2026 — these models change fast, verify with each vendor."}
          </p>
        </div>
      </section>

      {/* deep dive */}
      <section className={SEC + " pt-0"}>
        <div className="max-w-[880px] mx-auto">
          <div className="text-center mb-10">
            <div className={EYE + " mb-3"}>IN DEPTH</div>
            <h2 className={H2}>{entry.aName} vs {entry.bName}, point by point</h2>
          </div>
          <div className="flex flex-col gap-5">
            {entry.deepDive.map((d) => (
              <div key={d.title} className="card p-7">
                <div className="font-display font-semibold text-[19px] text-[#F4F1EA] mb-5">{d.title}</div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="rounded-[12px] border border-[#5AE48E]/20 bg-[#5AE48E]/[.04] p-5">
                    <div className="font-mono text-[10px] tracking-[.1em] text-[#5AE48E] mb-2">{entry.aName.toUpperCase()}</div>
                    <p className="text-[14.5px] leading-[1.6] text-[#C7CDC8]">{d.a}</p>
                  </div>
                  <div className="rounded-[12px] border border-[#F4F1EA]/8 bg-[#0f1211] p-5">
                    <div className="font-mono text-[10px] tracking-[.1em] text-[#8A918B] mb-2">{entry.bName.toUpperCase()}</div>
                    <p className="text-[14.5px] leading-[1.6] text-[#AEB5AF]">{d.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* pros & cons */}
      <section className={SEC + " pt-0"}>
        <div className="max-w-[880px] mx-auto">
          <div className="text-center mb-10">
            <div className={EYE + " mb-3"}>PROS AND CONS</div>
            <h2 className={H2}>The honest trade-offs</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: entry.aName, pros: entry.aPros, cons: entry.aCons, accent: true },
              { name: entry.bName, pros: entry.bPros, cons: entry.bCons, accent: false },
            ].map((c) => (
              <div key={c.name} className={`card p-7 ${c.accent ? "card-sheen border-[#5AE48E]/25" : ""}`}>
                <div className="font-display font-semibold text-[19px] text-[#F4F1EA] mb-5">{c.name}</div>
                <ul className="flex flex-col gap-2.5 mb-5">
                  {c.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[14px] text-[#C7CDC8]">
                      <Check />{p}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-2.5">
                  {c.cons.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[14px] text-[#8A918B]">
                      <Cross />{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* when the other is better */}
      <section className={SEC + " pt-0"}>
        <div className="max-w-[720px] mx-auto card p-8">
          <div className={EYE}>KEEPING IT HONEST</div>
          <h2 className="font-display font-semibold text-[22px] text-[#F4F1EA] mb-5">
            When {entry.bName} is the better fit
          </h2>
          <ul className="flex flex-col gap-3">
            {entry.whenBetter.map((w) => (
              <li key={w} className="flex items-start gap-3 text-[15px] leading-[1.55] text-[#C7CDC8]">
                <span className="text-[#5AE48E] mt-0.5">→</span>{w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <Faq heading={`${entry.bName} questions, answered.`} items={entry.faqs} />

      {/* CTA */}
      {isAlt ? (
        <Claim />
      ) : (
        <section className="pb-[110px] px-[28px]">
          <div className="max-w-[820px] mx-auto card card-sheen p-9 text-center">
            <h2 className="font-display font-medium text-[clamp(24px,3vw,34px)] tracking-[-.02em] text-[#F4F1EA]">
              Rather not pick a tool?
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-[#AEB5AF] max-w-[520px] mx-auto">
              Contego makes hyper-realistic UGC ads for you, whichever model wins. You brief us, we handle the rest.
            </p>
            <a href="/#claim" className="inline-block mt-6 bg-[#5AE48E] text-[#07130C] font-display font-bold text-[15px] py-[14px] px-[26px] rounded-[12px] hover:bg-[#7EEBA8] transition-colors">
              Claim your free sample
            </a>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

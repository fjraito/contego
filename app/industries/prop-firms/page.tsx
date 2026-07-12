import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionHead from "@/components/SectionHead";
import SectionLabel from "@/components/SectionLabel";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AI UGC for Prop Firms — Contego",
  description:
    "Hyper-realistic AI UGC video for prop firms. Sell challenges and funded accounts with creator-style ads that build trust and convert cold traffic.",
};

const CONTENT = [
  {
    title: "Challenge explainers",
    body: "How the evaluation works, one-step versus two-step, profit targets and rules, in plain language a cold viewer gets in seconds.",
  },
  {
    title: "Funded trader stories",
    body: "Creator-style stories of passing the challenge and getting paid, scripted around claims you can actually back up.",
  },
  {
    title: "Rules made simple",
    body: "Drawdown, daily loss limits, and payout splits explained fast, so traders know what they are signing up for.",
  },
  {
    title: "Objection busters",
    body: "The questions every prop audience asks. Is it legit? Can you really get paid? Answered head-on, without the hype.",
  },
  {
    title: "Why-us comparisons",
    body: "Your firm against the field on price, split, and rules. Clear reasons to choose you over the next tab.",
  },
  {
    title: "Promo and offer drops",
    body: "New challenge pricing, resets, and seasonal promos, turned around fast so you never miss the window.",
  },
];

const WHY = [
  {
    title: "Trust in the first second",
    body: "Prop audiences have seen every scammy angle. If a viewer can tell it is AI, we cut it. Realism is the whole point.",
  },
  {
    title: "Test more angles, weekly",
    body: "No trader licensing, scheduling, or reshoots. We ship more hook variants every week so you find winners faster.",
  },
  {
    title: "Claim-safe by default",
    body: "We script around what you can prove and build to respect platform rules on financial content. This is not legal advice, so confirm requirements for your market.",
  },
  {
    title: "Cut for every placement",
    body: "TikTok, Meta, and YouTube Shorts first. Vertical, hook-led, delivered in 9:16, 1:1, and 16:9.",
  },
];

export default function PropFirmsPage() {
  return (
    <>
      <Nav />

      {/* hero */}
      <section className="pt-[120px] pb-[70px] px-[28px] text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="flex justify-center items-center gap-2 mb-6 font-mono text-[11px] tracking-[.1em] text-[#6B726C]">
            <a href="/industries" className="hover:text-[#AEB5AF] transition-colors">
              INDUSTRIES
            </a>
            <span>/</span>
            <span className="text-[#5AE48E]">PROP FIRMS</span>
          </div>
          <h1 className="font-display font-medium text-[clamp(36px,5.2vw,58px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            AI UGC that sells challenges and funded accounts.
          </h1>
          <p className="mt-6 text-[18px] leading-[1.6] text-[#AEB5AF]">
            Prop firms live and die on paid social. We make hyper-realistic
            creator video that explains the model, builds trust, and turns cold
            traffic into evaluations, without licensing real traders or waiting
            on reshoots.
          </p>
          <div className="mt-8 flex gap-3 justify-center flex-wrap">
            <a
              href="/#claim"
              className="bg-[#5AE48E] text-[#07130C] font-display font-bold text-[15px] py-[14px] px-[26px] rounded-[12px] hover:bg-[#7EEBA8] transition-colors"
            >
              Claim your free sample
            </a>
            <a
              href="/pricing"
              className="bg-[#F4F1EA]/[.04] text-[#F4F1EA] border border-[#F4F1EA]/12 font-display font-semibold text-[15px] py-[14px] px-[22px] rounded-[12px] hover:bg-[#F4F1EA]/[.08] transition-colors"
            >
              See pricing
            </a>
          </div>
        </div>
      </section>

      {/* the challenge */}
      <section className="py-[70px] px-[28px]">
        <div className="max-w-[720px] mx-auto">
          <div className="mb-7">
            <SectionLabel n="1">THE CHALLENGE</SectionLabel>
          </div>
          <h2 className="font-display font-medium text-[clamp(26px,3.4vw,38px)] leading-[1.14] tracking-[-.02em] text-[#F4F1EA] mb-6">
            Prop ads are a trust game.
          </h2>
          <div className="flex flex-col gap-5 text-[17px] leading-[1.7] text-[#AEB5AF]">
            <p>
              Traders have seen the fake Lamborghinis and the too-good-to-be-true
              payout screenshots. Generic ads get scrolled, and real funded-trader
              UGC is slow and expensive to license and reshoot.
            </p>
            <p>
              You need volume, trust, and speed at once. That is exactly where
              hyper-realistic AI UGC fits, if it does not look like AI.
            </p>
          </div>
        </div>
      </section>

      {/* what we make */}
      <section className="py-[60px] px-[28px]">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead
            n="2"
            label="WHAT WE MAKE"
            title="Video for every part of the prop funnel."
            sub="From first touch to the moment a trader buys the challenge."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTENT.map((c) => (
              <div key={c.title} className="card card-sheen p-7">
                <div className="font-display font-semibold text-[18px] text-[#F4F1EA] mb-2.5">
                  {c.title}
                </div>
                <p className="text-[14px] leading-[1.6] text-[#AEB5AF]">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why it works */}
      <section className="py-[60px] px-[28px]">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead
            n="3"
            label="WHY IT WORKS"
            title="Made for a skeptical, high-intent audience."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHY.map((w) => (
              <div key={w.title} className="card p-7">
                <div className="font-display font-semibold text-[18px] text-[#F4F1EA] mb-2.5">
                  {w.title}
                </div>
                <p className="text-[14px] leading-[1.6] text-[#AEB5AF]">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Claim />
      <Footer />
    </>
  );
}

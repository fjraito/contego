import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionLabel from "@/components/SectionLabel";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Industries — Contego",
  description:
    "Hyper-realistic AI UGC video for prop firms, brokers, SaaS, crypto, agencies, and more.",
};

type Industry = { name: string; blurb: string; icon: React.ReactNode; href?: string };

const S = "flex-none";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const INDUSTRIES: Industry[] = [
  {
    name: "Prop firms",
    href: "/industries/prop-firms",
    blurb:
      "Fill challenges and funded accounts. Creator-style video that explains the model and earns trust in seconds.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <path d="M4 20V10M9 20V5M14 20v-7M19 20v-11" />
      </svg>
    ),
  },
  {
    name: "Brokers",
    blurb:
      "Forex and CFD brokers. Hook-led UGC that drives sign-ups without the plastic-ad look.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <path d="M4 7h13l-3-3M20 17H7l3 3" />
      </svg>
    ),
  },
  {
    name: "SaaS",
    blurb:
      "Turn features into demand. Short video that shows the product solving a real problem.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    name: "Crypto",
    blurb:
      "Exchanges, wallets, and tokens. Clear, trust-first video for a skeptical audience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <circle cx="12" cy="12" r="8" />
        <path d="M9 8h4a2 2 0 0 1 0 4H9m0 0h4.5a2 2 0 0 1 0 4H9m0-8v10M11 6v2M11 16v2" />
      </svg>
    ),
  },
  {
    name: "Agencies",
    blurb:
      "White-label UGC for your clients. We produce under your brand, you keep the relationship.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <path d="M12 3l8 4-8 4-8-4z" />
        <path d="M4 11l8 4 8-4M4 15l8 4 8-4" />
      </svg>
    ),
  },
  {
    name: "Trading tools & EAs",
    blurb:
      "Signals, bots, and trading tools. Show the workflow and the value without overpromising.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <rect x="5" y="8" width="14" height="11" rx="2" />
        <path d="M12 8V4M9 13h.01M15 13h.01M9 16h6" />
      </svg>
    ),
  },
  {
    name: "E-commerce & DTC",
    blurb:
      "Product-led UGC that stops the scroll and sells, cut for every placement.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <path d="M6 7h13l-1.5 10H7.5L6 7zM6 7L5 4H3M9 21h.01M16 21h.01" />
      </svg>
    ),
  },
  {
    name: "Mobile apps",
    blurb:
      "Drive installs with video built for the feed and the first session.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <rect x="7" y="3" width="10" height="18" rx="2.5" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    name: "Education & info products",
    blurb:
      "Courses and communities. Video that sells the outcome and the proof.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" className={S} {...stroke}>
        <path d="M12 4L2 9l10 5 10-5-10-5zM6 11v5c0 1 3 3 6 3s6-2 6-3v-5" />
      </svg>
    ),
  },
];

export default function IndustriesPage() {
  return (
    <>
      <Nav />

      <section className="pt-[120px] pb-[50px] px-[28px] text-center">
        <div className="max-w-[720px] mx-auto">
          <div className="flex justify-center mb-6">
            <SectionLabel>INDUSTRIES</SectionLabel>
          </div>
          <h1 className="font-display font-medium text-[clamp(38px,5.5vw,60px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            Built for the industries that live on paid social.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF]">
            Different offers, same problem: ads that convert. We tailor the
            angle and the script to your market.
          </p>
        </div>
      </section>

      <section className="pb-[100px] px-[28px]">
        <div className="max-w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind) => {
            const inner = (
              <>
                <div className="w-11 h-11 rounded-[12px] border border-[#F4F1EA]/12 bg-[#0f1211] flex items-center justify-center text-[#5AE48E] mb-5">
                  {ind.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-semibold text-[19px] text-[#F4F1EA]">
                    {ind.name}
                  </span>
                  {ind.href && <span className="text-[#5AE48E] text-[15px]">→</span>}
                </div>
                <p className="text-[14px] leading-[1.6] text-[#AEB5AF]">
                  {ind.blurb}
                </p>
              </>
            );
            return ind.href ? (
              <a
                key={ind.name}
                href={ind.href}
                className="card card-sheen p-7 hover:border-[#5AE48E]/30 transition-colors block"
              >
                {inner}
              </a>
            ) : (
              <div
                key={ind.name}
                className="card card-sheen p-7 hover:border-[#5AE48E]/25 transition-colors"
              >
                {inner}
              </div>
            );
          })}
        </div>

        <p className="text-center font-mono text-[12px] text-[#565C57] tracking-[.04em] mt-10">
          Not listed? If it runs on paid social, we can make video for it.
        </p>
      </section>

      <Claim />
      <Footer />
    </>
  );
}

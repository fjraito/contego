"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";

type Tier = {
  name: string;
  badge?: string;
  monthly: number | null;
  quarterly: number | null; // per-month price billed quarterly
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Starter",
    monthly: 1500,
    quarterly: 1350,
    blurb: "For brands ready to add a steady flow of AI UGC to their creative mix.",
    features: [
      "8 AI UGC videos per month",
      "Videos up to 30 seconds",
      "Up to 2 AI creator profiles",
      "Creative direction and scriptwriting",
      "Editing and captions",
      "1 revision round per video",
      "5 to 7 business day turnaround",
      "Email support",
    ],
    cta: "Claim Free Sample",
    href: "/#claim",
  },
  {
    name: "Growth",
    badge: "Most popular",
    monthly: 3500,
    quarterly: 3150,
    blurb: "For paid social teams that need more creative to launch, test, and refresh every month.",
    features: [
      "20 AI UGC videos per month",
      "Videos up to 45 seconds",
      "Up to 5 AI creator profiles",
      "Creative strategy and scriptwriting",
      "Editing and captions",
      "2 revision rounds per video",
      "3 to 5 business day turnaround",
      "Monthly creative planning",
      "Priority support",
    ],
    cta: "Claim Free Sample",
    href: "/#claim",
    featured: true,
  },
  {
    name: "Scale",
    monthly: null,
    quarterly: null,
    blurb: "For brands and agencies that need high-volume production, dedicated support, or white-label delivery.",
    features: [
      "30+ AI UGC videos per month",
      "Custom video lengths",
      "Unlimited AI creator profiles",
      "Dedicated creative strategist",
      "Custom revision allowance",
      "Priority production",
      "Dedicated account manager",
      "Multi-brand workflows",
      "White-label delivery",
    ],
    cta: "Request a Quote",
    href: "/contact",
  },
];

const Check = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" className="flex-none mt-[3px]">
    <circle cx="8" cy="8" r="8" fill="#5AE48E" fillOpacity="0.14" />
    <path d="M4.5 8l2.2 2.2L11.5 5.5" fill="none" stroke="#5AE48E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function PricingTiers() {
  const [quarterly, setQuarterly] = useState(false);

  return (
    <section className="pt-[120px] px-[28px]">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <div className="flex justify-center mb-6">
            <SectionLabel>PRICING</SectionLabel>
          </div>
          <h1 className="font-display font-medium text-[clamp(34px,5vw,58px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            Simple, honest AI UGC pricing.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF]">
            Choose the monthly production plan that fits your creative needs.
            Every video is fully scripted, produced, edited, and delivered ready
            to publish.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 p-1 rounded-full border border-[#F4F1EA]/12 bg-[#0f1211]">
            <button
              onClick={() => setQuarterly(false)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                !quarterly ? "bg-[#5AE48E] text-[#07130C]" : "text-[#AEB5AF]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setQuarterly(true)}
              className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                quarterly ? "bg-[#5AE48E] text-[#07130C]" : "text-[#AEB5AF]"
              }`}
            >
              Quarterly <span className="opacity-70">· Save 10%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {TIERS.map((t) => {
            const price = quarterly ? t.quarterly : t.monthly;
            return (
              <div
                key={t.name}
                className={`card p-7 flex flex-col ${
                  t.featured ? "card-sheen border-[#5AE48E]/35 md:-mt-3 md:pb-9" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-display font-semibold text-[18px] text-[#F4F1EA]">
                    {t.name}
                  </span>
                  {t.badge && (
                    <span className="text-[10px] tracking-[.06em] text-[#07130C] bg-[#5AE48E] px-2 py-0.5 rounded-full uppercase">
                      {t.badge}
                    </span>
                  )}
                </div>

                <div className="mb-2 flex items-end gap-1.5">
                  {price === null ? (
                    <span className="font-display font-medium text-[38px] leading-none text-[#F4F1EA]">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="font-display font-medium text-[42px] leading-none text-[#F4F1EA]">
                        ${price.toLocaleString()}
                      </span>
                      <span className="text-[14px] text-[#8A918B] mb-1">/mo</span>
                    </>
                  )}
                </div>
                <p className="text-[14px] leading-[1.55] text-[#AEB5AF] mb-6 min-h-[60px]">
                  {t.blurb}
                </p>

                <a
                  href={t.href}
                  className={`text-center font-display font-bold text-[14px] py-[12px] rounded-[12px] transition-colors ${
                    t.featured
                      ? "bg-[#5AE48E] text-[#07130C] hover:bg-[#7EEBA8]"
                      : "bg-[#F4F1EA]/[.04] text-[#F4F1EA] border border-[#F4F1EA]/14 hover:bg-[#F4F1EA]/[.08]"
                  }`}
                >
                  {t.cta}
                </a>

                <div className="h-px bg-[#F4F1EA]/8 my-6" />

                <ul className="flex flex-col gap-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-[#C7CDC8]">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[13px] text-[#8A918B] mt-8 max-w-[640px] mx-auto">
          Plans can be billed monthly or quarterly. Quarterly billing includes a
          10% discount. Custom production requirements may affect the final
          price.
        </p>
      </div>
    </section>
  );
}

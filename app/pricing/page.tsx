import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionLabel from "@/components/SectionLabel";
import PricingTiers from "@/components/PricingTiers";
import TrustStrip from "@/components/TrustStrip";
import ComparePlans from "@/components/ComparePlans";
import Faq from "@/components/Faq";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Pricing — Contego",
  description:
    "Simple, honest monthly pricing for hyper-realistic AI UGC video. Fully scripted, produced, edited, and delivered ready to publish.",
};

const INCLUDED = [
  "Creative Strategy",
  "UGC Scriptwriting",
  "AI Creator Production",
  "Video Editing",
  "Captions",
  "Platform-Ready Files",
  "Commercial Usage Rights",
  "Final Delivery",
];

const PRICING_FAQS = [
  {
    q: "Is there a long-term contract?",
    a: "No. Monthly plans can be cancelled before the next billing cycle. Quarterly plans are prepaid and include a 10% discount.",
  },
  {
    q: "What counts as one video?",
    a: "One video includes one approved script produced as one finished AI UGC asset. A new script, concept, or substantially different version counts as another video.",
  },
  {
    q: "Do I really get a free sample?",
    a: "Yes. We create your first AI UGC video for free so you can review the realism and production quality before choosing a paid plan.",
  },
  {
    q: "Can I upgrade or downgrade later?",
    a: "Yes. You can change plans before your next billing cycle based on your upcoming creative needs.",
  },
  {
    q: "How fast is the turnaround?",
    a: "Starter projects are typically delivered within 5 to 7 business days. Growth clients receive priority production with a typical turnaround of 3 to 5 business days. Scale timelines are planned around the required volume.",
  },
  {
    q: "Are revisions included?",
    a: "Yes. Starter includes one revision round per video, Growth includes two, and Scale plans receive a custom revision allowance.",
  },
  {
    q: "Can you work with our existing scripts?",
    a: "Yes. You can send us a finished script, ask us to improve an existing one, or let our copywriters handle it from scratch.",
  },
  {
    q: "Do you offer white-label production for agencies?",
    a: "Yes. Scale plans can include white-label AI UGC production, multi-brand workflows, and delivery under your agency's name.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Nav />
      <PricingTiers />

      {/* every plan includes */}
      <section className="py-[70px] px-[28px]">
        <div className="max-w-[900px] mx-auto text-center">
          <div className="flex justify-center mb-7">
            <SectionLabel>EVERY PLAN INCLUDES</SectionLabel>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {INCLUDED.map((i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-[14px] text-[#C7CDC8] px-4 py-2.5 rounded-full border border-[#F4F1EA]/10 bg-[#0f1211]"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" className="flex-none">
                  <circle cx="8" cy="8" r="8" fill="#5AE48E" fillOpacity="0.14" />
                  <path d="M4.5 8l2.2 2.2L11.5 5.5" fill="none" stroke="#5AE48E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      <TrustStrip />
      <ComparePlans />
      <Faq heading="AI UGC pricing questions, answered." items={PRICING_FAQS} />
      <Claim />
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionLabel from "@/components/SectionLabel";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";
import { alternativesList } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "Contego vs the alternatives — Contego",
  description:
    "How Contego compares to AI UGC tools like Arcads, Creatify, and HeyGen. Done-for-you agency versus self-serve software.",
};

export default function AlternativesPage() {
  const items = alternativesList();
  return (
    <>
      <Nav />
      <section className="pt-[120px] pb-[50px] px-[28px] text-center">
        <div className="max-w-[720px] mx-auto">
          <div className="flex justify-center mb-6">
            <SectionLabel>ALTERNATIVES</SectionLabel>
          </div>
          <h1 className="font-display font-medium text-[clamp(38px,5.5vw,60px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            Contego vs the alternatives.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF]">
            Most alternatives are tools you run yourself. Contego is an agency
            that does the work for you. See how we compare.
          </p>
        </div>
      </section>

      <section className="pb-[100px] px-[28px]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((a) => (
            <a
              key={a.slug}
              href={`/alternatives/${a.slug}`}
              className="group block card card-sheen p-7 hover:border-[#5AE48E]/30 transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[.1em] text-[#6B726C] mb-3">
                AI UGC AGENCY
              </div>
              <div className="font-display font-semibold text-[20px] text-[#F4F1EA] flex items-center gap-2">
                Contego vs {a.bName}
                <span className="text-[#5AE48E] text-[15px]">→</span>
              </div>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-[#AEB5AF] line-clamp-3">
                {a.quickTake.summary}
              </p>
            </a>
          ))}
        </div>
      </section>

      <Claim />
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionLabel from "@/components/SectionLabel";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";
import { toolsList } from "@/lib/comparisons";

export const metadata: Metadata = {
  title: "AI video tools compared — Contego",
  description:
    "Head-to-head comparisons of AI video models like Seedance vs Kling and Veo vs Sora.",
};

export default function ComparePage() {
  const items = toolsList();
  return (
    <>
      <Nav />
      <section className="pt-[120px] pb-[50px] px-[28px] text-center">
        <div className="max-w-[720px] mx-auto">
          <div className="flex justify-center mb-6">
            <SectionLabel>COMPARE</SectionLabel>
          </div>
          <h1 className="font-display font-medium text-[clamp(38px,5.5vw,60px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            AI video tools, compared.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF]">
            Neutral, high-level comparisons of the models everyone is testing.
            Or skip the tools and let Contego make the video for you.
          </p>
        </div>
      </section>

      <section className="pb-[100px] px-[28px]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((t) => (
            <a
              key={t.slug}
              href={`/compare/${t.slug}`}
              className="group block card card-sheen p-7 hover:border-[#5AE48E]/30 transition-colors"
            >
              <div className="font-mono text-[10px] tracking-[.1em] text-[#6B726C] mb-3">
                AI VIDEO MODELS
              </div>
              <div className="font-display font-semibold text-[20px] text-[#F4F1EA] flex items-center gap-2">
                {t.aName} vs {t.bName}
                <span className="text-[#5AE48E] text-[15px]">→</span>
              </div>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-[#AEB5AF] line-clamp-3">
                {t.intro}
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

import Image from "next/image";
import SectionHead from "./SectionHead";

const USE_CASES = [
  "TikTok",
  "Instagram",
  "Facebook",
  "YouTube",
  "LinkedIn",
  "X",
  "Snapchat",
  "Pinterest",
  "Reddit",
  "Threads",
];

const CARDS = [
  {
    title: "Built to feel native",
    body: "Every video is planned for the platform it will appear on, with the right framing, pacing, and structure to feel like content rather than a recycled ad.",
    img: "/ill/built-to-feel-native.svg?v=1",
  },
  {
    title: "Delivered in the format you need",
    body: "Receive your finished AI UGC in vertical, square, or landscape format, ready to upload to your selected channel and placement.",
    img: "/ill/delivered-in-format.svg?v=1",
  },
];

export default function WhereItSells() {
  return (
    <section className="py-[100px] px-[28px]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHead
          n="4"
          label="MULTI-PLATFORM AI UGC"
          title="AI UGC that fits every platform you run."
          sub="Contego creates platform-specific AI UGC that feels native wherever your campaign runs."
        />

        <div className="card card-sheen p-8 md:p-11 mb-5">
          <div className="flex flex-wrap gap-3">
            {USE_CASES.map((uc) => (
              <div
                key={uc}
                className="bg-[#0b0e0d] border border-[#F4F1EA]/10 rounded-full py-3 px-5 text-[13px] text-[#D3D8D3] tracking-[.02em]"
              >
                {uc}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="card card-sheen overflow-hidden flex flex-col"
            >
              <div className="relative">
                <Image
                  src={c.img}
                  alt=""
                  width={800}
                  height={300}
                  className="w-full h-auto block"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0f1211]" />
              </div>
              <div className="px-7 pb-8 -mt-2 relative">
                <div className="font-display font-semibold text-[20px] text-[#F4F1EA] mb-2.5">
                  {c.title}
                </div>
                <p className="text-[15px] leading-[1.6] text-[#AEB5AF]">
                  {c.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import SectionHead from "./SectionHead";

const CARDS = [
  {
    title: "Test more hooks",
    body: "Turn one core idea into multiple openings, angles, and messages instead of betting everything on one video.",
    img: "/why/01-test-more-hooks.svg?v=2",
  },
  {
    title: "Add faces without new shoots",
    body: "Explore different creator profiles without restarting the casting, scheduling, and production process.",
    img: "/why/02-add-faces.svg?v=2",
  },
  {
    title: "Refresh creative faster",
    body: "Replace tired ads with new variations before performance drops and creative fatigue takes over.",
    img: "/why/03-refresh-creative.svg?v=2",
  },
  {
    title: "Cover every placement",
    body: "Get videos prepared for TikTok, Meta, YouTube Shorts, landing pages, and organic social.",
    img: "/why/04-every-placement.svg?v=2",
  },
];

export default function Setup() {
  return (
    <section id="process" className="py-[100px] px-[28px]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHead
          label="WHY AI UGC"
          title="More creative output from the same influencer budget."
          sub="Contego helps you turn the same budget into more hooks, faces, concepts, and platform-ready variations."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="card card-sheen overflow-hidden flex flex-col"
            >
              {/* full-bleed illustration blending into the card */}
              <div className="relative">
                <Image
                  src={c.img}
                  alt=""
                  width={800}
                  height={420}
                  className="w-full h-auto block"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#0f1211]" />
              </div>
              {/* text */}
              <div className="px-7 pb-8 -mt-2 relative">
                <div className="font-display font-semibold text-[21px] text-[#F4F1EA] mb-2.5">
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

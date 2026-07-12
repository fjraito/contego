import Image from "next/image";
import SectionHead from "./SectionHead";

const CARDS = [
  {
    n: "01",
    title: "Send the Brief",
    body: "Share your product, audience, offer, campaign goal, references, and brand guidelines.",
    span: "lg:col-span-2",
    img: "/how/step-01-send-the-brief.svg?v=2",
  },
  {
    n: "02",
    title: "Plan the Concept",
    body: "We decide the angle, creator profile, setting, tone, and format that best fit your message.",
    span: "lg:col-span-2",
    img: "/how/step-02-plan-the-concept.svg?v=2",
  },
  {
    n: "03",
    title: "Review the Script",
    body: "Our copywriters turn the concept into a natural UGC script for you to review before production begins.",
    span: "lg:col-span-2",
    img: "/how/step-03-review-the-script.svg?v=2",
  },
  {
    n: "04",
    title: "Produce the Video",
    body: "Contego creates the AI creator, voice, performance, visuals, captions, and final edit.",
    span: "lg:col-span-3",
    img: "/how/step-04-produce-the-video.svg?v=2",
  },
  {
    n: "05",
    title: "Receive the Final Video",
    body: "Your completed AI UGC video is delivered in the agreed format, ready for your ads, social media, or landing page.",
    span: "lg:col-span-3",
    img: "/how/step-05-receive-the-final-video.svg?v=2",
  },
];

export default function Deliver() {
  return (
    <section id="deliver" className="py-[100px] px-[28px]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHead
          label="HOW IT WORKS"
          title="No creators to manage. No tools to learn."
          sub="Share what you need once. Contego handles the planning, script, production, and delivery, so you receive a complete video without managing influencers or AI tools."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5">
          {CARDS.map((c) => (
            <div
              key={c.n}
              className={`card card-sheen overflow-hidden flex flex-col ${c.span}`}
            >
              {/* full-bleed illustration blending into the card */}
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
              {/* text */}
              <div className="px-7 pb-8 -mt-2 relative">
                <div className="font-display text-[13px] text-[#5AE48E] mb-2">
                  {c.n}
                </div>
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

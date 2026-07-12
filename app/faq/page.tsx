import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionLabel from "@/components/SectionLabel";
import FaqGroups, { type FaqGroup } from "@/components/FaqGroups";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — Contego",
  description:
    "Answers on realism, process, delivery, plans, and usage rights for Contego's hyper-realistic AI UGC video.",
};

const GROUPS: FaqGroup[] = [
  {
    title: "General",
    items: [
      {
        q: "Are you a tool I log into?",
        a: "No. Contego is an agency. We handle strategy, conversion-focused scripts, production, and delivery end to end. You get finished, ad-ready files, not software or raw output.",
      },
      {
        q: "What do I get in the free sample?",
        a: "Send us your product and offer. We send back one hyper-realistic UGC video, free, so you can judge the realism and the writing yourself before committing. No card required.",
      },
      {
        q: "What channels do you deliver for?",
        a: "Paid social on TikTok, Meta, and YouTube Shorts first, plus organic social, landing pages, and product explainers. Everything is delivered to spec for the placement.",
      },
    ],
  },
  {
    title: "Realism & quality",
    items: [
      {
        q: "Will the video actually look real?",
        a: "That is the whole point. If a viewer can tell it is AI, we consider the video a failure. We review every clip so faces, voices, and delivery hold up frame by frame.",
      },
      {
        q: "Do you use real creators?",
        a: "No. Our video is AI-generated and produced to look like real creator content. That removes creator scheduling, shipping, licensing, and reshoots while keeping the creator-style feel.",
      },
      {
        q: "How do you keep it from looking like AI?",
        a: "Realism is the product. We control the details that usually give AI away, plastic skin, dead eyes, robotic delivery, and cut anything that does not hold up.",
      },
    ],
  },
  {
    title: "Process & delivery",
    items: [
      {
        q: "How fast can you turn videos around?",
        a: "Much faster than traditional UGC. There is no creator scheduling, shipping, or reshoots. Turnaround depends on your plan, from around seven days to same-day options.",
      },
      {
        q: "How many revisions do I get?",
        a: "Revision rounds scale with your plan. Starter includes one round, Growth includes two, and Scale is unlimited within scope.",
      },
      {
        q: "What formats do you deliver?",
        a: "Every video is cut to spec for the placement, delivered in 9:16, 1:1, and 16:9, ready to run.",
      },
    ],
  },
  {
    title: "Plans & billing",
    items: [
      {
        q: "Is there a contract?",
        a: "No. Every plan is month-to-month and you can cancel anytime. Quarterly billing is optional and saves 15%.",
      },
      {
        q: "Can I upgrade or downgrade later?",
        a: "Anytime. Move between Starter, Growth, and Scale as your volume changes. Changes apply from your next billing cycle.",
      },
      {
        q: "Do you offer white-label or agency partnerships?",
        a: "Yes, on the Scale plan. We produce under your brand for your clients, with a dedicated team and account manager.",
      },
    ],
  },
  {
    title: "Usage & rights",
    items: [
      {
        q: "Who owns the videos?",
        a: "You do. You get full usage rights to every finished video we deliver, across paid and organic placements.",
      },
      {
        q: "Are AI ads allowed on the platforms?",
        a: "Platform rules on AI content keep changing. We build to meet current authenticity and disclosure guidelines and flag anything that may need a disclosure label. This is not legal advice, so confirm requirements for your market.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <Nav />

      <section className="pt-[120px] pb-[60px] px-[28px] text-center">
        <div className="max-w-[720px] mx-auto">
          <div className="flex justify-center mb-6">
            <SectionLabel>FAQ</SectionLabel>
          </div>
          <h1 className="font-display font-medium text-[clamp(38px,5.5vw,60px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
            Questions, answered.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF]">
            Everything on realism, process, delivery, plans, and rights. Still
            stuck? Claim your free sample and see it for yourself.
          </p>
        </div>
      </section>

      <section className="pb-[100px] px-[28px]">
        <FaqGroups groups={GROUPS} />
      </section>

      <Claim />
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionHead from "@/components/SectionHead";
import SectionLabel from "@/components/SectionLabel";
import Claim from "@/components/Claim";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Contego",
  description:
    "Contego is an AI UGC agency creating hyper-realistic, creator-style videos for paid social. Conversion-focused writing, careful production, delivered ready to run.",
};

const PRINCIPLES = [
  {
    title: "Realism comes first",
    body: "The video has to feel believable before anything else matters. We pay attention to facial movement, voice, pacing, gestures, and setting so the content does not expose how it was made.",
  },
  {
    title: "Scripts carry the video",
    body: "A realistic face cannot rescue a weak message. Every video starts with a clear angle and natural spoken script written to earn attention and move the viewer forward.",
  },
  {
    title: "Speed cannot replace quality",
    body: "AI makes production faster, but faster should never mean careless. We would rather redo a video than deliver something that looks artificial or unfinished.",
  },
  {
    title: "Finished means ready to run",
    body: "Contego is an agency, not a tool. We handle the creative direction, script, production, editing, and delivery so clients receive a complete video instead of another platform to operate.",
  },
];

const TESTS = [
  {
    n: "01",
    title: "Does it feel real?",
    body: "The face, voice, movement, and setting should hold up without distracting the viewer or triggering immediate suspicion.",
  },
  {
    n: "02",
    title: "Does the message work?",
    body: "The hook needs to create interest, the script needs to sound spoken, and the product needs to enter the story naturally.",
  },
  {
    n: "03",
    title: "Is it ready to publish?",
    body: "The final file should arrive complete, polished, and prepared for the platform where it will run.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* hero */}
      <section className="pt-[120px] px-[28px] text-center">
        <div className="max-w-[760px] mx-auto">
          <div className="flex justify-center mb-6">
            <SectionLabel>ABOUT CONTEGO</SectionLabel>
          </div>
          <h1 className="font-display font-medium text-[clamp(34px,5vw,56px)] leading-[1.1] tracking-[-.02em] text-[#F4F1EA] text-balance">
            We built Contego because AI UGC should feel human.
          </h1>
          <p className="mt-6 text-[18px] leading-[1.65] text-[#AEB5AF]">
            Contego is an AI UGC agency creating hyper-realistic, creator-style
            videos for paid social. We combine conversion-focused writing with
            careful production so every video feels natural, earns trust, and
            arrives ready to run.
          </p>
        </div>
      </section>

      {/* why we exist */}
      <section className="py-[90px] px-[28px]">
        <div className="max-w-[720px] mx-auto">
          <div className="mb-8">
            <SectionLabel>WHY WE EXIST</SectionLabel>
          </div>
          <h2 className="font-display font-medium text-[clamp(26px,3.4vw,40px)] leading-[1.14] tracking-[-.02em] text-[#F4F1EA] mb-7 text-balance">
            Traditional UGC moved too slowly. AI UGC looked too fake.
          </h2>
          <div className="flex flex-col gap-5 text-[17px] leading-[1.7] text-[#AEB5AF]">
            <p>
              Brands need fresh creative faster than traditional influencer
              production can reliably deliver. Scheduling, shipping, revisions,
              and reshoots turn every new video into another production cycle.
            </p>
            <p>
              AI promised a faster answer, but too much AI UGC still looks
              artificial. Stiff expressions, robotic delivery, and weak scripts
              make viewers question the content before they understand the offer.
            </p>
            <p>
              Contego was built to solve both problems. We create hyper-realistic
              AI UGC with the natural delivery of creator content and a
              production process designed for the speed paid social demands.
            </p>
          </div>
        </div>
      </section>

      {/* our standard */}
      <section className="py-[50px] px-[28px]">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead
            label="OUR STANDARD"
            title="Four principles behind every video."
            sub="The technology may change, but the standard does not."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="card card-sheen p-8">
                <div className="font-display font-semibold text-[20px] text-[#F4F1EA] mb-2.5">
                  {p.title}
                </div>
                <p className="text-[15px] leading-[1.65] text-[#AEB5AF]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* quality check */}
      <section className="py-[60px] px-[28px]">
        <div className="max-w-[1000px] mx-auto">
          <SectionHead
            label="OUR QUALITY CHECK"
            title="Every video has to pass three tests."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTS.map((t) => (
              <div key={t.n} className="card p-7">
                <div className="font-display text-[13px] text-[#5AE48E] mb-4">
                  {t.n}
                </div>
                <div className="font-display font-semibold text-[18px] text-[#F4F1EA] mb-2.5">
                  {t.title}
                </div>
                <p className="text-[14px] leading-[1.6] text-[#AEB5AF]">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* behind contego */}
      <section className="py-[70px] px-[28px]">
        <div className="max-w-[720px] mx-auto">
          <div className="mb-8">
            <SectionLabel>BEHIND CONTEGO</SectionLabel>
          </div>
          <h2 className="font-display font-medium text-[clamp(26px,3.4vw,40px)] leading-[1.14] tracking-[-.02em] text-[#F4F1EA] mb-7 text-balance">
            A small team focused on one thing.
          </h2>
          <div className="flex flex-col gap-5 text-[17px] leading-[1.7] text-[#AEB5AF]">
            <p>
              Contego was founded in 2026 by Fajar Febriansyah after seeing the
              same problem repeatedly: brands needed more video creative, but
              traditional production could not keep pace and existing AI output
              was not believable enough to run.
            </p>
            <p>
              Today, our team brings together conversion copywriting, AI
              production, editing, and paid social experience under one roof.
            </p>
          </div>
        </div>
      </section>

      <Claim />
      <Footer />
    </>
  );
}

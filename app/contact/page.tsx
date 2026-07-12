import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Contego",
  description:
    "Talk to Contego about hyper-realistic AI UGC video for paid social. We reply within one business day.",
};

const STEPS = [
  { n: "01", t: "You tell us the offer", b: "Product, audience, and where you run ads." },
  { n: "02", t: "We send a free sample", b: "One hyper-realistic UGC video, free, no card." },
  { n: "03", t: "You judge the realism", b: "Like it, pick a plan. If not, no hard feelings." },
];

export default function ContactPage() {
  return (
    <>
      <Nav />

      <section className="pt-[120px] pb-[110px] px-[28px]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-14 items-start">
          {/* left: intro + info */}
          <div>
            <div className="mb-6">
              <SectionLabel>CONTACT</SectionLabel>
            </div>
            <h1 className="font-display font-medium text-[clamp(36px,5vw,54px)] leading-[1.08] tracking-[-.02em] text-[#F4F1EA]">
              Let&apos;s make your first video.
            </h1>
            <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF] max-w-[440px]">
              Send us your product and offer. We reply within one business day,
              usually with a free sample idea you can run.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              {STEPS.map((s) => (
                <div key={s.n} className="flex gap-4">
                  <span className="font-mono text-[12px] text-[#5AE48E] mt-1 w-6 flex-none">
                    {s.n}
                  </span>
                  <div>
                    <div className="font-display font-semibold text-[16px] text-[#F4F1EA]">
                      {s.t}
                    </div>
                    <div className="text-[14px] leading-[1.55] text-[#8A918B]">
                      {s.b}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-[#F4F1EA]/8 flex flex-col gap-2 font-mono text-[13px]">
              <a
                href="mailto:hello@contegoagency.com"
                className="text-[#C7CDC8] hover:text-[#5AE48E] transition-colors"
              >
                hello@contegoagency.com
              </a>
              <div className="flex gap-4 text-[#8A918B]">
                <a href="#" rel="nofollow noopener noreferrer" className="hover:text-[#F4F1EA] transition-colors">
                  LinkedIn
                </a>
                <a href="#" rel="nofollow noopener noreferrer" className="hover:text-[#F4F1EA] transition-colors">
                  X / Twitter
                </a>
              </div>
            </div>
          </div>

          {/* right: form */}
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  );
}

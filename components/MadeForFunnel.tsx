import Image from "next/image";
import SectionHead from "./SectionHead";

export default function MadeForFunnel() {
  return (
    <section className="py-[100px] px-[28px]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHead
          n="5"
          label="THE FUNNEL"
          title="AI UGC built to turn scrolls into sales."
          sub="Contego creates creator-style videos that earn attention, explain the value, and give customers a reason to act."
        />
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-5">
          <div className="flex flex-col gap-5">
            <div className="card p-7 flex-1">
              <div className="font-display font-semibold text-[20px] text-[#F4F1EA] mb-2.5">
                Win the first few seconds
              </div>
              <p className="text-[15px] leading-[1.6] text-[#AEB5AF]">
                Use pain points, curiosity, and relatable situations to stop the
                scroll and introduce your product without making the video feel
                like a traditional ad.
              </p>
            </div>
            <div className="card p-7 flex-1">
              <div className="font-display font-semibold text-[20px] text-[#F4F1EA] mb-2.5">
                Turn interest into action
              </div>
              <p className="text-[15px] leading-[1.6] text-[#AEB5AF]">
                Show the product, answer objections, and build confidence through
                demonstrations, testimonials, and clear explanations that help
                buyers decide.
              </p>
            </div>
          </div>
          <div className="card card-sheen overflow-hidden flex items-center justify-center">
            <Image
              src="/ill/funnel-scrolls-to-sales.svg?v=1"
              alt=""
              width={800}
              height={520}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

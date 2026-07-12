import EmailForm from "./EmailForm";
import HeroReel from "./HeroReel";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-[76px] px-[28px] pb-[70px] text-center overflow-hidden"
    >
      {/* top spotlight */}
      <div
        className="glowpulse absolute -top-[120px] left-1/2 -translate-x-1/2 w-[1100px] h-[720px] pointer-events-none blur-[30px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(90,228,142,.22), rgba(90,228,142,0) 62%)",
        }}
      />

      <div className="relative max-w-[860px] mx-auto">
        <div className="fu flex justify-center mb-7">
          <span className="label-pill">
            <span className="dot" />
            AI UGC AGENCY
          </span>
        </div>
        <h1 className="fu font-display font-extrabold text-[clamp(26px,4.6vw,60px)] leading-[1.06] tracking-[-.03em] text-[#F4F1EA] text-balance [animation-delay:.05s]">
          Trade Influencer Fees for More AI UGC to Test
        </h1>
        <p className="fu max-w-[640px] mx-auto mt-[24px] text-[15px] sm:text-[17px] leading-[1.55] text-[#AEB5AF] text-pretty [animation-delay:.12s]">
          Contego is an AI UGC agency that turns your influencer budget into
          more hooks, faces, and ad variations. Skip creator scheduling, product
          shipping, and reshoot delays with hyper-realistic videos delivered
          ready to test.
        </p>
        <EmailForm
          className="fu mt-[34px] [animation-delay:.18s]"
          buttonLabel="Claim Your Free AI UGC Sample"
          note="NO COST · NO CATCH · ONE CLIP, ON US"
        />
      </div>

      {/* 3D reel of creator clips */}
      <HeroReel />
    </section>
  );
}

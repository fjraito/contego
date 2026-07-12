import EmailForm from "./EmailForm";

export default function Claim() {
  return (
    <section id="claim" className="py-[110px] px-[28px]">
      <div className="relative max-w-[900px] mx-auto card card-sheen overflow-hidden px-8 py-[70px] text-center">
        {/* soft spotlight, contained in the box */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-none pointer-events-none blur-[60px]"
          style={{
            background:
              "radial-gradient(ellipse 45% 45% at 50% 45%, rgba(90,228,142,.18), rgba(90,228,142,.05) 45%, transparent 72%)",
          }}
        />
        <div className="relative">
          <h2 className="font-display font-medium text-[clamp(23px,3.6vw,46px)] leading-[1.12] tracking-[-.02em] text-[#F4F1EA] text-balance">
            Get your first AI UGC video free before you commit.
          </h2>
          <p className="mt-5 max-w-[560px] mx-auto text-[17px] leading-[1.55] text-[#AEB5AF]">
            Send us your product or campaign brief. We&apos;ll create one
            hyper-realistic AI UGC video for your brand, so you can judge the
            quality before spending anything.
          </p>
          <EmailForm
            className="mt-9"
            buttonLabel="Claim My Free AI UGC Video"
            note="NO COST · NO CATCH · ONE VIDEO, ON US"
          />
        </div>
      </div>
    </section>
  );
}

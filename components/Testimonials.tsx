import SectionHead from "./SectionHead";

// Nine placeholder cards. Per the brand brief we never invent client names or
// quotes, so each card is an empty, clearly-labeled slot to drop a real one in.
const CARDS = Array.from({ length: 9 });

const HEIGHTS = [
  "min-h-[150px]",
  "min-h-[186px]",
  "min-h-[164px]",
  "min-h-[176px]",
  "min-h-[150px]",
  "min-h-[190px]",
  "min-h-[168px]",
  "min-h-[152px]",
  "min-h-[180px]",
];

export default function Testimonials() {
  return (
    <section className="py-[100px] px-[28px]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHead
          label="IN THEIR WORDS"
          title="What growth teams say."
          sub="Real quotes go here once we have permission to publish them."
        />
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:balance]">
          {CARDS.map((_, i) => (
            <div
              key={i}
              className={`card p-6 mb-5 break-inside-avoid flex flex-col justify-between ${HEIGHTS[i]}`}
            >
              <div className="space-y-2">
                <div className="h-2.5 rounded-full bg-[#F4F1EA]/8 w-full" />
                <div className="h-2.5 rounded-full bg-[#F4F1EA]/8 w-[92%]" />
                <div className="h-2.5 rounded-full bg-[#F4F1EA]/8 w-[70%]" />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1c221f] to-[#121614] flex-none" />
                <div className="space-y-1.5">
                  <div className="h-2 rounded-full bg-[#F4F1EA]/12 w-[80px]" />
                  <div className="h-2 rounded-full bg-[#F4F1EA]/[0.07] w-[56px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center font-mono text-[12px] text-[#6B726C] mt-4 tracking-[.03em]">
          Placeholder cards. We only publish testimonials we are allowed to use.
        </p>
      </div>
    </section>
  );
}

import SectionLabel from "./SectionLabel";

export default function SectionHead({
  n,
  label,
  title,
  sub,
}: {
  n?: string;
  label: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="text-center max-w-[680px] mx-auto mb-14">
      <div className="flex justify-center mb-7">
        <SectionLabel n={n}>{label}</SectionLabel>
      </div>
      <h2 className="font-display font-medium text-[clamp(23px,3.6vw,46px)] leading-[1.12] tracking-[-.02em] text-[#F4F1EA] text-balance">
        {title}
      </h2>
      {sub && (
        <p className="mt-5 text-[17px] leading-[1.6] text-[#AEB5AF]">{sub}</p>
      )}
    </div>
  );
}

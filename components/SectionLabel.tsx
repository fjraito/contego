export default function SectionLabel({
  children,
}: {
  n?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="label-pill">
      <span className="dot" />
      {children}
    </span>
  );
}

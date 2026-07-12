import PlayIcon from "./PlayIcon";

export default function ClipSlot({
  label,
  accent = false,
  playSize = 46,
}: {
  label: string;
  accent?: boolean;
  playSize?: number;
}) {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 flex items-center justify-center bg-[#101312] px-4">
        <span className="font-mono text-[11px] tracking-[.06em] text-[#565C57] text-center">
          {label}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <PlayIcon size={playSize} accent={accent} />
      </div>
    </div>
  );
}

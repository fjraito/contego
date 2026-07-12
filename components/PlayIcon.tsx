export default function PlayIcon({
  size = 46,
  accent = false,
}: {
  size?: number;
  accent?: boolean;
}) {
  const r = size / 2;
  const left = r - 0.19 * r;
  const right = r + 0.4 * r;
  const top = r - 0.36 * r;
  const bottom = r + 0.36 * r;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={r}
        cy={r}
        r={r}
        fill={accent ? "rgba(90,228,142,.9)" : "rgba(11,13,12,.55)"}
      />
      <path
        d={`M${left} ${top} L${right} ${r} L${left} ${bottom} Z`}
        fill={accent ? "#07130C" : "#F4F1EA"}
      />
    </svg>
  );
}

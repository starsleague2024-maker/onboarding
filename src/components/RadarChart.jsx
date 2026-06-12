import { COLORS } from "../theme";

/**
 * Radar chart SVG semplice, senza dipendenze esterne.
 * @param {Object} props
 * @param {string[]} props.labels - etichette degli assi
 * @param {Array<{ name: string, values: number[], color: string, dashed?: boolean }>} props.series
 * @param {number} props.max - valore massimo scala (default 10)
 */
export default function RadarChart({ labels, series, max = 10, size = 320 }) {
  const center = size / 2;
  const radius = size * 0.36;
  const n = labels.length;
  const angleStep = (2 * Math.PI) / n;

  function pointFor(index, value) {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = (value / max) * radius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  function labelPointFor(index) {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = radius + 28;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  // grid rings
  const rings = [0.25, 0.5, 0.75, 1].map((frac) => {
    const pts = labels.map((_, i) => pointFor(i, max * frac));
    return pts.map((p) => p.join(",")).join(" ");
  });

  // axis lines
  const axes = labels.map((_, i) => pointFor(i, max));

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height={size} style={{ maxWidth: "420px", display: "block", margin: "0 auto" }}>
      {/* grid rings */}
      {rings.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke={COLORS.border} strokeWidth="1" />
      ))}
      {/* axis lines */}
      {axes.map((p, i) => (
        <line key={i} x1={center} y1={center} x2={p[0]} y2={p[1]} stroke={COLORS.border} strokeWidth="1" />
      ))}
      {/* series */}
      {series.map((s, si) => {
        const pts = s.values.map((v, i) => pointFor(i, v));
        const polygonPoints = pts.map((p) => p.join(",")).join(" ");
        return (
          <g key={si}>
            <polygon
              points={polygonPoints}
              fill={s.color}
              fillOpacity={0.15}
              stroke={s.color}
              strokeWidth="2"
              strokeDasharray={s.dashed ? "6,4" : undefined}
            />
            {pts.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={s.color} />
            ))}
          </g>
        );
      })}
      {/* labels */}
      {labels.map((label, i) => {
        const [x, y] = labelPointFor(i);
        let anchor = "middle";
        if (x < center - 10) anchor = "end";
        else if (x > center + 10) anchor = "start";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="11"
            fill={COLORS.text}
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

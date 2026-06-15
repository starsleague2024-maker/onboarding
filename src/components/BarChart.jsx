import { COLORS } from "../theme";

/**
 * Grafico a barre orizzontali, una riga per dimensione, con piu serie affiancate.
 * @param {string[]} labels - etichette delle dimensioni
 * @param {Array<{ name: string, values: number[], color: string }>} series
 * @param {number} max - valore massimo scala (default 10)
 */
export default function BarChart({ labels, series, max = 10 }) {
  const barHeight = 14;
  const barGap = 4;
  const groupGap = 18;
  const labelWidth = 160;

  return (
    <div style={{ width: "100%" }}>
      {labels.map((label, li) => (
        <div key={li} style={{ display: "flex", alignItems: "flex-start", marginBottom: `${groupGap}px` }}>
          <div style={{ width: `${labelWidth}px`, flexShrink: 0, fontSize: "0.8rem", color: COLORS.text, paddingTop: "2px" }}>
            {label}
          </div>
          <div style={{ flex: 1 }}>
            {series.map((s, si) => {
              const value = s.values[li];
              const pct = Math.max(0, Math.min(100, (value / max) * 100));
              return (
                <div key={si} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: `${barGap}px` }}>
                  <div
                    style={{
                      flex: 1,
                      height: `${barHeight}px`,
                      background: COLORS.border,
                      borderRadius: "3px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: s.color,
                        opacity: s.dashed ? 0.55 : 1,
                        borderRight: s.dashed ? `2px dashed ${COLORS.bg}` : "none",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                  <div style={{ width: "32px", flexShrink: 0, fontSize: "0.75rem", color: COLORS.textMuted, textAlign: "right" }}>
                    {value.toFixed(1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

import BarChart from "./BarChart";
import { FeedbackWrapper } from "./FeedbackIcon";
import { COLORS } from "../theme";
import { DIMENSIONI } from "../models/radar";

/**
 * @param {Array<{ name: string, values: number[], color: string, dashed?: boolean }>} series
 * @param {Array<{dimensione, stato, daMigliorare, daChiedere, score}>} legenda - opzionale, mostra dettaglio per dimensione
 * @param {string} title
 */
export default function RadarSummary({ series, legenda, title }) {
  return (
    <div>
      {title && (
        <FeedbackWrapper sectionKey="ui" fieldKey="grafico_titolo" label={`Grafico: ${title}`}>
          <h3 style={{ borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: "4px", color: COLORS.text, marginBottom: "8px" }}>
            {title}
          </h3>
        </FeedbackWrapper>
      )}

      <FeedbackWrapper sectionKey="ui" fieldKey="grafico_barre" label="Grafico a barre - serie e dimensioni">
        <BarChart labels={DIMENSIONI} series={series} />
      </FeedbackWrapper>

      {series.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginTop: "8px", flexWrap: "wrap" }}>
          {series.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: COLORS.text }}>
              <span
                style={{
                  width: "16px",
                  height: "10px",
                  background: s.color,
                  opacity: s.dashed ? 0.55 : 1,
                  display: "inline-block",
                  borderRadius: "2px",
                }}
              />
              {s.name}
            </div>
          ))}
        </div>
      )}

      {legenda && (
        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {legenda.map((l, i) => (
            <FeedbackWrapper key={i} sectionKey="ui" fieldKey={`legenda_${l.dimensione}`} label={`Legenda: ${l.dimensione}`}>
            <div
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                background: COLORS.card,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                <strong style={{ color: COLORS.gold }}>{l.dimensione}</strong>
                <span style={{ fontSize: "0.8rem", color: COLORS.textMuted }}>{l.score?.toFixed(1)}/10</span>
              </div>
              <p style={{ margin: "2px 0", color: COLORS.text, fontSize: "0.85rem" }}>{l.stato}</p>
              <p style={{ margin: "2px 0", color: COLORS.textMuted, fontSize: "0.85rem" }}>
                <strong>Da migliorare:</strong> {l.daMigliorare}
              </p>
              <p style={{ margin: "2px 0", color: COLORS.textMuted, fontSize: "0.85rem" }}>
                <strong>In call:</strong> {l.daChiedere}
              </p>
            </div>
            </FeedbackWrapper>
          ))}
        </div>
      )}
    </div>
  );
}

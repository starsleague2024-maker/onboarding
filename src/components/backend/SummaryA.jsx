import { calcolaRadar, generaLegenda } from "../../models/radar";
import RadarSummary from "../RadarSummary";
import { FeedbackWrapper } from "../FeedbackIcon";
import { COLORS } from "../../theme";

export default function SummaryA({ data, semafori }) {
  const { scores } = calcolaRadar({ semaforiA: semafori });
  const legenda = generaLegenda({ dataA: data, semaforiA: semafori, scores });

  return (
    <div>
      <p style={{ color: COLORS.textMuted, fontSize: "0.9rem", marginTop: 0 }}>
        Quadro generale del centro in base ai dati raccolti finora. Usa la legenda per preparare i punti da toccare in call.
      </p>

      <FeedbackWrapper sectionKey="ui" fieldKey="precall_radar" label="Grafico radar pre-call">
        <RadarSummary
          series={[{ name: "Pre-call", values: scores, color: COLORS.gold }]}
          legenda={legenda}
        />
      </FeedbackWrapper>

      {data.noteSezioneA && (
        <div style={{ marginTop: "16px" }}>
          <strong style={{ color: COLORS.text }}>Note:</strong>
          <p style={{ color: COLORS.textMuted }}>{data.noteSezioneA}</p>
        </div>
      )}
    </div>
  );
}

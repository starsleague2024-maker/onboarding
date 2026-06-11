import { SEMAFORO } from "../models/sectionA";
import { SEMAFORO_COLORS } from "../theme";

const LABELS = {
  [SEMAFORO.VERDE]: "OK",
  [SEMAFORO.GIALLO]: "Attenzione",
  [SEMAFORO.ARANCIONE]: "Criticita",
  [SEMAFORO.ROSSO]: "KO",
  [SEMAFORO.NEUTRO]: "-",
};

export default function SemaforoBadge({ semaforo, showLabel = false }) {
  const color = SEMAFORO_COLORS[semaforo] || SEMAFORO_COLORS[SEMAFORO.NEUTRO];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontSize: "0.8rem",
      }}
      title={LABELS[semaforo]}
    >
      <span
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: color,
          display: "inline-block",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: `0 0 6px ${color}99`,
        }}
      />
      {showLabel && <span style={{ color: "#a8b5c2" }}>{LABELS[semaforo]}</span>}
    </span>
  );
}

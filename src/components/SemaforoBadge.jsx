import { SEMAFORO } from "../models/sectionA";

const COLORS = {
  [SEMAFORO.VERDE]: "#22c55e",
  [SEMAFORO.GIALLO]: "#eab308",
  [SEMAFORO.ARANCIONE]: "#f97316",
  [SEMAFORO.ROSSO]: "#ef4444",
  [SEMAFORO.NEUTRO]: "#d1d5db",
};

const LABELS = {
  [SEMAFORO.VERDE]: "OK",
  [SEMAFORO.GIALLO]: "Attenzione",
  [SEMAFORO.ARANCIONE]: "Criticita",
  [SEMAFORO.ROSSO]: "KO",
  [SEMAFORO.NEUTRO]: "-",
};

export default function SemaforoBadge({ semaforo, showLabel = false }) {
  const color = COLORS[semaforo] || COLORS[SEMAFORO.NEUTRO];
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
          border: "1px solid rgba(0,0,0,0.1)",
        }}
      />
      {showLabel && <span style={{ color: "#555" }}>{LABELS[semaforo]}</span>}
    </span>
  );
}

import { useFeedback, generaReport } from "../feedbackUtils";
import { COLORS } from "../theme";

export default function FeedbackPanel({ sessionInfo }) {
  const { enabled, notes, removeNote, clearNotes } = useFeedback();

  if (!enabled) return null;

  function handleExport() {
    const md = generaReport(notes, sessionInfo);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ts = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `feedback-psl-${ts}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      style={{
        position: "sticky",
        bottom: "12px",
        marginTop: "16px",
        background: COLORS.cardLight,
        border: `1px solid ${COLORS.gold}`,
        borderRadius: "8px",
        padding: "12px",
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <strong style={{ color: COLORS.gold }}>Note di feedback ({notes.length})</strong>
        <div style={{ display: "flex", gap: "8px" }}>
          {notes.length > 0 && (
            <button onClick={clearNotes} style={smallBtnSecondary}>
              Svuota tutto
            </button>
          )}
          <button onClick={handleExport} disabled={notes.length === 0} style={smallBtnPrimary}>
            Esporta report
          </button>
        </div>
      </div>

      {notes.length === 0 ? (
        <p style={{ color: COLORS.textMuted, fontSize: "0.85rem", margin: 0 }}>
          Modalita feedback attiva: clicca l'icona 💬 vicino a un campo per lasciare una nota su cosa modificare.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "180px", overflowY: "auto" }}>
          {notes.map((n) => (
            <div
              key={n.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
                fontSize: "0.8rem",
                padding: "6px 8px",
                background: COLORS.card,
                borderRadius: "6px",
              }}
            >
              <div>
                <strong style={{ color: COLORS.text }}>{n.label}</strong>
                <div style={{ color: COLORS.textMuted }}>{n.text}</div>
              </div>
              <button onClick={() => removeNote(n.id)} style={removeBtn}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const smallBtnPrimary = {
  fontSize: "0.75rem",
  padding: "6px 10px",
  background: COLORS.gold,
  border: "none",
  borderRadius: "4px",
  color: COLORS.navy,
  cursor: "pointer",
  fontWeight: 700,
};

const smallBtnSecondary = {
  fontSize: "0.75rem",
  padding: "6px 10px",
  background: "none",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "4px",
  color: COLORS.textMuted,
  cursor: "pointer",
};

const removeBtn = {
  background: "none",
  border: "none",
  color: "#ef4444",
  cursor: "pointer",
  fontSize: "0.8rem",
  flexShrink: 0,
};

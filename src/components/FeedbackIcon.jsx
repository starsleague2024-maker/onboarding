import { useState } from "react";
import { useFeedback } from "../feedbackUtils";
import { COLORS } from "../theme";

/**
 * Icona 💬 da affiancare a un campo. Visibile solo se la modalita feedback e' attiva.
 * Cliccandola si apre un piccolo editor per scrivere una nota legata a quel campo.
 */
export default function FeedbackIcon({ sectionKey, fieldKey, label }) {
  const { enabled, addNote, openFieldKey, setOpenFieldKey } = useFeedback();
  const [text, setText] = useState("");

  if (!enabled) return null;

  const isOpen = openFieldKey === fieldKey;

  function handleSave() {
    if (text.trim()) {
      addNote({ sectionKey, fieldKey, label, text: text.trim() });
      setText("");
    }
    setOpenFieldKey(null);
  }

  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <button
        type="button"
        onClick={() => setOpenFieldKey(isOpen ? null : fieldKey)}
        title="Aggiungi nota per Claude su questo campo"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "0.9rem",
          padding: "0 2px",
          lineHeight: 1,
          opacity: 0.8,
        }}
      >
        💬
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 20,
            width: "260px",
            background: COLORS.cardLight,
            border: `1px solid ${COLORS.gold}`,
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: COLORS.gold, marginBottom: "4px", fontWeight: 600 }}>
            {label}
          </div>
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cosa vuoi modificare in questo campo?"
            style={{
              width: "100%",
              minHeight: "60px",
              borderRadius: "6px",
              border: `1px solid ${COLORS.border}`,
              background: COLORS.bg,
              color: COLORS.text,
              fontSize: "0.8rem",
              padding: "6px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px", marginTop: "6px" }}>
            <button
              type="button"
              onClick={() => setOpenFieldKey(null)}
              style={{ fontSize: "0.75rem", padding: "4px 8px", background: "none", border: `1px solid ${COLORS.border}`, borderRadius: "4px", color: COLORS.textMuted, cursor: "pointer" }}
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={handleSave}
              style={{ fontSize: "0.75rem", padding: "4px 8px", background: COLORS.gold, border: "none", borderRadius: "4px", color: COLORS.navy, cursor: "pointer", fontWeight: 700 }}
            >
              Salva nota
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

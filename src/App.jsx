import { useState } from "react";
import Dashboard from "./components/Dashboard";
import CallSession from "./components/CallSession";
import { COLORS } from "./theme";
import { FeedbackProvider } from "./feedback";
import { useFeedback } from "./feedbackUtils";

function FeedbackToggle() {
  const { enabled, setEnabled } = useFeedback();
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      style={{
        position: "fixed",
        top: "12px",
        right: "12px",
        zIndex: 50,
        padding: "8px 14px",
        borderRadius: "20px",
        border: `1px solid ${enabled ? COLORS.gold : COLORS.border}`,
        background: enabled ? COLORS.gold : COLORS.card,
        color: enabled ? COLORS.navy : COLORS.textMuted,
        cursor: "pointer",
        fontWeight: 700,
        fontSize: "0.8rem",
      }}
    >
      💬 Modalita feedback {enabled ? "ON" : "OFF"}
    </button>
  );
}

export default function App() {
  const [openSessionId, setOpenSessionId] = useState(null);

  return (
    <FeedbackProvider>
      <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "system-ui, sans-serif" }}>
        <FeedbackToggle />
        {openSessionId ? (
          <CallSession sessionId={openSessionId} onBack={() => setOpenSessionId(null)} />
        ) : (
          <Dashboard onOpenSession={setOpenSessionId} />
        )}
      </div>
    </FeedbackProvider>
  );
}

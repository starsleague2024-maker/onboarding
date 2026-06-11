import { useState } from "react";
import Dashboard from "./components/Dashboard";
import CallSession from "./components/CallSession";
import { COLORS } from "./theme";

export default function App() {
  const [openSessionId, setOpenSessionId] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "system-ui, sans-serif" }}>
      {openSessionId ? (
        <CallSession sessionId={openSessionId} onBack={() => setOpenSessionId(null)} />
      ) : (
        <Dashboard onOpenSession={setOpenSessionId} />
      )}
    </div>
  );
}

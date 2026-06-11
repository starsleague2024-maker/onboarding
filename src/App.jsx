import { useState } from "react";
import Dashboard from "./components/Dashboard";
import CallSession from "./components/CallSession";

export default function App() {
  const [openSessionId, setOpenSessionId] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6", fontFamily: "system-ui, sans-serif" }}>
      {openSessionId ? (
        <CallSession sessionId={openSessionId} onBack={() => setOpenSessionId(null)} />
      ) : (
        <Dashboard onOpenSession={setOpenSessionId} />
      )}
    </div>
  );
}

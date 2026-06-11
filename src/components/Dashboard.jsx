import { useEffect, useState } from "react";
import { storage, createEmptySession } from "../data";
import SemaforoBadge from "./SemaforoBadge";

export default function Dashboard({ onOpenSession }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const list = await storage.listSessions();
    setSessions(list);
  }

  async function handleNew() {
    const session = createEmptySession();
    await storage.saveSession(session);
    onOpenSession(session.id);
  }

  async function handleDelete(id, e) {
    e.stopPropagation();
    if (!confirm("Eliminare questa scheda?")) return;
    await storage.deleteSession(id);
    load();
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1>PSL — Schede Centri</h1>
        <button onClick={handleNew} style={primaryBtn}>
          + Nuova scheda
        </button>
      </div>

      {sessions.length === 0 && <p>Nessuna scheda creata. Clicca "Nuova scheda" per iniziare.</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {sessions.map((s) => (
          <div
            key={s.id}
            onClick={() => onOpenSession(s.id)}
            style={{
              padding: "12px 16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{s.sectionA?.denominazione || "Senza nome"}</strong>
              <div style={{ fontSize: "0.8rem", color: "#888" }}>
                {s.dataCall || "Data non impostata"} — {s.nomeOperatore || "Operatore non impostato"}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {s.semaforoFinale && <SemaforoBadge semaforo={s.semaforoFinale} showLabel />}
              <button onClick={(e) => handleDelete(s.id, e)} style={dangerBtn}>
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const primaryBtn = {
  padding: "8px 16px",
  background: "#0ea5e9",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 500,
};

const dangerBtn = {
  padding: "4px 10px",
  background: "transparent",
  color: "#ef4444",
  border: "1px solid #ef4444",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "0.8rem",
};

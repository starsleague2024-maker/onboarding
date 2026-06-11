import { useEffect, useState } from "react";
import { storage, createEmptySession } from "../data";
import SemaforoBadge from "./SemaforoBadge";
import { COLORS } from "../theme";

const GROUPS = [
  { key: "todo", label: "Da iniziare", description: "Schede create ma non ancora avviate" },
  { key: "precall", label: "Pre-call in corso", description: "Ricerca dati pre-call in corso o da completare" },
  { key: "incall", label: "In-call in corso", description: "Pre-call completata, in attesa o durante la call" },
  { key: "done", label: "Completati", description: "Analisi finale completata" },
];

function getGroup(session) {
  const step = session.currentStep || 0;
  if (step >= 3) return "done";
  if (step === 2) return "incall";
  if (step === 1) return "precall";
  // step 0: se non c'e nessun dato compilato, e' "todo"
  const hasData = session.sectionA?.denominazione;
  return hasData ? "precall" : "todo";
}

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

  const grouped = {};
  for (const g of GROUPS) grouped[g.key] = [];
  for (const s of sessions) {
    grouped[getGroup(s)].push(s);
  }

  return (
    <div style={{ maxWidth: "850px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="PSL" style={{ height: "56px", borderRadius: "8px" }} />
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, color: COLORS.text }}>Stars Boarding</h1>
          <p style={{ margin: 0, color: COLORS.textMuted, fontSize: "0.9rem" }}>
            Primo contatto, call e finalizzazione Padel Stars League
          </p>
        </div>
        <button onClick={handleNew} style={primaryBtn}>
          + Nuova scheda
        </button>
      </div>

      {sessions.length === 0 && <p style={{ color: COLORS.textMuted }}>Nessuna scheda creata. Clicca "Nuova scheda" per iniziare.</p>}

      {GROUPS.map((g) => (
        grouped[g.key].length > 0 && (
          <div key={g.key} style={{ marginBottom: "24px" }}>
            <h3 style={{ color: COLORS.text, borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: "4px", marginBottom: "4px" }}>
              {g.label} <span style={{ color: COLORS.textMuted, fontWeight: 400, fontSize: "0.8rem" }}>({grouped[g.key].length})</span>
            </h3>
            <p style={{ color: COLORS.textMuted, fontSize: "0.8rem", marginTop: 0, marginBottom: "8px" }}>{g.description}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {grouped[g.key].map((s) => (
                <div
                  key={s.id}
                  onClick={() => onOpenSession(s.id)}
                  style={{
                    padding: "12px 16px",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: COLORS.card,
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {s.semaforoFinale && <SemaforoBadge semaforo={s.semaforoFinale} />}
                      <strong style={{ color: COLORS.text }}>{s.sectionA?.denominazione || "Senza nome"}</strong>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: COLORS.textMuted, marginTop: "2px" }}>
                      {s.dataCall || "Data non impostata"} — {s.nomeOperatore || "Operatore non impostato"}
                    </div>
                    {(s.sectionA?.telefono || s.sectionA?.email) && (
                      <div style={{ fontSize: "0.8rem", color: COLORS.textMuted, marginTop: "2px" }}>
                        {s.sectionA?.telefono && <span>📞 {s.sectionA.telefono}</span>}
                        {s.sectionA?.telefono && s.sectionA?.email && <span> · </span>}
                        {s.sectionA?.email && <span>✉️ {s.sectionA.email}</span>}
                      </div>
                    )}
                  </div>
                  <button onClick={(e) => handleDelete(s.id, e)} style={dangerBtn}>
                    Elimina
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

const primaryBtn = {
  padding: "10px 18px",
  background: COLORS.gold,
  color: COLORS.navy,
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 700,
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

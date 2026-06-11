import { useEffect, useState, useCallback } from "react";
import { storage } from "../data";
import { initialSectionA, calcolaSemaforiA } from "../models/sectionA";
import { initialSectionB, calcolaSemaforiB } from "../models/sectionB";
import { calcolaCostiAttuali, calcolaCostiPSL, generaConfrontoFinale, PSL_PACKAGE_DEFAULT } from "../models/sectionC";
import { calcolaAnalisiFinale } from "../models/sectionD";

import PreCallForm from "./backend/PreCallForm";
import InCallForm from "./backend/InCallForm";
import BackendSummary from "./backend/BackendSummary";
import FrontendSummary from "./frontend/FrontendSummary";

const TABS = {
  PRECALL: "precall",
  INCALL: "incall",
  BACKEND: "backend",
  FRONTEND: "frontend",
};

export default function CallSession({ sessionId, onBack }) {
  const [session, setSession] = useState(null);
  const [tab, setTab] = useState(TABS.PRECALL);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    load();
  }, [sessionId]);

  async function load() {
    const s = await storage.getSession(sessionId);
    if (s) {
      setSession({
        ...s,
        sectionA: s.sectionA || { ...initialSectionA },
        sectionB: s.sectionB || { ...initialSectionB },
        pslPackage: s.pslPackage || { ...PSL_PACKAGE_DEFAULT },
      });
    }
  }

  const save = useCallback(async (updated) => {
    setSaveStatus("Salvataggio...");
    const semaforiA = calcolaSemaforiA(updated.sectionA);
    const semaforiB = calcolaSemaforiB(updated.sectionB);
    const analisi = calcolaAnalisiFinale(updated.sectionA, updated.sectionB, semaforiA, semaforiB);
    const toSave = { ...updated, semaforoFinale: analisi.semaforoFinale };
    await storage.saveSession(toSave);
    setSaveStatus("Salvato");
    setTimeout(() => setSaveStatus(""), 1500);
  }, []);

  function handleSectionAChange(newSectionA) {
    const updated = { ...session, sectionA: newSectionA };
    setSession(updated);
    save(updated);
  }

  function handleSectionBChange(newSectionB) {
    const updated = { ...session, sectionB: newSectionB };
    setSession(updated);
    save(updated);
  }

  function handleSessionMetaChange(updated) {
    setSession(updated);
    save(updated);
  }

  if (!session) return <div style={{ padding: "24px" }}>Caricamento...</div>;

  const semaforiA = calcolaSemaforiA(session.sectionA);
  const semaforiB = calcolaSemaforiB(session.sectionB);
  const analisi = calcolaAnalisiFinale(session.sectionA, session.sectionB, semaforiA, semaforiB);
  const costiAttuali = calcolaCostiAttuali(session.sectionA, session.sectionB);
  const costiPSL = calcolaCostiPSL(session.sectionA, session.sectionB, session.pslPackage, costiAttuali);
  const confronto = generaConfrontoFinale(session.sectionA, session.sectionB, session.pslPackage);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <button onClick={onBack} style={linkBtn}>
          ← Torna alla lista
        </button>
        <span style={{ fontSize: "0.8rem", color: "#888" }}>{saveStatus}</span>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        <TabButton active={tab === TABS.PRECALL} onClick={() => setTab(TABS.PRECALL)}>
          Pre-call (A)
        </TabButton>
        <TabButton active={tab === TABS.INCALL} onClick={() => setTab(TABS.INCALL)}>
          In-call (B)
        </TabButton>
        <TabButton active={tab === TABS.BACKEND} onClick={() => setTab(TABS.BACKEND)}>
          Backend / Analisi
        </TabButton>
        <TabButton active={tab === TABS.FRONTEND} onClick={() => setTab(TABS.FRONTEND)} highlight>
          Vista Frontend (centro)
        </TabButton>
      </div>

      {tab === TABS.PRECALL && (
        <PreCallForm data={session.sectionA} semafori={semaforiA} onChange={handleSectionAChange} />
      )}
      {tab === TABS.INCALL && (
        <InCallForm data={session.sectionB} semafori={semaforiB} onChange={handleSectionBChange} />
      )}
      {tab === TABS.BACKEND && (
        <BackendSummary
          session={session}
          analisi={analisi}
          costiAttuali={costiAttuali}
          costiPSL={costiPSL}
          onChange={handleSessionMetaChange}
        />
      )}
      {tab === TABS.FRONTEND && (
        <div style={{ background: "white", padding: "24px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
          <FrontendSummary session={session} dataA={session.sectionA} analisi={analisi} confronto={confronto} />
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, children, highlight }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "6px",
        border: active ? "2px solid #0ea5e9" : "1px solid #ccc",
        background: highlight ? (active ? "#0ea5e9" : "#e0f2fe") : active ? "#e0f2fe" : "white",
        color: highlight && active ? "white" : "#333",
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
      }}
    >
      {children}
    </button>
  );
}

const linkBtn = {
  background: "none",
  border: "none",
  color: "#0ea5e9",
  cursor: "pointer",
  fontSize: "0.9rem",
};

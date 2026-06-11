import { useEffect, useState, useCallback } from "react";
import { storage } from "../data";
import { initialSectionA, calcolaSemaforiA } from "../models/sectionA";
import { initialSectionB, calcolaSemaforiB } from "../models/sectionB";
import { calcolaCostiAttuali, calcolaCostiPSL, generaConfrontoFinale, PSL_PACKAGE_DEFAULT } from "../models/sectionC";
import { calcolaAnalisiFinale } from "../models/sectionD";

import PreCallForm from "./backend/PreCallForm";
import SummaryA from "./backend/SummaryA";
import InCallForm from "./backend/InCallForm";
import BackendSummary from "./backend/BackendSummary";
import FrontendSummary from "./frontend/FrontendSummary";
import { COLORS } from "../theme";

const STEPS = [
  { key: "precall", label: "1. Pre-call (A)" },
  { key: "summaryA", label: "2. Riepilogo A" },
  { key: "incall", label: "3. In-call (B)" },
  { key: "analisi", label: "4. Analisi finale" },
];

export default function CallSession({ sessionId, onBack }) {
  const [session, setSession] = useState(null);
  const [step, setStep] = useState(0);
  const [showFrontend, setShowFrontend] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    async function load() {
      const s = await storage.getSession(sessionId);
      if (s) {
        const sectionA = { ...initialSectionA, ...(s.sectionA || {}) };
        if (!Array.isArray(sectionA.formaGiuridica)) {
          sectionA.formaGiuridica = sectionA.formaGiuridica ? [sectionA.formaGiuridica] : [];
        }
        if (!Array.isArray(sectionA.affiliazione)) {
          sectionA.affiliazione = sectionA.affiliazione ? [sectionA.affiliazione] : [];
        }
        setSession({
          ...s,
          sectionA,
          sectionB: { ...initialSectionB, ...(s.sectionB || {}) },
          pslPackage: s.pslPackage || { ...PSL_PACKAGE_DEFAULT },
        });
      }
    }
    load();
  }, [sessionId]);

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

  function goNext() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <button onClick={onBack} style={linkBtn}>
          ← Torna alla lista
        </button>
        <span style={{ fontSize: "0.8rem", color: COLORS.textMuted }}>{saveStatus}</span>
      </div>

      {/* Step indicator */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {STEPS.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setStep(i)}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: i === step ? `2px solid ${COLORS.gold}` : `1px solid ${COLORS.border}`,
              background: i === step ? COLORS.gold : COLORS.card,
              color: i === step ? COLORS.navy : COLORS.text,
              cursor: "pointer",
              fontWeight: i === step ? 700 : 400,
              fontSize: "0.85rem",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {step === 0 && (
        <>
          <PreCallForm data={session.sectionA} semafori={semaforiA} onChange={handleSectionAChange} />
          <StepNav onNext={goNext} nextLabel="Avanza al riepilogo →" />
        </>
      )}

      {step === 1 && (
        <>
          <SummaryA data={session.sectionA} semafori={semaforiA} />
          <StepNav onBack={goBack} onNext={goNext} backLabel="← Modifica pre-call" nextLabel="Vai a In-call →" />
        </>
      )}

      {step === 2 && (
        <>
          <InCallForm data={session.sectionB} semafori={semaforiB} onChange={handleSectionBChange} dataA={session.sectionA} />
          <StepNav onBack={goBack} onNext={goNext} backLabel="← Torna al riepilogo A" nextLabel="Vai all'analisi finale →" />
        </>
      )}

      {step === 3 && (
        <>
          {!showFrontend ? (
            <>
              <BackendSummary
                session={session}
                analisi={analisi}
                costiAttuali={costiAttuali}
                costiPSL={costiPSL}
                onChange={handleSessionMetaChange}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", gap: "8px", flexWrap: "wrap" }}>
                <StepNav onBack={goBack} backLabel="← Torna a In-call" />
                <button onClick={() => setShowFrontend(true)} style={primaryBtn}>
                  Apri vista Frontend (per il centro) →
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ background: COLORS.white, padding: "24px", borderRadius: "8px", border: `1px solid ${COLORS.border}`, color: COLORS.navy }}>
                <FrontendSummary session={session} dataA={session.sectionA} analisi={analisi} confronto={confronto} />
              </div>
              <div style={{ marginTop: "16px" }}>
                <button onClick={() => setShowFrontend(false)} style={linkBtn}>
                  ← Torna all'analisi backend
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function StepNav({ onBack, onNext, backLabel = "← Indietro", nextLabel = "Avanti →" }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", gap: "8px" }}>
      {onBack ? (
        <button onClick={onBack} style={secondaryBtn}>
          {backLabel}
        </button>
      ) : <span />}
      {onNext && (
        <button onClick={onNext} style={primaryBtn}>
          {nextLabel}
        </button>
      )}
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

const secondaryBtn = {
  padding: "10px 18px",
  background: COLORS.card,
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: 500,
};

const linkBtn = {
  background: "none",
  border: "none",
  color: COLORS.gold,
  cursor: "pointer",
  fontSize: "0.9rem",
  fontWeight: 600,
};

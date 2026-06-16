import SemaforoBadge from "../SemaforoBadge";
import { ARGOMENTI_COMMERCIALI, ARGOMENTI_ACSI } from "../../models/sectionC";
import { FeedbackWrapper } from "../FeedbackIcon";
import { SEMAFORO } from "../../models/sectionA";
import { COLORS } from "../../theme";

const SEMAFORO_DESCRIZIONE = {
  [SEMAFORO.VERDE]: "Il centro presenta tutte le caratteristiche per entrare nel circuito PSL Full.",
  [SEMAFORO.ARANCIONE]: "Il centro ha un buon potenziale, con alcuni aspetti da approfondire insieme.",
  [SEMAFORO.ROSSO]: "Al momento alcune condizioni di base non sono soddisfatte, ma restiamo in contatto.",
};

export default function FrontendSummary({ session, dataA, analisi, confronto }) {
  // Punti di forza: deriviamo da semafori verdi sui campi piu rilevanti
  const puntiDiForza = [];
  if (dataA.googleRating && Number(dataA.googleRating) >= 4.1) {
    puntiDiForza.push(`Ottima reputazione online (rating Google ${dataA.googleRating})`);
  }
  if (dataA.campiCoperti && Number(dataA.campiCoperti) >= 2) {
    puntiDiForza.push("Buona disponibilita di campi coperti");
  }
  if (dataA.instagram === "Attivo" || dataA.facebook === "Attivo") {
    puntiDiForza.push("Presenza attiva sui canali social");
  }
  if (dataA.tesseratiRASD && Number(dataA.tesseratiRASD) >= 60) {
    puntiDiForza.push("Solida base di tesserati");
  }

  // Aree di miglioramento - tono propositivo
  const areeMiglioramento = [];
  if (dataA.sitoWeb === "Datato" || dataA.sitoWeb === "Assente") {
    areeMiglioramento.push("Opportunita di rinnovare la presenza online per intercettare nuovi giocatori");
  }
  if (dataA.googleRecensioni && Number(dataA.googleRecensioni) < 31) {
    areeMiglioramento.push("Spazio di crescita nelle recensioni online, leva utile per attrarre nuovi clienti");
  }
  if (analisi.arancioniDettaglio.length > 0) {
    areeMiglioramento.push("Alcuni aspetti organizzativi da allineare insieme per partire al meglio");
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="PSL" style={{ height: "64px", borderRadius: "8px", marginBottom: "8px" }} />
        <h1 style={{ marginBottom: "4px", color: COLORS.navy }}>{dataA.denominazione || "Centro Padel"}</h1>
        <p style={{ color: "#666" }}>
          {session.dataCall && `Data: ${session.dataCall}`}
        </p>
      </div>

      {/* Semaforo generale */}
      <div
        style={{
          padding: "16px",
          borderRadius: "10px",
          background: "#eef2f6",
          border: `1px solid ${COLORS.navy}33`,
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <SemaforoBadge semaforo={analisi.semaforoFinale} />
          <strong>Valutazione complessiva</strong>
        </div>
        <p style={{ margin: 0 }}>{SEMAFORO_DESCRIZIONE[analisi.semaforoFinale]}</p>
      </div>

      {/* Punti di forza */}
      <Section title="Punti di forza">
        {puntiDiForza.length > 0 ? (
          <ul>
            {puntiDiForza.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        ) : (
          <p>Continueremo ad approfondire insieme i punti di forza del centro.</p>
        )}
      </Section>

      {/* Aree di miglioramento */}
      <Section title="Aree di miglioramento / opportunita di crescita">
        {areeMiglioramento.length > 0 ? (
          <ul>
            {areeMiglioramento.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        ) : (
          <p>Nessuna area critica rilevata: il centro e gia ben posizionato.</p>
        )}
      </Section>

      {/* Confronto costi */}
      <Section title="Confronto costi" feedbackKey="frontend_confronto_costi">
        {confronto.modalita === "fitp" ? (
          <ConfrontoCostiFITP confronto={confronto} />
        ) : (
          <ConfrontoCostiSemplice confronto={confronto} />
        )}
      </Section>

      {/* Argomenti commerciali */}
      <Section title="Perche scegliere PSL" feedbackKey="frontend_argomenti_commerciali">
        <ul>
          {ARGOMENTI_COMMERCIALI.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
          {(dataA.affiliazione || []).includes("ACSI") && ARGOMENTI_ACSI.map((a, i) => (
            <li key={`acsi-${i}`}>{a}</li>
          ))}
          {confronto.modalita === "fitp" && (
            <li>
              Per ogni tesserato PSL guadagni 15,40€ netti. Con la federazione pagavi.
            </li>
          )}
          {dataA.multisede === "Si" && (
            <li>
              Avendo piu sedi ({dataA.numeroSedi || "piu di una"}), puoi accedere a uno sconto maggiore sul pacchetto PSL applicato su tutte le strutture.
            </li>
          )}
          {dataA.multisede === "Si" && (dataA.affiliazione || []).includes("ACSI") && (
            <li>
              Per i centri multisede affiliati ACSI possiamo studiare condizioni piu favorevoli sul prezzo dei cartellini, aumentando il guadagno per ogni tesserato.
            </li>
          )}
        </ul>
      </Section>

      {/* Raccomandazione finale */}
      <Section title="Raccomandazione">
        <p>{analisi.semaforoFinale === SEMAFORO.VERDE
          ? "Procediamo con il prossimo passo: invio della proposta dettagliata."
          : analisi.semaforoFinale === SEMAFORO.ARANCIONE
          ? "Definiamo insieme un piano per affrontare gli aspetti emersi e procedere al meglio."
          : "Restiamo in contatto: torneremo a sentirci appena le condizioni saranno piu favorevoli."}
        </p>
      </Section>

      {/* Prossimi passi */}
      <Section title="Prossimi passi">
        <ol>
          <li>Approfondimento esigenze specifiche</li>
          <li>Condivisione proposta dettagliata</li>
          <li>Pianificazione attivazione</li>
        </ol>
      </Section>
    </div>
  );
}

function Section({ title, children, feedbackKey, feedbackSection = "frontend" }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <FeedbackWrapper sectionKey={feedbackSection} fieldKey={feedbackKey || `section_${title}`} label={`Sezione: ${title}`}>
        <h3 style={{ borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: "4px", color: COLORS.navy }}>{title}</h3>
      </FeedbackWrapper>
      {children}
    </div>
  );
}

const tdL = { padding: "6px 8px", textAlign: "left" };
const tdR = { padding: "6px 8px", textAlign: "right" };
const thStyle = { padding: "6px 8px", textAlign: "right", fontWeight: 700, fontSize: "0.85rem" };

function TableRow({ label, oggi, conPSL, bold }) {
  const style = bold ? { fontWeight: 700, borderTop: "2px solid #e5e7eb" } : { borderBottom: "1px solid #f3f4f6" };
  return (
    <tr style={style}>
      <td style={tdL}>{label}</td>
      <td style={tdR}>{typeof oggi === "number" ? `${oggi.toFixed(2)} €` : oggi}</td>
      <td style={tdR}>{typeof conPSL === "number" ? `${conPSL.toFixed(2)} €` : conPSL}</td>
    </tr>
  );
}

function ConfrontoCostiFITP({ confronto }) {
  const costiRighe = confronto.righe.filter((r) => r.tipo === "costo" || !r.tipo);
  const guadagniRighe = confronto.righe.filter((r) => r.tipo === "guadagno");
  const totaleCostiOggi = costiRighe.reduce((s, r) => s + (typeof r.oggi === "number" ? r.oggi : 0), 0);
  const totaleCostiPSL = costiRighe.reduce((s, r) => s + (typeof r.conPSL === "number" ? r.conPSL : 0), 0);
  const guadagnoOggi = guadagniRighe.reduce((s, r) => s + (typeof r.oggi === "number" ? r.oggi : 0), 0);
  const guadagnoPSL = guadagniRighe.reduce((s, r) => s + (typeof r.conPSL === "number" ? Math.abs(r.conPSL) : 0), 0);
  const nettoOggi = totaleCostiOggi - guadagnoOggi;
  const nettoPSL = totaleCostiPSL - guadagnoPSL;

  return (
    <>
      <p style={{ fontSize: "0.8rem", color: COLORS.textMuted, margin: "0 0 8px" }}>Costi annuali (IVA esclusa ove applicabile)</p>
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
            <th style={{ ...thStyle, textAlign: "left" }}>COSTI</th>
            <th style={thStyle}>Oggi (FITP)</th>
            <th style={thStyle}>Con PSL/ACSI</th>
          </tr>
        </thead>
        <tbody>
          {costiRighe.map((r, i) => <TableRow key={i} label={r.voce} oggi={r.oggi} conPSL={r.conPSL} />)}
          <TableRow label="Totale costi" oggi={totaleCostiOggi} conPSL={totaleCostiPSL} bold />
        </tbody>
      </table>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
            <th style={{ ...thStyle, textAlign: "left" }}>GUADAGNI DA TESSERAMENTO</th>
            <th style={thStyle}>Oggi (FITP) — cashback federazione</th>
            <th style={thStyle}>Con PSL/ACSI — guadagno immediato</th>
          </tr>
        </thead>
        <tbody>
          {guadagniRighe.map((r, i) => (
            <TableRow key={i} label={r.voce}
              oggi={typeof r.oggi === "number" ? r.oggi : 0}
              conPSL={typeof r.conPSL === "number" ? Math.abs(r.conPSL) : r.conPSL}
            />
          ))}
        </tbody>
      </table>

      <div style={{ padding: "12px", borderRadius: "8px", background: "#f0fdf4", border: "1px solid #86efac" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #86efac" }}>
              <th style={{ ...thStyle, textAlign: "left" }}>COSTO NETTO EFFETTIVO</th>
              <th style={thStyle}>Oggi (FITP)</th>
              <th style={thStyle}>Con PSL/ACSI</th>
            </tr>
          </thead>
          <tbody>
            <TableRow label="Totale costi − guadagno tesseramento" oggi={nettoOggi} conPSL={nettoPSL} bold />
          </tbody>
        </table>
        <p style={{ fontSize: "0.8rem", color: "#166534", marginTop: "8px", marginBottom: 0 }}>
          Con PSL il guadagno immediato sui tesseramenti ({guadagnoPSL.toFixed(2)} €) si sottrae direttamente al costo del pacchetto annuale ({totaleCostiPSL.toFixed(2)} €), portando il costo netto reale a {nettoPSL.toFixed(2)} €/anno.
        </p>
      </div>
    </>
  );
}

function ConfrontoCostiSemplice({ confronto }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
          <th style={{ ...thStyle, textAlign: "left" }}>Voce</th>
          <th style={thStyle}>Oggi</th>
          <th style={thStyle}>Con PSL</th>
        </tr>
      </thead>
      <tbody>
        {confronto.righe.map((r, i) => <TableRow key={i} label={r.voce} oggi={r.oggi} conPSL={r.conPSL} />)}
        <TableRow label="Totale" oggi={confronto.totaleOggi} conPSL={confronto.totalePSL} bold />
      </tbody>
    </table>
  );
}

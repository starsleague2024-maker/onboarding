import SemaforoBadge from "../SemaforoBadge";
import { TextField, TextAreaField } from "../Fields";
import { COLORS } from "../../theme";
import { calcolaRadar, calcolaObiettivoPSL, generaLegenda } from "../../models/radar";
import { centroAffiliatoFITP, generaConfrontoFinale, NOTA_TRATTATIVA_TRATTENUTA } from "../../models/sectionC";
import PreventivatoreFITP from "./PreventivatoreFITP";
import RadarSummary from "../RadarSummary";

export default function BackendSummary({ session, analisi, onChange, semaforiA, semaforiB, campiCopertiEffettivi }) {
  const radarPre = calcolaRadar({ semaforiA });
  const radarPost = calcolaRadar({ semaforiA, semaforiB, campiCopertiEffettivi });
  const obiettivo = calcolaObiettivoPSL(radarPost.scores);
  const legendaPost = generaLegenda({
    dataA: session.sectionA,
    dataB: session.sectionB,
    semaforiA,
    semaforiB,
    scores: radarPost.scores,
  });

  return (
    <div>
      <RadarSummary
        title="Confronto: prima e dopo la call"
        series={[
          { name: "Prima della call", values: radarPre.scores, color: COLORS.textMuted, dashed: true },
          { name: "Dopo la call", values: radarPost.scores, color: COLORS.gold },
          { name: "Obiettivo PSL", values: obiettivo, color: "#22c55e", dashed: true },
        ]}
        legenda={legendaPost}
      />

      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <TextField
            label="Data call"
            value={session.dataCall}
            onChange={(v) => onChange({ ...session, dataCall: v })}
            placeholder="gg/mm/aaaa"
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            label="Operatore PSL"
            value={session.nomeOperatore}
            onChange={(v) => onChange({ ...session, nomeOperatore: v })}
          />
        </div>
      </div>

      <div
        style={{
          padding: "12px",
          borderRadius: "8px",
          background: COLORS.card,
          border: `1px solid ${COLORS.border}`,
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <strong>Semaforo finale:</strong>
          <SemaforoBadge semaforo={analisi.semaforoFinale} showLabel />
        </div>
        <p style={{ margin: 0 }}>{analisi.raccomandazione}</p>
      </div>

      {analisi.koList.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ color: "#ef4444" }}>KO assoluti</h4>
          <ul>
            {analisi.koList.map((k) => (
              <li key={k.code}>
                <strong>{k.code}</strong>: {k.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {analisi.incongruenze.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ color: "#f97316" }}>Incongruenze rilevate</h4>
          <ul>
            {analisi.incongruenze.map((i, idx) => (
              <li key={idx}>
                <strong>{i.code}</strong>: {i.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {analisi.segnaliPositivi.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <h4 style={{ color: "#22c55e" }}>Segnali positivi</h4>
          <ul>
            {analisi.segnaliPositivi.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <h4>Conteggio semafori</h4>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <span>🟢 Verde: {analisi.conteggio.verde}</span>
          <span>🟡 Giallo: {analisi.conteggio.giallo}</span>
          <span>🟠 Arancione: {analisi.conteggio.arancione}</span>
          <span>🔴 Rosso: {analisi.conteggio.rosso}</span>
        </div>
      </div>

      {session.sectionA.multisede === "Si" && (
        <div
          style={{
            padding: "10px 12px",
            borderRadius: "6px",
            background: COLORS.cardLight,
            border: `1px solid ${COLORS.gold}`,
            marginBottom: "16px",
            fontSize: "0.85rem",
            color: COLORS.textMuted,
          }}
        >
          <strong style={{ color: COLORS.gold }}>Nota interna:</strong> {NOTA_TRATTATIVA_TRATTENUTA}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <h4>Preventivatore</h4>
        {centroAffiliatoFITP(session.sectionA) ? (
          <PreventivatoreFITP
            sectionC={session.sectionC}
            dataB={session.sectionB}
            onChange={(sectionC) => onChange({ ...session, sectionC })}
          />
        ) : (
          <SimplePreventivatore session={session} />
        )}
      </div>

      <TextAreaField
        label="Note interne (testo libero)"
        value={session.noteInterne}
        onChange={(v) => onChange({ ...session, noteInterne: v })}
      />
    </div>
  );
}

function SimplePreventivatore({ session }) {
  const confronto = generaConfrontoFinale(session.sectionA, session.sectionB, session.sectionC);
  const costoGestionale = Number(session.sectionB.b5_2_costoSoftwareAnnuale) || 0;

  return (
    <div
      style={{
        padding: "12px",
        borderRadius: "8px",
        background: COLORS.cardLight,
        border: `1px solid ${COLORS.gold}`,
      }}
    >
      <p style={{ marginTop: 0, color: COLORS.textMuted, fontSize: "0.85rem" }}>
        Centro non affiliato FITP: confronto basato solo sul costo del software di gestione dichiarato (B.5.2).
      </p>
      <Row label="Costo gestionale attuale (annuale)" value={costoGestionale} />
      <Row label="Costo pacchetto PSL (annuale)" value={confronto.totalePSL} />
      <Row label="Differenza" value={confronto.risparmioStimato} bold highlight />
    </div>
  );
}

function Row({ label, value, bold, highlight }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "4px 0",
        fontSize: "0.9rem",
        fontWeight: bold ? 700 : 400,
        color: highlight ? COLORS.gold : COLORS.text,
      }}
    >
      <span>{label}</span>
      <span>{value.toFixed(2)} €</span>
    </div>
  );
}

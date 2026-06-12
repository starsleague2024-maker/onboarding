import SemaforoBadge from "../SemaforoBadge";
import { ARGOMENTI_COMMERCIALI } from "../../models/sectionC";
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
      {confronto.mostraConfronto && (
      <Section title="Confronto costi">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
              <th style={{ textAlign: "left", padding: "8px" }}>Voce</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Oggi</th>
              <th style={{ textAlign: "right", padding: "8px" }}>Con PSL</th>
            </tr>
          </thead>
          <tbody>
            {confronto.righe.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "8px" }}>{r.voce}</td>
                <td style={{ textAlign: "right", padding: "8px" }}>
                  {typeof r.oggi === "number" ? `${r.oggi.toFixed(2)} €` : r.oggi}
                </td>
                <td style={{ textAlign: "right", padding: "8px" }}>
                  {typeof r.conPSL === "number"
                    ? r.conPSL < 0
                      ? `+${Math.abs(r.conPSL).toFixed(2)} € (guadagno)`
                      : `${r.conPSL.toFixed(2)} €`
                    : r.conPSL}
                </td>
              </tr>
            ))}
            <tr style={{ fontWeight: "bold", borderTop: "2px solid #e5e7eb" }}>
              <td style={{ padding: "8px" }}>Totale</td>
              <td style={{ textAlign: "right", padding: "8px" }}>{confronto.totaleOggi.toFixed(2)} €</td>
              <td style={{ textAlign: "right", padding: "8px" }}>{confronto.totalePSL.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>
      </Section>
      )}

      {/* Argomenti commerciali */}
      <Section title="Perche scegliere PSL">
        <ul>
          {ARGOMENTI_COMMERCIALI.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
          {confronto.mostraConfronto && (
            <li>
              Per ogni tesserato PSL guadagni 15,40€ netti. Con la federazione pagavi.
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

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <h3 style={{ borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: "4px", color: COLORS.navy }}>{title}</h3>
      {children}
    </div>
  );
}

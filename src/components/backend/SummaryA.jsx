import SemaforoBadge from "../SemaforoBadge";
import { SEMAFORO } from "../../models/sectionA";
import { COLORS } from "../../theme";

export default function SummaryA({ data, semafori }) {
  const rows = [
    ["A.1 Denominazione", data.denominazione || "-", semafori.denominazione],
    ["A.2 Forma giuridica", (data.formaGiuridica || []).join(", ") || "-", semafori.formaGiuridica],
    ["A.3 Affiliazione", (data.affiliazione || []).join(", ") || "-", semafori.affiliazione],
    ["A.4 Tesserati RASD", data.tesseratiRASD || "-", semafori.tesseratiRASD],
    ["A.5 Campi da gioco totali", data.campiTotali || "-", semafori.campiTotali],
    ["A.6 Campi coperti", data.campiCoperti || "-", semafori.campiCoperti],
    ["A.7 Regione", data.regione || "-", null],
    ["A.8 Prezzo indoor 90'", data.prezzoIndoor90 ? `${data.prezzoIndoor90} €` : "-", semafori.prezzoIndoor90],
    ["A.9 Prezzo outdoor 90'", data.prezzoOutdoor90 ? `${data.prezzoOutdoor90} €` : "-", semafori.prezzoOutdoor90],
    ["A.10 Piattaforma prenotazioni", data.piattaformaPrenotazioni || "-", semafori.piattaformaPrenotazioni],
    ["A.11 Sito web", data.sitoWeb || "-", semafori.sitoWeb],
    ["A.12 Instagram", data.instagram || "-", semafori.instagram],
    ["A.13 Facebook", data.facebook || "-", semafori.facebook],
    ["A.14 Google rating", data.googleRating || "-", semafori.googleRating],
    ["A.15 Google recensioni", data.googleRecensioni || "-", semafori.googleRecensioni],
    ["A.18 App propria", data.appPropria || "-", semafori.appPropria],
  ];

  // Checklist: campi segnalati come "da chiedere in call" o critici (rosso/arancione)
  const checklist = [];
  for (const [label, , sem] of rows) {
    if (!sem) continue;
    if (sem.needsCallFlag) {
      checklist.push({ label, reason: "dato non trovato — chiedere in call" });
    } else if (sem.semaforo === SEMAFORO.ROSSO) {
      checklist.push({ label, reason: "criticita rilevata — verificare in call" });
    } else if (sem.semaforo === SEMAFORO.ARANCIONE) {
      checklist.push({ label, reason: "da approfondire in call" });
    }
  }

  // Primo impatto: testo generato dai semafori positivi/negativi
  const positivi = [];
  const negativi = [];
  for (const [label, , sem] of rows) {
    if (!sem) continue;
    if (sem.semaforo === SEMAFORO.VERDE) positivi.push(label);
    if (sem.semaforo === SEMAFORO.ROSSO) negativi.push(label);
  }

  let primoImpatto = "Dati pre-call ancora insufficienti per un primo impatto: procedi con la call per raccogliere le informazioni mancanti.";
  if (positivi.length > 0 || negativi.length > 0) {
    const parts = [];
    if (positivi.length > 0) {
      parts.push(`Punti di forza emersi: ${positivi.join(", ")}.`);
    }
    if (negativi.length > 0) {
      parts.push(`Criticita da verificare subito in call: ${negativi.join(", ")}.`);
    }
    if (checklist.length > 0 && negativi.length === 0) {
      parts.push(`Restano ${checklist.length} punti da chiarire in call.`);
    }
    primoImpatto = parts.join(" ");
  }

  return (
    <div>
      {/* Primo impatto */}
      <div
        style={{
          padding: "12px",
          borderRadius: "8px",
          background: COLORS.cardLight,
          border: `1px solid ${COLORS.gold}`,
          marginBottom: "16px",
        }}
      >
        <strong style={{ color: COLORS.gold }}>Primo impatto</strong>
        <p style={{ margin: "4px 0 0", color: COLORS.text, fontSize: "0.9rem" }}>{primoImpatto}</p>
      </div>

      {/* Checklist da fare in call */}
      {checklist.length > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <strong style={{ color: COLORS.text }}>Checklist da verificare in call ({checklist.length})</strong>
          <ul style={{ marginTop: "6px" }}>
            {checklist.map((c, i) => (
              <li key={i} style={{ color: COLORS.textMuted, fontSize: "0.9rem", marginBottom: "2px" }}>
                <span style={{ color: COLORS.text }}>{c.label}</span> — {c.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tabella riepilogo completa */}
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <tbody>
          {rows.map(([label, value, sem]) => (
            <tr key={label} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <td style={{ padding: "6px 8px", color: COLORS.textMuted }}>{label}</td>
              <td style={{ padding: "6px 8px", color: COLORS.text, fontWeight: 500 }}>{value}</td>
              <td style={{ padding: "6px 8px", textAlign: "right" }}>
                {sem?.semaforo && <SemaforoBadge semaforo={sem.semaforo} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.noteSezioneA && (
        <div style={{ marginTop: "16px" }}>
          <strong style={{ color: COLORS.text }}>Note:</strong>
          <p style={{ color: COLORS.textMuted }}>{data.noteSezioneA}</p>
        </div>
      )}
    </div>
  );
}

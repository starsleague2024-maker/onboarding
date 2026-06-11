import SemaforoBadge from "../SemaforoBadge";
import { COLORS } from "../../theme";

export default function SummaryA({ data, semafori }) {
  const rows = [
    ["A.1 Denominazione", data.denominazione || "-", semafori.denominazione],
    ["A.2 Forma giuridica", (data.formaGiuridica || []).join(", ") || "-", semafori.formaGiuridica],
    ["A.3 Affiliazione", (data.affiliazione || []).join(", ") || "-", semafori.affiliazione],
    ["A.4 Tesserati RASD", data.tesseratiRASD || "-", semafori.tesseratiRASD],
    ["A.5 Campi totali", data.campiTotali || "-", semafori.campiTotali],
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

  return (
    <div>
      <h3 style={{ borderBottom: `2px solid ${COLORS.gold}`, paddingBottom: "4px", color: COLORS.text }}>
        Riepilogo Sezione A
      </h3>
      <p style={{ color: COLORS.textMuted, fontSize: "0.9rem" }}>
        Controlla i dati raccolti prima di procedere alla call. Puoi tornare indietro per modificarli in qualsiasi momento.
      </p>
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

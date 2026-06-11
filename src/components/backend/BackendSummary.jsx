import SemaforoBadge from "../SemaforoBadge";
import { TextField, TextAreaField } from "../Fields";
import { COLORS } from "../../theme";

export default function BackendSummary({ session, analisi, costiAttuali, costiPSL, onChange }) {
  return (
    <div>

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

      <div style={{ marginBottom: "16px" }}>
        <h4>Emulatore costi — riepilogo backend</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
          <tbody>
            <tr>
              <td>Affiliazione/federazione</td>
              <td style={{ textAlign: "right" }}>{costiAttuali.breakdown.affiliazione.toFixed(2)} €</td>
            </tr>
            <tr>
              <td>Tesseramento</td>
              <td style={{ textAlign: "right" }}>{costiAttuali.breakdown.tesseramento.toFixed(2)} €</td>
            </tr>
            <tr>
              <td>Tornei</td>
              <td style={{ textAlign: "right" }}>{costiAttuali.breakdown.tornei.toFixed(2)} €</td>
            </tr>
            <tr>
              <td>Software gestione</td>
              <td style={{ textAlign: "right" }}>{costiAttuali.breakdown.software.toFixed(2)} €</td>
            </tr>
            <tr style={{ fontWeight: "bold", borderTop: "2px solid #ddd" }}>
              <td>Totale costi attuali</td>
              <td style={{ textAlign: "right" }}>{costiAttuali.totale.toFixed(2)} €</td>
            </tr>
            <tr>
              <td>Guadagno tesseramento PSL</td>
              <td style={{ textAlign: "right" }}>{costiPSL.guadagnoTesseramento.toFixed(2)} €</td>
            </tr>
            <tr style={{ fontWeight: "bold" }}>
              <td>Totale netto PSL</td>
              <td style={{ textAlign: "right" }}>{costiPSL.totaleNetto.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <TextAreaField
        label="Note interne (testo libero)"
        value={session.noteInterne}
        onChange={(v) => onChange({ ...session, noteInterne: v })}
      />
    </div>
  );
}

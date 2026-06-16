import SemaforoBadge from "../SemaforoBadge";
import { ARGOMENTI_COMMERCIALI, ARGOMENTI_ACSI } from "../../models/sectionC";
import { FeedbackWrapper } from "../FeedbackIcon";
import { SEMAFORO } from "../../models/sectionA";
import { COLORS } from "../../theme";
import { generaAnalisiNarrativa } from "../../models/analisiNarrativa";

const SEMAFORO_BG = {
  [SEMAFORO.VERDE]: { bg: "#f0fdf4", border: "#86efac", color: "#166534" },
  [SEMAFORO.ARANCIONE]: { bg: "#fff7ed", border: "#fdba74", color: "#9a3412" },
  [SEMAFORO.GIALLO]: { bg: "#fefce8", border: "#fde047", color: "#854d0e" },
  [SEMAFORO.ROSSO]: { bg: "#fef2f2", border: "#fca5a5", color: "#991b1b" },
};

export default function FrontendSummary({ session, dataA, analisi, confronto, semaforiA, semaforiB }) {
  const narrativa = generaAnalisiNarrativa({
    dataA,
    dataB: session.sectionB,
    semaforiA,
    semaforiB,
    analisi,
  });

  const semaforoBg = SEMAFORO_BG[analisi.semaforoFinale] || SEMAFORO_BG[SEMAFORO.ARANCIONE];

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

      {/* Valutazione complessiva */}
      <FeedbackWrapper sectionKey="frontend" fieldKey="frontend_valutazione_box" label="Box valutazione complessiva">
        <div style={{
          padding: "16px",
          borderRadius: "10px",
          background: semaforoBg.bg,
          border: `2px solid ${semaforoBg.border}`,
          marginBottom: "24px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <SemaforoBadge semaforo={analisi.semaforoFinale} />
            <strong style={{ fontSize: "1.1rem", color: semaforoBg.color }}>Valutazione PSL</strong>
          </div>
          <p style={{ margin: "0 0 10px", color: COLORS.navy, lineHeight: 1.6 }}>{narrativa.intro}</p>
          {narrativa.raccomandazione && (
            <p style={{ margin: 0, fontWeight: 600, color: semaforoBg.color }}>{narrativa.raccomandazione}</p>
          )}
        </div>
      </FeedbackWrapper>

      {/* Stato di salute per area */}
      <Section title="Analisi del centro" feedbackKey="frontend_analisi_centro">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {narrativa.aree.map((area, i) => {
            const bg = SEMAFORO_BG[area.semaforo] || { bg: "#f8fafc", border: "#e2e8f0", color: COLORS.text };
            return (
              <FeedbackWrapper key={i} sectionKey="frontend" fieldKey={`frontend_area_${i}`} label={`Area: ${area.titolo}`}>
                <div style={{
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: bg.bg,
                  border: `1px solid ${bg.border}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    {area.semaforo && <SemaforoBadge semaforo={area.semaforo} />}
                    <strong style={{ color: COLORS.navy }}>{area.titolo}</strong>
                  </div>
                  <p style={{ margin: 0, color: COLORS.text, fontSize: "0.9rem", lineHeight: 1.6 }}>{area.testo}</p>
                </div>
              </FeedbackWrapper>
            );
          })}
        </div>
      </Section>

      {/* Opportunita PSL */}
      {narrativa.opportunita.length > 0 && (
        <Section title="Opportunita con PSL" feedbackKey="frontend_opportunita">
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            {narrativa.opportunita.map((o, i) => (
              <li key={i} style={{ marginBottom: "6px", lineHeight: 1.5 }}>{o}</li>
            ))}
          </ul>
        </Section>
      )}

      {/* Confronto costi */}
      <Section title="Confronto costi" feedbackKey="frontend_confronto_costi">
        {confronto.modalita === "fitp" ? (
          <ConfrontoCostiFITP confronto={confronto} />
        ) : (
          <ConfrontoCostiSemplice confronto={confronto} />
        )}
      </Section>

      {/* Perche PSL */}
      <Section title="Perche scegliere PSL" feedbackKey="frontend_argomenti_commerciali">
        <ul style={{ paddingLeft: "20px", margin: 0 }}>
          {ARGOMENTI_COMMERCIALI.map((a, i) => (
            <li key={i} style={{ marginBottom: "6px" }}>{a}</li>
          ))}
          {(dataA.affiliazione || []).includes("ACSI") && ARGOMENTI_ACSI.map((a, i) => (
            <li key={`acsi-${i}`} style={{ marginBottom: "6px" }}>{a}</li>
          ))}
          {confronto.modalita === "fitp" && (
            <li style={{ marginBottom: "6px" }}>Per ogni tesserato PSL guadagni immediatamente: 15,40€ netti per gli over18, 10,40€ per gli under18.</li>
          )}
          {dataA.multisede === "Si" && (
            <li style={{ marginBottom: "6px" }}>Avendo piu sedi ({dataA.numeroSedi || "piu di una"}), puoi accedere a uno sconto maggiore sul pacchetto PSL applicato su tutte le strutture.</li>
          )}
          {dataA.multisede === "Si" && (dataA.affiliazione || []).includes("ACSI") && (
            <li style={{ marginBottom: "6px" }}>Per centri multisede affiliati ACSI possiamo studiare condizioni piu favorevoli sul prezzo dei cartellini, aumentando il guadagno per ogni tesserato.</li>
          )}
        </ul>
      </Section>

      {/* Prossimi passi */}
      <Section title="Prossimi passi" feedbackKey="frontend_prossimi_passi">
        <ol style={{ paddingLeft: "20px", margin: 0 }}>
          <li style={{ marginBottom: "6px" }}>Approfondimento delle esigenze specifiche del centro</li>
          <li style={{ marginBottom: "6px" }}>Condivisione della proposta dettagliata PSL</li>
          <li style={{ marginBottom: "6px" }}>Pianificazione dell'attivazione e onboarding</li>
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


function ConfrontoCostiFITP({ confronto }) {
  const { righeOggi, psl } = confronto;
  const costiOggi = righeOggi.filter((r) => r.tipo === "costo");
  const guadagniOggi = righeOggi.filter((r) => r.tipo === "guadagno");
  const totaleCostiOggi = costiOggi.reduce((s, r) => s + r.oggi, 0);
  const guadagnoOggi = guadagniOggi.reduce((s, r) => s + r.oggi, 0);
  const nettoOggi = totaleCostiOggi - guadagnoOggi;
  const nettoPSL = psl.costoPacchettoAnnuale - psl.guadagnoTesseramento;

  return (
    <>
      <p style={{ fontSize: "0.8rem", color: COLORS.textMuted, margin: "0 0 12px" }}>
        Confronto costi annuali stimati sulla base dei dati dichiarati.
      </p>

      {/* Tabella a due colonne: situazione attuale vs PSL */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${COLORS.navy}`, background: COLORS.cardLight }}>
            <th style={{ ...thStyle, textAlign: "left", padding: "10px 8px" }}>Voce</th>
            <th style={{ ...thStyle, padding: "10px 8px" }}>Situazione attuale</th>
            <th style={{ ...thStyle, padding: "10px 8px", color: COLORS.gold }}>Con PSL/ACSI</th>
          </tr>
        </thead>
        <tbody>
          {/* COSTI */}
          <tr>
            <td colSpan={3} style={{ padding: "6px 8px 2px", fontSize: "0.75rem", fontWeight: 700, color: COLORS.textMuted, letterSpacing: "0.05em" }}>
              COSTI
            </td>
          </tr>
          {costiOggi.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
              <td style={tdL}>{r.voce}</td>
              <td style={tdR}>{r.oggi.toFixed(2)} €</td>
              <td style={{ ...tdR, color: COLORS.textMuted, fontStyle: "italic" }}>—</td>
            </tr>
          ))}
          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
            <td style={tdL}>Pacchetto PSL — tutto incluso</td>
            <td style={{ ...tdR, color: COLORS.textMuted }}>—</td>
            <td style={{ ...tdR, fontWeight: 700, color: COLORS.gold }}>{psl.costoPacchettoAnnuale.toFixed(2)} €</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
            <td style={tdL}>
              <span>Affiliazione ACSI (valore 100€, RC inclusa)</span>
            </td>
            <td style={{ ...tdR, color: COLORS.textMuted }}>—</td>
            <td style={{ ...tdR, color: "#16a34a", fontWeight: 600 }}>🎁 In regalo</td>
          </tr>
          <tr style={{ borderBottom: "2px solid #e5e7eb", fontWeight: 700 }}>
            <td style={tdL}>Totale costi</td>
            <td style={tdR}>{totaleCostiOggi.toFixed(2)} €</td>
            <td style={{ ...tdR, color: COLORS.gold }}>{psl.costoPacchettoAnnuale.toFixed(2)} €</td>
          </tr>

          {/* GUADAGNI */}
          <tr>
            <td colSpan={3} style={{ padding: "10px 8px 2px", fontSize: "0.75rem", fontWeight: 700, color: COLORS.textMuted, letterSpacing: "0.05em" }}>
              GUADAGNO DAI TESSERAMENTI
            </td>
          </tr>
          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
            <td style={tdL}>Tesseramento — over 18 ({psl.tesseratiOver18} tesserati × {(20 - 4.6).toFixed(2)}€)</td>
            <td style={{ ...tdR, color: COLORS.textMuted, fontSize: "0.8rem" }}>cashback federazione</td>
            <td style={{ ...tdR, color: "#16a34a", fontWeight: 600 }}>+{psl.guadagnoOver18.toFixed(2)} €</td>
          </tr>
          <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
            <td style={tdL}>Tesseramento — under 18 ({psl.tesseratiUnder18} tesserati × {(15 - 4.6).toFixed(2)}€)</td>
            <td style={{ ...tdR, color: COLORS.textMuted, fontSize: "0.8rem" }}>cashback federazione</td>
            <td style={{ ...tdR, color: "#16a34a", fontWeight: 600 }}>+{psl.guadagnoUnder18.toFixed(2)} €</td>
          </tr>
          <tr style={{ borderBottom: "2px solid #e5e7eb", fontWeight: 700 }}>
            <td style={tdL}>Totale guadagno tesseramento</td>
            <td style={{ ...tdR, color: COLORS.textMuted }}>{guadagnoOggi.toFixed(2)} €</td>
            <td style={{ ...tdR, color: "#16a34a" }}>+{psl.guadagnoTesseramento.toFixed(2)} €</td>
          </tr>
        </tbody>
      </table>

      {/* Box costo netto */}
      <div style={{ padding: "14px", borderRadius: "8px", background: "#f0fdf4", border: "2px solid #86efac" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <strong style={{ fontSize: "1rem", color: COLORS.navy }}>Costo netto effettivo annuale</strong>
          <div style={{ display: "flex", gap: "24px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.75rem", color: COLORS.textMuted }}>Situazione attuale</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>{nettoOggi.toFixed(2)} €</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.75rem", color: "#16a34a" }}>Con PSL/ACSI</div>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#16a34a" }}>{nettoPSL.toFixed(2)} €</div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: "0.85rem", color: "#166534", margin: 0 }}>
          Il pacchetto PSL costa {psl.costoPacchettoAnnuale.toFixed(2)} €/anno e include tutto.
          Con {psl.tesseratiOver18 + psl.tesseratiUnder18} tesserati, il guadagno immediato
          di {psl.guadagnoTesseramento.toFixed(2)} € si sottrae al costo del pacchetto:
          il costo netto reale scende a <strong>{nettoPSL.toFixed(2)} €/anno</strong>.
        </p>
      </div>
    </>
  );
}

function ConfrontoCostiSemplice({ confronto }) {
  const costoGestionale = confronto.totaleOggi;
  const costoPSL = confronto.totalePSL;
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `2px solid ${COLORS.navy}` }}>
          <th style={{ ...thStyle, textAlign: "left" }}>Voce</th>
          <th style={thStyle}>Situazione attuale</th>
          <th style={{ ...thStyle, color: COLORS.gold }}>Con PSL</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
          <td style={tdL}>Software di gestione</td>
          <td style={tdR}>{costoGestionale.toFixed(2)} €</td>
          <td style={{ ...tdR, color: COLORS.textMuted, fontStyle: "italic" }}>incluso</td>
        </tr>
        <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
          <td style={tdL}>Pacchetto PSL — tutto incluso</td>
          <td style={{ ...tdR, color: COLORS.textMuted }}>—</td>
          <td style={{ ...tdR, color: COLORS.gold, fontWeight: 700 }}>{costoPSL.toFixed(2)} €</td>
        </tr>
        <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
          <td style={tdL}>Affiliazione ACSI (RC inclusa)</td>
          <td style={{ ...tdR, color: COLORS.textMuted }}>—</td>
          <td style={{ ...tdR, color: "#16a34a", fontWeight: 600 }}>🎁 In regalo</td>
        </tr>
      </tbody>
    </table>
  );
}

import { NumberField, SelectField } from "../Fields";
import { FeedbackWrapper } from "../FeedbackIcon";
import { FITP_LABELS, calcolaCostiFITP, calcolaCostiPSL, calcolaConfrontoCategorieFITP, PSL_PACKAGE_DEFAULT } from "../../models/sectionC";
import { COLORS } from "../../theme";

const CATEGORY_ORDER = [
  "tesseramento",
  "tecnici",
  "scuolaPadel",
  "tornei",
  "campionatiSquadre",
];

export default function PreventivatoreFITP({ sectionC, onChange, dataB }) {
  const fitp = sectionC.fitp;
  const costi = calcolaCostiFITP(fitp);
  const costoGestionale = Number(dataB.b5_2_costoSoftwareAnnuale) || 0;
  const psl = calcolaCostiPSL(costi.tesseratiUnder18, costi.tesseratiOver18, PSL_PACKAGE_DEFAULT);
  const categorie = calcolaConfrontoCategorieFITP(fitp);
  const byKey = Object.fromEntries(categorie.map((c) => [c.key, c]));

  function setCategoryField(category, key) {
    return (value) => {
      const updated = {
        ...sectionC,
        fitp: {
          ...fitp,
          [category]: { ...fitp[category], [key]: value },
        },
      };
      onChange(updated);
    };
  }

  function setAffiliazioneField(key) {
    return (value) => {
      const updated = {
        ...sectionC,
        fitp: {
          ...fitp,
          affiliazione: { ...fitp.affiliazione, [key]: value },
        },
      };
      onChange(updated);
    };
  }

  return (
    <div>
      <p style={{ color: COLORS.textMuted, fontSize: "0.9rem", marginTop: 0 }}>
        Inserisci i numeri reali del centro per ogni voce di costo FITP. Per ogni categoria viene mostrato il confronto tra il costo attuale (FITP) e la condizione con PSL/ACSI.
      </p>

      <div style={{ marginBottom: "16px" }}>
        <FeedbackWrapper sectionKey="sectionC" fieldKey="fitp.affiliazione" label="Affiliazione - sezione">
          <h4 style={{ color: COLORS.gold, marginBottom: "8px" }}>{FITP_LABELS.affiliazione.title}</h4>
        </FeedbackWrapper>
        <SelectField
          label="Tipo riaffiliazione"
          value={fitp.affiliazione.riaffiliazioneTuttiCampi ? "Tutti i campi" : "Standard"}
          onChange={(v) => setAffiliazioneField("riaffiliazioneTuttiCampi")(v === "Tutti i campi")}
          options={["Standard", "Tutti i campi"]}

          sectionKey="sectionC"
          fieldKey="fitp.affiliazione.riaffiliazioneTuttiCampi"
        />
        <NumberField
          label="Numero campi soggetti a tassa per campo"
          value={fitp.affiliazione.numCampiPerTassa}
          onChange={setAffiliazioneField("numCampiPerTassa")}

          sectionKey="sectionC"
          fieldKey="fitp.affiliazione.numCampiPerTassa"
        />
        <FeedbackWrapper sectionKey="sectionC" fieldKey="fitp.affiliazione.confronto" label="Affiliazione - confronto FITP vs PSL">
          <CompareRow categoria={byKey.affiliazione} />
        </FeedbackWrapper>
      </div>

      {CATEGORY_ORDER.map((category) => (
        <div key={category} style={{ marginBottom: "16px" }}>
          <FeedbackWrapper sectionKey="sectionC" fieldKey={`fitp.${category}.titolo`} label={`${FITP_LABELS[category].title} - sezione`}>
            <h4 style={{ color: COLORS.gold, marginBottom: "8px" }}>{FITP_LABELS[category].title}</h4>
          </FeedbackWrapper>
          {Object.keys(fitp[category]).map((key) => (
            <NumberField
              key={key}
              label={FITP_LABELS[category][key]}
              value={fitp[category][key]}
              onChange={setCategoryField(category, key)}
              suffix="quantita"

              sectionKey="sectionC"
              fieldKey={`fitp.${category}.${key}`}
            />
          ))}
          <FeedbackWrapper sectionKey="sectionC" fieldKey={`fitp.${category}.confronto`} label={`${FITP_LABELS[category]?.title || category} - confronto FITP vs PSL`}>
            <CompareRow categoria={byKey[category]} />
          </FeedbackWrapper>
        </div>
      ))}

      <FeedbackWrapper sectionKey="sectionC" fieldKey="fitp.riepilogo_annuale" label="Riepilogo annuale - box totali">
      <div
        style={{
          padding: "12px",
          borderRadius: "8px",
          background: COLORS.cardLight,
          border: `1px solid ${COLORS.gold}`,
        }}
      >
        <h4 style={{ marginTop: 0, color: COLORS.gold }}>Riepilogo annuale</h4>
        <RowTotal label="Totale costi FITP" value={costi.totale} />
        <RowTotal label="Software gestione (da B.5.2)" value={costoGestionale} />
        <RowTotal label="Totale costi attuali" value={costi.totale + costoGestionale} bold />
        <RowTotal label="Cashback tesseramento PSL/ACSI" value={psl.guadagnoTesseramento} />
        <RowTotal label="Costo pacchetto PSL annuale" value={psl.costoPacchettoAnnuale} />
        <RowTotal label="Totale netto con PSL" value={psl.totaleNetto} bold />
        <RowTotal label="Risparmio stimato" value={(costi.totale + costoGestionale) - psl.totaleNetto} bold highlight />
      </div>
      </FeedbackWrapper>
    </div>
  );
}

function CompareRow({ categoria }) {
  if (!categoria) return null;

  // Tesseramento: mostra Over18/Under18 separati, niente riga "Differenza" generica
  if (categoria.subcategorie) {
    return (
      <div style={{ marginTop: "8px", padding: "8px", borderRadius: "6px", background: COLORS.cardLight, fontSize: "0.85rem" }}>
        {categoria.subcategorie.map((sub) => (
          <div key={sub.label} style={{ marginBottom: "8px" }}>
            <div style={{ color: COLORS.gold, fontWeight: 700, marginBottom: "2px" }}>{sub.label} ({sub.numTesserati})</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: COLORS.textMuted }}>Oggi (FITP)</span>
              <span style={{ color: COLORS.text, fontWeight: 600 }}>{sub.oggi.toFixed(2)} €</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: COLORS.textMuted }}>Con PSL/ACSI (cashback)</span>
              <span style={{ color: COLORS.text, fontWeight: 600 }}>
                +{sub.conPSL.toFixed(2)} € ({sub.numTesserati} x {sub.tariffaPSL.toFixed(2)}€)
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // conPSL >= 0: e' un costo con PSL -> differenza = oggi - conPSL
  // conPSL < 0: e' un cashback per il centro -> differenza = oggi + |conPSL|
  const diff = categoria.conPSL >= 0
    ? categoria.oggi - categoria.conPSL
    : categoria.oggi + Math.abs(categoria.conPSL);

  return (
    <div style={{ marginTop: "8px", padding: "8px", borderRadius: "6px", background: COLORS.cardLight, fontSize: "0.85rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: COLORS.textMuted }}>Oggi (FITP)</span>
        <span style={{ color: COLORS.text, fontWeight: 600 }}>{categoria.oggi.toFixed(2)} €</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ color: COLORS.textMuted }}>Con PSL/ACSI</span>
        <span style={{ color: COLORS.text, fontWeight: 600 }}>{categoria.conPSLLabel}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", paddingTop: "4px", borderTop: `1px solid ${COLORS.border}` }}>
        <span style={{ color: COLORS.gold, fontWeight: 700 }}>Differenza</span>
        <span style={{ color: COLORS.gold, fontWeight: 700 }}>+{diff.toFixed(2)} €</span>
      </div>

    </div>
  );
}

function RowTotal({ label, value, bold, highlight }) {
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

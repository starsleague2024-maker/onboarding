import { NumberField, SelectField } from "../Fields";
import { FITP_LABELS, calcolaCostiFITP, calcolaCostiPSL, PSL_PACKAGE_DEFAULT } from "../../models/sectionC";
import { COLORS } from "../../theme";

const CATEGORY_ORDER = [
  "tesseramento",
  "tecnici",
  "scuolaPadel",
  "tornei",
  "campionatiSquadre",
  "quotePartecipazione",
];

export default function PreventivatoreFITP({ sectionC, onChange, dataB }) {
  const fitp = sectionC.fitp;
  const costi = calcolaCostiFITP(fitp);
  const costoGestionale = Number(dataB.b5_2_costoSoftwareAnnuale) || 0;
  const psl = calcolaCostiPSL(costi.tesseratiTotali, PSL_PACKAGE_DEFAULT);

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
        Inserisci i numeri reali del centro per ogni voce di costo FITP. Il totale annuale viene calcolato automaticamente e confrontato con il pacchetto PSL.
      </p>

      <div style={{ marginBottom: "16px" }}>
        <h4 style={{ color: COLORS.gold, marginBottom: "8px" }}>{FITP_LABELS.affiliazione.title}</h4>
        <SelectField
          label="Tipo riaffiliazione"
          value={fitp.affiliazione.riaffiliazioneTuttiCampi ? "Tutti i campi" : "Standard"}
          onChange={(v) => setAffiliazioneField("riaffiliazioneTuttiCampi")(v === "Tutti i campi")}
          options={["Standard", "Tutti i campi"]}
        />
        <NumberField
          label="Numero campi soggetti a tassa per campo"
          value={fitp.affiliazione.numCampiPerTassa}
          onChange={setAffiliazioneField("numCampiPerTassa")}
        />
        <RowTotal label="Totale Affiliazione" value={costi.breakdown.affiliazione} />
      </div>

      {CATEGORY_ORDER.map((category) => (
        <div key={category} style={{ marginBottom: "16px" }}>
          <h4 style={{ color: COLORS.gold, marginBottom: "8px" }}>{FITP_LABELS[category].title}</h4>
          {Object.keys(fitp[category]).map((key) => (
            <NumberField
              key={key}
              label={FITP_LABELS[category][key]}
              value={fitp[category][key]}
              onChange={setCategoryField(category, key)}
              suffix="quantita"
            />
          ))}
          <RowTotal label={`Totale ${FITP_LABELS[category].title}`} value={costi.breakdown[category]} />
        </div>
      ))}

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
        <RowTotal label="Guadagno tesseramento PSL/ACSI" value={psl.guadagnoTesseramento} />
        <RowTotal label="Costo pacchetto PSL annuale" value={psl.costoPacchettoAnnuale} />
        <RowTotal label="Totale netto con PSL" value={psl.totaleNetto} bold />
        <RowTotal label="Risparmio stimato" value={(costi.totale + costoGestionale) - psl.totaleNetto} bold highlight />
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

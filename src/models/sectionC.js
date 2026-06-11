// SEZIONE C — EMULATORE COSTI
// Confronto costi attuali (FITP) vs pacchetto PSL

import { FITP, PSL_TESSERAMENTO, tassaTorneoMontepremi } from "./fitpRates";

// Configurazione pacchetto PSL — modificabile da backend/admin in futuro
export const PSL_PACKAGE_DEFAULT = {
  mensile: 0,      // [inserire €/mese]
  annuale: 0,       // [inserire €/anno]
  contenuto: [
    // bullet points da definire
  ],
};

/**
 * Calcola il totale costi attuali FITP per il centro,
 * a partire dai dati di Sezione A e B.
 */
export function calcolaCostiAttuali(dataA, dataB) {
  const breakdown = {};

  const nCampiCoperti = Number(dataA.campiCoperti) || 0;

  // Affiliazione
  const riaffiliazione = FITP.affiliazione.riaffiliazioneTuttiCampi; // assunzione: dichiara tutti i campi
  const tassaCampi = FITP.affiliazione.tassaPerCampo * nCampiCoperti;
  breakdown.affiliazione = riaffiliazione + tassaCampi;

  // Tesseramento — usa B5.5 se disponibile, altrimenti A.4 / split agonistici
  const totTesserati = Number(dataB.b5_5_tesseratiTotali) || Number(dataA.tesseratiDichiarati) || 0;
  const agonistici = Number(dataB.b5_5_tesseratiAgonistici) || Number(dataA.tesseratiAgonistici) || 0;
  const nonAgonistici = Number(dataB.b5_5_tesseratiNonAgonistici) || Number(dataA.tesseratiNonAgonistici) || Math.max(totTesserati - agonistici, 0);

  // Assunzione semplificata: agonistici over16 fascia 3a/4a/5a, non agonistici over16
  const costoTesseramento =
    nonAgonistici * FITP.tesseramento.nonAgonisticaOver16 +
    agonistici * FITP.tesseramento.agonisticaOver16_3a4a5a;
  breakdown.tesseramento = costoTesseramento;

  // Tornei
  let costoTornei = 0;
  if (dataB.b7_1_organizzaTornei === "Si") {
    const quanti = Number(dataB.b7_1_quantiAnno) || 0;
    const tassaPerTorneo = tassaTorneoMontepremi(dataB.b7_1_fasciaMontepremi);
    costoTornei = tassaPerTorneo * quanti;
  }
  breakdown.tornei = costoTornei;

  // Software gestione
  const costoSoftware =
    Number(dataB.b5_2_costoSoftwareAnnuale) ||
    Number(dataA.costoGestionaleAnnuale) ||
    0;
  breakdown.software = costoSoftware;

  // Tecnici — non raccolto esplicitamente nel form B, lasciato a 0 (estendibile)
  breakdown.tecnici = 0;

  const totale = Object.values(breakdown).reduce((a, b) => a + b, 0);

  return { breakdown, totale, tesseratiTotali: totTesserati, tesseratiAgonistici: agonistici, tesseratiNonAgonistici: nonAgonistici };
}

/**
 * Calcola il totale netto pacchetto PSL.
 */
export function calcolaCostiPSL(dataA, dataB, pslPackage = PSL_PACKAGE_DEFAULT, costiAttuali = null) {
  const costi = costiAttuali || calcolaCostiAttuali(dataA, dataB);
  const guadagnoTesseramento = costi.tesseratiTotali * PSL_TESSERAMENTO.guadagnoNettoCentro;

  const costoPacchettoAnnuale = pslPackage.annuale || (pslPackage.mensile * 12);

  const totaleNetto = costoPacchettoAnnuale - guadagnoTesseramento;

  return {
    costoPacchettoAnnuale,
    guadagnoTesseramento,
    totaleNetto,
  };
}

/**
 * Genera la tabella di confronto finale (Sezione C3) per il frontend.
 */
export function generaConfrontoFinale(dataA, dataB, pslPackage = PSL_PACKAGE_DEFAULT) {
  const oggi = calcolaCostiAttuali(dataA, dataB);
  const psl = calcolaCostiPSL(dataA, dataB, pslPackage, oggi);

  return {
    righe: [
      {
        voce: "Software gestione",
        oggi: oggi.breakdown.software,
        conPSL: "Incluso",
      },
      {
        voce: "Affiliazione/federazione",
        oggi: oggi.breakdown.affiliazione,
        conPSL: "Ridotto",
      },
      {
        voce: "Tesseramento",
        oggi: oggi.breakdown.tesseramento,
        conPSL: -psl.guadagnoTesseramento, // negativo = guadagno per il centro
      },
      {
        voce: "Tornei",
        oggi: oggi.breakdown.tornei,
        conPSL: "Da definire",
      },
    ],
    totaleOggi: oggi.totale,
    totalePSL: psl.totaleNetto,
    risparmioStimato: oggi.totale - psl.totaleNetto,
  };
}

// Argomenti commerciali statici (frontend)
export const ARGOMENTI_COMMERCIALI = [
  "I tuoi sponsor restano tuoi. Non prendiamo percentuale sul montepremi e amplifichiamo la visibilita dei tuoi partner su tutta la rete.",
  "I tuoi clienti che prenotano online oggi pagano una commissione aggiuntiva ad ogni prenotazione. Con PSL questo costo sparisce.",
  `Per ogni tesserato PSL guadagni ${PSL_TESSERAMENTO.guadagnoNettoCentro.toFixed(2)}€ netti. Con la federazione pagavi.`,
];

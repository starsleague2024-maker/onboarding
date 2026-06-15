// SEZIONE C — PREVENTIVATORE
// Confronto costi attuali vs pacchetto PSL.
//
// Due rami:
// - Centro NON affiliato FITP: unico costo noto e' il gestionale (B.5.2),
//   confrontato con il pacchetto PSL.
// - Centro affiliato FITP: form completo con tutte le voci di costo FITP
//   (affiliazione, tesseramento, tecnici, scuola padel, tornei,
//   campionati a squadre, quote partecipazione), inserite manualmente
//   in base ai numeri reali del centro.

import { FITP, PSL_TESSERAMENTO, ACSI_AFFILIAZIONE } from "./fitpRates";

// Pacchetto PSL
export const PSL_PACKAGE_DEFAULT = {
  mensile: 399,
  annuale: 399 * 12, // 4788
  contenuto: [
    // bullet points da definire
  ],
};

/**
 * Struttura dati iniziale per il preventivatore (Sezione C).
 * Salvata sulla sessione come session.sectionC.
 */
export const initialSectionC = {
  // Ramo FITP — quantita inserite manualmente dall'operatore
  fitp: {
    affiliazione: {
      riaffiliazioneTuttiCampi: false, // true = applica tariffa "tutti i campi" invece di "standard"
      numCampiPerTassa: "", // numero campi su cui si paga la tassa per campo
    },
    tesseramento: {
      nonAgonisticaOver16: "",
      agonisticaOver16_3a4a5a: "",
      agonisticaOver16_1a2a: "",
      nonAgonisticaUnder16: "",
      agonisticaUnder16_3a4a5a: "",
      agonisticaUnder16_1a2a: "",
    },
    tecnici: {
      alboMaestriPadel: "",
      alboIstruttori2Livello: "",
      alboIstruttori1Livello: "",
    },
    scuolaPadel: {
      standard: "",
      basic: "",
      club: "",
    },
    tornei: {
      nonAgonistico: "",
      agonisticoSenzaMontepremi: "",
      montepremiSotto500: "",
      montepremi501_1499: "",
      montepremiOltre1500: "",
      manifestazionePromozionale: "",
    },
    campionatiSquadre: {
      serieD: "",
      serieC: "",
      serieB: "",
      serieA: "",
      veterani: "",
    },
  },
};

const FITP_LABELS = {
  affiliazione: {
    title: "Affiliazione",
  },
  tesseramento: {
    title: "Tesseramento",
    nonAgonisticaOver16: "Non agonistica over 16",
    agonisticaOver16_3a4a5a: "Agonistica over 16 (3a/4a/5a categoria)",
    agonisticaOver16_1a2a: "Agonistica over 16 (1a/2a categoria)",
    nonAgonisticaUnder16: "Non agonistica under 16",
    agonisticaUnder16_3a4a5a: "Agonistica under 16 (3a/4a/5a categoria)",
    agonisticaUnder16_1a2a: "Agonistica under 16 (1a/2a categoria)",
  },
  tecnici: {
    title: "Tecnici",
    alboMaestriPadel: "Maestro Nazionale",
    alboIstruttori2Livello: "Albo Istruttori 2° livello",
    alboIstruttori1Livello: "Albo Istruttori 1° livello",
  },
  scuolaPadel: {
    title: "Scuola Padel",
    standard: "Scuola Padel Standard",
    basic: "Scuola Padel Basic",
    club: "Scuola Padel Club",
  },
  tornei: {
    title: "Tornei",
    nonAgonistico: "Torneo non agonistico",
    agonisticoSenzaMontepremi: "Torneo agonistico senza montepremi",
    montepremiSotto500: "Torneo con montepremi fino a 500€",
    montepremi501_1499: "Torneo con montepremi 501-1499€",
    montepremiOltre1500: "Torneo con montepremi 1500€+",
    manifestazionePromozionale: "Manifestazione promozionale",
  },
  campionatiSquadre: {
    title: "Campionati a squadre",
    serieD: "Serie D",
    serieC: "Serie C",
    serieB: "Serie B",
    serieA: "Serie A",
    veterani: "Veterani",
  },
};

export { FITP_LABELS };

/**
 * Calcola il totale annuale dei costi FITP attuali a partire dalle
 * quantita inserite manualmente in session.sectionC.fitp.
 */
export function calcolaCostiFITP(fitpData) {
  const breakdown = {};

  // Affiliazione
  const riaffiliazione = fitpData.affiliazione.riaffiliazioneTuttiCampi
    ? FITP.affiliazione.riaffiliazioneTuttiCampi
    : FITP.affiliazione.riaffiliazioneStandard;
  const numCampi = Number(fitpData.affiliazione.numCampiPerTassa) || 0;
  breakdown.affiliazione = riaffiliazione + FITP.affiliazione.tassaPerCampo * numCampi;

  // Tesseramento
  breakdown.tesseramento = sumCategory(fitpData.tesseramento, FITP.tesseramento);

  // Tecnici
  breakdown.tecnici = sumCategory(fitpData.tecnici, FITP.tecnici);

  // Scuola Padel
  breakdown.scuolaPadel = sumCategory(fitpData.scuolaPadel, FITP.scuolaPadel);

  // Tornei
  breakdown.tornei = sumCategory(fitpData.tornei, FITP.tornei);

  // Campionati a squadre
  breakdown.campionatiSquadre = sumCategory(fitpData.campionatiSquadre, FITP.campionatiSquadre);

  // Quote partecipazione

  const totale = Object.values(breakdown).reduce((a, b) => a + b, 0);

  // Tesserati per fascia (per calcolo guadagno PSL/ACSI):
  // le categorie FITP "under16" vengono mappate su PSL "under18",
  // le categorie "over16" vengono mappate su PSL "over18".
  const t = fitpData.tesseramento;
  const tesseratiUnder18 =
    (Number(t.nonAgonisticaUnder16) || 0) +
    (Number(t.agonisticaUnder16_3a4a5a) || 0) +
    (Number(t.agonisticaUnder16_1a2a) || 0);
  const tesseratiOver18 =
    (Number(t.nonAgonisticaOver16) || 0) +
    (Number(t.agonisticaOver16_3a4a5a) || 0) +
    (Number(t.agonisticaOver16_1a2a) || 0);
  const tesseratiTotali = tesseratiUnder18 + tesseratiOver18;

  // Costo FITP tesseramento per fascia (per il confronto separato Over18/Under18)
  const costoTesseramentoUnder18 =
    (Number(t.nonAgonisticaUnder16) || 0) * FITP.tesseramento.nonAgonisticaUnder16 +
    (Number(t.agonisticaUnder16_3a4a5a) || 0) * FITP.tesseramento.agonisticaUnder16_3a4a5a +
    (Number(t.agonisticaUnder16_1a2a) || 0) * FITP.tesseramento.agonisticaUnder16_1a2a;
  const costoTesseramentoOver18 =
    (Number(t.nonAgonisticaOver16) || 0) * FITP.tesseramento.nonAgonisticaOver16 +
    (Number(t.agonisticaOver16_3a4a5a) || 0) * FITP.tesseramento.agonisticaOver16_3a4a5a +
    (Number(t.agonisticaOver16_1a2a) || 0) * FITP.tesseramento.agonisticaOver16_1a2a;

  return { breakdown, totale, tesseratiTotali, tesseratiUnder18, tesseratiOver18, costoTesseramentoUnder18, costoTesseramentoOver18 };
}

function sumCategory(values, rates) {
  let sum = 0;
  for (const key in rates) {
    const n = Number(values[key]) || 0;
    sum += n * rates[key];
  }
  return sum;
}

/**
 * Calcola il totale netto pacchetto PSL dato il guadagno tesseramento.
 */
export function calcolaCostiPSL(tesseratiUnder18, tesseratiOver18, pslPackage = PSL_PACKAGE_DEFAULT) {
  const guadagnoUnder18 = tesseratiUnder18 * PSL_TESSERAMENTO.under18.guadagnoNettoCentro;
  const guadagnoOver18 = tesseratiOver18 * PSL_TESSERAMENTO.over18.guadagnoNettoCentro;
  const guadagnoTesseramento = guadagnoUnder18 + guadagnoOver18;
  const costoPacchettoAnnuale = pslPackage.annuale || pslPackage.mensile * 12;
  const totaleNetto = costoPacchettoAnnuale - guadagnoTesseramento;

  return { costoPacchettoAnnuale, guadagnoTesseramento, guadagnoUnder18, guadagnoOver18, totaleNetto };
}

/**
 * Confronto FITP vs PSL per ogni categoria, riga per riga.
 * Ogni categoria ha: { key, label, oggi (costo FITP), conPSL (costo/guadagno con PSL), conPSLLabel }
 */
export function calcolaConfrontoCategorieFITP(fitpData) {
  const costi = calcolaCostiFITP(fitpData);
  const psl = calcolaCostiPSL(costi.tesseratiUnder18, costi.tesseratiOver18, PSL_PACKAGE_DEFAULT);

  return [
    {
      key: "affiliazione",
      label: "Affiliazione",
      oggi: costi.breakdown.affiliazione,
      conPSL: ACSI_AFFILIAZIONE.costoAnnuale,
      conPSLLabel: `${ACSI_AFFILIAZIONE.costoAnnuale.toFixed(2)} € (RC inclusa)`,
    },
    {
      key: "tesseramento",
      label: "Tesseramento",
      oggi: costi.breakdown.tesseramento,
      conPSL: -psl.guadagnoTesseramento, // negativo = cashback per il centro
      conPSLLabel: `Cashback totale ${psl.guadagnoTesseramento.toFixed(2)} €`,
      subcategorie: [
        {
          label: "Over18",
          numTesserati: costi.tesseratiOver18,
          oggi: costi.costoTesseramentoOver18,
          conPSL: psl.guadagnoOver18,
          tariffaPSL: PSL_TESSERAMENTO.over18.guadagnoNettoCentro,
        },
        {
          label: "Under18",
          numTesserati: costi.tesseratiUnder18,
          oggi: costi.costoTesseramentoUnder18,
          conPSL: psl.guadagnoUnder18,
          tariffaPSL: PSL_TESSERAMENTO.under18.guadagnoNettoCentro,
        },
      ],
    },
    {
      key: "tecnici",
      label: "Tecnici",
      oggi: costi.breakdown.tecnici,
      conPSL: 0,
      conPSLLabel: "0,00 € (incluso)",
    },
    {
      key: "scuolaPadel",
      label: "Scuola Padel",
      oggi: costi.breakdown.scuolaPadel,
      conPSL: 0,
      conPSLLabel: "0,00 € (incluso)",
    },
    {
      key: "tornei",
      label: "Tornei",
      oggi: costi.breakdown.tornei,
      conPSL: 0,
      conPSLLabel: "0,00 € (incluso)",
    },
    {
      key: "campionatiSquadre",
      label: "Campionati a squadre",
      oggi: costi.breakdown.campionatiSquadre,
      conPSL: 0,
      conPSLLabel: "0,00 € (incluso)",
    },
  ];
}

/**
 * Il confronto costi completo (FITP) ha senso solo se il centro e'
 * attualmente affiliato FITP.
 */
export function centroAffiliatoFITP(dataA) {
  return (dataA.affiliazione || []).includes("FITP");
}

/**
 * Genera la tabella di confronto finale (Sezione C3) per il documento.
 *
 * - Centro NON affiliato FITP: confronto minimale (solo costo gestionale vs PSL).
 * - Centro affiliato FITP: confronto completo con tutte le voci FITP.
 */
export function generaConfrontoFinale(dataA, dataB, sectionC, pslPackage = PSL_PACKAGE_DEFAULT) {
  const costoPacchettoAnnuale = pslPackage.annuale || pslPackage.mensile * 12;

  if (!centroAffiliatoFITP(dataA)) {
    const costoGestionale = Number(dataB.b5_2_costoSoftwareAnnuale) || 0;
    return {
      modalita: "semplice",
      righe: [
        {
          voce: "Software gestione",
          oggi: costoGestionale,
          conPSL: "Incluso",
        },
      ],
      totaleOggi: costoGestionale,
      totalePSL: costoPacchettoAnnuale,
      risparmioStimato: costoGestionale - costoPacchettoAnnuale,
    };
  }

  const fitpData = sectionC?.fitp || initialSectionC.fitp;
  const costiFITP = calcolaCostiFITP(fitpData);
  const psl = calcolaCostiPSL(costiFITP.tesseratiUnder18, costiFITP.tesseratiOver18, pslPackage);
  const categorie = calcolaConfrontoCategorieFITP(fitpData);

  const costoGestionale = Number(dataB.b5_2_costoSoftwareAnnuale) || 0;

  const righe = [
    {
      voce: "Software gestione",
      oggi: costoGestionale,
      conPSL: "Incluso",
    },
    ...categorie.map((c) => ({
      voce: c.label,
      oggi: c.oggi,
      conPSL: c.key === "tesseramento" ? c.conPSL : c.conPSLLabel,
    })),
  ];

  return {
    modalita: "fitp",
    righe,
    categorie,
    totaleOggi: costiFITP.totale + costoGestionale,
    totalePSL: psl.totaleNetto,
    risparmioStimato: (costiFITP.totale + costoGestionale) - psl.totaleNetto,
  };
}

// Argomenti commerciali statici (frontend)
export const ARGOMENTI_COMMERCIALI = [
  "I tuoi sponsor restano tuoi. Non prendiamo percentuale sul montepremi e amplifichiamo la visibilita dei tuoi partner su tutta la rete.",
  "I tuoi clienti che prenotano online oggi pagano una commissione aggiuntiva ad ogni prenotazione. Con PSL questo costo sparisce.",
  "Possibilita di proporre una quota aggiuntiva food and beverage ai tuoi clienti.",
];

// Argomenti specifici ACSI (mostrati solo se affiliazione ACSI)
export const ARGOMENTI_ACSI = [
  `Affiliazione ACSI: ${ACSI_AFFILIAZIONE.costoAnnuale.toFixed(2)} €/anno, con responsabilita civile gia inclusa (altri enti la fanno pagare a parte).`,
  "Convenzione SIAE: presentando l'affiliazione ACSI ai tuoi eventi ottieni uno sconto sulla SIAE.",
];

// Leva interna (non per il centro): possibilita di negoziare la trattenuta ACSI
// (riducendola, aumentando il guadagno netto del centro) se il centro fa numeri
// o e' multisede, tramite trattativa col presidente.
export const NOTA_TRATTATIVA_TRATTENUTA =
  "Se il centro fa numeri importanti o e' multisede, valutare con il presidente la possibilita di abbassare la trattenuta ACSI per aumentare il guadagno per tesseramento.";

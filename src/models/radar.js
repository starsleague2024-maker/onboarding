// MODELLO RADAR — 6 dimensioni di sintesi per pre-call / in-call / obiettivo PSL
// Ogni dimensione viene calcolata su scala 0-10 a partire dai semafori/dati raccolti.

import { SEMAFORO } from "./sectionA";

export const DIMENSIONI = [
  "Struttura campi",
  "Affiliazione",
  "Presenza online",
  "Pricing & Booking",
  "Tecnologia & App",
  "Community & Attivita",
];

const SEM_SCORE = {
  [SEMAFORO.VERDE]: 10,
  [SEMAFORO.GIALLO]: 6.5,
  [SEMAFORO.ARANCIONE]: 4,
  [SEMAFORO.ROSSO]: 1,
  [SEMAFORO.NEUTRO]: null, // ignorato nella media se non disponibile
};

function avgScores(scores) {
  const valid = scores.filter((s) => s !== null && s !== undefined);
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

/**
 * Calcola gli score radar (0-10) per le 6 dimensioni, in base allo stato
 * disponibile (pre-call: semaforiA + campiCopertiEffettivi; in-call: + semaforiB).
 *
 * @param {Object} params
 * @param {Object} params.semaforiA
 * @param {Object} params.semaforiB - opzionale (null se non ancora in call)
 * @param {Object} params.campiCopertiEffettivi - opzionale, override per "Struttura campi"
 * @returns {{ scores: number[], legenda: Array<{dimensione, stato, score, daMigliorare, daChiedere}> }}
 */
export function calcolaRadar({ semaforiA, semaforiB, campiCopertiEffettivi }) {
  const sA = semaforiA || {};
  const sB = semaforiB || {};

  // 1. Struttura campi
  const campiCopertiSem = campiCopertiEffettivi?.semaforo ?? sA.campiCoperti?.semaforo;
  const struttura = avgScores([
    SEM_SCORE[sA.campiTotali?.semaforo],
    SEM_SCORE[campiCopertiSem],
  ]);

  // 2. Affiliazione & burocrazia
  const affiliazione = avgScores([
    SEM_SCORE[sA.formaGiuridica?.semaforo],
    SEM_SCORE[sA.affiliazione?.semaforo],
  ]);

  // 3. Presenza online
  const presenzaOnline = avgScores([
    SEM_SCORE[sA.sitoWeb?.semaforo],
    SEM_SCORE[sA.instagram?.semaforo],
    SEM_SCORE[sA.facebook?.semaforo],
    SEM_SCORE[sA.googleRating?.semaforo],
    SEM_SCORE[sA.googleRecensioni?.semaforo],
  ]);

  // 4. Pricing & booking
  const pricing = avgScores([
    SEM_SCORE[sA.prezzoIndoor90?.semaforo],
    SEM_SCORE[sA.prezzoOutdoor90?.semaforo],
    SEM_SCORE[sA.piattaformaPrenotazioni?.semaforo],
  ]);

  // 5. Tecnologia & App
  const tecnologia = avgScores([
    SEM_SCORE[sA.appPropria?.semaforo],
    semaforiB ? SEM_SCORE[sB.b5_1_softwareGestione?.semaforo] : null,
    semaforiB ? SEM_SCORE[sB.b5_3_aperturaCambioSoftware?.semaforo] : null,
  ]);

  // 6. Community & attivita (per lo piu disponibile solo dopo la call)
  const community = avgScores([
    SEM_SCORE[sA.tesseratiRASD?.semaforo],
    semaforiB ? SEM_SCORE[sB.b2_1_prenotazioniSettimana?.semaforo] : null,
    semaforiB ? SEM_SCORE[sB.b2_4_affluenzaEventi?.semaforo] : null,
    semaforiB ? SEM_SCORE[sB.b2_4_tipiEventi?.semaforo] : null,
  ]);

  const raw = [struttura, affiliazione, presenzaOnline, pricing, tecnologia, community];

  // Per il grafico servono valori numerici: se null (dato non disponibile), usa 0
  const scores = raw.map((v) => (v === null ? 0 : Math.round(v * 10) / 10));
  const disponibili = raw.map((v) => v !== null);

  return { scores, disponibili };
}

/**
 * Obiettivo PSL: per ogni dimensione, il valore "top" raggiungibile.
 * Per le dimensioni gia ottime, l'obiettivo coincide con lo stato attuale;
 * per le altre l'obiettivo e' fissato a 9-10.
 */
export function calcolaObiettivoPSL(scoresAttuali) {
  return scoresAttuali.map((s) => Math.max(s, 9));
}

/**
 * Legenda testuale per ogni dimensione: stato, cosa migliorare, cosa chiedere/dire in call.
 */
export function generaLegenda({ dataA, dataB, semaforiA, semaforiB, scores }) {
  const sA = semaforiA || {};
  const sB = semaforiB || {};
  const inCall = !!semaforiB;

  const legenda = [];

  // 1. Struttura campi
  {
    let stato, daMigliorare, daChiedere;
    const campiTot = dataA.campiTotali || "?";
    const campiCop = dataA.campiCoperti || "0";
    stato = `${campiTot} campi totali, ${campiCop} coperti.`;
    if (sA.campiCoperti?.semaforo === SEMAFORO.ROSSO) {
      daMigliorare = "Nessun campo coperto: limite strutturale importante.";
      daChiedere = "Confermare l'assenza di campi coperti e chiedere se previsto pallone pressostatico invernale.";
    } else if (sA.campiCoperti?.semaforo === SEMAFORO.ARANCIONE) {
      daMigliorare = "Solo 1 campo coperto: capacita limitata per eventi al chiuso.";
      daChiedere = "Capire se prevedono di coprire altri campi in futuro.";
    } else {
      daMigliorare = "Struttura adeguata.";
      daChiedere = inCall ? "Nessuna domanda specifica necessaria." : "Confermare numero campi e disponibilita per eventi PSL.";
    }
    legenda.push({ dimensione: DIMENSIONI[0], stato, daMigliorare, daChiedere, score: scores[0] });
  }

  // 2. Affiliazione
  {
    const forma = (dataA.formaGiuridica || []).join("/") || "non identificata";
    const affil = (dataA.affiliazione || []).join("/") || "non identificata";
    const stato = `Forma giuridica: ${forma}. Affiliazione: ${affil}.`;
    let daMigliorare, daChiedere;
    if ((dataA.affiliazione || []).length > 1) {
      daMigliorare = "Doppia affiliazione: serve capire quale tenere e gestire eventuale migrazione.";
      daChiedere = "Chiedere quale affiliazione utilizzano principalmente e se sono aperti a una migrazione verso ACSI.";
    } else if (dataA.affiliazione?.includes("FITP")) {
      daMigliorare = "Affiliazione FITP: comporta vincoli su tornei/tesseramento.";
      daChiedere = "Valutare insieme una migrazione ad ACSI e quali vincoli FITP sono presenti sui campi.";
    } else if (dataA.affiliazione?.includes("ACSI")) {
      daMigliorare = "Affiliazione gia compatibile con PSL.";
      daChiedere = "Nessuna criticita da affrontare su questo punto.";
    } else {
      daMigliorare = "Affiliazione non chiara.";
      daChiedere = "Chiedere quale ente di affiliazione utilizzano.";
    }
    legenda.push({ dimensione: DIMENSIONI[1], stato, daMigliorare, daChiedere, score: scores[1] });
  }

  // 3. Presenza online
  {
    const rating = dataA.googleRating || "n/d";
    const recensioni = dataA.googleRecensioni || "0";
    const stato = `Sito: ${dataA.sitoWeb || "n/d"}. Instagram: ${dataA.instagram || "n/d"}. Google: ${rating}★ (${recensioni} recensioni).`;
    let daMigliorare = [];
    if (sA.sitoWeb?.semaforo === SEMAFORO.ARANCIONE) daMigliorare.push("sito web datato o assente");
    if (sA.instagram?.semaforo === SEMAFORO.ARANCIONE) daMigliorare.push("Instagram poco attivo/assente");
    if (sA.facebook?.semaforo === SEMAFORO.ARANCIONE) daMigliorare.push("Facebook poco attivo/assente");
    if (sA.googleRating?.semaforo === SEMAFORO.ROSSO) daMigliorare.push("rating Google basso");
    if (sA.googleRecensioni?.semaforo !== SEMAFORO.VERDE) daMigliorare.push("poche recensioni Google");
    const daMigliorareStr = daMigliorare.length > 0 ? `Migliorabile: ${daMigliorare.join(", ")}.` : "Presenza online solida.";
    let daChiedere;
    if (dataA.sitoWeb === "Assente") {
      daChiedere = "Sito assente: spiegare l'importanza di un sito dove inserire la prenotazione online (anche oltre l'app) a 0 commissioni, oltre ai benefici di visibilita PSL per social e recensioni.";
    } else if (daMigliorare.length > 0) {
      daChiedere = "Spiegare come PSL puo amplificare la visibilita social ed eventi per aumentare recensioni e seguito online.";
    } else {
      daChiedere = "Nessuna azione necessaria su questo fronte.";
    }
    legenda.push({ dimensione: DIMENSIONI[2], stato, daMigliorare: daMigliorareStr, daChiedere, score: scores[2] });
  }

  // 4. Pricing & booking
  {
    const stato = `Indoor 90': ${dataA.prezzoIndoor90 ? dataA.prezzoIndoor90 + "€" : "n/d"}. Outdoor 90': ${dataA.prezzoOutdoor90 ? dataA.prezzoOutdoor90 + "€" : "n/d"}. Booking online: ${dataA.piattaformaPrenotazioni || "n/d"}.`;
    let daMigliorare, daChiedere;
    if (sA.prezzoIndoor90?.semaforo === SEMAFORO.ARANCIONE || sA.prezzoOutdoor90?.semaforo === SEMAFORO.ARANCIONE) {
      daMigliorare = "Prezzi sotto la media di zona: possibile margine di rialzo.";
      daChiedere = "Confrontare i prezzi con la griglia regionale e discutere posizionamento.";
    } else if (sA.piattaformaPrenotazioni?.semaforo === SEMAFORO.GIALLO) {
      daMigliorare = "Usa una piattaforma di prenotazione esterna con commissioni.";
      daChiedere = "Spiegare che con PSL le commissioni di prenotazione vengono eliminate.";
    } else {
      daMigliorare = "Pricing e booking in linea.";
      daChiedere = "Confermare i prezzi attuali durante la call.";
    }
    legenda.push({ dimensione: DIMENSIONI[3], stato, daMigliorare, daChiedere, score: scores[3] });
  }

  // 5. Tecnologia & App
  {
    let stato = `App propria: ${dataA.appPropria || "n/d"}.`;
    if (inCall) stato += ` Software gestione: ${dataB.b5_1_softwareGestione || "n/d"}.`;
    let daMigliorare, daChiedere;
    if (dataA.appPropria === "Si (app propria)") {
      daMigliorare = "Il centro ha una app propria: potenziale ostacolo all'adozione PSL.";
      daChiedere = "Capire come integrare/sostituire l'app propria con la piattaforma PSL.";
    } else if (dataA.appPropria === "Si (app del gestionale)") {
      if (inCall && dataB.b0_1_appGestionaleUsata === "No") {
        daMigliorare = `App del gestionale presente ma non utilizzata (motivo: ${dataB.b0_1_appGestionaleMotivo || "da definire"}).`;
        daChiedere = "Approfondire il motivo del mancato utilizzo e proporre supporto PSL per l'adozione.";
      } else {
        daMigliorare = "App del gestionale presente: buon terreno per PSL.";
        daChiedere = "Confermare se l'app viene effettivamente utilizzata da centro e giocatori.";
      }
    } else if (dataA.appPropria === "No") {
      daMigliorare = "Nessuna app attuale: ottimo terreno fertile per PSL.";
      daChiedere = "Nessuna criticita: presentare i vantaggi della piattaforma PSL.";
    } else {
      daMigliorare = "Dato non disponibile.";
      daChiedere = "Chiedere se il centro utilizza una app propria o del gestionale.";
    }
    legenda.push({ dimensione: DIMENSIONI[4], stato, daMigliorare, daChiedere, score: scores[4] });
  }

  // 6. Community & Attivita
  {
    let stato = `Tesserati RASD: ${dataA.tesseratiRASD || "n/d"}.`;
    if (dataA.multisede === "Si") {
      stato += " ATTENZIONE: centro multisede, il dato tesserati potrebbe includere tutte le sedi.";
    }
    let daMigliorare, daChiedere;
    if (!inCall) {
      daMigliorare = "Dato completo disponibile solo dopo la call.";
      daChiedere = "Chiedere numero tesserati, prenotazioni settimanali, giocatori ricorrenti ed esperienza con eventi/tornei.";
    } else {
      stato += ` Prenotazioni/settimana: ${dataB.b2_1_prenotazioniSettimana || "n/d"}. Affluenza eventi: ${dataB.b2_4_affluenzaEventi || "n/d"}.`;
      if (dataB.b8_1_problemaPrincipale === "Fasce vuote") {
        stato += " Problema principale segnalato: fasce orarie vuote.";
        daMigliorare = "Riempire le fasce orarie vuote.";
        daChiedere = "Presentare la soluzione PSL basata su gamification tramite app per riempire le fasce vuote con sfide ed eventi.";
      } else if (sB.b2_1_prenotazioniSettimana?.semaforo === SEMAFORO.ROSSO || sB.b2_4_affluenzaEventi?.semaforo === SEMAFORO.ROSSO) {
        daMigliorare = "Base clienti ancora limitata: PSL puo aiutare a portare nuovi giocatori.";
        daChiedere = "Illustrare come gli eventi PSL aumentano l'affluenza nelle fasce vuote.";
      } else {
        daMigliorare = "Community attiva e solida.";
        daChiedere = "Nessuna criticita: discutere come PSL puo valorizzare la community esistente.";
      }
    }
    legenda.push({ dimensione: DIMENSIONI[5], stato, daMigliorare, daChiedere, score: scores[5] });
  }

  return legenda;
}

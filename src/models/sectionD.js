// SEZIONE D — ANALISI AUTOMATICA
// KO assoluti, incongruenze, semaforo finale, raccomandazioni

import { SEMAFORO } from "./sectionA";
import { labelForField } from "./fieldLabels";

/**
 * Calcola il semaforo "corretto" di A.6 (campi coperti), tenendo conto
 * del pallone pressostatico invernale (B.1.0): se il centro copre
 * i campi outdoor in inverno, i campi vanno considerati coperti
 * a tutti gli effetti per il KO e il conteggio.
 */
export function calcolaCampiCopertiEffettivi(dataA, dataB, semaforiA) {
  // B1.4: in call e' emerso lo stato reale dei campi coperti, diverso da A.6
  if (dataB.b1_4_statoCampiCoperti === "Si, copertura fissa" || dataB.b1_4_statoCampiCoperti === "Si, copertura stagionale (pallone)") {
    const n = Number(dataB.b1_4_quantiCopertiReali);
    let semaforo = SEMAFORO.NEUTRO;
    if (!isNaN(n) && dataB.b1_4_quantiCopertiReali !== "") {
      if (n === 0) semaforo = SEMAFORO.ROSSO;
      else if (n === 1) semaforo = SEMAFORO.ARANCIONE;
      else semaforo = SEMAFORO.VERDE;
    }
    return { semaforo, needsCallFlag: false, isKO: n === 0 };
  }
  if (dataB.b1_4_statoCampiCoperti === "Prevista in futuro") {
    return { semaforo: SEMAFORO.ARANCIONE, needsCallFlag: false, isKO: false };
  }
  if (dataB.b1_4_statoCampiCoperti === "Nessuno") {
    return { semaforo: SEMAFORO.ROSSO, needsCallFlag: false, isKO: true };
  }

  return semaforiA.campiCoperti;
}

/**
 * Verifica i KO assoluti (blocco immediato).
 * Ritorna array di oggetti { code, message }
 */
export function checkKO(dataA, dataB, semaforiA, semaforiB) {
  const ko = [];

  if (semaforiA.denominazione?.isKO) {
    ko.push({ code: "A.1", message: "Denominazione ufficiale non trovata e non fornita in call" });
  }
  if (semaforiA.formaGiuridica?.isKO) {
    ko.push({ code: "A.2", message: "Forma giuridica non trovata e non fornita in call" });
  }
  if (semaforiA.affiliazione?.isKO) {
    ko.push({ code: "A.3", message: "Affiliazione non trovata e non fornita in call" });
  }

  const campiCopertiEffettivi = calcolaCampiCopertiEffettivi(dataA, dataB, semaforiA);
  if (campiCopertiEffettivi?.isKO) {
    ko.push({ code: "A.6", message: "0 campi coperti (anche considerando il pallone pressostatico invernale)" });
  }

  if (semaforiB.b1_2_campiDisponibiliPSL?.isKO) {
    ko.push({ code: "B.1.2", message: "0 campi disponibili per eventi PSL" });
  }

  return ko;
}

/**
 * Verifica le incongruenze tra dati di Sezione A e B (visibili solo backend).
 */
export function checkIncongruenze(dataA, dataB) {
  const incongruenze = [];

  // A.4 vs B.5.5 — scarto > 30%
  const a4 = Number(dataA.tesseratiRASD);
  const b55 = Number(dataB.b5_5_tesseratiTotali) || Number(dataB.b0_tesseratiTotali);
  if (!isNaN(a4) && !isNaN(b55) && a4 > 0 && b55 > 0) {
    const scarto = Math.abs(a4 - b55) / a4;
    if (scarto > 0.3) {
      incongruenze.push({
        code: "A.4 vs B.5.5",
        message: `Tesserati dichiarati (${a4}) vs tesserati medi annuali in call (${b55}) — scarto ${(scarto * 100).toFixed(0)}%`,
      });
    }
  }

  // A.5 vs campi dichiarati in call (B1.1/B1.2 non danno direttamente il totale,
  // quindi confrontiamo con campi coperti dichiarati indirettamente se disponibile)
  // Placeholder: se in futuro si raccoglie un campo B per "campi totali dichiarati in call"

  // A.8/A.9 vs prezzi dichiarati in call — placeholder, nessun campo B dedicato attualmente
  // (da estendere se si aggiunge una domanda B per i prezzi dichiarati)

  return incongruenze;
}

/**
 * Conta i semafori per colore tra le sezioni A e B.
 */
function contaSemafori(semaforiA, semaforiB, campiCopertiEffettivi) {
  const conteggio = { verde: 0, giallo: 0, arancione: 0, rosso: 0, neutro: 0 };

  for (const key in semaforiA) {
    let s = semaforiA[key]?.semaforo;
    if (key === "campiCoperti" && campiCopertiEffettivi) {
      s = campiCopertiEffettivi.semaforo;
    }
    if (s && conteggio[s] !== undefined) conteggio[s]++;
  }
  for (const key in semaforiB) {
    const s = semaforiB[key]?.semaforo;
    if (s && conteggio[s] !== undefined) conteggio[s]++;
  }

  return conteggio;
}

/**
 * Determina il semaforo finale e la raccomandazione.
 */
export function calcolaAnalisiFinale(dataA, dataB, semaforiA, semaforiB) {
  const koList = checkKO(dataA, dataB, semaforiA, semaforiB);
  const incongruenze = checkIncongruenze(dataA, dataB);
  const campiCopertiEffettivi = calcolaCampiCopertiEffettivi(dataA, dataB, semaforiA);
  const conteggio = contaSemafori(semaforiA, semaforiB, campiCopertiEffettivi);

  // Punti arancioni "da risolvere" — esclude quelli che sono gia KO
  const arancioniDettaglio = [];
  for (const key in semaforiA) {
    let s = semaforiA[key]?.semaforo;
    if (key === "campiCoperti" && campiCopertiEffettivi) {
      s = campiCopertiEffettivi.semaforo;
    }
    if (s === SEMAFORO.ARANCIONE) arancioniDettaglio.push({ section: "A", code: key });
  }
  for (const key in semaforiB) {
    if (semaforiB[key]?.semaforo === SEMAFORO.ARANCIONE) arancioniDettaglio.push({ section: "B", code: key });
  }

  let semaforoFinale;
  let raccomandazione;

  if (koList.length > 0) {
    semaforoFinale = SEMAFORO.ROSSO;
    const motivi = koList.map((k) => `${k.code}: ${k.message}`).join("; ");
    raccomandazione = `Non idoneo al momento. Motivo: ${motivi}. Ricontattare se risolti.`;
  } else if (conteggio.arancione >= 2) {
    semaforoFinale = SEMAFORO.ARANCIONE;
    const punti = arancioniDettaglio.map((p) => labelForField(p.section, p.code)).join(", ");
    raccomandazione = `Potenziale confermato. Risolvere prima: ${punti}. Ricontattare quando risolti.`;
  } else {
    semaforoFinale = SEMAFORO.VERDE;
    raccomandazione = "Procedere con PSL Full. Prossimo step: invio proposta.";
  }

  // Segnali positivi backend
  const segnaliPositivi = [];
  if (dataB.b7_1_organizzaTornei === "Si") {
    segnaliPositivi.push("Centro con tornei a montepremi: ha sponsor + cultura eventi -> appetibile PSL Full");
  }
  const nonAgonistici = Number(dataB.b5_5_tesseratiNonAgonistici);
  if (!isNaN(nonAgonistici) && nonAgonistici > 60) {
    segnaliPositivi.push("Alto numero di tesserati non agonistici");
  }
  if (dataB.b5_1_softwareGestione === "Nessuno/manuale") {
    segnaliPositivi.push("Nessun gestionale attuale: opportunita di adozione PSL");
  }

  return {
    koList,
    incongruenze,
    conteggio,
    arancioniDettaglio,
    semaforoFinale,
    raccomandazione,
    segnaliPositivi,
  };
}

// SEZIONE A — PRE-CALL
// Definizione campi, opzioni e logica semaforo

import { confrontaPrezzo, REGIONI } from "./pricingGrid";

// Semaforo helper colors
export const SEMAFORO = {
  VERDE: "verde",
  GIALLO: "giallo",
  ARANCIONE: "arancione",
  ROSSO: "rosso",
  NEUTRO: "neutro", // informativo / nessun semaforo
};

// Definizione struttura iniziale dati Sezione A
export const initialSectionA = {
  // A.1
  denominazione: "",
  // A.2 - multi-select: puo avere piu forme giuridiche (es. ASD + SSD)
  formaGiuridica: [], // array di: "ASD" | "SSD" | "Impresa/SRL" | "Non trovata"
  // A.3 - multi-select: puo avere piu affiliazioni (es. FITP + ente promozione)
  affiliazione: [], // array di: "ACSI" | "FITP" | "Altro EPS" | "Nessuna" | "Non trovata"
  // A.4 - tesserati dichiarati dal RASD (Sport e Salute). Se non trovato, si chiede in B.
  tesseratiRASD: "",
  // A.5
  campiTotali: "",
  // A.6 - campi coperti (da verificare in call: pallone pressostatico invernale puo coprire campi outdoor)
  campiCoperti: "",
  // A.7
  regione: "",
  // A.8 / A.9
  prezzoIndoor90: "",
  prezzoOutdoor90: "",
  // A.10
  piattaformaPrenotazioni: "", // "Si" | "No" | ""
  gestionalePrenotazioni: "",  // backend brand: Playtomic / Wansport / Sport Clubbi / Due Palleggi
  // A.11
  sitoWeb: "", // "Aggiornato" | "Datato" | "Assente"
  // A.12
  instagram: "", // "Attivo" | "Poco attivo" | "Assente"
  // A.13
  facebook: "", // "Attivo" | "Poco attivo" | "Assente"
  // A.14
  googleRating: "",
  // A.15
  googleRecensioni: "",
  // A.16 - Gestionale identificato online (tramite link prenotazione/sito/social)
  gestionaleVisibile: "", // "Si" | "No" | "" -- "Si" = abbiamo individuato quale gestionale usa
  gestionaleBrand: "",    // quale gestionale (se identificato)
  // A.18 - App propria del centro
  appPropria: "", // "Si (app propria)" | "Si (app del gestionale)" | "No" | ""
};

// Opzioni dropdown
export const OPZIONI = {
  formaGiuridica: ["ASD", "SSD", "Impresa/SRL", "Non trovata"],
  affiliazione: ["ACSI", "FITP", "Altro EPS", "Nessuna", "Non trovata"],
  regione: REGIONI,
  piattaformaPrenotazioni: ["Si", "No", "Non trovato"],
  gestionaleBrand: ["Playtomic", "Wansport", "Sport Clubbi", "Due Palleggi", "Altro"],
  sitoWeb: ["Aggiornato", "Datato", "Assente"],
  socialStato: ["Attivo", "Poco attivo", "Assente"],
  gestionaleVisibile: ["Si", "No", "Non trovato"],
  appPropria: ["Si (app propria)", "Si (app del gestionale)", "No"],
};

/**
 * Calcola i semafori per ogni campo della Sezione A.
 * Ritorna mappa { campo: { semaforo, label, needsCallFlag } }
 */
export function calcolaSemaforiA(data) {
  const result = {};

  // A.1 Denominazione
  result.denominazione = {
    semaforo: data.denominazione ? SEMAFORO.VERDE : SEMAFORO.ROSSO,
    needsCallFlag: !data.denominazione,
    isKO: !data.denominazione,
  };

  // A.2 Forma giuridica (multi-select)
  {
    const arr = data.formaGiuridica || [];
    if (arr.length === 0) {
      result.formaGiuridica = { semaforo: SEMAFORO.ROSSO, needsCallFlag: true, isKO: true };
    } else if (arr.includes("ASD") || arr.includes("SSD")) {
      result.formaGiuridica = { semaforo: SEMAFORO.VERDE, needsCallFlag: false, isKO: false };
    } else if (arr.includes("Impresa/SRL")) {
      result.formaGiuridica = { semaforo: SEMAFORO.GIALLO, needsCallFlag: false, isKO: false };
    } else {
      result.formaGiuridica = { semaforo: SEMAFORO.ROSSO, needsCallFlag: true, isKO: true };
    }
  }

  // A.3 Affiliazione (multi-select)
  // Se ci sono piu affiliazioni (es. FITP + ente promozione), il semaforo riflette
  // una via di mezzo: la presenza di ACSI e ottima, ma se c'e anche un altro EPS/FITP
  // da gestire (migrazione), resta una flag media (giallo) -- da chiarire in call.
  {
    const arr = data.affiliazione || [];
    if (arr.length === 0) {
      result.affiliazione = { semaforo: SEMAFORO.ROSSO, needsCallFlag: true, isKO: true };
    } else if (arr.length > 1) {
      // piu affiliazioni: media -> giallo (da approfondire quale tenere/migrare in call)
      result.affiliazione = { semaforo: SEMAFORO.GIALLO, needsCallFlag: false, isKO: false };
    } else if (arr.includes("ACSI")) {
      result.affiliazione = { semaforo: SEMAFORO.VERDE, needsCallFlag: false, isKO: false };
    } else if (arr.includes("FITP")) {
      result.affiliazione = { semaforo: SEMAFORO.GIALLO, needsCallFlag: false, isKO: false };
    } else if (arr.includes("Altro EPS") || arr.includes("Nessuna")) {
      result.affiliazione = { semaforo: SEMAFORO.ARANCIONE, needsCallFlag: false, isKO: false };
    } else {
      result.affiliazione = { semaforo: SEMAFORO.ROSSO, needsCallFlag: true, isKO: true };
    }
  }

  // A.4 Tesserati dichiarati dal RASD
  {
    const n = Number(data.tesseratiRASD);
    let semaforo = SEMAFORO.NEUTRO;
    let needsCallFlag = data.tesseratiRASD === "";
    if (data.tesseratiRASD !== "" && !isNaN(n)) {
      if (n < 15) semaforo = SEMAFORO.ROSSO;
      else if (n < 60) semaforo = SEMAFORO.ARANCIONE;
      else semaforo = SEMAFORO.VERDE;
    }
    result.tesseratiRASD = { semaforo, needsCallFlag, isKO: false };
  }

  // A.5 Campi totali
  {
    const n = Number(data.campiTotali);
    let semaforo = SEMAFORO.NEUTRO;
    let needsCallFlag = data.campiTotali === "";
    if (!isNaN(n) && data.campiTotali !== "") {
      if (n === 1) semaforo = SEMAFORO.ROSSO;
      else if (n === 2) semaforo = SEMAFORO.ARANCIONE;
      else semaforo = SEMAFORO.VERDE;
    }
    result.campiTotali = { semaforo, needsCallFlag, isKO: false };
  }

  // A.6 Campi coperti — 0 = KO assoluto (salvo conferma pallone pressostatico in B)
  {
    const n = Number(data.campiCoperti);
    let semaforo = SEMAFORO.NEUTRO;
    let needsCallFlag = data.campiCoperti === "";
    let isKO = false;
    if (!isNaN(n) && data.campiCoperti !== "") {
      if (n === 0) { semaforo = SEMAFORO.ROSSO; isKO = true; }
      else if (n === 1) semaforo = SEMAFORO.ARANCIONE;
      else semaforo = SEMAFORO.VERDE;
    }
    result.campiCoperti = { semaforo, needsCallFlag, isKO };
  }

  // A.7 Regione — nessun semaforo proprio
  result.regione = { semaforo: SEMAFORO.NEUTRO, needsCallFlag: false, isKO: false };

  // A.8 Prezzo indoor
  {
    const cmp = confrontaPrezzo(data.regione, "indoor", data.prezzoIndoor90);
    let semaforo = SEMAFORO.NEUTRO;
    if (cmp === "sotto") semaforo = SEMAFORO.ARANCIONE;
    else if (cmp === "in_linea") semaforo = SEMAFORO.VERDE;
    else if (cmp === "premium") semaforo = SEMAFORO.GIALLO;
    result.prezzoIndoor90 = { semaforo, needsCallFlag: false, isKO: false };
  }

  // A.9 Prezzo outdoor
  {
    const cmp = confrontaPrezzo(data.regione, "outdoor", data.prezzoOutdoor90);
    let semaforo = SEMAFORO.NEUTRO;
    if (cmp === "sotto") semaforo = SEMAFORO.ARANCIONE;
    else if (cmp === "in_linea") semaforo = SEMAFORO.VERDE;
    else if (cmp === "premium") semaforo = SEMAFORO.GIALLO;
    result.prezzoOutdoor90 = { semaforo, needsCallFlag: false, isKO: false };
  }

  // A.10 Piattaforma prenotazioni
  if (data.piattaformaPrenotazioni === "Si") {
    result.piattaformaPrenotazioni = { semaforo: SEMAFORO.GIALLO, needsCallFlag: false, isKO: false };
  } else if (data.piattaformaPrenotazioni === "No") {
    result.piattaformaPrenotazioni = { semaforo: SEMAFORO.VERDE, needsCallFlag: false, isKO: false };
  } else {
    result.piattaformaPrenotazioni = { semaforo: SEMAFORO.NEUTRO, needsCallFlag: true, isKO: false };
  }

  // A.11 Sito web
  switch (data.sitoWeb) {
    case "Aggiornato":
      result.sitoWeb = { semaforo: SEMAFORO.VERDE, needsCallFlag: false, isKO: false };
      break;
    case "Datato":
    case "Assente":
      result.sitoWeb = { semaforo: SEMAFORO.ARANCIONE, needsCallFlag: false, isKO: false };
      break;
    default:
      result.sitoWeb = { semaforo: SEMAFORO.NEUTRO, needsCallFlag: true, isKO: false };
  }

  // A.12 Instagram
  result.instagram = socialSemaforo(data.instagram);
  // A.13 Facebook
  result.facebook = socialSemaforo(data.facebook);

  // A.14 Google rating
  {
    const n = Number(data.googleRating);
    let semaforo = SEMAFORO.ARANCIONE; // non presente = arancione
    if (data.googleRating !== "" && !isNaN(n)) {
      if (n < 3.5) semaforo = SEMAFORO.ROSSO;
      else if (n <= 4.0) semaforo = SEMAFORO.ARANCIONE;
      else semaforo = SEMAFORO.VERDE;
    }
    result.googleRating = { semaforo, needsCallFlag: false, isKO: false };
  }

  // A.15 Google recensioni
  {
    const n = Number(data.googleRecensioni);
    let semaforo = SEMAFORO.NEUTRO;
    if (data.googleRecensioni !== "" && !isNaN(n)) {
      if (n < 10) semaforo = SEMAFORO.ARANCIONE;
      else if (n <= 30) semaforo = SEMAFORO.GIALLO;
      else semaforo = SEMAFORO.VERDE;
    }
    result.googleRecensioni = { semaforo, needsCallFlag: false, isKO: false };
  }

  // A.16 Gestionale identificato online — informativo, nessun blocco
  if (data.gestionaleVisibile === "Si" || data.gestionaleVisibile === "No") {
    result.gestionaleVisibile = { semaforo: SEMAFORO.NEUTRO, needsCallFlag: false, isKO: false };
  } else {
    result.gestionaleVisibile = { semaforo: SEMAFORO.NEUTRO, needsCallFlag: true, isKO: false };
  }

  // A.18 App propria del centro
  switch (data.appPropria) {
    case "Si (app propria)":
      result.appPropria = { semaforo: SEMAFORO.ROSSO, needsCallFlag: false, isKO: false };
      break;
    case "Si (app del gestionale)":
      result.appPropria = { semaforo: SEMAFORO.GIALLO, needsCallFlag: false, isKO: false };
      break;
    case "No":
      result.appPropria = { semaforo: SEMAFORO.VERDE, needsCallFlag: false, isKO: false };
      break;
    default:
      result.appPropria = { semaforo: SEMAFORO.NEUTRO, needsCallFlag: true, isKO: false };
  }

  return result;
}

function socialSemaforo(value) {
  switch (value) {
    case "Attivo":
      return { semaforo: SEMAFORO.VERDE, needsCallFlag: false, isKO: false };
    case "Poco attivo":
    case "Assente":
      return { semaforo: SEMAFORO.ARANCIONE, needsCallFlag: false, isKO: false };
    default:
      return { semaforo: SEMAFORO.NEUTRO, needsCallFlag: true, isKO: false };
  }
}

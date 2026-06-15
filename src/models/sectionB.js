// SEZIONE B — IN-CALL
// Domande, opzioni predefinite e logica semaforo

import { SEMAFORO } from "./sectionA";

export const initialSectionB = {
  // B0 - Tesserati (se non trovati in A.4 / RASD)
  b0_tesseratiTotali: "", // chiesto qui solo se A.4 non trovato

  // B0.1 - Se A.18 = "Si (app del gestionale)": viene effettivamente utilizzata?
  b0_1_appGestionaleUsata: "", // "Si" | "No" | "In parte" -- solo informativo, nessun semaforo
  b0_1_appGestionaleMotivo: "", // "Non si trovano bene" | "Non sanno sfruttarla" | "I giocatori non la usano" | "Altro"
  b0_1_appGestionaleMotivoAltro: "", // testo libero se "Altro"

  // B1 - Campi e vincoli
  b1_4_statoCampiCoperti: "", // "Nessuno" | "Si, copertura fissa" | "Si, copertura stagionale (pallone)" | "Prevista in futuro" -- chiesto se A.6 = 0 o vuoto
  b1_4_quantiCopertiReali: "", // se "Si, ..." quanti campi coperti effettivi
  b1_1_vincoliFITP: "",        // "Nessuno" | "Alcuni" | "Tutti" -- mostrato solo se A.3 affiliazione include "FITP"
  b1_1_quantiVincolati: "",     // testo, se "Alcuni"
  b1_2_campiDisponibiliPSL: "", // "0" | "1" | "2" | "3+"
  b1_3_clausolaResponsabilita: "", // "Si" | "No" | "In valutazione"

  // B2 - Base clienti
  b2_1_prenotazioniSettimana: "", // "<10" | "10-20" | "21-40" | "40+"
  b2_2_canaleComunicazione: "",   // "Nessuno" | "Poco gestito" | "Attivo e aggiornato"
  b2_2_canali: [],                 // multi-select: "WhatsApp" | "Email" | "Messaggi privati" | "Social" -- mostrato se b2_2 != "Nessuno"
  b2_4_affluenzaEventi: "",        // "0%" | "1-25%" | "26-50%" | "51-75%" | "76-100%" -- affluenza agli eventi organizzati dal centro, rispetto ai tesserati
  b2_4_tipiEventi: [],             // multi-select: "Americani" | "Tornei" | "Campionati" | "Altro"

  // B3 - Stagionalita
  b3_1_stagionalita: "", // "Tutto l'anno" | "Meglio estate" | "Meglio inverno" | "Inverno debole" | "Estate debole" | "Periodo morto"
  b3_1_periodoMorto: "", // testo libero se "Periodo morto"

  // B4 - Staff
  b4_1_personeStaff: "",        // numero (campo libero numerico)
  b4_2_referentePSL: "",         // "No" | "Titolare limitato" | "Staff dedicato"
  b4_3_maestriStabili: "",       // "No" | "A chiamata" | "Si, figure fisse"

  // B5 - Gestionale e costi
  b5_1_softwareGestione: "",     // "Nessuno/manuale" | "Excel" | "Gestionale di proprieta del centro" | "Piattaforma prenotazioni"
  b5_1_softwareNome: "",          // testo se "Software dedicato" - backend tendina
  b5_2_costoSoftwareAnnuale: "",
  b5_3_aperturaCambioSoftware: "", // "No" | "Con resistenze" | "Si"
  b5_3_notaResistenza: "",          // testo libero se "No" o "Con resistenze"
  b5_4_migrazioneEPS: "",          // "Si" | "No" | "In valutazione"
  b5_5_tesseratiTotali: "",
  b5_5_tesseratiAgonistici: "",
  b5_5_tesseratiNonAgonistici: "",
  b5_6_percOnline: "",   // % prenotazioni online
  b5_6_percDesk: "",      // % prenotazioni desk (WA/altri canali)

  // B6 - Pricing
  b6_1_abbonamenti: "",       // "No" | "Si"
  b6_1_abbonamentiDesc: "",    // testo se "Si"
  b6_2_prezziDifferenziati: "", // "No" | "Si"

  // B7 - Tornei e montepremi
  b7_1_organizzaTornei: "",   // "No" | "Si"
  b7_1_fasceMontepremi: [],    // multi-select: "Senza premio in denaro" | "Fino a 500€" | "Fino a 1000€" | "1500€+"
  b7_1_quantiAnno: "",          // numero totale tornei/anno tra le fasce selezionate

  // B8 - Motivazione
  b8_1_problemaPrincipale: "", // "Fasce vuote" | "Fidelizzazione" | "Nuovi giocatori" | "Tornei e competizioni" | "Fatturato"
  b8_2_esperienzaCircuiti: "", // "Mai" | "Positiva" | "Negativa"
  b8_2_esperienzaNegativaPerche: "", // testo
  b8_3_disponibilitaImpegno: "", // "No" | "Limitata" | "Attiva"
};

export const OPZIONI_B = {
  b1_4_statoCampiCoperti: ["Nessuno", "Si, copertura fissa", "Si, copertura stagionale (pallone)", "Prevista in futuro"],
  b0_1_appGestionaleUsata: ["Si", "No", "In parte"],
  b0_1_appGestionaleMotivo: ["Non si trovano bene", "Non sanno sfruttarla", "I giocatori non la usano", "Altro"],
  b1_1_vincoliFITP: ["Nessuno", "Alcuni", "Tutti"],
  b1_2_campiDisponibiliPSL: ["0", "1", "2", "3+"],
  b1_3_clausolaResponsabilita: ["Si", "No", "In valutazione"],

  b2_1_prenotazioniSettimana: ["<10", "10-20", "21-40", "40+"],
  b2_2_canaleComunicazione: ["Nessuno", "Poco gestito", "Attivo e aggiornato"],
  b2_2_canali: ["WhatsApp", "Email", "Messaggi privati", "Social"],
  b2_4_affluenzaEventi: ["0%", "1-25%", "26-50%", "51-75%", "76-100%"],
  b2_4_tipiEventi: ["Americani", "Tornei", "Campionati", "Altro"],

  b3_1_stagionalita: ["Tutto l'anno", "Meglio estate", "Meglio inverno", "Inverno debole", "Estate debole", "Periodo morto"],

  b4_2_referentePSL: ["No", "Titolare limitato", "Staff dedicato"],
  b4_3_maestriStabili: ["No", "A chiamata", "Si, figure fisse"],

  b5_1_softwareGestione: ["Nessuno/manuale", "Excel", "Gestionale di proprieta del centro", "Piattaforma prenotazioni"],
  b5_1_softwareNomeBrand: ["Playtomic", "Wansport", "Sport Clubbi", "Due Palleggi", "Altro"],
  b5_3_aperturaCambioSoftware: ["No", "Con resistenze", "Si"],
  b5_4_migrazioneEPS: ["Si", "No", "In valutazione"],

  b6_1_abbonamenti: ["No", "Si"],
  b6_2_prezziDifferenziati: ["No", "Si"],

  b7_1_organizzaTornei: ["No", "Si"],
  b7_1_fasceMontepremi: ["Senza premio in denaro", "Fino a 500€", "Fino a 1000€", "1500€+"],

  b8_1_problemaPrincipale: ["Fasce vuote", "Fidelizzazione", "Nuovi giocatori", "Tornei e competizioni", "Fatturato"],
  b8_2_esperienzaCircuiti: ["Mai", "Positiva", "Negativa"],
  b8_3_disponibilitaImpegno: ["No", "Limitata", "Attiva"],
};

/**
 * Calcola i semafori per ogni campo della Sezione B.
 */
export function calcolaSemaforiB(data) {
  const result = {};

  // B0 tesserati totali (fallback) — informativo
  result.b0_tesseratiTotali = sem(SEMAFORO.NEUTRO);

  // B1.4 stato reale dei campi coperti (sostituisce A.6 se diverso)
  switch (data.b1_4_statoCampiCoperti) {
    case "Nessuno": result.b1_4_statoCampiCoperti = sem(SEMAFORO.ROSSO, true); break;
    case "Si, copertura fissa": result.b1_4_statoCampiCoperti = sem(SEMAFORO.VERDE); break;
    case "Si, copertura stagionale (pallone)": result.b1_4_statoCampiCoperti = sem(SEMAFORO.VERDE); break;
    case "Prevista in futuro": result.b1_4_statoCampiCoperti = sem(SEMAFORO.ARANCIONE); break;
    default: result.b1_4_statoCampiCoperti = sem(SEMAFORO.NEUTRO);
  }

  // B0.1 app gestionale usata — entrambe le risposte sono un buon segnale per noi (verde),
  // ma "No" indica un'area su cui lavorare (motivo raccolto separatamente)
  // Solo informativo: nessun semaforo (Si/No/In parte sono tutti segnali positivi per noi)
  result.b0_1_appGestionaleUsata = sem(SEMAFORO.NEUTRO);


  // B1.1 vincoli FITP
  switch (data.b1_1_vincoliFITP) {
    case "Nessuno": result.b1_1_vincoliFITP = sem(SEMAFORO.VERDE); break;
    case "Alcuni": result.b1_1_vincoliFITP = sem(SEMAFORO.GIALLO); break;
    case "Tutti": result.b1_1_vincoliFITP = sem(SEMAFORO.ROSSO); break;
    default: result.b1_1_vincoliFITP = sem(SEMAFORO.NEUTRO);
  }

  // B1.2 campi disponibili PSL — 0 = KO
  switch (data.b1_2_campiDisponibiliPSL) {
    case "0": result.b1_2_campiDisponibiliPSL = sem(SEMAFORO.ROSSO, true); break;
    case "1": result.b1_2_campiDisponibiliPSL = sem(SEMAFORO.ARANCIONE); break;
    case "2":
    case "3+": result.b1_2_campiDisponibiliPSL = sem(SEMAFORO.VERDE); break;
    default: result.b1_2_campiDisponibiliPSL = sem(SEMAFORO.NEUTRO);
  }

  // B1.3 clausola responsabilita
  switch (data.b1_3_clausolaResponsabilita) {
    case "Si": result.b1_3_clausolaResponsabilita = sem(SEMAFORO.VERDE); break;
    case "No": result.b1_3_clausolaResponsabilita = sem(SEMAFORO.ROSSO); break;
    case "In valutazione": result.b1_3_clausolaResponsabilita = sem(SEMAFORO.ARANCIONE); break;
    default: result.b1_3_clausolaResponsabilita = sem(SEMAFORO.NEUTRO);
  }

  // B2.1 prenotazioni settimana
  switch (data.b2_1_prenotazioniSettimana) {
    case "<10": result.b2_1_prenotazioniSettimana = sem(SEMAFORO.ROSSO); break;
    case "10-20": result.b2_1_prenotazioniSettimana = sem(SEMAFORO.ARANCIONE); break;
    case "21-40":
    case "40+": result.b2_1_prenotazioniSettimana = sem(SEMAFORO.VERDE); break;
    default: result.b2_1_prenotazioniSettimana = sem(SEMAFORO.NEUTRO);
  }

  // B2.2 canale comunicazione
  switch (data.b2_2_canaleComunicazione) {
    case "Nessuno": result.b2_2_canaleComunicazione = sem(SEMAFORO.ROSSO); break;
    case "Poco gestito": result.b2_2_canaleComunicazione = sem(SEMAFORO.ARANCIONE); break;
    case "Attivo e aggiornato": result.b2_2_canaleComunicazione = sem(SEMAFORO.VERDE); break;
    default: result.b2_2_canaleComunicazione = sem(SEMAFORO.NEUTRO);
  }

  // B2.2 canali utilizzati: standard minimo = almeno il gruppo WhatsApp
  {
    const canali = data.b2_2_canali || [];
    let semaforo = SEMAFORO.NEUTRO;
    if (data.b2_2_canaleComunicazione && data.b2_2_canaleComunicazione !== "Nessuno") {
      if (canali.length === 0) semaforo = SEMAFORO.ARANCIONE;
      else if (canali.includes("WhatsApp") && canali.length === 1) semaforo = SEMAFORO.GIALLO;
      else if (canali.includes("WhatsApp")) semaforo = SEMAFORO.VERDE;
      else semaforo = SEMAFORO.ARANCIONE;
    }
    result.b2_2_canali = sem(semaforo);
  }

  // B2.3 giocatori ricorrenti
  // B2.4 affluenza agli eventi organizzati dal centro (% sui tesserati)
  switch (data.b2_4_affluenzaEventi) {
    case "0%": result.b2_4_affluenzaEventi = sem(SEMAFORO.ROSSO); break;
    case "1-25%": result.b2_4_affluenzaEventi = sem(SEMAFORO.ARANCIONE); break;
    case "26-50%": result.b2_4_affluenzaEventi = sem(SEMAFORO.GIALLO); break;
    case "51-75%":
    case "76-100%": result.b2_4_affluenzaEventi = sem(SEMAFORO.VERDE); break;
    default: result.b2_4_affluenzaEventi = sem(SEMAFORO.NEUTRO);
  }

  // B2.4b tipi di eventi organizzati: piu tipi = meglio
  {
    const tipi = data.b2_4_tipiEventi || [];
    let semaforo = SEMAFORO.NEUTRO;
    if (data.b2_4_tipiEventi !== undefined) {
      if (tipi.length === 0) semaforo = SEMAFORO.ROSSO;
      else if (tipi.length === 1) semaforo = SEMAFORO.ARANCIONE;
      else if (tipi.length === 2) semaforo = SEMAFORO.GIALLO;
      else semaforo = SEMAFORO.VERDE;
    }
    result.b2_4_tipiEventi = sem(semaforo);
  }

  // B3.1 stagionalita
  switch (data.b3_1_stagionalita) {
    case "Tutto l'anno": result.b3_1_stagionalita = sem(SEMAFORO.VERDE); break;
    case "Meglio estate":
    case "Meglio inverno": result.b3_1_stagionalita = sem(SEMAFORO.GIALLO); break;
    case "Inverno debole":
    case "Estate debole": result.b3_1_stagionalita = sem(SEMAFORO.ARANCIONE); break;
    case "Periodo morto": result.b3_1_stagionalita = sem(SEMAFORO.ROSSO); break; // non KO automatico, vedi nota
    default: result.b3_1_stagionalita = sem(SEMAFORO.NEUTRO);
  }

  // B4.1 persone staff
  {
    const n = Number(data.b4_1_personeStaff);
    let semaforo = SEMAFORO.NEUTRO;
    if (data.b4_1_personeStaff !== "" && !isNaN(n)) {
      if (n <= 1) semaforo = SEMAFORO.ROSSO;
      else if (n === 2) semaforo = SEMAFORO.ARANCIONE;
      else semaforo = SEMAFORO.VERDE;
    }
    result.b4_1_personeStaff = sem(semaforo);
  }

  // B4.2 referente PSL
  switch (data.b4_2_referentePSL) {
    case "No": result.b4_2_referentePSL = sem(SEMAFORO.ROSSO); break;
    case "Titolare limitato": result.b4_2_referentePSL = sem(SEMAFORO.ARANCIONE); break;
    case "Staff dedicato": result.b4_2_referentePSL = sem(SEMAFORO.VERDE); break;
    default: result.b4_2_referentePSL = sem(SEMAFORO.NEUTRO);
  }

  // B4.3 maestri stabili
  switch (data.b4_3_maestriStabili) {
    case "No": result.b4_3_maestriStabili = sem(SEMAFORO.ROSSO); break;
    case "A chiamata": result.b4_3_maestriStabili = sem(SEMAFORO.ARANCIONE); break;
    case "Si, figure fisse": result.b4_3_maestriStabili = sem(SEMAFORO.VERDE); break;
    default: result.b4_3_maestriStabili = sem(SEMAFORO.NEUTRO);
  }

  // B5.1 software gestione
  switch (data.b5_1_softwareGestione) {
    case "Nessuno/manuale":
    case "Excel": result.b5_1_softwareGestione = sem(SEMAFORO.VERDE); break;
    case "Gestionale di proprieta del centro": result.b5_1_softwareGestione = sem(SEMAFORO.ARANCIONE); break;
    case "Piattaforma prenotazioni": result.b5_1_softwareGestione = sem(SEMAFORO.GIALLO); break;
    default: result.b5_1_softwareGestione = sem(SEMAFORO.NEUTRO);
  }

  // B5.2 costo software — informativo
  result.b5_2_costoSoftwareAnnuale = sem(SEMAFORO.NEUTRO);

  // B5.3 apertura cambio software
  switch (data.b5_3_aperturaCambioSoftware) {
    case "No": result.b5_3_aperturaCambioSoftware = sem(SEMAFORO.ROSSO); break;
    case "Con resistenze": result.b5_3_aperturaCambioSoftware = sem(SEMAFORO.ARANCIONE); break;
    case "Si": result.b5_3_aperturaCambioSoftware = sem(SEMAFORO.VERDE); break;
    default: result.b5_3_aperturaCambioSoftware = sem(SEMAFORO.NEUTRO);
  }

  // B5.4 migrazione EPS
  switch (data.b5_4_migrazioneEPS) {
    case "Si": result.b5_4_migrazioneEPS = sem(SEMAFORO.VERDE); break;
    case "No": result.b5_4_migrazioneEPS = sem(SEMAFORO.ROSSO); break;
    case "In valutazione": result.b5_4_migrazioneEPS = sem(SEMAFORO.ARANCIONE); break;
    default: result.b5_4_migrazioneEPS = sem(SEMAFORO.NEUTRO);
  }

  // B5.5 / B5.6 — informativi
  result.b5_5_tesseratiTotali = sem(SEMAFORO.NEUTRO);
  result.b5_6_percOnline = sem(SEMAFORO.NEUTRO);
  result.b5_6_percDesk = sem(SEMAFORO.NEUTRO);

  // B6.1 abbonamenti
  switch (data.b6_1_abbonamenti) {
    case "No": result.b6_1_abbonamenti = sem(SEMAFORO.GIALLO); break;
    case "Si": result.b6_1_abbonamenti = sem(SEMAFORO.NEUTRO); break;
    default: result.b6_1_abbonamenti = sem(SEMAFORO.NEUTRO);
  }

  // B6.2 prezzi differenziati
  switch (data.b6_2_prezziDifferenziati) {
    case "No": result.b6_2_prezziDifferenziati = sem(SEMAFORO.GIALLO); break;
    case "Si": result.b6_2_prezziDifferenziati = sem(SEMAFORO.VERDE); break;
    default: result.b6_2_prezziDifferenziati = sem(SEMAFORO.NEUTRO);
  }

  // B7.1 tornei montepremi — segnale positivo backend, no semaforo diretto
  result.b7_1_organizzaTornei = sem(SEMAFORO.NEUTRO);

  // B7.1 fasce montepremi + frequenza: piu varieta e piu eventi = meglio
  {
    const fasce = data.b7_1_fasceMontepremi || [];
    const n = Number(data.b7_1_quantiAnno) || 0;
    let semaforo = SEMAFORO.NEUTRO;
    if (data.b7_1_organizzaTornei === "Si") {
      if (fasce.length === 0 || n <= 2) semaforo = SEMAFORO.ARANCIONE;
      else if (fasce.length === 1 || n <= 5) semaforo = SEMAFORO.GIALLO;
      else semaforo = SEMAFORO.VERDE;
    } else if (data.b7_1_organizzaTornei === "No") {
      semaforo = SEMAFORO.ARANCIONE;
    }
    result.b7_1_fasceMontepremi = sem(semaforo);
  }

  // B8.1 problema principale
  switch (data.b8_1_problemaPrincipale) {
    case "Tornei e competizioni": result.b8_1_problemaPrincipale = sem(SEMAFORO.VERDE); break;
    case "":
      result.b8_1_problemaPrincipale = sem(SEMAFORO.NEUTRO);
      break;
    default: result.b8_1_problemaPrincipale = sem(SEMAFORO.GIALLO);
  }

  // B8.2 esperienza circuiti
  switch (data.b8_2_esperienzaCircuiti) {
    case "Mai": result.b8_2_esperienzaCircuiti = sem(SEMAFORO.GIALLO); break;
    case "Positiva": result.b8_2_esperienzaCircuiti = sem(SEMAFORO.VERDE); break;
    case "Negativa": result.b8_2_esperienzaCircuiti = sem(SEMAFORO.ARANCIONE); break;
    default: result.b8_2_esperienzaCircuiti = sem(SEMAFORO.NEUTRO);
  }

  // B8.3 disponibilita impegno
  switch (data.b8_3_disponibilitaImpegno) {
    case "No": result.b8_3_disponibilitaImpegno = sem(SEMAFORO.ROSSO); break;
    case "Limitata": result.b8_3_disponibilitaImpegno = sem(SEMAFORO.ARANCIONE); break;
    case "Attiva": result.b8_3_disponibilitaImpegno = sem(SEMAFORO.VERDE); break;
    default: result.b8_3_disponibilitaImpegno = sem(SEMAFORO.NEUTRO);
  }

  return result;
}

function sem(semaforo, isKO = false) {
  return { semaforo, isKO };
}

// SEZIONE B — IN-CALL
// Domande, opzioni predefinite e logica semaforo

import { SEMAFORO } from "./sectionA";

export const initialSectionB = {
  // B0 - Tesserati (se non trovati in A.4 / RASD)
  b0_tesseratiTotali: "", // chiesto qui solo se A.4 non trovato

  // B1 - Campi e vincoli
  b1_0_palloneInvernale: "", // "N/A" | "Si" | "No" -- se in A.6 ci sono campi outdoor, chiedere se in inverno vengono coperti con pallone pressostatico
  b1_1_vincoliFITP: "",        // "Nessuno" | "Alcuni" | "Tutti"
  b1_1_quantiVincolati: "",     // testo, se "Alcuni"
  b1_2_campiDisponibiliPSL: "", // "0" | "1" | "2" | "3+"
  b1_3_clausolaResponsabilita: "", // "N/A" | "Si" | "No"

  // B2 - Base clienti
  b2_1_prenotazioniSettimana: "", // "<10" | "10-20" | "21-40" | "40+"
  b2_2_canaleComunicazione: "",   // "Nessuno" | "Poco gestito" | "Attivo e aggiornato"
  b2_3_giocatoriRicorrenti: "",   // "<10" | "10-30" | "30-60" | "60+"
  b2_4_torneiEsterni: "",         // "No" | "Minoranza" | "Buona parte"

  // B3 - Stagionalita
  b3_1_stagionalita: "", // "Tutto l'anno" | "Meglio estate" | "Meglio inverno" | "Inverno debole" | "Estate debole" | "Periodo morto"
  b3_1_periodoMorto: "", // testo libero se "Periodo morto"

  // B4 - Staff
  b4_1_personeStaff: "",        // "Solo titolare" | "+1" | "3-5" | "5+"
  b4_2_referentePSL: "",         // "No" | "Titolare limitato" | "Staff dedicato"
  b4_3_maestriStabili: "",       // "No" | "A chiamata" | "Stabili con contratto"
  b4_4_esperienzaEventi: "",     // "Mai" | "Occasionale" | "Regolare"

  // B5 - Gestionale e costi
  b5_1_softwareGestione: "",     // "Nessuno/manuale" | "Excel" | "Software dedicato" | "Piattaforma prenotazioni"
  b5_1_softwareNome: "",          // testo se "Software dedicato" - backend tendina
  b5_2_costoSoftwareAnnuale: "",
  b5_3_aperturaCambioSoftware: "", // "No" | "Con resistenze" | "Si"
  b5_4_migrazioneEPS: "",          // "N/A" | "Si" | "No"
  b5_5_tesseratiTotali: "",
  b5_5_tesseratiAgonistici: "",
  b5_5_tesseratiNonAgonistici: "",
  b5_6_percPrenotazioniOnline: "",

  // B6 - Pricing
  b6_1_abbonamenti: "",       // "No" | "Si"
  b6_1_abbonamentiDesc: "",    // testo se "Si"
  b6_2_prezziDifferenziati: "", // "No" | "Si"

  // B7 - Tornei e montepremi
  b7_1_organizzaTornei: "",   // "No" | "Si"
  b7_1_fasciaMontepremi: "",   // "<500" | "501-1499" | ">=1500"
  b7_1_quantiAnno: "",

  // B8 - Motivazione
  b8_1_problemaPrincipale: "", // "Fasce vuote" | "Fidelizzazione" | "Nuovi giocatori" | "Tornei e competizioni" | "Fatturato"
  b8_2_esperienzaCircuiti: "", // "Mai" | "Positiva" | "Negativa"
  b8_2_esperienzaNegativaPerche: "", // testo
  b8_3_disponibilitaImpegno: "", // "No" | "Limitata" | "Attiva"
};

export const OPZIONI_B = {
  b1_0_palloneInvernale: ["N/A", "Si", "No"],
  b1_1_vincoliFITP: ["Nessuno", "Alcuni", "Tutti"],
  b1_2_campiDisponibiliPSL: ["0", "1", "2", "3+"],
  b1_3_clausolaResponsabilita: ["N/A", "Si", "No"],

  b2_1_prenotazioniSettimana: ["<10", "10-20", "21-40", "40+"],
  b2_2_canaleComunicazione: ["Nessuno", "Poco gestito", "Attivo e aggiornato"],
  b2_3_giocatoriRicorrenti: ["<10", "10-30", "30-60", "60+"],
  b2_4_torneiEsterni: ["No", "Minoranza", "Buona parte"],

  b3_1_stagionalita: ["Tutto l'anno", "Meglio estate", "Meglio inverno", "Inverno debole", "Estate debole", "Periodo morto"],

  b4_1_personeStaff: ["Solo titolare", "+1", "3-5", "5+"],
  b4_2_referentePSL: ["No", "Titolare limitato", "Staff dedicato"],
  b4_3_maestriStabili: ["No", "A chiamata", "Stabili con contratto"],
  b4_4_esperienzaEventi: ["Mai", "Occasionale", "Regolare"],

  b5_1_softwareGestione: ["Nessuno/manuale", "Excel", "Software dedicato", "Piattaforma prenotazioni"],
  b5_1_softwareNomeBrand: ["Playtomic", "Wansport", "Sport Clubbi", "Due Palleggi", "Altro"],
  b5_3_aperturaCambioSoftware: ["No", "Con resistenze", "Si"],
  b5_4_migrazioneEPS: ["N/A", "Si", "No"],

  b6_1_abbonamenti: ["No", "Si"],
  b6_2_prezziDifferenziati: ["No", "Si"],

  b7_1_organizzaTornei: ["No", "Si"],
  b7_1_fasciaMontepremi: ["<500", "501-1499", ">=1500"],

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

  // B1.0 pallone pressostatico invernale
  switch (data.b1_0_palloneInvernale) {
    case "N/A": result.b1_0_palloneInvernale = sem(SEMAFORO.NEUTRO); break;
    case "Si": result.b1_0_palloneInvernale = sem(SEMAFORO.VERDE); break;
    case "No": result.b1_0_palloneInvernale = sem(SEMAFORO.NEUTRO); break;
    default: result.b1_0_palloneInvernale = sem(SEMAFORO.NEUTRO);
  }

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
    case "N/A": result.b1_3_clausolaResponsabilita = sem(SEMAFORO.VERDE); break;
    case "Si": result.b1_3_clausolaResponsabilita = sem(SEMAFORO.GIALLO); break;
    case "No": result.b1_3_clausolaResponsabilita = sem(SEMAFORO.ROSSO); break;
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

  // B2.3 giocatori ricorrenti
  switch (data.b2_3_giocatoriRicorrenti) {
    case "<10": result.b2_3_giocatoriRicorrenti = sem(SEMAFORO.ROSSO); break;
    case "10-30": result.b2_3_giocatoriRicorrenti = sem(SEMAFORO.ARANCIONE); break;
    case "30-60":
    case "60+": result.b2_3_giocatoriRicorrenti = sem(SEMAFORO.VERDE); break;
    default: result.b2_3_giocatoriRicorrenti = sem(SEMAFORO.NEUTRO);
  }

  // B2.4 tornei esterni
  switch (data.b2_4_torneiEsterni) {
    case "No": result.b2_4_torneiEsterni = sem(SEMAFORO.ARANCIONE); break;
    case "Minoranza": result.b2_4_torneiEsterni = sem(SEMAFORO.GIALLO); break;
    case "Buona parte": result.b2_4_torneiEsterni = sem(SEMAFORO.VERDE); break;
    default: result.b2_4_torneiEsterni = sem(SEMAFORO.NEUTRO);
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
  switch (data.b4_1_personeStaff) {
    case "Solo titolare": result.b4_1_personeStaff = sem(SEMAFORO.ROSSO); break;
    case "+1": result.b4_1_personeStaff = sem(SEMAFORO.ARANCIONE); break;
    case "3-5":
    case "5+": result.b4_1_personeStaff = sem(SEMAFORO.VERDE); break;
    default: result.b4_1_personeStaff = sem(SEMAFORO.NEUTRO);
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
    case "No": result.b4_3_maestriStabili = sem(SEMAFORO.ARANCIONE); break;
    case "A chiamata": result.b4_3_maestriStabili = sem(SEMAFORO.GIALLO); break;
    case "Stabili con contratto": result.b4_3_maestriStabili = sem(SEMAFORO.VERDE); break;
    default: result.b4_3_maestriStabili = sem(SEMAFORO.NEUTRO);
  }

  // B4.4 esperienza eventi
  switch (data.b4_4_esperienzaEventi) {
    case "Mai": result.b4_4_esperienzaEventi = sem(SEMAFORO.ARANCIONE); break;
    case "Occasionale": result.b4_4_esperienzaEventi = sem(SEMAFORO.GIALLO); break;
    case "Regolare": result.b4_4_esperienzaEventi = sem(SEMAFORO.VERDE); break;
    default: result.b4_4_esperienzaEventi = sem(SEMAFORO.NEUTRO);
  }

  // B5.1 software gestione
  switch (data.b5_1_softwareGestione) {
    case "Nessuno/manuale":
    case "Excel": result.b5_1_softwareGestione = sem(SEMAFORO.VERDE); break;
    case "Software dedicato": result.b5_1_softwareGestione = sem(SEMAFORO.ARANCIONE); break;
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
    case "N/A": result.b5_4_migrazioneEPS = sem(SEMAFORO.VERDE); break;
    case "Si": result.b5_4_migrazioneEPS = sem(SEMAFORO.ARANCIONE); break;
    case "No": result.b5_4_migrazioneEPS = sem(SEMAFORO.ROSSO); break;
    default: result.b5_4_migrazioneEPS = sem(SEMAFORO.NEUTRO);
  }

  // B5.5 / B5.6 — informativi
  result.b5_5_tesseratiTotali = sem(SEMAFORO.NEUTRO);
  result.b5_6_percPrenotazioniOnline = sem(SEMAFORO.NEUTRO);

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

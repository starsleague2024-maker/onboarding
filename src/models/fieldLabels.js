// MAPPA ETICHETTE — converte le chiavi tecniche dei campi (es. b2_4_affluenzaEventi)
// in etichette leggibili da mostrare nei riepiloghi.

export const FIELD_LABELS_A = {
  denominazione: "Denominazione",
  telefono: "Telefono",
  email: "Email",
  formaGiuridica: "Forma giuridica",
  affiliazione: "Affiliazione",
  tesseratiRASD: "Tesserati RASD",
  campiTotali: "Campi da gioco totali",
  campiCoperti: "Campi coperti",
  regione: "Regione",
  prezzoIndoor90: "Prezzo indoor 90'",
  prezzoOutdoor90: "Prezzo outdoor 90'",
  piattaformaPrenotazioni: "Piattaforma prenotazioni online",
  sitoWeb: "Sito web",
  instagram: "Instagram",
  facebook: "Facebook",
  googleRating: "Google rating",
  googleRecensioni: "Google recensioni",
  appPropria: "App propria",
  multisede: "Multisede",
};

export const FIELD_LABELS_B = {
  b0_tesseratiTotali: "Tesserati totali",
  b0_1_appGestionaleUsata: "Utilizzo app gestionale",
  b1_4_statoCampiCoperti: "Stato campi coperti",
  b1_1_vincoliFITP: "Vincoli FITP",
  b1_2_campiDisponibiliPSL: "Campi disponibili per PSL",
  b1_3_clausolaResponsabilita: "Clausola responsabilita",
  b2_1_prenotazioniSettimana: "Prenotazioni settimanali",
  b2_2_canaleComunicazione: "Canale comunicazione",
  b2_2_canali: "Canali di comunicazione usati",
  b2_4_affluenzaEventi: "Affluenza agli eventi",
  b2_4_tipiEventi: "Tipi di eventi organizzati",
  b3_1_stagionalita: "Stagionalita",
  b4_1_personeStaff: "Persone in staff",
  b4_2_referentePSL: "Referente PSL interno",
  b4_3_maestriStabili: "Maestri/allenatori stabili",
  b5_1_softwareGestione: "Software di gestione",
  b5_2_costoSoftwareAnnuale: "Costo software annuale",
  b5_3_aperturaCambioSoftware: "Apertura cambio software",
  b5_4_migrazioneEPS: "Migrazione EPS",
  b5_5_tesseratiTotali: "Tesserati medi annuali",
  b5_6_percOnline: "% prenotazioni online",
  b5_6_percDesk: "% prenotazioni desk",
  b6_1_abbonamenti: "Abbonamenti/tessere",
  b6_2_prezziDifferenziati: "Prezzi differenziati",
  b7_1_organizzaTornei: "Organizzazione tornei",
  b7_1_fasceMontepremi: "Fasce montepremi",
  b8_1_problemaPrincipale: "Problema principale",
  b8_2_esperienzaCircuiti: "Esperienza con altri circuiti",
  b8_3_disponibilitaImpegno: "Disponibilita all'impegno",
};

export function labelForField(section, key) {
  if (section === "A") return FIELD_LABELS_A[key] || key;
  if (section === "B") return FIELD_LABELS_B[key] || key;
  return key;
}

// ANALISI NARRATIVA — genera un report professionale sul centro
// come se fosse scritto da un consulente PSL.

import { SEMAFORO } from "./sectionA";

/**
 * Genera un'analisi narrativa strutturata del centro, basata su tutti i dati raccolti.
 * Restituisce un oggetto con sezioni testuali da rendere nel documento frontend.
 */
export function generaAnalisiNarrativa({ dataA, dataB, semaforiA, semaforiB, analisi }) {
  const sA = semaforiA || {};
  const sB = semaforiB || {};
  const inCall = !!semaforiB && Object.keys(semaforiB).length > 0;

  // Helper
  const v = (val, fallback = "n/d") => val || fallback;
  const isRosso = (sem) => sem?.semaforo === SEMAFORO.ROSSO;

  // --- INTRO ---
  const nome = v(dataA.denominazione, "Il centro");
  const regione = v(dataA.regione);
  const campiTot = v(dataA.campiTotali, "?");
  const campiCop = v(dataA.campiCoperti, "0");
  const affiliazione = (dataA.affiliazione || []).join(", ") || "non identificata";
  const multisede = dataA.multisede === "Si";

  let intro = `${nome} è una struttura padel`;
  if (regione && regione !== "n/d") intro += ` situata in ${regione}`;
  intro += `, con ${campiTot} camp${Number(campiTot) === 1 ? "o" : "i"} da gioco`;
  if (Number(campiCop) > 0) intro += ` di cui ${campiCop} coperti`;
  intro += `.`;
  if (multisede) intro += ` Il centro fa parte di una rete multisede (${v(dataA.numeroSedi, "piu sedi")} in totale): questo aspetto va tenuto in considerazione nella valutazione dei dati RASD, che potrebbero includere tesserati di altre sedi.`;
  intro += ` Affiliazione attuale: ${affiliazione}.`;

  // --- STATO DI SALUTE PER AREA ---
  const aree = [];

  // 1. Struttura
  {
    let testo;
    if (Number(campiCop) >= 3) {
      testo = `La struttura e' ben attrezzata con ${campiCop} campi coperti, ottima base per organizzare eventi indoor in qualsiasi stagione.`;
    } else if (Number(campiCop) === 1 || Number(campiCop) === 2) {
      testo = `La struttura ha ${campiCop} campo${Number(campiCop) > 1 ? "i" : ""} coperto${Number(campiCop) > 1 ? "i" : ""}: sufficiente ma con margine di crescita per ampliare l'offerta indoor.`;
    } else if (inCall && dataB?.b1_4_statoCampiCoperti === "Prevista in futuro") {
      testo = `Al momento nessun campo coperto, ma il centro ha dichiarato di prevedere una copertura futura: opportunita' da monitorare.`;
    } else {
      testo = `Il centro non dispone di campi coperti, il che limita l'offerta nella stagione invernale e la possibilita' di eventi al chiuso.`;
    }
    if (inCall && dataB?.b1_2_campiDisponibiliPSL) {
      testo += ` Disponibilita' per eventi PSL: ${dataB.b1_2_campiDisponibiliPSL}.`;
    }
    aree.push({ titolo: "Struttura e campi", testo, semaforo: sA.campiCoperti?.semaforo });
  }

  // 2. Presenza online
  {
    const punti = [];
    if (isRosso(sA.sitoWeb)) punti.push("sito web assente");
    else if (dataA.prenotazioneOnlineSito) punti.push("sito con prenotazione online");
    else if (dataA.sitoWeb) punti.push(`sito web presente (${dataA.sitoWeb})`);
    if (isRosso(sA.instagram)) punti.push("Instagram assente");
    else if (dataA.instagram) punti.push(`Instagram ${dataA.instagram.toLowerCase()}`);
    if (dataA.googleRating) punti.push(`${dataA.googleRating}★ su Google (${v(dataA.googleRecensioni, "0")} recensioni)`);

    let testo;
    const puntiPositivi = punti.filter((p) => !p.includes("assente") && !p.includes("poco"));
    const puntiNegativi = punti.filter((p) => p.includes("assente") || p.includes("poco"));

    if (puntiPositivi.length > 0) testo += `Punti di forza online: ${puntiPositivi.join(", ")}. `;
    if (puntiNegativi.length > 0) testo += `Aree da migliorare: ${puntiNegativi.join(", ")} — ambiti dove PSL puo portare valore immediato in termini di visibilita e prenotazioni senza commissioni.`;
    if (!testo) testo = "Dati presenza online non ancora disponibili.";

    const ratingVal = Number(dataA.googleRating);
    const sem = (!dataA.sitoWeb || isRosso(sA.sitoWeb)) && isRosso(sA.instagram)
      ? SEMAFORO.ROSSO
      : ratingVal >= 4.5 && !isRosso(sA.sitoWeb)
        ? SEMAFORO.VERDE
        : SEMAFORO.ARANCIONE;

    aree.push({ titolo: "Presenza online e reputazione", testo, semaforo: sem });
  }

  // 3. Tecnologia e gestionale
  if (inCall) {
    let testo;
    const sw = dataB.b5_1_softwareGestione;
    const apertura = dataB.b5_3_aperturaCambioSoftware;
    const percOnline = dataB.b5_6_percOnline;

    if (!sw || sw === "Nessuno/manuale" || sw === "Excel") {
      testo = `Il centro gestisce le prenotazioni senza un software dedicato o tramite strumenti basilari (${sw || "non dichiarato"}): terreno fertile per l'adozione del sistema PSL senza attrito di migrazione.`;
    } else if (sw === "Gestionale di proprieta del centro") {
      testo = `Il centro usa un gestionale proprietario — un segnale di struttura organizzata, ma che potrebbe creare resistenza alla migrazione verso la piattaforma PSL. `;
      if (apertura === "No") testo += `L'operatore ha mostrato resistenza al cambio: da approfondire.`;
      else if (apertura === "Con resistenze") testo += `Apertura parziale al cambio: percorso da costruire con cura.`;
      else if (apertura === "Si") testo += `Disponibili alla migrazione: buon segnale.`;
    } else {
      testo = `Utilizza ${sw} per la gestione. `;
      if (apertura === "Si") testo += `Aperti al cambio: transizione verso PSL fattibile.`;
      else if (apertura === "No") testo += `Resistenza al cambio software dichiarata.`;
    }
    if (percOnline) testo += ` Attualmente il ${percOnline}% delle prenotazioni avviene online.`;

    aree.push({ titolo: "Tecnologia e gestionale", testo, semaforo: sB.b5_1_softwareGestione?.semaforo });
  }

  // 4. Community e attivita
  if (inCall) {
    let testo = "";
    const tesserati = dataB.b5_5_tesseratiTotali || dataA.tesseratiRASD || "n/d";
    const prenotazioni = dataB.b2_1_prenotazioniSettimana;
    const tornei = dataB.b7_1_organizzaTornei;
    const problema = dataB.b8_1_problemaPrincipale;

    testo += `Base dichiarata di ${tesserati} tesserati`;
    if (prenotazioni) testo += `, con ${prenotazioni} prenotazioni in una settimana tipo`;
    testo += `. `;

    if (tornei === "Si") {
      const fasce = (dataB.b7_1_fasceMontepremi || []).join(", ");
      const quanti = dataB.b7_1_quantiAnno;
      testo += `Il centro organizza gia' tornei (${quanti ? quanti + " all'anno" : "frequenza n/d"}${fasce ? ", fasce: " + fasce : ""}): buona cultura degli eventi, PSL puo amplificare questo formato. `;
    } else {
      testo += `Non organizza tornei in modo strutturato: PSL puo introdurre questo formato come leva di fidelizzazione. `;
    }

    if (problema === "Fasce vuote") {
      testo += `Il problema principale dichiarato sono le fasce orarie vuote: la gamification via app PSL e' la risposta diretta a questa esigenza.`;
    } else if (problema) {
      testo += `Problema principale segnalato: "${problema}".`;
    }

    aree.push({ titolo: "Community e attivita'", testo, semaforo: sB.b2_1_prenotazioniSettimana?.semaforo });
  }

  // 5. Staff e organizzazione
  if (inCall) {
    let testo = "";
    const staff = dataB.b4_1_personeStaff;
    const referente = dataB.b4_2_referentePSL;
    const maestri = dataB.b4_3_maestriStabili;

    if (staff) testo += `Lo staff e' composto da ${staff} person${staff == 1 ? "a" : "e"}. `;
    if (maestri === "Si, figure fisse") testo += `Presenti figure tecniche fisse: ottimo per la coerenza dell'esperienza cliente. `;
    else if (maestri === "A chiamata") testo += `I maestri/istruttori sono a chiamata: da valutare l'impatto sulla fidelizzazione. `;
    else if (maestri === "No") testo += `Nessuna figura tecnica fissa dichiarata. `;
    if (referente) testo += `Referente PSL interno: ${referente}.`;

    aree.push({
      titolo: "Staff e organizzazione",
      testo: testo || "Dati staff non disponibili.",
      semaforo: sB.b4_1_personeStaff?.semaforo,
    });
  }

  // --- OPPORTUNITA PSL ---
  const opportunita = [];
  if (isRosso(sA.sitoWeb) || isRosso(sA.instagram)) {
    opportunita.push("Potenziamento della presenza online: sito con prenotazione diretta e visibilita social attraverso il circuito PSL.");
  }
  if (inCall && dataB?.b5_3_aperturaCambioSoftware !== "No") {
    opportunita.push("Migrazione al gestionale PSL: eliminazione dei costi di software e commissioni di prenotazione.");
  }
  if (inCall && dataB?.b8_1_problemaPrincipale === "Fasce vuote") {
    opportunita.push("Gamification via app PSL per riempire le fasce orarie vuote con sfide, classifiche e reward per i giocatori.");
  }
  if (inCall && dataB?.b7_1_organizzaTornei !== "Si") {
    opportunita.push("Introduzione di tornei strutturati PSL per aumentare l'affluenza e la fidelizzazione dei giocatori.");
  }
  if (Number(campiCop) === 0) {
    opportunita.push("Valutare la copertura stagionale (pallone pressostatico) per ampliare l'offerta invernale e aumentare le ore giocabili.");
  }
  if (multisede) {
    opportunita.push("Sinergia multisede: sconto pacchetto PSL su piu strutture e possibile riduzione della trattenuta ACSI per grandi volumi di tesseramenti.");
  }

  // --- RACCOMANDAZIONE NARRATIVA ---
  let raccomandazione = "";
  if (analisi) {
    if (analisi.ko) {
      raccomandazione = `Al momento emergono criticita' che rendono difficile procedere con l'attivazione immediata. ${analisi.raccomandazione || ""} Si consiglia di mantenere il contatto e ricontattare il centro quando le condizioni migliorano.`;
    } else if (analisi.semaforo === SEMAFORO.VERDE) {
      raccomandazione = `${nome} presenta un profilo solido e ben allineato con i requisiti PSL. Il centro ha le caratteristiche per entrare subito nel circuito. Si raccomanda di procedere con l'invio della proposta formale e pianificare l'attivazione.`;
    } else {
      raccomandazione = `${nome} ha un buon potenziale ma presenta alcuni aspetti da approfondire prima di procedere. ${analisi.raccomandazione || ""} Con il giusto accompagnamento, il centro puo diventare un partner PSL di valore.`;
    }
  }

  return { intro, aree, opportunita, raccomandazione };
}

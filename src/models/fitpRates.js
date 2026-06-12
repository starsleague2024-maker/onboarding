// APPENDICE 2 — Tariffario FITP 2026 (solo padel)
// Usato dall'emulatore costi (Sezione C)

export const FITP = {
  affiliazione: {
    riaffiliazioneTuttiCampi: 350,
    riaffiliazioneStandard: 450,
    tassaPerCampo: 60,
  },
  tesseramento: {
    nonAgonisticaOver16: 10,
    agonisticaOver16_3a4a5a: 30,
    agonisticaOver16_1a2a: 60,
    nonAgonisticaUnder16: 6,
    agonisticaUnder16_3a4a5a: 15,
    agonisticaUnder16_1a2a: 30,
  },
  tecnici: {
    alboMaestriPadel: 180,
    alboIstruttori2Livello: 170,
    alboIstruttori1Livello: 140,
  },
  scuolaPadel: {
    standard: 120,
    basic: 90,
    club: 60,
  },
  tornei: {
    nonAgonistico: 30,
    agonisticoSenzaMontepremi: 120,
    montepremiSotto500: 120,
    montepremi501_1499: 180,
    montepremiOltre1500: 290,
    tassaChiusuraEntro5gg: 0,
    manifestazionePromozionale: 12,
  },
  campionatiSquadre: {
    serieD: 120,
    serieC: 300,
    serieB: 1300,
    serieA: 3500,
    veterani: 110,
  },
  quotePartecipazione: {
    over16: 6,
    under16: 3,
  },
};

// PSL / ACSI — guadagno tesseramento
export const PSL_TESSERAMENTO = {
  prezzoTessera: 20,       // pagato dal giocatore al centro
  trattenutaACSI: 4.6,     // trattenuta ACSI
  guadagnoNettoCentro: 15.4, // 20 - 4.6
};

// Mappa fascia montepremi -> tassa torneo FITP
export function tassaTorneoMontepremi(fascia) {
  switch (fascia) {
    case "Senza premio in denaro":
      return FITP.tornei.nonAgonistico;
    case "Fino a 500€":
      return FITP.tornei.montepremiSotto500;
    case "Fino a 1000€":
      return FITP.tornei.montepremi501_1499;
    case "1500€+":
      return FITP.tornei.montepremiOltre1500;
    default:
      return 0;
  }
}

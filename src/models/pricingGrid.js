// APPENDICE 1 — Griglia prezzi regionale (90 min fascia premium)
// Usata per confronto automatico A.8 / A.9

export const PRICING_GRID = {
  "Lombardia - Milano":      { indoor: [60, 85], outdoor: [48, 68] },
  "Lombardia - resto":       { indoor: [45, 65], outdoor: [36, 52] },
  "Piemonte":                { indoor: [40, 58], outdoor: [32, 46] },
  "Veneto":                  { indoor: [44, 60], outdoor: [35, 48] },
  "Liguria":                 { indoor: [42, 60], outdoor: [34, 48] },
  "Friuli-Venezia Giulia":   { indoor: [45, 62], outdoor: [36, 50] },
  "Trentino-Alto Adige":     { indoor: [46, 64], outdoor: [37, 51] },
  "Valle d'Aosta":           { indoor: [38, 56], outdoor: [30, 45] },
  "Emilia-Romagna":          { indoor: [38, 56], outdoor: [30, 45] },
  "Toscana - Firenze":       { indoor: [42, 62], outdoor: [34, 50] },
  "Toscana - resto":         { indoor: [34, 56], outdoor: [27, 45] },
  "Lazio - Roma":            { indoor: [38, 58], outdoor: [30, 46] },
  "Lazio - resto":           { indoor: [28, 46], outdoor: [22, 37] },
  "Marche":                  { indoor: [26, 42], outdoor: [21, 34] },
  "Umbria":                  { indoor: [32, 50], outdoor: [26, 40] },
  "Abruzzo":                 { indoor: [28, 44], outdoor: [22, 35] },
  "Molise":                  { indoor: [24, 38], outdoor: [19, 30] },
  "Campania - Napoli":       { indoor: [36, 52], outdoor: [29, 42] },
  "Campania - resto":        { indoor: [28, 46], outdoor: [22, 37] },
  "Puglia":                  { indoor: [28, 44], outdoor: [22, 35] },
  "Basilicata":              { indoor: [24, 40], outdoor: [19, 32] },
  "Calabria":                { indoor: [26, 40], outdoor: [21, 32] },
  "Sicilia":                 { indoor: [28, 42], outdoor: [22, 34] },
  "Sardegna":                { indoor: [32, 48], outdoor: [26, 38] },
};

export const REGIONI = Object.keys(PRICING_GRID);

/**
 * Confronta un prezzo con la griglia regionale.
 * @param {string} regione - chiave di PRICING_GRID
 * @param {"indoor"|"outdoor"} tipo
 * @param {number} prezzo
 * @returns {"sotto"|"in_linea"|"premium"|null}
 */
export function confrontaPrezzo(regione, tipo, prezzo) {
  const grid = PRICING_GRID[regione];
  if (!grid || prezzo === null || prezzo === undefined || prezzo === "") return null;
  const [min, max] = grid[tipo];
  const p = Number(prezzo);
  if (p < min) return "sotto";
  if (p > max) return "premium";
  return "in_linea";
}

# PSL App — Pre-ingresso Centri Padel

App interna per la gestione delle call di pre-ingresso con nuovi centri padel.

## Funzionalita

- **Sezione A (Pre-call)**: dati raccolti prima della call (Sport e Salute, Maps, social, ecc.) con semafori automatici e flag "chiedere in call".
- **Sezione B (In-call)**: domande a risposta predefinita con peso/semaforo.
- **Backend / Analisi**: KO assoluti, incongruenze, conteggio semafori, semaforo finale, raccomandazione, riepilogo emulatore costi, note interne.
- **Vista Frontend**: pagina pulita da condividere in screen-share col centro (punti di forza, aree di miglioramento, confronto costi, argomenti commerciali, raccomandazione, prossimi passi).

## Stack

- React + Vite
- Storage: attualmente `localStorage` (vedi `src/data/`), pronto per migrazione a Supabase (`src/data/supabaseStorage.js`, attualmente placeholder commentato).

## Struttura progetto

```
src/
├── data/              # storage astratto (localStorage -> Supabase)
├── models/            # logica dati: sezioni A/B/C/D, griglia prezzi, tariffe FITP
├── components/
│   ├── backend/       # form pre-call, in-call, riepilogo backend
│   ├── frontend/      # vista da mostrare al centro
│   ├── Dashboard.jsx
│   ├── CallSession.jsx
│   ├── Fields.jsx
│   └── SemaforoBadge.jsx
├── App.jsx
└── main.jsx
```

## Avvio

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Migrazione a Supabase

1. `npm install @supabase/supabase-js`
2. Crea tabella `sessions` (vedi commenti in `src/data/supabaseStorage.js`)
3. Configura `.env` con `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
4. Decommenta il codice in `src/data/supabaseStorage.js`
5. In `src/data/index.js` cambia l'export da `localStorageAdapter` a `supabaseStorageAdapter`

## Configurazione pacchetto PSL (Sezione C2)

I valori del pacchetto PSL (€/mese, €/anno, contenuto) sono ancora da definire:
modificare `PSL_PACKAGE_DEFAULT` in `src/models/sectionC.js`.

## Note

- La griglia prezzi regionale (Appendice 1) e in `src/models/pricingGrid.js`.
- Le tariffe FITP 2026 (Appendice 2) sono in `src/models/fitpRates.js`.
- I dati sono salvati in `localStorage` del browser: per ora ogni operatore ha le proprie schede sul proprio dispositivo. Con la migrazione a Supabase i dati saranno condivisi.

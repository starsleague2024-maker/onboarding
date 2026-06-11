import { OPZIONI_B } from "../../models/sectionB";
import { TextField, NumberField, SelectField, TextAreaField, SectionTitle } from "../Fields";

export default function InCallForm({ data, semafori, onChange, dataA }) {
  const set = (field) => (value) => onChange({ ...data, [field]: value });

  const tesseratiNonTrovati = !dataA?.tesseratiRASD;
  const haCampiOutdoor = Number(dataA?.campiTotali) > Number(dataA?.campiCoperti || 0);

  return (
    <div>
      <SectionTitle>Sezione B — In-call</SectionTitle>

      {tesseratiNonTrovati && (
        <>
          <h4>B0 — Tesserati</h4>
          <NumberField
            label="B.0 Quanti tesserati avete (totale)? (non trovato in pre-call)"
            value={data.b0_tesseratiTotali}
            onChange={set("b0_tesseratiTotali")}
            semaforo={semafori.b0_tesseratiTotali?.semaforo}
          />
        </>
      )}

      <h4>B1 — Campi e vincoli</h4>

      {haCampiOutdoor && (
        <SelectField
          label="B.1.0 In inverno montate il pallone pressostatico sui campi scoperti?"
          value={data.b1_0_palloneInvernale}
          onChange={set("b1_0_palloneInvernale")}
          options={OPZIONI_B.b1_0_palloneInvernale}
          semaforo={semafori.b1_0_palloneInvernale?.semaforo}
        />
      )}

      <SelectField
        label="B.1.1 Campi coperti vincolati FITP/altri EPS?"
        value={data.b1_1_vincoliFITP}
        onChange={set("b1_1_vincoliFITP")}
        options={OPZIONI_B.b1_1_vincoliFITP}
        semaforo={semafori.b1_1_vincoliFITP?.semaforo}
      />
      {data.b1_1_vincoliFITP === "Alcuni" && (
        <TextField
          label="↳ Quanti?"
          value={data.b1_1_quantiVincolati}
          onChange={set("b1_1_quantiVincolati")}
        />
      )}

      <SelectField
        label="B.1.2 Campi coperti disponibili per eventi PSL?"
        value={data.b1_2_campiDisponibiliPSL}
        onChange={set("b1_2_campiDisponibiliPSL")}
        options={OPZIONI_B.b1_2_campiDisponibiliPSL}
        semaforo={semafori.b1_2_campiDisponibiliPSL?.semaforo}
      />

      <SelectField
        label="B.1.3 Se campi vincolati FITP: disposti a clausola responsabilita contrattuale?"
        value={data.b1_3_clausolaResponsabilita}
        onChange={set("b1_3_clausolaResponsabilita")}
        options={OPZIONI_B.b1_3_clausolaResponsabilita}
        semaforo={semafori.b1_3_clausolaResponsabilita?.semaforo}
      />

      <h4>B2 — Base clienti reale</h4>
      <SelectField
        label="B.2.1 Prenotazioni in una settimana tipo?"
        value={data.b2_1_prenotazioniSettimana}
        onChange={set("b2_1_prenotazioniSettimana")}
        options={OPZIONI_B.b2_1_prenotazioniSettimana}
        semaforo={semafori.b2_1_prenotazioniSettimana?.semaforo}
      />

      <SelectField
        label="B.2.2 Canale comunicazione diretto con clienti?"
        value={data.b2_2_canaleComunicazione}
        onChange={set("b2_2_canaleComunicazione")}
        options={OPZIONI_B.b2_2_canaleComunicazione}
        semaforo={semafori.b2_2_canaleComunicazione?.semaforo}
      />

      <SelectField
        label="B.2.3 Giocatori che tornano 2+ volte/settimana?"
        value={data.b2_3_giocatoriRicorrenti}
        onChange={set("b2_3_giocatoriRicorrenti")}
        options={OPZIONI_B.b2_3_giocatoriRicorrenti}
        semaforo={semafori.b2_3_giocatoriRicorrenti?.semaforo}
      />

      <SelectField
        label="B.2.4 Clienti che partecipano a tornei esterni?"
        value={data.b2_4_torneiEsterni}
        onChange={set("b2_4_torneiEsterni")}
        options={OPZIONI_B.b2_4_torneiEsterni}
        semaforo={semafori.b2_4_torneiEsterni?.semaforo}
      />

      <h4>B3 — Stagionalita</h4>
      <SelectField
        label="B.3.1 Stagionalita del centro?"
        value={data.b3_1_stagionalita}
        onChange={set("b3_1_stagionalita")}
        options={OPZIONI_B.b3_1_stagionalita}
        semaforo={semafori.b3_1_stagionalita?.semaforo}
      />
      {data.b3_1_stagionalita === "Periodo morto" && (
        <TextField
          label="↳ Quale periodo?"
          value={data.b3_1_periodoMorto}
          onChange={set("b3_1_periodoMorto")}
        />
      )}
      <p style={{ fontSize: "0.8rem", color: "#888" }}>
        Nota: periodo morto non è KO automatico — valutare se PSL può colmarlo con eventi.
      </p>

      <h4>B4 — Staff</h4>
      <SelectField
        label="B.4.1 Persone che lavorano nel centro?"
        value={data.b4_1_personeStaff}
        onChange={set("b4_1_personeStaff")}
        options={OPZIONI_B.b4_1_personeStaff}
        semaforo={semafori.b4_1_personeStaff?.semaforo}
      />
      <SelectField
        label="B.4.2 Referente PSL interno disponibile?"
        value={data.b4_2_referentePSL}
        onChange={set("b4_2_referentePSL")}
        options={OPZIONI_B.b4_2_referentePSL}
        semaforo={semafori.b4_2_referentePSL?.semaforo}
      />
      <SelectField
        label="B.4.3 Maestri/allenatori stabili?"
        value={data.b4_3_maestriStabili}
        onChange={set("b4_3_maestriStabili")}
        options={OPZIONI_B.b4_3_maestriStabili}
        semaforo={semafori.b4_3_maestriStabili?.semaforo}
      />
      <SelectField
        label="B.4.4 Esperienza organizzazione eventi/tornei?"
        value={data.b4_4_esperienzaEventi}
        onChange={set("b4_4_esperienzaEventi")}
        options={OPZIONI_B.b4_4_esperienzaEventi}
        semaforo={semafori.b4_4_esperienzaEventi?.semaforo}
      />

      <h4>B5 — Gestionale e costi</h4>
      <SelectField
        label="B.5.1 Software di gestione attuale?"
        value={data.b5_1_softwareGestione}
        onChange={set("b5_1_softwareGestione")}
        options={OPZIONI_B.b5_1_softwareGestione}
        semaforo={semafori.b5_1_softwareGestione?.semaforo}
      />
      {data.b5_1_softwareGestione === "Software dedicato" && (
        <SelectField
          label="↳ Quale? (backend)"
          value={data.b5_1_softwareNome}
          onChange={set("b5_1_softwareNome")}
          options={OPZIONI_B.b5_1_softwareNomeBrand}
        />
      )}

      <NumberField
        label="B.5.2 Costo software di gestione annuale (dichiarato dal centro)"
        value={data.b5_2_costoSoftwareAnnuale}
        onChange={set("b5_2_costoSoftwareAnnuale")}
        suffix="€/anno"
      />

      <SelectField
        label="B.5.3 Aperti a cambiare software con PSL?"
        value={data.b5_3_aperturaCambioSoftware}
        onChange={set("b5_3_aperturaCambioSoftware")}
        options={OPZIONI_B.b5_3_aperturaCambioSoftware}
        semaforo={semafori.b5_3_aperturaCambioSoftware?.semaforo}
      />

      <SelectField
        label="B.5.4 Se EPS diverso da ACSI: disposti a migrare?"
        value={data.b5_4_migrazioneEPS}
        onChange={set("b5_4_migrazioneEPS")}
        options={OPZIONI_B.b5_4_migrazioneEPS}
        semaforo={semafori.b5_4_migrazioneEPS?.semaforo}
      />

      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <NumberField
            label="B.5.5 Tesserati medi annuali (totale)"
            value={data.b5_5_tesseratiTotali}
            onChange={set("b5_5_tesseratiTotali")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <NumberField
            label="↳ Agonistici"
            value={data.b5_5_tesseratiAgonistici}
            onChange={set("b5_5_tesseratiAgonistici")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <NumberField
            label="↳ Non agonistici"
            value={data.b5_5_tesseratiNonAgonistici}
            onChange={set("b5_5_tesseratiNonAgonistici")}
          />
        </div>
      </div>

      <NumberField
        label="B.5.6 % prenotazioni che arrivano online vs desk?"
        value={data.b5_6_percPrenotazioniOnline}
        onChange={set("b5_6_percPrenotazioniOnline")}
        suffix="%"
      />

      <h4>B6 — Pricing</h4>
      <SelectField
        label="B.6.1 Abbonamenti o tessere per clienti abituali?"
        value={data.b6_1_abbonamenti}
        onChange={set("b6_1_abbonamenti")}
        options={OPZIONI_B.b6_1_abbonamenti}
        semaforo={semafori.b6_1_abbonamenti?.semaforo}
      />
      {data.b6_1_abbonamenti === "Si" && (
        <TextAreaField
          label="↳ Descrizione"
          value={data.b6_1_abbonamentiDesc}
          onChange={set("b6_1_abbonamentiDesc")}
        />
      )}

      <SelectField
        label="B.6.2 Prezzi differenziati per fascia oraria?"
        value={data.b6_2_prezziDifferenziati}
        onChange={set("b6_2_prezziDifferenziati")}
        options={OPZIONI_B.b6_2_prezziDifferenziati}
        semaforo={semafori.b6_2_prezziDifferenziati?.semaforo}
      />

      <h4>B7 — Tornei e montepremi</h4>
      <SelectField
        label="B.7.1 Organizzate tornei con montepremi?"
        value={data.b7_1_organizzaTornei}
        onChange={set("b7_1_organizzaTornei")}
        options={OPZIONI_B.b7_1_organizzaTornei}
      />
      {data.b7_1_organizzaTornei === "Si" && (
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <SelectField
              label="↳ Fascia montepremi"
              value={data.b7_1_fasciaMontepremi}
              onChange={set("b7_1_fasciaMontepremi")}
              options={OPZIONI_B.b7_1_fasciaMontepremi}
            />
          </div>
          <div style={{ flex: 1 }}>
            <NumberField
              label="↳ Quanti/anno?"
              value={data.b7_1_quantiAnno}
              onChange={set("b7_1_quantiAnno")}
            />
          </div>
        </div>
      )}

      <h4>B8 — Motivazione</h4>
      <SelectField
        label="B.8.1 Problema principale da risolvere?"
        value={data.b8_1_problemaPrincipale}
        onChange={set("b8_1_problemaPrincipale")}
        options={OPZIONI_B.b8_1_problemaPrincipale}
        semaforo={semafori.b8_1_problemaPrincipale?.semaforo}
      />

      <SelectField
        label="B.8.2 Esperienza con altri circuiti o leghe?"
        value={data.b8_2_esperienzaCircuiti}
        onChange={set("b8_2_esperienzaCircuiti")}
        options={OPZIONI_B.b8_2_esperienzaCircuiti}
        semaforo={semafori.b8_2_esperienzaCircuiti?.semaforo}
      />
      {data.b8_2_esperienzaCircuiti === "Negativa" && (
        <TextAreaField
          label="↳ Perche?"
          value={data.b8_2_esperienzaNegativaPerche}
          onChange={set("b8_2_esperienzaNegativaPerche")}
        />
      )}

      <SelectField
        label="B.8.3 Disponibili a impegnarsi nei primi 3 mesi?"
        value={data.b8_3_disponibilitaImpegno}
        onChange={set("b8_3_disponibilitaImpegno")}
        options={OPZIONI_B.b8_3_disponibilitaImpegno}
        semaforo={semafori.b8_3_disponibilitaImpegno?.semaforo}
      />
    </div>
  );
}

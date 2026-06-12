import { OPZIONI_B } from "../../models/sectionB";
import { TextField, NumberField, SelectField, MultiSelectField, TextAreaField } from "../Fields";

export default function InCallForm({ data, semafori, onChange, dataA }) {
  const set = (field) => (value) => onChange({ ...data, [field]: value });

  const tesseratiNonTrovati = !dataA?.tesseratiRASD;
  const usaAppGestionale = dataA?.appPropria === "Si (app del gestionale)";
  const zeroCampiCoperti = dataA?.campiCoperti === "" || Number(dataA?.campiCoperti) === 0;
  const hasFITP = (dataA?.affiliazione || []).includes("FITP");

  return (
    <div>

      {tesseratiNonTrovati && (
        <>
          <h4>B0 — Tesserati</h4>
          <NumberField
            label="B.0 Quanti tesserati avete (totale)? (non trovato in pre-call)"
            value={data.b0_tesseratiTotali}
            onChange={set("b0_tesseratiTotali")}
            semaforo={semafori.b0_tesseratiTotali?.semaforo}

        sectionKey="sectionB"
        fieldKey="b0_tesseratiTotali"
          />
        </>
      )}

      {usaAppGestionale && (
        <>
          <h4>App del gestionale</h4>
          <SelectField
            label="Il centro/i giocatori utilizzano effettivamente l'app del gestionale?"
            value={data.b0_1_appGestionaleUsata}
            onChange={set("b0_1_appGestionaleUsata")}
            options={OPZIONI_B.b0_1_appGestionaleUsata}
            semaforo={semafori.b0_1_appGestionaleUsata?.semaforo}

        sectionKey="sectionB"
        fieldKey="b0_1_appGestionaleUsata"
          />
          {(data.b0_1_appGestionaleUsata === "No" || data.b0_1_appGestionaleUsata === "In parte") && (
            <>
              <SelectField
                label="↳ Perche non viene utilizzata (o non del tutto)?"
                value={data.b0_1_appGestionaleMotivo}
                onChange={set("b0_1_appGestionaleMotivo")}
                options={OPZIONI_B.b0_1_appGestionaleMotivo}

        sectionKey="sectionB"
        fieldKey="b0_1_appGestionaleMotivo"
              />
              {data.b0_1_appGestionaleMotivo === "Altro" && (
                <TextAreaField
                  label="↳ Specifica"
                  value={data.b0_1_appGestionaleMotivoAltro}
                  onChange={set("b0_1_appGestionaleMotivoAltro")}

        sectionKey="sectionB"
        fieldKey="b0_1_appGestionaleMotivoAltro"
                />
              )}
            </>
          )}
        </>
      )}

      <h4>B1 — Campi e vincoli</h4>

      {zeroCampiCoperti && (
        <>
          <SelectField
            label="In pre-call non risultano campi coperti: qual e' la situazione reale?"
            value={data.b1_4_statoCampiCoperti}
            onChange={set("b1_4_statoCampiCoperti")}
            options={OPZIONI_B.b1_4_statoCampiCoperti}
            semaforo={semafori.b1_4_statoCampiCoperti?.semaforo}

            sectionKey="sectionB"
            fieldKey="b1_4_statoCampiCoperti"
          />
          {(data.b1_4_statoCampiCoperti === "Si, copertura fissa" || data.b1_4_statoCampiCoperti === "Si, copertura stagionale (pallone)") && (
            <NumberField
              label="↳ Quanti campi coperti ha effettivamente?"
              value={data.b1_4_quantiCopertiReali}
              onChange={set("b1_4_quantiCopertiReali")}

              sectionKey="sectionB"
              fieldKey="b1_4_quantiCopertiReali"
            />
          )}
        </>
      )}

      <SelectField
        label="B.1.2 Campi coperti disponibili per eventi PSL?"
        value={data.b1_2_campiDisponibiliPSL}
        onChange={set("b1_2_campiDisponibiliPSL")}
        options={OPZIONI_B.b1_2_campiDisponibiliPSL}
        semaforo={semafori.b1_2_campiDisponibiliPSL?.semaforo}

        sectionKey="sectionB"
        fieldKey="b1_2_campiDisponibiliPSL"
      />

      {hasFITP && (
      <>
      <SelectField
        label="B.1.1 Campi coperti vincolati FITP/altri EPS?"
        value={data.b1_1_vincoliFITP}
        onChange={set("b1_1_vincoliFITP")}
        options={OPZIONI_B.b1_1_vincoliFITP}
        semaforo={semafori.b1_1_vincoliFITP?.semaforo}

        sectionKey="sectionB"
        fieldKey="b1_1_vincoliFITP"
      />
      {data.b1_1_vincoliFITP === "Alcuni" && (
        <TextField
          label="↳ Quanti?"
          value={data.b1_1_quantiVincolati}
          onChange={set("b1_1_quantiVincolati")}

        sectionKey="sectionB"
        fieldKey="b1_1_quantiVincolati"
        />
      )}

      <SelectField
        label="B.1.3 Se campi vincolati FITP: disposti a clausola responsabilita contrattuale?"
        value={data.b1_3_clausolaResponsabilita}
        onChange={set("b1_3_clausolaResponsabilita")}
        options={OPZIONI_B.b1_3_clausolaResponsabilita}
        semaforo={semafori.b1_3_clausolaResponsabilita?.semaforo}

        sectionKey="sectionB"
        fieldKey="b1_3_clausolaResponsabilita"
      />
      </>
      )}

      <h4>B2 — Base clienti reale</h4>
      <SelectField
        label="B.2.1 Prenotazioni in una settimana tipo?"
        value={data.b2_1_prenotazioniSettimana}
        onChange={set("b2_1_prenotazioniSettimana")}
        options={OPZIONI_B.b2_1_prenotazioniSettimana}
        semaforo={semafori.b2_1_prenotazioniSettimana?.semaforo}

        sectionKey="sectionB"
        fieldKey="b2_1_prenotazioniSettimana"
      />

      <SelectField
        label="B.2.2 Canale comunicazione diretto con clienti?"
        value={data.b2_2_canaleComunicazione}
        onChange={set("b2_2_canaleComunicazione")}
        options={OPZIONI_B.b2_2_canaleComunicazione}
        semaforo={semafori.b2_2_canaleComunicazione?.semaforo}

        sectionKey="sectionB"
        fieldKey="b2_2_canaleComunicazione"
      />
      {(data.b2_2_canaleComunicazione === "Poco gestito" || data.b2_2_canaleComunicazione === "Attivo e aggiornato") && (
        <MultiSelectField
          label="↳ Quali canali usano? (di standard basta il gruppo WhatsApp)"
          values={data.b2_2_canali}
          onChange={set("b2_2_canali")}
          options={OPZIONI_B.b2_2_canali}
          semaforo={semafori.b2_2_canali?.semaforo}

          sectionKey="sectionB"
          fieldKey="b2_2_canali"
        />
      )}

      <SelectField
        label="B.2.4 Affluenza agli eventi organizzati dal centro (rispetto ai tesserati)"
        value={data.b2_4_affluenzaEventi}
        onChange={set("b2_4_affluenzaEventi")}
        options={OPZIONI_B.b2_4_affluenzaEventi}
        semaforo={semafori.b2_4_affluenzaEventi?.semaforo}

        sectionKey="sectionB"
        fieldKey="b2_4_affluenzaEventi"
      />

      <MultiSelectField
        label="B.2.4b Che tipo di eventi organizza il centro?"
        values={data.b2_4_tipiEventi}
        onChange={set("b2_4_tipiEventi")}
        options={OPZIONI_B.b2_4_tipiEventi}
        semaforo={semafori.b2_4_tipiEventi?.semaforo}

        sectionKey="sectionB"
        fieldKey="b2_4_tipiEventi"
      />

      <h4>B3 — Stagionalita</h4>
      <SelectField
        label="B.3.1 Stagionalita del centro?"
        value={data.b3_1_stagionalita}
        onChange={set("b3_1_stagionalita")}
        options={OPZIONI_B.b3_1_stagionalita}
        semaforo={semafori.b3_1_stagionalita?.semaforo}

        sectionKey="sectionB"
        fieldKey="b3_1_stagionalita"
      />
      {data.b3_1_stagionalita === "Periodo morto" && (
        <TextField
          label="↳ Quale periodo?"
          value={data.b3_1_periodoMorto}
          onChange={set("b3_1_periodoMorto")}

        sectionKey="sectionB"
        fieldKey="b3_1_periodoMorto"
        />
      )}
      <p style={{ fontSize: "0.8rem", color: "#888" }}>
        Nota: periodo morto non è KO automatico — valutare se PSL può colmarlo con eventi.
      </p>

      <h4>B4 — Staff</h4>
      <NumberField
        label="B.4.1 Quante persone lavorano nel centro?"
        value={data.b4_1_personeStaff}
        onChange={set("b4_1_personeStaff")}
        semaforo={semafori.b4_1_personeStaff?.semaforo}

        sectionKey="sectionB"
        fieldKey="b4_1_personeStaff"
      />
      <SelectField
        label="B.4.2 Referente PSL interno disponibile?"
        value={data.b4_2_referentePSL}
        onChange={set("b4_2_referentePSL")}
        options={OPZIONI_B.b4_2_referentePSL}
        semaforo={semafori.b4_2_referentePSL?.semaforo}

        sectionKey="sectionB"
        fieldKey="b4_2_referentePSL"
      />
      <SelectField
        label="B.4.3 Maestri/allenatori stabili?"
        value={data.b4_3_maestriStabili}
        onChange={set("b4_3_maestriStabili")}
        options={OPZIONI_B.b4_3_maestriStabili}
        semaforo={semafori.b4_3_maestriStabili?.semaforo}

        sectionKey="sectionB"
        fieldKey="b4_3_maestriStabili"
      />

      <h4>B5 — Gestionale e costi</h4>
      <SelectField
        label="B.5.1 Software di gestione attuale?"
        value={data.b5_1_softwareGestione}
        onChange={set("b5_1_softwareGestione")}
        options={OPZIONI_B.b5_1_softwareGestione}
        semaforo={semafori.b5_1_softwareGestione?.semaforo}

        sectionKey="sectionB"
        fieldKey="b5_1_softwareGestione"
      />
      {data.b5_1_softwareGestione === "Gestionale di proprieta del centro" && (
        <SelectField
          label="↳ Quale? (backend)"
          value={data.b5_1_softwareNome}
          onChange={set("b5_1_softwareNome")}
          options={OPZIONI_B.b5_1_softwareNomeBrand}

        sectionKey="sectionB"
        fieldKey="b5_1_softwareNome"
        />
      )}

      <NumberField
        label="B.5.2 Costo software di gestione annuale (dichiarato dal centro)"
        value={data.b5_2_costoSoftwareAnnuale}
        onChange={set("b5_2_costoSoftwareAnnuale")}
        suffix="€/anno"

        sectionKey="sectionB"
        fieldKey="b5_2_costoSoftwareAnnuale"
      />

      <SelectField
        label="B.5.3 Aperti a cambiare software con PSL?"
        value={data.b5_3_aperturaCambioSoftware}
        onChange={set("b5_3_aperturaCambioSoftware")}
        options={OPZIONI_B.b5_3_aperturaCambioSoftware}
        semaforo={semafori.b5_3_aperturaCambioSoftware?.semaforo}

        sectionKey="sectionB"
        fieldKey="b5_3_aperturaCambioSoftware"
      />

      <SelectField
        label="B.5.4 Se EPS diverso da ACSI: disposti a migrare?"
        value={data.b5_4_migrazioneEPS}
        onChange={set("b5_4_migrazioneEPS")}
        options={OPZIONI_B.b5_4_migrazioneEPS}
        semaforo={semafori.b5_4_migrazioneEPS?.semaforo}

        sectionKey="sectionB"
        fieldKey="b5_4_migrazioneEPS"
      />

      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <NumberField
            label="B.5.5 Tesserati medi annuali (totale)"
            value={data.b5_5_tesseratiTotali}
            onChange={set("b5_5_tesseratiTotali")}

        sectionKey="sectionB"
        fieldKey="b5_5_tesseratiTotali"
          />
        </div>
        <div style={{ flex: 1 }}>
          <NumberField
            label="↳ Agonistici"
            value={data.b5_5_tesseratiAgonistici}
            onChange={set("b5_5_tesseratiAgonistici")}

        sectionKey="sectionB"
        fieldKey="b5_5_tesseratiAgonistici"
          />
        </div>
        <div style={{ flex: 1 }}>
          <NumberField
            label="↳ Non agonistici"
            value={data.b5_5_tesseratiNonAgonistici}
            onChange={set("b5_5_tesseratiNonAgonistici")}

        sectionKey="sectionB"
        fieldKey="b5_5_tesseratiNonAgonistici"
          />
        </div>
      </div>

      <NumberField
        label="B.5.6 % prenotazioni che arrivano online vs desk?"
        value={data.b5_6_percPrenotazioniOnline}
        onChange={set("b5_6_percPrenotazioniOnline")}
        suffix="%"

        sectionKey="sectionB"
        fieldKey="b5_6_percPrenotazioniOnline"
      />

      <h4>B6 — Pricing</h4>
      <SelectField
        label="B.6.1 Abbonamenti o tessere per clienti abituali?"
        value={data.b6_1_abbonamenti}
        onChange={set("b6_1_abbonamenti")}
        options={OPZIONI_B.b6_1_abbonamenti}
        semaforo={semafori.b6_1_abbonamenti?.semaforo}

        sectionKey="sectionB"
        fieldKey="b6_1_abbonamenti"
      />
      {data.b6_1_abbonamenti === "Si" && (
        <TextAreaField
          label="↳ Descrizione"
          value={data.b6_1_abbonamentiDesc}
          onChange={set("b6_1_abbonamentiDesc")}

        sectionKey="sectionB"
        fieldKey="b6_1_abbonamentiDesc"
        />
      )}

      <SelectField
        label="B.6.2 Prezzi differenziati per fascia oraria?"
        value={data.b6_2_prezziDifferenziati}
        onChange={set("b6_2_prezziDifferenziati")}
        options={OPZIONI_B.b6_2_prezziDifferenziati}
        semaforo={semafori.b6_2_prezziDifferenziati?.semaforo}

        sectionKey="sectionB"
        fieldKey="b6_2_prezziDifferenziati"
      />

      <h4>B7 — Tornei e montepremi</h4>
      <SelectField
        label="B.7.1 Organizzate tornei con montepremi?"
        value={data.b7_1_organizzaTornei}
        onChange={set("b7_1_organizzaTornei")}
        options={OPZIONI_B.b7_1_organizzaTornei}

        sectionKey="sectionB"
        fieldKey="b7_1_organizzaTornei"
      />
      {data.b7_1_organizzaTornei === "Si" && (
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ flex: 1 }}>
            <SelectField
              label="↳ Fascia montepremi"
              value={data.b7_1_fasciaMontepremi}
              onChange={set("b7_1_fasciaMontepremi")}
              options={OPZIONI_B.b7_1_fasciaMontepremi}

        sectionKey="sectionB"
        fieldKey="b7_1_fasciaMontepremi"
            />
          </div>
          <div style={{ flex: 1 }}>
            <NumberField
              label="↳ Quanti/anno?"
              value={data.b7_1_quantiAnno}
              onChange={set("b7_1_quantiAnno")}

        sectionKey="sectionB"
        fieldKey="b7_1_quantiAnno"
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

        sectionKey="sectionB"
        fieldKey="b8_1_problemaPrincipale"
      />

      <SelectField
        label="B.8.2 Esperienza con altri circuiti o leghe?"
        value={data.b8_2_esperienzaCircuiti}
        onChange={set("b8_2_esperienzaCircuiti")}
        options={OPZIONI_B.b8_2_esperienzaCircuiti}
        semaforo={semafori.b8_2_esperienzaCircuiti?.semaforo}

        sectionKey="sectionB"
        fieldKey="b8_2_esperienzaCircuiti"
      />
      {data.b8_2_esperienzaCircuiti === "Negativa" && (
        <TextAreaField
          label="↳ Perche?"
          value={data.b8_2_esperienzaNegativaPerche}
          onChange={set("b8_2_esperienzaNegativaPerche")}

        sectionKey="sectionB"
        fieldKey="b8_2_esperienzaNegativaPerche"
        />
      )}

      <SelectField
        label="B.8.3 Disponibili a impegnarsi nei primi 3 mesi?"
        value={data.b8_3_disponibilitaImpegno}
        onChange={set("b8_3_disponibilitaImpegno")}
        options={OPZIONI_B.b8_3_disponibilitaImpegno}
        semaforo={semafori.b8_3_disponibilitaImpegno?.semaforo}

        sectionKey="sectionB"
        fieldKey="b8_3_disponibilitaImpegno"
      />
    </div>
  );
}

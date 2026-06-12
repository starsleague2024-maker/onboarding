import { OPZIONI } from "../../models/sectionA";
import { TextField, NumberField, SelectField, MultiSelectField, TextAreaField } from "../Fields";

export default function PreCallForm({ data, semafori, onChange }) {
  const set = (field) => (value) => onChange({ ...data, [field]: value });

  return (
    <div>

      <TextField
        label="A.1 Denominazione ufficiale"
        value={data.denominazione}
        onChange={set("denominazione")}
        semaforo={semafori.denominazione?.semaforo}
        needsCallFlag={semafori.denominazione?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="denominazione"
      />

      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <TextField
            label="Telefono"
            value={data.telefono}
            onChange={set("telefono")}
            placeholder="es. 0123 456789"

        sectionKey="sectionA"
        fieldKey="telefono"
          />
        </div>
        <div style={{ flex: 1 }}>
          <TextField
            label="Email"
            value={data.email}
            onChange={set("email")}
            placeholder="es. info@centro.it"

        sectionKey="sectionA"
        fieldKey="email"
          />
        </div>
      </div>

      <MultiSelectField
        label="A.2 Forma giuridica (puo essere piu di una)"
        values={data.formaGiuridica}
        onChange={set("formaGiuridica")}
        options={OPZIONI.formaGiuridica}
        semaforo={semafori.formaGiuridica?.semaforo}
        needsCallFlag={semafori.formaGiuridica?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="formaGiuridica"
      />

      <MultiSelectField
        label="A.3 Affiliazione (puo essere piu di una, es. FITP + ente promozione)"
        values={data.affiliazione}
        onChange={set("affiliazione")}
        options={OPZIONI.affiliazione}
        semaforo={semafori.affiliazione?.semaforo}
        needsCallFlag={semafori.affiliazione?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="affiliazione"
      />

      <NumberField
        label="A.4 Tesserati dichiarati dal RASD (Sport e Salute)"
        value={data.tesseratiRASD}
        onChange={set("tesseratiRASD")}
        semaforo={semafori.tesseratiRASD?.semaforo}
        needsCallFlag={semafori.tesseratiRASD?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="tesseratiRASD"
      />

      <NumberField
        label="A.5 Campi totali"
        value={data.campiTotali}
        onChange={set("campiTotali")}
        semaforo={semafori.campiTotali?.semaforo}
        needsCallFlag={semafori.campiTotali?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="campiTotali"
      />

      <NumberField
        label="A.6 Campi coperti"
        value={data.campiCoperti}
        onChange={set("campiCoperti")}
        semaforo={semafori.campiCoperti?.semaforo}
        needsCallFlag={semafori.campiCoperti?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="campiCoperti"
      />
      <p style={{ fontSize: "0.8rem", color: "#a8b5c2", marginTop: "-8px" }}>
        Nota: se ci sono campi outdoor, in call verra chiesto se in inverno vengono coperti con pallone pressostatico (B.1.0).
      </p>

      <SelectField
        label="A.7 Regione / Area"
        value={data.regione}
        onChange={set("regione")}
        options={OPZIONI.regione}

        sectionKey="sectionA"
        fieldKey="regione"
      />

      <NumberField
        label="A.8 Prezzo indoor 90min (fascia premium)"
        value={data.prezzoIndoor90}
        onChange={set("prezzoIndoor90")}
        suffix="€"
        semaforo={semafori.prezzoIndoor90?.semaforo}

        sectionKey="sectionA"
        fieldKey="prezzoIndoor90"
      />

      <NumberField
        label="A.9 Prezzo outdoor 90min (fascia premium)"
        value={data.prezzoOutdoor90}
        onChange={set("prezzoOutdoor90")}
        suffix="€"
        semaforo={semafori.prezzoOutdoor90?.semaforo}

        sectionKey="sectionA"
        fieldKey="prezzoOutdoor90"
      />

      <SelectField
        label="A.10 Piattaforma prenotazioni online"
        value={data.piattaformaPrenotazioni}
        onChange={set("piattaformaPrenotazioni")}
        options={OPZIONI.piattaformaPrenotazioni}
        semaforo={semafori.piattaformaPrenotazioni?.semaforo}
        needsCallFlag={semafori.piattaformaPrenotazioni?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="piattaformaPrenotazioni"
      />
      {data.piattaformaPrenotazioni === "Si" && (
        <SelectField
          label="↳ Brand gestionale (backend)"
          value={data.gestionalePrenotazioni}
          onChange={set("gestionalePrenotazioni")}
          options={OPZIONI.gestionaleBrand}

        sectionKey="sectionA"
        fieldKey="gestionalePrenotazioni"
        />
      )}

      <SelectField
        label="A.11 Sito web"
        value={data.sitoWeb}
        onChange={set("sitoWeb")}
        options={OPZIONI.sitoWeb}
        semaforo={semafori.sitoWeb?.semaforo}
        needsCallFlag={semafori.sitoWeb?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="sitoWeb"
      />

      <SelectField
        label="A.12 Instagram"
        value={data.instagram}
        onChange={set("instagram")}
        options={OPZIONI.socialStato}
        semaforo={semafori.instagram?.semaforo}
        needsCallFlag={semafori.instagram?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="instagram"
      />

      <SelectField
        label="A.13 Facebook"
        value={data.facebook}
        onChange={set("facebook")}
        options={OPZIONI.socialStato}
        semaforo={semafori.facebook?.semaforo}
        needsCallFlag={semafori.facebook?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="facebook"
      />

      <NumberField
        label="A.14 Google rating"
        value={data.googleRating}
        onChange={set("googleRating")}
        semaforo={semafori.googleRating?.semaforo}

        sectionKey="sectionA"
        fieldKey="googleRating"
      />

      <NumberField
        label="A.15 Google recensioni (numero)"
        value={data.googleRecensioni}
        onChange={set("googleRecensioni")}
        semaforo={semafori.googleRecensioni?.semaforo}

        sectionKey="sectionA"
        fieldKey="googleRecensioni"
      />

      <SelectField
        label="A.18 Il centro ha una app propria?"
        value={data.appPropria}
        onChange={set("appPropria")}
        options={OPZIONI.appPropria}
        semaforo={semafori.appPropria?.semaforo}
        needsCallFlag={semafori.appPropria?.needsCallFlag}

        sectionKey="sectionA"
        fieldKey="appPropria"
      />

      <TextAreaField
        label="Note libere (Sezione A)"
        value={data.noteSezioneA}
        onChange={set("noteSezioneA")}
        placeholder="Eventuali osservazioni aggiuntive emerse durante la ricerca pre-call..."

        sectionKey="sectionA"
        fieldKey="noteSezioneA"
      />
    </div>
  );
}

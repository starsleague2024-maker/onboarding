import { OPZIONI } from "../../models/sectionA";
import { TextField, NumberField, SelectField, SectionTitle } from "../Fields";

export default function PreCallForm({ data, semafori, onChange }) {
  const set = (field) => (value) => onChange({ ...data, [field]: value });

  return (
    <div>
      <SectionTitle>Sezione A — Pre-call</SectionTitle>

      <TextField
        label="A.1 Denominazione ufficiale"
        value={data.denominazione}
        onChange={set("denominazione")}
        semaforo={semafori.denominazione?.semaforo}
        needsCallFlag={semafori.denominazione?.needsCallFlag}
      />

      <SelectField
        label="A.2 Forma giuridica"
        value={data.formaGiuridica}
        onChange={set("formaGiuridica")}
        options={OPZIONI.formaGiuridica}
        semaforo={semafori.formaGiuridica?.semaforo}
        needsCallFlag={semafori.formaGiuridica?.needsCallFlag}
      />

      <SelectField
        label="A.3 Affiliazione"
        value={data.affiliazione}
        onChange={set("affiliazione")}
        options={OPZIONI.affiliazione}
        semaforo={semafori.affiliazione?.semaforo}
        needsCallFlag={semafori.affiliazione?.needsCallFlag}
      />

      <NumberField
        label="A.4 Tesserati dichiarati"
        value={data.tesseratiDichiarati}
        onChange={set("tesseratiDichiarati")}
        semaforo={semafori.tesseratiDichiarati?.semaforo}
      />
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ flex: 1 }}>
          <NumberField
            label="↳ di cui agonistici (backend)"
            value={data.tesseratiAgonistici}
            onChange={set("tesseratiAgonistici")}
          />
        </div>
        <div style={{ flex: 1 }}>
          <NumberField
            label="↳ di cui non agonistici (backend)"
            value={data.tesseratiNonAgonistici}
            onChange={set("tesseratiNonAgonistici")}
          />
        </div>
      </div>

      <NumberField
        label="A.5 Campi totali"
        value={data.campiTotali}
        onChange={set("campiTotali")}
        semaforo={semafori.campiTotali?.semaforo}
        needsCallFlag={semafori.campiTotali?.needsCallFlag}
      />

      <NumberField
        label="A.6 Campi coperti"
        value={data.campiCoperti}
        onChange={set("campiCoperti")}
        semaforo={semafori.campiCoperti?.semaforo}
        needsCallFlag={semafori.campiCoperti?.needsCallFlag}
      />

      <SelectField
        label="A.7 Regione / Area"
        value={data.regione}
        onChange={set("regione")}
        options={OPZIONI.regione}
      />

      <NumberField
        label="A.8 Prezzo indoor 90min (fascia premium)"
        value={data.prezzoIndoor90}
        onChange={set("prezzoIndoor90")}
        suffix="€"
        semaforo={semafori.prezzoIndoor90?.semaforo}
      />

      <NumberField
        label="A.9 Prezzo outdoor 90min (fascia premium)"
        value={data.prezzoOutdoor90}
        onChange={set("prezzoOutdoor90")}
        suffix="€"
        semaforo={semafori.prezzoOutdoor90?.semaforo}
      />

      <SelectField
        label="A.10 Piattaforma prenotazioni online"
        value={data.piattaformaPrenotazioni}
        onChange={set("piattaformaPrenotazioni")}
        options={OPZIONI.piattaformaPrenotazioni}
        semaforo={semafori.piattaformaPrenotazioni?.semaforo}
        needsCallFlag={semafori.piattaformaPrenotazioni?.needsCallFlag}
      />
      {data.piattaformaPrenotazioni === "Si" && (
        <SelectField
          label="↳ Brand gestionale (backend)"
          value={data.gestionalePrenotazioni}
          onChange={set("gestionalePrenotazioni")}
          options={OPZIONI.gestionaleBrand}
        />
      )}

      <SelectField
        label="A.11 Sito web"
        value={data.sitoWeb}
        onChange={set("sitoWeb")}
        options={OPZIONI.sitoWeb}
        semaforo={semafori.sitoWeb?.semaforo}
        needsCallFlag={semafori.sitoWeb?.needsCallFlag}
      />

      <SelectField
        label="A.12 Instagram"
        value={data.instagram}
        onChange={set("instagram")}
        options={OPZIONI.socialStato}
        semaforo={semafori.instagram?.semaforo}
        needsCallFlag={semafori.instagram?.needsCallFlag}
      />

      <SelectField
        label="A.13 Facebook"
        value={data.facebook}
        onChange={set("facebook")}
        options={OPZIONI.socialStato}
        semaforo={semafori.facebook?.semaforo}
        needsCallFlag={semafori.facebook?.needsCallFlag}
      />

      <NumberField
        label="A.14 Google rating"
        value={data.googleRating}
        onChange={set("googleRating")}
        semaforo={semafori.googleRating?.semaforo}
      />

      <NumberField
        label="A.15 Google recensioni (numero)"
        value={data.googleRecensioni}
        onChange={set("googleRecensioni")}
        semaforo={semafori.googleRecensioni?.semaforo}
      />

      <SelectField
        label="A.16 Gestionale visibile online"
        value={data.gestionaleVisibile}
        onChange={set("gestionaleVisibile")}
        options={OPZIONI.gestionaleVisibile}
        semaforo={semafori.gestionaleVisibile?.semaforo}
        needsCallFlag={semafori.gestionaleVisibile?.needsCallFlag}
      />
      {data.gestionaleVisibile === "Si" && (
        <TextField
          label="↳ Quale gestionale? (backend)"
          value={data.gestionaleBrand}
          onChange={set("gestionaleBrand")}
        />
      )}

      <NumberField
        label="A.17 Costo gestionale annuale"
        value={data.costoGestionaleAnnuale}
        onChange={set("costoGestionaleAnnuale")}
        suffix="€/anno"
        needsCallFlag={semafori.costoGestionaleAnnuale?.needsCallFlag}
      />
    </div>
  );
}

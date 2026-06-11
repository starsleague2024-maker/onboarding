// IMPLEMENTAZIONE STORAGE — Supabase (PLACEHOLDER, futuro)
//
// Per attivare:
// 1. npm install @supabase/supabase-js
// 2. Crea progetto Supabase, tabella "sessions" con colonne:
//    id (uuid, pk), created_at, updated_at, status, nome_operatore,
//    data_call, note_interne, section_a (jsonb), section_b (jsonb), psl_package (jsonb)
// 3. Configura .env con VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
// 4. Decommenta il codice sotto e sostituisci l'export in src/data/index.js
//
// L'interfaccia esposta deve restare identica a localStorageAdapter
// per garantire compatibilita con il resto dell'app.

/*
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function fromRow(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    status: row.status,
    nomeOperatore: row.nome_operatore,
    dataCall: row.data_call,
    noteInterne: row.note_interne,
    sectionA: row.section_a,
    sectionB: row.section_b,
    pslPackage: row.psl_package,
  };
}

function toRow(session) {
  return {
    id: session.id,
    created_at: session.createdAt,
    updated_at: new Date().toISOString(),
    status: session.status,
    nome_operatore: session.nomeOperatore,
    data_call: session.dataCall,
    note_interne: session.noteInterne,
    section_a: session.sectionA,
    section_b: session.sectionB,
    psl_package: session.pslPackage,
  };
}

export const supabaseStorageAdapter = {
  async listSessions() {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return data.map(fromRow);
  },

  async getSession(id) {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return fromRow(data);
  },

  async saveSession(session) {
    const row = toRow(session);
    const { data, error } = await supabase
      .from("sessions")
      .upsert(row)
      .select()
      .single();
    if (error) throw error;
    return fromRow(data);
  },

  async deleteSession(id) {
    const { error } = await supabase.from("sessions").delete().eq("id", id);
    if (error) throw error;
  },
};
*/

export const supabaseStorageAdapter = null; // non ancora attivo

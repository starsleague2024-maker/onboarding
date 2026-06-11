// STORAGE ADAPTER — interfaccia astratta
// Implementazioni concrete: localStorage (MVP), poi Supabase

/**
 * @typedef {Object} StorageAdapter
 * @property {(id: string) => Promise<Object|null>} getSession
 * @property {() => Promise<Array<Object>>} listSessions
 * @property {(session: Object) => Promise<Object>} saveSession
 * @property {(id: string) => Promise<void>} deleteSession
 */

export const SESSION_STATUS = {
  DRAFT: "draft",
  IN_CALL: "in_call",
  COMPLETED: "completed",
};

/**
 * Crea un oggetto sessione vuoto.
 */
export function createEmptySession({ nomeOperatore = "" } = {}) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: SESSION_STATUS.DRAFT,
    nomeOperatore,
    dataCall: "",
    noteInterne: "",
    sectionA: null, // popolato con initialSectionA al primo salvataggio
    sectionB: null, // popolato con initialSectionB
    pslPackage: null, // override opzionale del pacchetto PSL
  };
}

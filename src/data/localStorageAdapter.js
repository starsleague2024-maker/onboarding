// IMPLEMENTAZIONE STORAGE — localStorage (MVP)
// Da sostituire con supabaseStorage.js mantenendo la stessa interfaccia

const STORAGE_KEY = "psl_app_sessions";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Errore lettura storage", e);
    return [];
  }
}

function writeAll(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export const localStorageAdapter = {
  async listSessions() {
    return readAll().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  },

  async getSession(id) {
    const sessions = readAll();
    return sessions.find((s) => s.id === id) || null;
  },

  async saveSession(session) {
    const sessions = readAll();
    const updated = { ...session, updatedAt: new Date().toISOString() };
    const idx = sessions.findIndex((s) => s.id === session.id);
    if (idx >= 0) {
      sessions[idx] = updated;
    } else {
      sessions.push(updated);
    }
    writeAll(sessions);
    return updated;
  },

  async deleteSession(id) {
    const sessions = readAll().filter((s) => s.id !== id);
    writeAll(sessions);
  },

  async exportAll() {
    return readAll();
  },

  async importAll(sessions) {
    writeAll(sessions);
  },
};

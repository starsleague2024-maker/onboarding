// PUNTO DI INGRESSO STORAGE
// Per passare a Supabase: importa supabaseStorageAdapter da "./supabaseStorage"
// e cambia l'export sotto. Il resto dell'app non deve cambiare.

import { localStorageAdapter } from "./localStorageAdapter";

export const storage = localStorageAdapter;

export { createEmptySession, SESSION_STATUS } from "./storageAdapter";

import { useState, useCallback } from "react";
import { FeedbackContext } from "./feedbackUtils";

export function FeedbackProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [notes, setNotes] = useState([]); // { id, sectionKey, fieldKey, label, text, createdAt }
  const [openFieldKey, setOpenFieldKey] = useState(null);

  const addNote = useCallback((note) => {
    setNotes((prev) => [...prev, { ...note, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
  }, []);

  const removeNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotes = useCallback(() => setNotes([]), []);

  return (
    <FeedbackContext.Provider
      value={{ enabled, setEnabled, notes, addNote, removeNote, clearNotes, openFieldKey, setOpenFieldKey }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

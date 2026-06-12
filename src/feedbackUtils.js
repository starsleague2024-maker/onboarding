import { useContext, createContext } from "react";

export const FeedbackContext = createContext(null);

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) {
    // Provider non presente: ritorna no-op, modalita feedback disabilitata
    return {
      enabled: false,
      setEnabled: () => {},
      notes: [],
      addNote: () => {},
      removeNote: () => {},
      clearNotes: () => {},
      openFieldKey: null,
      setOpenFieldKey: () => {},
    };
  }
  return ctx;
}

/**
 * Genera il report in formato markdown + blocco JSON per Claude.
 */
export function generaReport(notes, sessionInfo) {
  const data = new Date().toLocaleString("it-IT");
  let md = `# Report feedback — PSL App\n\n`;
  md += `Generato il: ${data}\n`;
  if (sessionInfo?.denominazione) {
    md += `Scheda: ${sessionInfo.denominazione}\n`;
  }
  md += `\n---\n\n`;

  if (notes.length === 0) {
    md += `Nessuna nota inserita.\n`;
  } else {
    notes.forEach((n, i) => {
      md += `## ${i + 1}. ${n.label}\n`;
      md += `- **Sezione**: ${n.sectionKey}\n`;
      md += `- **Campo**: \`${n.fieldKey}\`\n`;
      md += `- **Nota**: ${n.text}\n\n`;
    });
  }

  md += `\n---\n\n`;
  md += "```json\n";
  md += JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      notes: notes.map((n) => ({
        sectionKey: n.sectionKey,
        fieldKey: n.fieldKey,
        label: n.label,
        text: n.text,
      })),
    },
    null,
    2
  );
  md += "\n```\n";

  return md;
}


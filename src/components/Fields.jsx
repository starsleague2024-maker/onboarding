import SemaforoBadge from "./SemaforoBadge";
import FeedbackIcon from "./FeedbackIcon";
import { COLORS } from "../theme";

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  marginBottom: "12px",
};

const labelRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
};

const inputStyle = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: `1px solid ${COLORS.border}`,
  fontSize: "0.9rem",
  background: COLORS.cardLight,
  color: COLORS.text,
};

const labelStyle = { fontWeight: 500, fontSize: "0.85rem", color: COLORS.text };
const flagStyle = { color: COLORS.gold, fontSize: "0.75rem" };

export function TextField({ label, value, onChange, placeholder, semaforo, needsCallFlag, sectionKey, fieldKey }) {
  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={labelStyle}>
          {label} {needsCallFlag && <span style={flagStyle}>(chiedere in call)</span>}
        </label>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {semaforo && <SemaforoBadge semaforo={semaforo} />}
          {fieldKey && <FeedbackIcon sectionKey={sectionKey} fieldKey={fieldKey} label={label} />}
        </span>
      </div>
      <input
        style={inputStyle}
        type="text"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function NumberField({ label, value, onChange, placeholder, semaforo, needsCallFlag, suffix, sectionKey, fieldKey }) {
  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={labelStyle}>
          {label} {needsCallFlag && <span style={flagStyle}>(chiedere in call)</span>}
        </label>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {semaforo && <SemaforoBadge semaforo={semaforo} />}
          {fieldKey && <FeedbackIcon sectionKey={sectionKey} fieldKey={fieldKey} label={label} />}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          type="number"
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && <span style={{ fontSize: "0.85rem", color: COLORS.textMuted }}>{suffix}</span>}
      </div>
    </div>
  );
}

export function SelectField({ label, value, onChange, options, semaforo, needsCallFlag, includeEmpty = true, sectionKey, fieldKey }) {
  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={labelStyle}>
          {label} {needsCallFlag && <span style={flagStyle}>(chiedere in call)</span>}
        </label>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {semaforo && <SemaforoBadge semaforo={semaforo} />}
          {fieldKey && <FeedbackIcon sectionKey={sectionKey} fieldKey={fieldKey} label={label} />}
        </span>
      </div>
      <select style={inputStyle} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        {includeEmpty && <option value="">-- seleziona --</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function MultiSelectField({ label, values, onChange, options, semaforo, needsCallFlag, sectionKey, fieldKey, exclusiveOptions = [] }) {
  const selected = Array.isArray(values) ? values : [];

  function toggle(opt) {
    if (selected.includes(opt)) {
      onChange(selected.filter((v) => v !== opt));
    } else if (exclusiveOptions.includes(opt)) {
      // selecting an exclusive option clears everything else
      onChange([opt]);
    } else {
      // selecting a normal option clears any exclusive option
      onChange([...selected.filter((v) => !exclusiveOptions.includes(v)), opt]);
    }
  }

  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={labelStyle}>
          {label} {needsCallFlag && <span style={flagStyle}>(chiedere in call)</span>}
        </label>
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {semaforo && <SemaforoBadge semaforo={semaforo} />}
          {fieldKey && <FeedbackIcon sectionKey={sectionKey} fieldKey={fieldKey} label={label} />}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          const hasExclusiveSelected = exclusiveOptions.some((ex) => ex !== opt && selected.includes(ex));
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              disabled={hasExclusiveSelected}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: `1px solid ${active ? COLORS.gold : COLORS.border}`,
                background: active ? COLORS.gold : COLORS.cardLight,
                color: active ? COLORS.navy : COLORS.text,
                fontSize: "0.8rem",
                cursor: hasExclusiveSelected ? "not-allowed" : "pointer",
                fontWeight: active ? 600 : 400,
                opacity: hasExclusiveSelected ? 0.4 : 1,
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TextAreaField({ label, value, onChange, placeholder, sectionKey, fieldKey }) {
  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={labelStyle}>{label}</label>
        {fieldKey && <FeedbackIcon sectionKey={sectionKey} fieldKey={fieldKey} label={label} />}
      </div>
      <textarea
        style={{ ...inputStyle, minHeight: "70px", resize: "vertical" }}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function SectionTitle({ children }) {
  return (
    <h3
      style={{
        marginTop: "24px",
        marginBottom: "8px",
        paddingBottom: "4px",
        borderBottom: `2px solid ${COLORS.gold}`,
        fontSize: "1.05rem",
        color: COLORS.text,
      }}
    >
      {children}
    </h3>
  );
}

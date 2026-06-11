import SemaforoBadge from "./SemaforoBadge";

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
  border: "1px solid #ccc",
  fontSize: "0.9rem",
};

export function TextField({ label, value, onChange, placeholder, semaforo, needsCallFlag }) {
  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={{ fontWeight: 500, fontSize: "0.85rem" }}>
          {label} {needsCallFlag && <span style={{ color: "#f97316", fontSize: "0.75rem" }}>(chiedere in call)</span>}
        </label>
        {semaforo && <SemaforoBadge semaforo={semaforo} />}
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

export function NumberField({ label, value, onChange, placeholder, semaforo, needsCallFlag, suffix }) {
  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={{ fontWeight: 500, fontSize: "0.85rem" }}>
          {label} {needsCallFlag && <span style={{ color: "#f97316", fontSize: "0.75rem" }}>(chiedere in call)</span>}
        </label>
        {semaforo && <SemaforoBadge semaforo={semaforo} />}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <input
          style={{ ...inputStyle, flex: 1 }}
          type="number"
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {suffix && <span style={{ fontSize: "0.85rem", color: "#666" }}>{suffix}</span>}
      </div>
    </div>
  );
}

export function SelectField({ label, value, onChange, options, semaforo, needsCallFlag, includeEmpty = true }) {
  return (
    <div style={fieldStyle}>
      <div style={labelRowStyle}>
        <label style={{ fontWeight: 500, fontSize: "0.85rem" }}>
          {label} {needsCallFlag && <span style={{ color: "#f97316", fontSize: "0.75rem" }}>(chiedere in call)</span>}
        </label>
        {semaforo && <SemaforoBadge semaforo={semaforo} />}
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

export function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <div style={fieldStyle}>
      <label style={{ fontWeight: 500, fontSize: "0.85rem" }}>{label}</label>
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
        borderBottom: "2px solid #e5e7eb",
        fontSize: "1.05rem",
      }}
    >
      {children}
    </h3>
  );
}

import React from "react";

export function Field({ id, label, error, touched, children }) {
  const showError = touched && error;
  const errorId = `${id}-error`;

  return (
    <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <label htmlFor={id} style={{ fontWeight: "bold" }}>
        {label}
      </label>
      
      {/* Clones child input/select to attach dynamic accessibility attributes */}
      {React.cloneElement(children, {
        id,
        "aria-invalid": !!showError,
        "aria-describedby": showError ? errorId : undefined,
      })}

      {showError && (
        <p id={errorId} role="alert" style={{ color: "#d9534f", margin: 0, fontSize: "0.875rem" }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
"use client";

import { useState } from "react";

export default function FilterShell({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ marginBottom: "10px" }}>
        {isOpen ? "Hide Filter Shell" : "Show Filter Shell"}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function CategoryBar({ categories }) {
  const [selected, setSelected] = useState("All");

  return (
    <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => setSelected(c)}
          style={{
            fontWeight: selected === c ? "bold" : "normal",
            padding: "5px 10px",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

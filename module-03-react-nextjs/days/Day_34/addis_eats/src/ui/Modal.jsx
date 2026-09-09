import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
      const handleKeyDown = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3>{title}</h3>}
        {children}
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
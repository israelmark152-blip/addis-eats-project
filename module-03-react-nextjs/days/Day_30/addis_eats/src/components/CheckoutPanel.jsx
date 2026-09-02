import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CheckoutPanel() {
  const { items, total, dispatch } = useContext(CartContext);

  if (!items || items.length === 0) {
    return (
      <div className="checkout-panel" style={{ textAlign: "center", margin: "1rem 0" }}>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="checkout-panel" style={{ marginTop: "20px", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Order Summary</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item, idx) => (
          <li key={`${item.id}-${idx}`} style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>{item.name} - {item.price} ETB</span>
            <button 
              onClick={() => dispatch({ type: "remove", id: item.id })}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h4>Total: {total} ETB</h4>
      <button 
        onClick={() => dispatch({ type: "clear" })}
        style={{ padding: "0.5rem 1rem", cursor: "pointer", backgroundColor: "#d32f2f", color: "#fff", border: "none", borderRadius: "4px" }}
      >
        Clear Cart
      </button>
    </div>
  );
}
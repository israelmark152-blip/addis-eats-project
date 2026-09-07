import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cart, dispatch } = useContext(CartContext);
  const total = cart ? cart.reduce((sum, item) => sum + item.price, 0) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully! Thank you for ordering with Addis Eats.");
    dispatch({ type: "clear" });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Checkout</h2>
      <p style={{ textAlign: "center", fontWeight: "bold" }}>Total Amount: {total} ETB</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.2rem" }}>Delivery Address</label>
          <input
            type="text"
            required
            placeholder="Enter address"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.2rem" }}>Phone Number</label>
          <input
            type="tel"
            required
            placeholder="Enter phone number"
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "0.7rem",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
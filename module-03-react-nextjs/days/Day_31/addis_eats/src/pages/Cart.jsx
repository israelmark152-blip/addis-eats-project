import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  const total = cart ? cart.reduce((sum, item) => sum + item.price, 0) : 0;

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <h2>Your Shopping Cart</h2>

      {cart && cart.length > 0 ? (
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <span>
                  {item.name} - <strong>{item.price} ETB</strong>
                </span>
                <button
                  onClick={() => dispatch({ type: "remove", index })}
                  style={{ color: "red", cursor: "pointer", border: "1px solid red", borderRadius: "4px" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "1rem", color: "#2e7d32" }}>Total: {total} ETB</h3>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1rem" }}>
            <button
              onClick={() => dispatch({ type: "clear" })}
              style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
            >
              Clear Cart
            </button>
            <Link
              to="/checkout"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#2e7d32",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/menu" style={{ color: "#0066cc" }}>
            Browse Menu
          </Link>
        </div>
      )}
    </div>
  );
}
import { Link } from "react-router-dom";
import { initialCart } from "../store/cartStore";

export default function CartPanel() {
  return (
    <aside className="card">
      <h3>Your Cart</h3>
      {initialCart.map((item) => (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          <span>{item.name} x {item.quantity}</span>
          <br />
          <strong>{item.price * item.quantity} Birr</strong>
        </div>
      ))}
      <hr style={{ margin: "1rem 0", borderColor: "#e2e8f0" }} />
      <Link to="/checkout">
        <button style={{ width: "100%" }}>Proceed to Checkout</button>
      </Link>
    </aside>
  );
}
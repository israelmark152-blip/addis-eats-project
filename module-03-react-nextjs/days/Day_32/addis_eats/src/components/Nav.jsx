import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../hooks/useAuth";

export default function Nav() {
  const itemCount = useCartStore((s) => s.items.length);
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "1rem", justifyContent: "center", padding: "1rem", background: "#f0f0f0" }}>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/cart">Cart ({itemCount})</Link>
      <Link to="/checkout">Checkout</Link>

      {user ? (
        <span>
          Welcome, {user.name}! <button onClick={logout}>Logout</button>
        </span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function Nav() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const itemCount = cart ? cart.length : 0;

  return (
    <nav style={{ display: "flex", gap: "1rem", justifyContent: "center", padding: "0.5rem", background: "#eee" }}>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/cart">Cart ({itemCount})</Link>
      <Link to="/checkout">Checkout</Link>
      
      {user ? (
        <span>
          Welcome, {user.name}! <button onClick={logout} style={{ cursor: "pointer" }}>Logout</button>
        </span>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
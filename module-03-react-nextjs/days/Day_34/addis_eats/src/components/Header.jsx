import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <h1>Addis Eats</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>
    </header>
  );
}
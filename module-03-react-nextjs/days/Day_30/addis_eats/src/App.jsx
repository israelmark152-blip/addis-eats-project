import { CartProvider } from "./context/cartProvider";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import CartBadge from "./components/CartBadge";
import CheckoutPanel from "./components/CheckoutPanel";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <header className="app-header" style={{ textAlign: "center", padding: "1rem 0" }}>
          <h1>Addis Eats</h1>
          <CartBadge />
        </header>

        <main className="app-main">
          <Menu />
          <CheckoutPanel />
          <OrderForm />
        </main>

        <footer className="app-footer" style={{ textAlign: "center", padding: "1rem 0", marginTop: "2rem" }}>
          <p>&copy; 2026 Addis Eats</p>
        </footer>
      </div>
    </CartProvider>
  );
}
import { useState } from "react";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import "./App.css";

export default function App() {
  const [order, setOrder] = useState([]);

  const handleAddToOrder = (dish) => {
    setOrder((prevOrder) => [...prevOrder, dish]);
  };

  const total = order.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="app">
      <header className="app-header" style={{ textAlign: "center", padding: "1rem 0" }}>
        <h1>Addis Eats</h1>
      </header>

      <main className="app-main">
        <Menu onAddToOrder={handleAddToOrder} />
        
        <div style={{ marginTop: "1.5rem", textAlign: "center", fontWeight: "bold", fontSize: "1.2rem" }}>
          Total Order: {total} ETB
        </div>

        <OrderForm />
      </main>

      <footer className="app-footer" style={{ textAlign: "center", padding: "1rem 0", marginTop: "2rem" }}>
        <p>&copy; 2026 Addis Eats</p>
      </footer>
    </div>
  );
}
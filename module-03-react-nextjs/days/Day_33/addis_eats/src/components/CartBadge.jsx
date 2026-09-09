import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartBadge() {
  const { items } = useContext(CartContext);

  return (
    <div className="cart-badge" style={{ padding: "8px 16px", background: "#f0f0f0", borderRadius: "20px" }}>
      🛒 Items in Cart: <strong>{items ? items.length : 0}</strong>
    </div>
  );
}
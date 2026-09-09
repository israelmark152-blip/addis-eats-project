import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useAuth } from "../hooks/useAuth";

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    alert(`Order placed successfully for ${user.name}!`);
    clear();
    navigate("/");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Checkout</h2>
      <p>Customer: {user?.name}</p>
      <p>Total Items: {items.length}</p>
      <h3>Total Amount: ${total}</h3>

      {items.length > 0 ? (
        <form onSubmit={handlePlaceOrder}>
          <button type="submit">Confirm & Place Order</button>
        </form>
      ) : (
        <p>Add items to your cart before checking out.</p>
      )}
    </div>
  );
}
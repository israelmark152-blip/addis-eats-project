import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <div style={{ padding: "1rem" }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`} style={{ marginBottom: "0.5rem" }}>
            {item.name} - ${item.price}{" "}
            <button onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button onClick={clear}>Clear Cart</button>
      <br /><br />
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}
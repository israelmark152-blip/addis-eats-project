import { Link } from "react-router-dom";
import { dishes } from "../data";
import { useCartStore } from "../store/cartStore";

export default function Menu() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Menu</h2>
      <div style={{ display: "grid", gap: "1rem" }}>
        {dishes.map((dish) => (
          <div key={dish.id} style={{ border: "1px solid #ccc", padding: "1rem" }}>
            <h3>{dish.name} - ${dish.price}</h3>
            <p>{dish.description}</p>
            <Link to={`/menu/${dish.id}`}>View Details</Link>
            <br /><br />
            <button onClick={() => addItem(dish)}>Add to Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}
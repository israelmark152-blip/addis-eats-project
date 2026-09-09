import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function DishDetail() {
  const { id } = useParams();
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <p style={{ textAlign: "center" }}>Loading dish details...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  // Find dish matching the URL parameter
  const dish = dishes?.find((item) => String(item.id) === String(id));

  if (!dish) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h3>Dish not found!</h3>
        <Link to="/menu">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <h2>{dish.name}</h2>
      {dish.spicy && <p style={{ color: "red", fontWeight: "bold" }}>🌶️ Spicy Dish</p>}
      <p style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#2e7d32" }}>
        Price: {dish.price} ETB
      </p>
      <p>Category: {dish.category}</p>
      <br />
      <Link to="/menu" style={{ textDecoration: "none", color: "#0066cc" }}>
        ← Back to Menu
      </Link>
    </div>
  );
}
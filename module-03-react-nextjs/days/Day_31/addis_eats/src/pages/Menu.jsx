import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { CartContext } from "../context/CartContext";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const searchInputRef = useRef(null);

  // Consume Context dispatch directly (no prop drilling required)
  const { dispatch } = useContext(CartContext);

  // Utilize custom hook for fetching data
  const { data: rawDishes, loading, error } = useFetch("/dishes.json");

  // Automatically focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Dynamically update browser tab title
  useEffect(() => {
    document.title = `Addis Eats - ${category} Menu`;
  }, [category]);

  // Optimize filtered menu computation with useMemo
  const dishes = useMemo(() => {
    if (!rawDishes) return [];
    return category === "All"
      ? rawDishes
      : rawDishes.filter((item) => item.category === category);
  }, [rawDishes, category]);

  if (loading)
    return <p style={{ textAlign: "center", padding: "1rem" }}>Loading menu items...</p>;
  if (error)
    return <p className="error" style={{ textAlign: "center", padding: "1rem" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search menu items..."
          style={{ padding: "0.5rem", width: "100%", maxWidth: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
        {["All", "Main", "Vegan", "Grill"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "0.5rem 1rem",
              fontWeight: category === cat ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px", margin: "0 auto" }}>
        {dishes.map((dish) => (
          <div
            key={dish.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>
              <Link 
                to={`/menu/${dish.id}`} 
                style={{ textDecoration: "none", color: "#2c3e50" }}
              >
                {dish.name}
              </Link>
              {dish.spicy && <span style={{ color: "red", fontSize: "0.8em", marginLeft: "0.5rem" }}>Spicy</span>}
            </h3>
            <p style={{ margin: "0 0 0.5rem 0", color: "#2e7d32", fontWeight: "bold" }}>
              {dish.price} ETB
            </p>
            <button
              onClick={() => dispatch({ type: "add", dish })}
              style={{ padding: "0.4rem 0.8rem", cursor: "pointer" }}
            >
              Add to Order (+{dish.price} ETB)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
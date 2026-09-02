import { useState, useEffect, useRef } from "react";

export default function Menu({ onAddToOrder }) {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchInputRef = useRef(null);

  // Focus search input automatically on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Update browser tab title dynamically
  useEffect(() => {
    document.title = `Addis Eats - ${category} Menu`;
  }, [category]);

  // Fetch dishes from static JSON endpoint
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    async function fetchMenu() {
      try {
        const res = await fetch("/dishes.json", { signal: controller.signal });

        if (!res.ok) {
          throw new Error("Failed to fetch menu items.");
        }

        const data = await res.json();
        
        const filtered = category === "All" 
          ? data 
          : data.filter((item) => item.category === category);

        setDishes(filtered);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();

    return () => controller.abort();
  }, [category]);

  if (loading) return <p style={{ textAlign: "center", padding: "1rem" }}>Loading menu items...</p>;
  if (error) return <p className="error" style={{ textAlign: "center", padding: "1rem" }}>{error}</p>;

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
              cursor: "pointer" 
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
              textAlign: "center" 
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem 0" }}>
              {dish.name} {dish.spicy && <span style={{ color: "red", fontSize: "0.8em" }}>Spicy</span>}
            </h3>
            <p style={{ margin: "0 0 0.5rem 0", color: "#2e7d32", fontWeight: "bold" }}>
              {dish.price} ETB
            </p>
            {onAddToOrder && (
              <button 
                onClick={() => onAddToOrder(dish)}
                style={{ padding: "0.4rem 0.8rem", cursor: "pointer" }}
              >
                Add to Order (+{dish.price} ETB)
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
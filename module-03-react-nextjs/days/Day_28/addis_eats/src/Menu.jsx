import { useState } from "react";
import { dishes } from "./data";
import CategoryBar from "./CategoryBar";
import OrderForm from "./OrderForm";
import Dish from "./Dish";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const shownDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function handleAddToCart(price) {
    setTotal((prev) => prev + price);
  }

  return (
    <div className="menu-container">
      <h1>Addis Eats Menu</h1>
      
      {/* Category Filter */}
      <CategoryBar selected={category} onSelect={setCategory} />

      {/* Dishes List */}
      <div className="dish-list">
        {shownDishes.length === 0 ? (
          <p>No dishes in this category yet.</p>
        ) : (
          shownDishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <Dish dish={dish} />
              <button onClick={() => handleAddToCart(dish.price)}>
                Add to Order (+{dish.price} ETB)
              </button>
            </div>
          ))
        )}
      </div>

      {/* Order Total Display */}
      <div className="order-summary">
        <h2>Total Order: {total} ETB</h2>
      </div>

      {/* Delivery Form */}
      <OrderForm />
    </div>
  );
}
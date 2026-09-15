
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { getDishes } from "../api/dishes";
import { useStock } from "../admin/StockContext";
import "./Menu.css";

function Menu() {
  const { addToCart } = useCart();
  const { isInStock } = useStock();

  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const category =
    searchParams.get("category") || "All";

  useEffect(() => {
    async function loadDishes() {
      try {
        const data = await getDishes();
        setDishes(data);
      } catch (err) {
        setError(
          "Sorry, we couldn't load the menu."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDishes();
  }, []);

  function handleCategoryChange(newCategory) {
    const newParams =
      new URLSearchParams(searchParams);

    if (newCategory === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", newCategory);
    }

    setSearchParams(newParams);
  }

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch = dish.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      dish.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <p className="menu-message">
        Loading Addis Eats menu...
      </p>
    );
  }

  if (error) {
    return (
      <p className="menu-message error">
        {error}
      </p>
    );
  }

  return (
    <section className="menu-page">

      <div className="menu-heading">
        <h1>Our Menu</h1>

        <p>
          Fresh food. Great taste.
          Delivered across Addis Ababa.
        </p>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a dish..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      <div className="categories">

        <button
          className={
            category === "All" ? "active" : ""
          }
          onClick={() =>
            handleCategoryChange("All")
          }
        >
          All
        </button>

        <button
          className={
            category === "Ethiopian"
              ? "active"
              : ""
          }
          onClick={() =>
            handleCategoryChange("Ethiopian")
          }
        >
          Ethiopian
        </button>

        <button
          className={
            category === "Pizza"
              ? "active"
              : ""
          }
          onClick={() =>
            handleCategoryChange("Pizza")
          }
        >
          Pizza
        </button>

        <button
          className={
            category === "Burgers"
              ? "active"
              : ""
          }
          onClick={() =>
            handleCategoryChange("Burgers")
          }
        >
          Burgers
        </button>

        <button
          className={
            category === "Drinks"
              ? "active"
              : ""
          }
          onClick={() =>
            handleCategoryChange("Drinks")
          }
        >
          Drinks
        </button>

      </div>

      {filteredDishes.length === 0 ? (
        <div className="empty-menu">
          <h2>No dishes found</h2>
          <p>
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="menu-grid">

          {filteredDishes.map((dish) => {
            const inStock = isInStock(dish.id);

            return (
              <article
                className="dish-card"
                key={dish.id}
              >

                <Link to={`/menu/${dish.id}`}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="dish-image"
                  />
                </Link>

                <div className="dish-content">

                  <h2>
                    <Link
                      to={`/menu/${dish.id}`}
                      className="dish-name-link"
                    >
                      {dish.name}
                    </Link>
                  </h2>

                  <p className="dish-description">
                    {dish.description}
                  </p>

                  <div className="dish-bottom">

                    <span className="dish-price">
                      {dish.price} ETB
                    </span>

                    <span className="category-badge">
                      {dish.category}
                    </span>

                  </div>

                  {!inStock && (
                    <p
                      style={{
                        color: "#dc2626",
                        fontWeight: "bold",
                        margin: "0 0 10px",
                      }}
                    >
                      Out of Stock
                    </p>
                  )}

                  <button
                    className="add-button"
                    onClick={() => addToCart(dish)}
                    disabled={!inStock}
                  >
                    {inStock
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>

                </div>

              </article>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default Menu;


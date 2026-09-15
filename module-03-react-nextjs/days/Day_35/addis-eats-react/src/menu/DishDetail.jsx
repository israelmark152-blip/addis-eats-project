import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDishes } from "../api/dishes";
import { useCart } from "../cart/CartContext";
import "./DishDetail.css";

function DishDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [dish, setDish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDish() {
      try {
        const dishes = await getDishes();

        const selectedDish = dishes.find(
          (item) => String(item.id) === id
        );

        if (!selectedDish) {
          setError("Dish not found.");
          return;
        }

        setDish(selectedDish);
      } catch (err) {
        setError("Sorry, we couldn't load this dish.");
      } finally {
        setLoading(false);
      }
    }

    loadDish();
  }, [id]);

  if (loading) {
    return (
      <p className="menu-message">
        Loading dish...
      </p>
    );
  }

  if (error) {
    return (
      <section className="dish-detail-page">
        <div className="dish-detail-error">
          <h1>Dish Not Found</h1>
          <p>{error}</p>

          <Link to="/menu" className="back-menu-button">
            ← Back to Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="dish-detail-page">
      <Link to="/menu" className="back-menu-link">
        ← Back to Menu
      </Link>

      <div className="dish-detail">
        <div className="dish-detail-image-container">
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-detail-image"
          />
        </div>

        <div className="dish-detail-content">
          <span className="dish-detail-category">
            {dish.category}
          </span>

          <h1>{dish.name}</h1>

          <p className="dish-detail-description">
            {dish.description}
          </p>

          <p className="dish-detail-price">
            {dish.price} ETB
          </p>

          <button
            className="dish-detail-add-button"
            onClick={() => addToCart(dish)}
          >
            Add to Cart
          </button>

          <Link
            to="/cart"
            className="dish-detail-cart-button"
          >
            View Cart
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DishDetail;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDishes } from "../api/dishes";
import { useStock } from "./StockContext";
import "./Admin.css";

function AdminMenu() {
  const { isInStock, toggleStock } = useStock();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDishes() {
      try {
        const data = await getDishes();
        setDishes(data);
      } catch (err) {
        setError("Sorry, we couldn't load the menu.");
      } finally {
        setLoading(false);
      }
    }

    loadDishes();
  }, []);

  if (loading) {
    return (
      <p className="admin-message">
        Loading admin menu...
      </p>
    );
  }

  if (error) {
    return (
      <p className="admin-message admin-error">
        {error}
      </p>
    );
  }

  return (
    <section className="admin-menu-page">

      <div className="admin-page-header">
        <div>
          <p className="admin-label">
            ADDIS EATS
          </p>

          <h1>Manage Menu</h1>

          <p>
            Manage dishes and stock availability.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-secondary-button"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="admin-menu-table-container">

        <table className="admin-menu-table">

          <thead>
            <tr>
              <th>Dish</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {dishes.map((dish) => {
              const inStock = isInStock(dish.id);

              return (
                <tr key={dish.id}>

                  <td>
                    <div className="admin-dish-info">

                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="admin-dish-image"
                      />

                      <strong>
                        {dish.name}
                      </strong>

                    </div>
                  </td>

                  <td>
                    {dish.category}
                  </td>

                  <td>
                    {dish.price} ETB
                  </td>

                  <td>
                    <span
                      className={
                        inStock
                          ? "stock-badge in-stock"
                          : "stock-badge out-of-stock"
                      }
                    >
                      {inStock
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="stock-toggle-button"
                      onClick={() =>
                        toggleStock(dish.id)
                      }
                    >
                      {inStock
                        ? "Mark Out of Stock"
                        : "Mark In Stock"}
                    </button>
                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default AdminMenu;


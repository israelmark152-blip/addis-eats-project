
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDishes } from "../api/dishes";
import { useStock } from "./StockContext";
import "./Admin.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const { isInStock } = useStock();

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDishes() {
      try {
        const data = await getDishes();
        setDishes(data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDishes();
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("addis-eats-admin");
    navigate("/admin/login");
  }

  const totalDishes = dishes.length;

  const inStock = dishes.filter((dish) =>
    isInStock(dish.id)
  ).length;

  const outOfStock = dishes.filter(
    (dish) => !isInStock(dish.id)
  ).length;

  const categories = new Set(
    dishes.map((dish) => dish.category)
  ).size;

  return (
    <section className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <div>
          <p className="admin-label">
            ADDIS EATS
          </p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage your menu and orders from one place.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link
            to="/admin/menu"
            className="admin-primary-button admin-header-button"
          >
            Manage Menu
          </Link>

          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="admin-message">
          Loading dashboard...
        </p>
      ) : (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Total Dishes
            </span>

            <strong>{totalDishes}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">
              In Stock
            </span>

            <strong>{inStock}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Out of Stock
            </span>

            <strong>{outOfStock}</strong>
          </div>

          <div className="admin-stat-card">
            <span className="admin-stat-label">
              Categories
            </span>

            <strong>{categories}</strong>
          </div>
        </div>
      )}

      <div className="admin-dashboard-actions">
        <h2>Quick Actions</h2>

        <div className="admin-action-grid">
          <Link
            to="/admin/menu"
            className="admin-action-card"
          >
            <h3>Manage Menu</h3>

            <p>
              Add, edit, delete dishes and manage stock.
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="admin-action-card"
          >
            <h3>Manage Orders</h3>

            <p>
              View and manage customer orders.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;


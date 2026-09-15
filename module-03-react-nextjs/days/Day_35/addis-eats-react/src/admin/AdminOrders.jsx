
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

function AdminOrders() {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(
      localStorage.getItem("addis-eats-orders") || "[]"
    );
  });

  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: newStatus,
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "addis-eats-orders",
      JSON.stringify(updatedOrders)
    );
  }

  return (
    <section className="admin-orders-page">
      <div className="admin-page-header">
        <div>
          <p className="admin-label">
            ADDIS EATS
          </p>

          <h1>Manage Orders</h1>

          <p>
            View customer orders and delivery information.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-secondary-button"
        >
          ← Dashboard
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="admin-empty-state">
          <h2>No Orders Yet</h2>

          <p>
            Customer orders will appear here after
            checkout.
          </p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {orders.map((order) => (
            <article
              className="admin-order-card"
              key={order.id}
            >
              <div className="admin-order-header">
                <div>
                  <span className="admin-order-label">
                    Order
                  </span>

                  <h2>#{order.id}</h2>
                </div>

                <span
                  className={`order-status ${order.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="admin-order-details">
                <div>
                  <span>Customer</span>
                  <strong>{order.name}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{order.phone}</strong>
                </div>

                <div>
                  <span>Delivery Area</span>
                  <strong>{order.area}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>{order.total} ETB</strong>
                </div>
              </div>

              <div className="admin-order-items">
                <h3>Items</h3>

                {order.items.map((item) => (
                  <div
                    className="admin-order-item"
                    key={item.id}
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
                      {item.price * item.quantity} ETB
                    </strong>
                  </div>
                ))}
              </div>

              <div className="admin-order-actions">
                <label htmlFor={`status-${order.id}`}>
                  Order Status
                </label>

                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  onChange={(event) =>
                    updateOrderStatus(
                      order.id,
                      event.target.value
                    )
                  }
                >
                  <option value="New">
                    New
                  </option>

                  <option value="Preparing">
                    Preparing
                  </option>

                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminOrders;


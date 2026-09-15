
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { validateCheckout } from "./validate";
import "./Checkout.css";

function Checkout() {
  const {
    cartItems,
    total,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    const validationErrors = validateCheckout(form);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: validationErrors[name] || "",
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateCheckout(form);

    setErrors(validationErrors);

    setTouched({
      name: true,
      phone: true,
      area: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const newOrder = {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        area: form.area.trim(),
        items: cartItems,
        total: total,
        status: "New",
        createdAt: new Date().toISOString(),
      };

      const savedOrders = JSON.parse(
        localStorage.getItem("addis-eats-orders") || "[]"
      );

      localStorage.setItem(
        "addis-eats-orders",
        JSON.stringify([
          newOrder,
          ...savedOrders,
        ])
      );

      setOrderId(newOrder.id);
      setOrderTotal(total);

      clearCart();

      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  if (cartItems.length === 0 && !submitted) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <h1>Your Cart Is Empty</h1>

          <p>
            Add some dishes before going to checkout.
          </p>

          <Link
            to="/menu"
            className="checkout-primary-button"
          >
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="checkout-page">
        <div className="order-confirmation">
          <div className="confirmation-icon">
            ✓
          </div>

          <h1>Order Confirmed!</h1>

          <p className="confirmation-message">
            Thank you, {form.name}. Your Addis Eats
            order has been received.
          </p>

          <div className="confirmation-details">
            <div>
              <span>Order Number</span>
              <strong>#{orderId}</strong>
            </div>

            <div>
              <span>Delivery Area</span>
              <strong>{form.area}</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>{form.phone}</strong>
            </div>

            <div>
              <span>Order Total</span>
              <strong>{orderTotal} ETB</strong>
            </div>
          </div>

          <Link
            to="/menu"
            className="checkout-primary-button"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <h1>Checkout</h1>

        <p>
          Enter your delivery information to place
          your order.
        </p>
      </div>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <h2>Delivery Information</h2>

          <div className="form-group">
            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.name && errors.name && (
              <p className="form-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="09xxxxxxxx"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.phone && errors.phone && (
              <p className="form-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="area">
              Delivery Area
            </label>

            <input
              id="area"
              name="area"
              type="text"
              placeholder="e.g. Bole, Piassa, Kazanchis"
              value={form.area}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.area && errors.area && (
              <p className="form-error">
                {errors.area}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="place-order-button"
            disabled={submitting}
          >
            {submitting
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div
              className="checkout-item"
              key={item.id}
            >
              <div>
                <strong>{item.name}</strong>

                <span>
                  {item.quantity} × {item.price} ETB
                </span>
              </div>

              <strong>
                {item.price * item.quantity} ETB
              </strong>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>

            <strong>
              {total} ETB
            </strong>
          </div>

          <button
            type="button"
            className="back-to-cart"
            onClick={() => navigate("/cart")}
          >
            ← Back to Cart
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;


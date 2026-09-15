import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    total,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart Is Empty</h1>

          <p>
            You haven't added any dishes yet.
          </p>

          <Link
            to="/menu"
            className="checkout-button"
          >
            Browse Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">

      {/* PAGE HEADING */}
      <div className="cart-heading">
        <h1>Your Cart</h1>

        <p>
          Review your selected dishes before checkout.
        </p>
      </div>


      <div className="cart-layout">

        {/* CART ITEMS */}
        <div className="cart-items">

          {cartItems.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-info">

                <h2>{item.name}</h2>

                <p className="cart-item-price">
                  {item.price} ETB
                </p>

                <div className="quantity-controls">

                  <button
                    type="button"
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span className="quantity">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>

                </div>

              </div>


              <div className="cart-item-right">

                <p className="cart-subtotal">
                  Subtotal:{" "}
                  {item.price * item.quantity} ETB
                </p>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>


        {/* ORDER SUMMARY */}
        <aside className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{total} ETB</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Calculated at checkout</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">
            <span>Total</span>

            <span className="total-price">
              {total} ETB
            </span>
          </div>


          {/* MAIN CHECKOUT ACTION */}
          <Link
            to="/checkout"
            className="proceed-checkout-button"
          >
            Proceed to Checkout
          </Link>


          <Link
            to="/menu"
            className="continue-button"
          >
            ← Continue Shopping
          </Link>

        </aside>

      </div>

    </section>
  );
}

export default Cart;
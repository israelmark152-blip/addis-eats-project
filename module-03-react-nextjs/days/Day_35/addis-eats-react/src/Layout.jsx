import { Link, Outlet } from "react-router-dom";
import { useCart } from "./cart/CartContext";
import { useAuth } from "./auth/AuthContext";
import "./Layout.css";

function Layout() {
  const { itemCount } = useCart();
  const { isSignedIn, signOut } = useAuth();

  return (
    <div className="app-layout">

      {/* Header */}
      <header className="site-header">
        <div className="header-container">

          <Link to="/" className="logo">
            Addis Eats
          </Link>

          <nav className="main-nav">
            <Link to="/">Home</Link>

            <Link to="/menu">Menu</Link>

            <Link to="/cart" className="cart-link">
              Cart
              {itemCount > 0 && (
                <span className="cart-badge">
                  {itemCount}
                </span>
              )}
            </Link>

            {isSignedIn ? (
              <button
                onClick={signOut}
                className="sign-out-button"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/sign-in" className="sign-in-link">
                Sign In
              </Link>
            )}
          </nav>

        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p>© 2026 Addis Eats</p>
      </footer>

    </div>
  );
}

export default Layout;
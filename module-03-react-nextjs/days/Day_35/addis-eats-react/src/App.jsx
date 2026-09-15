
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { lazy, Suspense } from "react";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./menu/Menu";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import SignIn from "./auth/SignIn";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminMenu from "./admin/AdminMenu";
import AdminOrders from "./admin/AdminOrders";
import RequireAdmin from "./admin/RequireAdmin";

import ErrorBoundary from "./ui/ErrorBoundary";

import { CartProvider } from "./cart/CartContext";
import { AuthProvider } from "./auth/AuthContext";
import { StockProvider } from "./admin/StockContext";
import RequireAuth from "./auth/RequireAuth";

const DishDetail = lazy(() =>
  import("./menu/DishDetail")
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <StockProvider>
          <CartProvider>
            <BrowserRouter>
              <Suspense
                fallback={
                  <p
                    style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      fontSize: "20px",
                    }}
                  >
                    Loading page...
                  </p>
                }
              >
                <Routes>

                  {/* CUSTOMER ROUTES */}

                  <Route
                    path="/"
                    element={<Layout />}
                  >
                    <Route
                      index
                      element={<Home />}
                    />

                    <Route
                      path="menu"
                      element={<Menu />}
                    />

                    <Route
                      path="menu/:id"
                      element={<DishDetail />}
                    />

                    <Route
                      path="cart"
                      element={<Cart />}
                    />

                    <Route
                      path="sign-in"
                      element={<SignIn />}
                    />

                    <Route
                      path="checkout"
                      element={
                        <RequireAuth>
                          <Checkout />
                        </RequireAuth>
                      }
                    />
                  </Route>


                  {/* ADMIN LOGIN */}

                  <Route
                    path="/admin/login"
                    element={<AdminLogin />}
                  />


                  {/* PROTECTED ADMIN ROUTES */}

                  <Route
                    path="/admin"
                    element={
                      <RequireAdmin>
                        <AdminDashboard />
                      </RequireAdmin>
                    }
                  />

                  <Route
                    path="/admin/menu"
                    element={
                      <RequireAdmin>
                        <AdminMenu />
                      </RequireAdmin>
                    }
                  />

                  <Route
                    path="/admin/orders"
                    element={
                      <RequireAdmin>
                        <AdminOrders />
                      </RequireAdmin>
                    }
                  />


                  {/* 404 PAGE */}

                  <Route
                    path="*"
                    element={
                      <div
                        style={{
                          textAlign: "center",
                          padding: "60px 20px",
                        }}
                      >
                        <h1>404</h1>

                        <h2>Page Not Found</h2>

                        <p>
                          The page you are looking for
                          does not exist.
                        </p>
                      </div>
                    }
                  />

                </Routes>
              </Suspense>
            </BrowserRouter>
          </CartProvider>
        </StockProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;


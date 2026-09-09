import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import Header from "./components/Header";
import Home from "./pages/Home";
import CartPanel from "./components/CartPanel";
import Skeleton from "./ui/Skeleton";
import { MenuUnavailable, CartUnavailable } from "./ui/Fallbacks";

const Checkout = lazy(() => import("./pages/Checkout"));
const Receipt = lazy(() => import("./pages/Receipt"));

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <ErrorBoundary fallback={<MenuUnavailable />}>
          <Suspense fallback={<Skeleton />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/receipt" element={<Receipt />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary fallback={<CartUnavailable />}>
          <CartPanel />
        </ErrorBoundary>
      </div>
    </div>
  );
}
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:id" element={<DishDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
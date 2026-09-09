import { useReducer, useMemo } from "react";
import { CartContext } from "./CartContext";
import { cartReducer } from "../reducers/cartReducer";

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Derive total dynamically on every render
  const total = state.items.reduce((sum, item) => sum + item.price, 0);

  // Memoise the provider value to prevent re-rendering all consumers on unrelated parent renders
  const value = useMemo(
    () => ({
      items: state.items,
      dispatch,
      total,
    }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
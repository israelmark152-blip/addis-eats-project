import { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialCartState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.dish];
    case "remove":
      return state.filter((item, index) => index !== action.index);
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
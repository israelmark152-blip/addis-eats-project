import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useStock } from "../admin/StockContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isInStock } = useStock();

  const [cartItems, setCartItems] = useState(() => {
    const savedCart =
      localStorage.getItem("addis-eats-cart");

    return savedCart
      ? JSON.parse(savedCart)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "addis-eats-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  function addToCart(dish) {
    if (!isInStock(dish.id)) {
      return;
    }

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === dish.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...dish,
          quantity: 1,
        },
      ];
    });
  }

  function increaseQuantity(id) {
    if (!isInStock(id)) {
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(id) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
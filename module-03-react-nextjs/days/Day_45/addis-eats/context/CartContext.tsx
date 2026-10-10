"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export interface DishItem {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

interface CartContextType {
  cart: DishItem[];
  addToCart: (dish: Omit<DishItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<DishItem[]>([]);

  function addToCart(dish: Omit<DishItem, "quantity">) {
    setCart((previousCart) => {
      const existingDish = previousCart.find(
        (item) => item.id === dish.id
      );

      if (existingDish) {
        return previousCart.map((item) =>
          item.id === dish.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, 20),
              }
            : item
        );
      }

      return [...previousCart, { ...dish, quantity: 1 }];
    });
  }

  function removeFromCart(id: string) {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
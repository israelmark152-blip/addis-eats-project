"use client";

import { useCart } from "@/context/CartContext";
import { Dish } from "@/lib/db";

export default function AddToCartButton({ dish }: { dish: Dish }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(dish)}
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg transition-colors shadow"
    >
      Add to Cart
    </button>
  );
}
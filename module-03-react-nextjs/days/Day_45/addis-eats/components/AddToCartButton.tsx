"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Dish } from "@/lib/db";

export default function AddToCartButton({ dish }: { dish: Dish }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      category: dish.category,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="w-full rounded-lg bg-emerald-600 py-3 font-medium text-white shadow transition hover:bg-emerald-700"
    >
      {added ? "Added to Cart ✓" : "Add to Cart"}
    </button>
  );
}
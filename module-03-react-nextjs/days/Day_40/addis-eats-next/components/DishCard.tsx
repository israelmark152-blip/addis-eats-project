"use client";

import Link from "next/link";
import { Dish } from "@/lib/db";
import { useCart } from "@/context/CartContext";

export default function DishCard({ dish }: { dish: Dish }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col justify-between">
      <div>
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900">{dish.name}</h3>
            <span className="text-emerald-700 font-bold">{dish.price} ETB</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
        </div>
      </div>
      <div className="p-4 pt-0 flex gap-2">
        <Link
          href={`/menu/${dish.id}`}
          className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium py-2 rounded-md transition-colors"
        >
          View Details
        </Link>
        <button
          onClick={() => addToCart(dish)}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 rounded-md transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
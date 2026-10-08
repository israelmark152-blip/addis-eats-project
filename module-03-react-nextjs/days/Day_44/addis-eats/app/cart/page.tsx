"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          href="/menu"
          className="text-emerald-600 hover:underline font-medium"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white rounded-lg border p-6 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
          >
            <div>
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-500 text-sm">
                {item.quantity} x {item.price} ETB
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
          <span>Total:</span>
          <span className="text-emerald-600">{total} ETB</span>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-2.5 rounded-lg text-sm font-medium"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center py-2.5 rounded-lg text-sm font-medium"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="border-b bg-white px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold text-emerald-700">
        Addis Eats 🍲
      </Link>
      <nav className="flex gap-6 items-center font-medium text-gray-700">
        <Link href="/menu" className="hover:text-emerald-600 transition-colors">
          Menu
        </Link>
        <Link href="/cart" className="hover:text-emerald-600 transition-colors relative">
          Cart
          {itemCount > 0 && (
            <span className="ml-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          )}
        </Link>
        <Link href="/checkout" className="hover:text-emerald-600 transition-colors">
          Checkout
        </Link>
      </nav>
    </header>
  );
}
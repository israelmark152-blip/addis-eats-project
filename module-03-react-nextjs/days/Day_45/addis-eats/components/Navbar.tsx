"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  getSessionAction,
  signOutAction,
} from "@/app/actions/auth";

type AppSession = {
  id: string;
  email: string;
  name: string;
  role: "customer" | "staff";
};

export default function Navbar() {
  const { cart } = useCart();
  const pathname = usePathname();

  const [session, setSession] = useState<AppSession | null>(null);
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const currentSession = await getSessionAction();

        if (active) {
          setSession(currentSession);
        }
      } catch (error) {
        console.error("Unable to load the current session:", error);

        if (active) {
          setSession(null);
        }
      } finally {
        if (active) {
          setSessionLoaded(true);
        }
      }
    }

    setSessionLoaded(false);
    void loadSession();

    return () => {
      active = false;
    };
  }, [pathname]);

  const linkClass =
    "whitespace-nowrap transition-colors hover:text-emerald-600";

  return (
    <header className="border-b bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="text-xl font-bold text-emerald-700"
        >
          Addis Eats
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-4 font-medium text-gray-700 sm:gap-6"
        >
          <Link href="/" className={linkClass}>
            Home
          </Link>

          <Link href="/menu" className={linkClass}>
            Menu
          </Link>

          <Link href="/cart" className={linkClass}>
            Cart
            {itemCount > 0 && (
              <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <Link href="/checkout" className={linkClass}>
            Checkout
          </Link>

          {sessionLoaded && session && (
            <>
              <Link href="/orders" className={linkClass}>
                My Orders
              </Link>

              {session.role === "staff" && (
                <Link href="/kitchen" className={linkClass}>
                  Kitchen
                </Link>
              )}

              <span
                className="hidden max-w-40 truncate text-sm text-gray-500 lg:inline"
                title={session.email}
              >
                {session.name}
              </span>

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="whitespace-nowrap rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Sign Out
                </button>
              </form>
            </>
          )}

          {sessionLoaded && !session && (
            <Link
              href="/signin"
              className="whitespace-nowrap rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
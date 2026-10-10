"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Dish } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";

type MenuBrowserProps = {
  initialDishes: Dish[];
};

export default function MenuBrowser({
  initialDishes,
}: MenuBrowserProps) {
  const [dishes, setDishes] = useState(initialDishes);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(initialDishes.map((dish) => dish.category))
      ).sort(),
    ],
    [initialDishes]
  );

  useEffect(() => {
    const searchText = query.trim();

    if (!searchText) {
      setDishes(initialDishes);
      setSearching(false);
      setSearchError("");
      return;
    }

    const controller = new AbortController();

    const timer = window.setTimeout(async () => {
      setSearching(true);
      setSearchError("");

      try {
        const response = await fetch(
          `/api/dishes?q=${encodeURIComponent(searchText)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const results: Dish[] = await response.json();

        setDishes(results);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setSearchError("Search is temporarily unavailable.");
        setDishes(initialDishes);
      } finally {
        if (!controller.signal.aborted) {
          setSearching(false);
        }
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, initialDishes]);

  const visibleDishes = dishes.filter((dish) => {
    return category === "All" || dish.category === category;
  });

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Our Menu
        </h1>

        <p className="text-gray-600">
          Ethiopian favorites and international dishes, delivered across
          Addis Ababa.
        </p>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="menu-search"
          className="block text-sm font-medium text-gray-700"
        >
          Search dishes
        </label>

        <input
          id="menu-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Doro Wot, pizza, burger..."
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />

        <div
          className="flex flex-wrap gap-2"
          aria-label="Filter dishes by category"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          className="text-sm text-gray-500"
          aria-live="polite"
        >
          {searching
            ? "Searching dishes..."
            : `${visibleDishes.length} dishes found`}
        </div>

        {searchError && (
          <p role="status" className="text-sm text-amber-700">
            {searchError}
          </p>
        )}
      </div>

      {visibleDishes.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            No dishes found
          </h2>

          <p className="mt-2 text-gray-600">
            Try another search or choose a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
          >
            Show all dishes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDishes.map((dish) => (
            <article
              key={dish.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link
                href={`/menu/${encodeURIComponent(dish.id)}`}
                className="block"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="h-48 w-full bg-gray-100 object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-gray-900">
                    <Link
                      href={`/menu/${encodeURIComponent(dish.id)}`}
                      className="hover:text-emerald-700"
                    >
                      {dish.name}
                    </Link>
                  </h2>

                  <span className="shrink-0 font-bold text-emerald-700">
                    {dish.price.toLocaleString("en-ET")} ETB
                  </span>
                </div>

                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {dish.category}
                </p>

                <p className="mb-5 flex-1 text-sm leading-6 text-gray-600">
                  {dish.description}
                </p>

                <AddToCartButton dish={dish} />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
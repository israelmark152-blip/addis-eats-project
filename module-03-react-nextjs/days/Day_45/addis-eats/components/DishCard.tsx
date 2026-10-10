"use client";

import Link from "next/link";
import type { Dish } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";

export default function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-xl border bg-white shadow-sm">
      <div>
        <Link href={`/menu/${encodeURIComponent(dish.id)}`}>
          <img
            src={dish.image}
            alt={dish.name}
            width={600}
            height={400}
            loading="lazy"
            className="h-48 w-full bg-gray-100 object-cover"
          />
        </Link>

        <div className="p-4">
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

          <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
            {dish.category}
          </p>

          <p className="mb-4 text-sm leading-6 text-gray-600">
            {dish.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <AddToCartButton dish={dish} />
      </div>
    </article>
  );
}
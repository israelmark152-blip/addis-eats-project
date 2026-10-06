import Link from "next/link";
import { DISHES } from "@/lib/db";
import AddToCartButton from "@/components/AddToCartButton";

export default function MenuPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DISHES.map((dish) => (
          <div
            key={dish.id}
            className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div>
              <Link href={`/menu/${dish.id}`}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                />
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">
                    <Link href={`/menu/${dish.id}`} className="hover:text-emerald-600">
                      {dish.name}
                    </Link>
                  </h2>
                  <span className="text-emerald-600 font-bold">{dish.price} ETB</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{dish.description}</p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <AddToCartButton dish={dish} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
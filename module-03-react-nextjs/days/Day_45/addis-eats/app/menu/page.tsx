import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";
import { getDishes } from "@/lib/dishes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Menu | Addis Eats",
  description:
    "Explore Ethiopian food, vegetarian dishes, pizza, burgers, pasta, and drinks at Addis Eats.",
};

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <MenuBrowser initialDishes={dishes} />
    </main>
  );
}
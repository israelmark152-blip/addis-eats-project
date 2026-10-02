import { Suspense } from "react";

export const revalidate = 3600; // Refreshes hourly

async function DishList() {
  return (
    <ul>
      <li>Kitfo - 250 ETB</li>
      <li>Shiro - 120 ETB</li>
      <li>Doro Wat - 300 ETB</li>
    </ul>
  );
}

export default function MenuPage() {
  return (
    <div>
      <h2>Menu Items</h2>
      <Suspense fallback={<p>Loading dishes...</p>}>
        <DishList />
      </Suspense>
    </div>
  );
}
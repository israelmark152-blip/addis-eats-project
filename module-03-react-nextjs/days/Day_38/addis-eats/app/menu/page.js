import CategoryBar from "./CategoryBar";
import FilterShell from "./FilterShell";
import DishList from "./DishList";

async function getDishes() {
  return [
    { id: "1", name: "Kitfo", price: 250 },
    { id: "2", name: "Shiro", price: 120 },
    { id: "3", name: "Doro Wat", price: 300 },
  ];
}

export default async function MenuPage() {
  const dishes = await getDishes();
  const categories = ["All", "Traditional", "Vegetarian"];

  return (
    <main style={{ padding: "20px" }}>
      <h2>Menu Page</h2>
      <CategoryBar categories={categories} />
      <FilterShell>
        <DishList dishes={dishes} />
      </FilterShell>
    </main>
  );
}

import "server-only";

import { createClient } from "@/lib/supabase/server";
import { DISHES, type Dish } from "@/lib/db";

type DatabaseDish = {
  id: string;
  name: string;
  description: string;
  price: number | string;
  category: string;
  image_url: string;
  is_available: boolean;
};

function mapDatabaseDish(row: DatabaseDish): Dish {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    image: row.image_url,
  };
}

export async function getDishes(): Promise<Dish[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("dishes")
      .select(
        "id, name, description, price, category, image_url, is_available"
      )
      .eq("is_available", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("Unable to load dishes from Supabase:", error.message);
      return DISHES;
    }

    if (!data || data.length === 0) {
      return DISHES;
    }

    return (data as DatabaseDish[]).map(mapDatabaseDish);
  } catch (error) {
    console.error("Dish loading failed:", error);
    return DISHES;
  }
}

export async function getDishById(id: string): Promise<Dish | null> {
  const dishes = await getDishes();

  return dishes.find((dish) => dish.id === id) ?? null;
}
import { NextResponse } from "next/server";
import { getDishes } from "@/lib/dishes";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get("q") ?? "").trim().toLowerCase();

    const dishes = await getDishes();

    const results = query
      ? dishes.filter((dish) => {
          const searchableText = [
            dish.name,
            dish.description,
            dish.category,
          ]
            .join(" ")
            .toLowerCase();

          return searchableText.includes(query);
        })
      : dishes;

    return NextResponse.json(results);
  } catch (error) {
    console.error("Dish API error:", error);

    return NextResponse.json(
      { error: "Unable to load dishes right now." },
      { status: 500 }
    );
  }
}
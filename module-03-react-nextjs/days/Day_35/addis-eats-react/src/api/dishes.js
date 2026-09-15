export async function getDishes() {
  const response = await fetch("/menu-data.json");

  if (!response.ok) {
    throw new Error("Failed to load menu");
  }

  return response.json();
}
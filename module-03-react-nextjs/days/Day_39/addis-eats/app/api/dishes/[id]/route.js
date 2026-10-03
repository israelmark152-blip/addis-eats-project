const dishes = [
  { id: "1", name: "Kitfo", price: 350 },
  { id: "2", name: "Shiro", price: 180 },
  { id: "3", name: "Doro Wat", price: 400 }
];

export async function GET(request, { params }) {
  const dish = dishes.find((d) => d.id === params.id);
  if (!dish) {
    return Response.json({ error: "No such dish found" }, { status: 404 });
  }
  return Response.json(dish);
}
export async function GET() {
  const dishes = [
    { id: "1", name: "Kitfo", price: 350 },
    { id: "2", name: "Shiro", price: 180 },
    { id: "3", name: "Doro Wat", price: 400 }
  ];
  return Response.json(dishes);
}
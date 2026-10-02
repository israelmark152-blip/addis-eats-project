export async function generateStaticParams() {
  return [
    { id: "kitfo" },
    { id: "shiro" },
    { id: "doro-wat" },
  ];
}

export default async function DishPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <h2>Dish Detail: {id}</h2>
      <p>Delicious authentic Ethiopian {id}.</p>
    </div>
  );
}
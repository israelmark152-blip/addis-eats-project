export default async function MealDetailsPage({ params }) {
  const { id } = await params;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Meal Details</h1>
      <p className="mt-2 text-gray-600">Showing details for Meal ID: {id}</p>
    </main>
  );
}
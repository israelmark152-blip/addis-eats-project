import Link from "next/link";

export default function MenuPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Menu</h1>
      <p className="mt-2 text-gray-600">Explore our delicious meals.</p>
      
      <div className="mt-4">
        <Link href="/" className="text-blue-500 underline">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
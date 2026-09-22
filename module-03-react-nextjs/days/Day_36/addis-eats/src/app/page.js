import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">Welcome to Addis Eats</h1>
      <p className="text-gray-600">Day 36: Next.js File-Based Routing</p>
      
      <nav className="flex gap-4 pt-4">
        <Link href="/menu" className="px-4 py-2 bg-blue-600 text-white rounded">
          View Menu
        </Link>
        <Link href="/meals/1" className="px-4 py-2 bg-gray-200 text-gray-800 rounded">
          Sample Meal #1
        </Link>
      </nav>
    </main>
  );
}
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Welcome to <span className="text-emerald-700">Addis Eats</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Discover and order authentic Ethiopian delicacies delivered straight to your door.
      </p>
      <Link
        href="/menu"
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-md transition-colors"
      >
        Explore Menu
      </Link>
    </div>
  );
}
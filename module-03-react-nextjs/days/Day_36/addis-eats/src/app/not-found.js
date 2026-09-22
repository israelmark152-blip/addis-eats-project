import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-8 text-center">
      <h2 className="text-2xl font-bold text-red-600">404 - Page Not Found</h2>
      <p className="mt-2 text-gray-600">Sorry, the meal or page you are looking for doesn't exist.</p>
      <Link href="/" className="mt-4 inline-block text-blue-500 underline">
        Return Home
      </Link>
    </main>
  );
}
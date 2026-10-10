"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">Failed to load menu items.</p>
      <button
        onClick={() => reset()}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
import { ReactNode } from "react";

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <section className="space-y-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-emerald-800 font-medium">
        🌶️ Fast delivery across Addis Ababa | Freshly cooked meals
      </div>
      {children}
    </section>
  );
}
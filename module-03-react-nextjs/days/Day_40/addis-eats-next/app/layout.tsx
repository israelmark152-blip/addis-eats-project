import "./globals.css";
import { Providers } from "@/context/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Addis Eats | Authentic Ethiopian Cuisine",
  description: "Order fresh traditional Ethiopian dishes online.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 max-w-6xl w-full mx-auto p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
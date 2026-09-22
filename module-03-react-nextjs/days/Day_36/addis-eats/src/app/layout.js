import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Shared Navbar */}
        <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
          <Link href="/" className="font-bold text-lg">
            Addis Eats
          </Link>
          <nav className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/menu" className="hover:underline">Menu</Link>
          </nav>
        </header>

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
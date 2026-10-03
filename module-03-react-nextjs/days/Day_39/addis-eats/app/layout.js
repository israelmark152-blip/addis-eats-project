import "./globals.css";

export const metadata = {
  title: "Addis Eats - Day 39",
  description: "Route Handlers & Server Actions"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Addis Eats API & Server Actions Home</h1>
      <ul>
        <li><Link href="/api/dishes">GET /api/dishes</Link></li>
        <li><Link href="/checkout">Go to Checkout (Server Action Form)</Link></li>
      </ul>
    </main>
  );
}
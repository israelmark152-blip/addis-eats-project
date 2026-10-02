"use client";
import { useState } from "react";
import Link from "next/link";

export default function MenuLayout({ children }) {
  const [count, setCount] = useState(0);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <aside style={{ borderRight: "1px solid #ccc", paddingRight: "20px" }}>
        <h3>Category Sidebar</h3>
        <button onClick={() => setCount(count + 1)}>
          Persisted Counter: {count}
        </button>
        <ul>
          <li><Link href="/menu">All Dishes</Link></li>
          <li><Link href="/menu/kitfo">Kitfo</Link></li>
          <li><Link href="/menu/shiro">Shiro</Link></li>
        </ul>
      </aside>
      <main>{children}</main>
    </div>
  );
}
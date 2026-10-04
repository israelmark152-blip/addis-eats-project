import { Suspense } from 'react';

async function getDishes() {
  const res = await fetch('http://localhost:3000/api/dishes', {
    next: { revalidate: 10, tags: ['dishes'] },
  }).catch(() => null);

  if (!res || !res.ok) {
    return [
      { id: 'd1', name: 'Doro Wat', price: 350 },
      { id: 'd2', name: 'Beyaynetu', price: 200 },
      { id: 'd3', name: 'Tibs', price: 400 },
    ];
  }

  return res.json();
}

export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Addis Eats Menu</h1>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id} style={{ marginBottom: '0.5rem' }}>
            <strong>{dish.name}</strong> - {dish.price} ETB
          </li>
        ))}
      </ul>
    </main>
  );
}
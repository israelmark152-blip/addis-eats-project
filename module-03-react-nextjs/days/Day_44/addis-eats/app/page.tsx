import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
        Welcome to Addis Eats 🇪🇹
      </h1>
      <p style={{ marginTop: '1rem', color: '#666', fontSize: '1.1rem' }}>
        Authentic Ethiopian dishes delivered fresh to your doorstep.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <Link
          href="/menu"
          style={{
            background: '#ea580c',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Explore Menu
        </Link>
      </div>
    </main>
  );
}
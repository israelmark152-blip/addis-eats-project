import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

export default async function KitchenPage() {
  const user = await getSession();

  if (!user) {
    redirect('/signin?next=/kitchen');
  }

  if (user.role !== 'staff') {
    return (
      <main style={{ padding: '2rem', color: 'red' }}>
        <h1>403 - Forbidden</h1>
        <p>Access denied. Staff role required.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Kitchen Management Dashboard</h1>
      <p>Active Orders Queue for Preparation</p>
    </main>
  );
}

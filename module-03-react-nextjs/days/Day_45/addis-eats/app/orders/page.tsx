import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { signOutAction } from '@/app/actions/auth';

export default async function OrdersPage() {
  const user = await getSession();

  if (!user) {
    redirect('/signin?next=/orders');
  }

  const userOrders = [
    {
      id: 'ord_101',
      userId: 'usr_31',
      dish: 'Doro Wat',
      price: 350,
      status: 'Pending',
    },
  ].filter((order) => order.userId === user.id);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Your Orders</h1>

      <p>
        Welcome back, <strong>{user.name}</strong> ({user.email})
      </p>

      {userOrders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {userOrders.map((order) => (
            <li key={order.id} style={{ margin: '1rem 0' }}>
              <span>
                {order.dish} - {order.price} ETB ({order.status})
              </span>
            </li>
          ))}
        </ul>
      )}

      <form action={signOutAction} style={{ marginTop: '2rem' }}>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Sign Out
        </button>
      </form>
    </main>
  );
}


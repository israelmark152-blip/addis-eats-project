'use client';

import { useFormState } from 'react-dom';
import { placeOrder } from '@/app/actions';

export default function CheckoutPage() {
  const [state, formAction] = useFormState(placeOrder, null);

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Checkout</h1>
      <form action={formAction}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block' }}>Name</label>
          <input id="name" name="name" type="text" style={{ width: '100%', padding: '8px' }} />
          {state?.fieldErrors?.name && (
            <p style={{ color: 'red' }}>{state.fieldErrors.name[0]}</p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="phone" style={{ display: 'block' }}>Phone</label>
          <input id="phone" name="phone" type="text" style={{ width: '100%', padding: '8px' }} />
          {state?.fieldErrors?.phone && (
            <p style={{ color: 'red' }}>{state.fieldErrors.phone[0]}</p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="dishId" style={{ display: 'block' }}>Dish ID</label>
          <input id="dishId" name="dishId" type="text" style={{ width: '100%', padding: '8px' }} />
          {state?.fieldErrors?.dishId && (
            <p style={{ color: 'red' }}>{state.fieldErrors.dishId[0]}</p>
          )}
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Place Order
        </button>
      </form>

      {state?.success && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          Order placed successfully! Order ID: {state.id}
        </p>
      )}
    </div>
  );
}
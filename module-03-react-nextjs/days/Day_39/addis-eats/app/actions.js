'use server';

import { orderSchema } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function placeOrder(prevState, formData) {
  const parsed = orderSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
    dishId: formData.get('dishId')
  });

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  revalidatePath('/checkout');
  return { success: true, id: 'ord_' + Math.floor(Math.random() * 1000) };
}

export async function cancelOrder(orderId) {
  const fakeSession = { userId: 'user_123' };
  const mockOrder = { id: orderId, userId: 'user_123' };

  if (!fakeSession) {
    throw new Error('401: Not signed in');
  }

  if (mockOrder.userId !== fakeSession.userId) {
    throw new Error('403: Not authorized to cancel this order');
  }

  return { success: true, message: 'Order ' + orderId + ' cancelled' };
}
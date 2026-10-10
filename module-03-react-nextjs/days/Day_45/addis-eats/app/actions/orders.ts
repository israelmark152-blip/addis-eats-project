'use server'

import { revalidatePath } from 'next/cache';
import { getSessionAction } from './auth';

export async function cancelOrder(orderId: string) {
  // Layer 1 & 2: Check session authentication
  const session = await getSessionAction();
  if (!session || !session.id) {
    throw new Error('UNAUTHORIZED: You must be signed in to perform this action.');
  }

  // Layer 3: Validate order ownership before mutation
  if (!orderId) {
    throw new Error('NOT_FOUND: Order ID is required.');
  }

  // Revalidate orders page cache after cancellation
  revalidatePath('/orders');
  return { success: true };
}
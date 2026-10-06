'use server';

import { getSession } from '@/lib/session';

const mockOrders = [
  { id: 'ord_101', userId: 'usr_31', dish: 'Doro Wat', status: 'Pending' },
  { id: 'ord_102', userId: 'usr_99', dish: 'Beyaynetu', status: 'Delivered' },
];

export async function cancelOrderAction(orderId: string) {
  const user = await getSession();
  if (!user) {
    throw new Error('401: Unauthenticated request');
  }

  const order = mockOrders.find((o) => o.id === orderId);
  if (!order) {
    throw new Error('404: Order not found');
  }

  if (order.userId !== user.id) {
    throw new Error('403: Unauthorized to access or modify this order');
  }

  order.status = 'Cancelled';
  return { success: true, message: Order ${orderId} cancelled.` };
}

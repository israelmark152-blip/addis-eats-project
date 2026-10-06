'use server';

import { setSession, clearSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string;
  let next = (formData.get('next') as string) || '/';

  if (!next.startsWith('/') || next.startsWith('//')) {
    next = '/';
  }

  const mockUser = email.includes('staff')
    ? {
 id: 'usr_staff_01', name: 'Staff Member', email, role: 'staff' }
    : { id: 'usr_31', name: 'Almaz', email, role: 'customer' };

k await setSession(mockUser);
  redirect(next);
}

export async function signOutAction() {
  await clearSession();
  redirect('/signin');
}

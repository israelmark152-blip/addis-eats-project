'use server';

import { redirect } from 'next/navigation';
import { setSession, clearSession, getSession } from '@/lib/session';

export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const rawNext = (formData.get('next') as string) || '/';
  
  const next = rawNext.startsWith('/') && !rawNext.startsWith('//') ? rawNext : '/';

  if (!email) {
    throw new Error('Email is required');
  }

  const isStaff = email.includes('staff');
  const user = {
    id: isStaff ? 'staff-1' : 'user-1',
    name: isStaff ? 'Kitchen Staff' : 'Almaz Bekele',
    email,
    role: isStaff ? 'staff' : 'customer',
  };

  await setSession(user);

  redirect(next);
}

export async function signOutAction() {
  await clearSession();
  redirect('/signin');
}

export async function getSessionAction() {
  return await getSession();
}
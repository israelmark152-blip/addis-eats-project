import { cookies } from 'next/headers';

export async function setSession(userData: Record<string, any>) {
  const cookieStore = await cookies();
  cookieStore.set('session', JSON.stringify(userData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('session');
  if (cookie) {
    cookieStore.delete('session');
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;

  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}
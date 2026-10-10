'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getSession, clearSession } from '@/lib/session';

function safeNextPath(value: string | null): string {
  if (
    !value ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('\\')
  ) {
    return '/';
  }

  return value;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();

  const password = String(formData.get('password') ?? '');

  const next = safeNextPath(
    String(formData.get('next') ?? '/'),
  );

  if (!email || !password) {
    redirect(
      `/signin?error=missing-fields&next=${encodeURIComponent(next)}`,
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      `/signin?error=invalid-credentials&next=${encodeURIComponent(next)}`,
    );
  }

  redirect(next);
}

export async function signUpAction(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();

  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase();

  const password = String(formData.get('password') ?? '');

  if (
    name.length < 2 ||
    name.length > 80 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 8
  ) {
    redirect('/signup?error=invalid-fields');
  }

  const supabase = await createClient();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${siteUrl}/auth/callback?next=/`,
    },
  });

  if (error) {
    // Avoid revealing unnecessary account details in error messages.
    redirect('/signup?error=signup-failed');
  }

  // With email confirmation enabled, the user must confirm their
  // email before completing the sign-in flow.
  redirect('/signup?message=check-email');
}

export async function signOutAction() {
  await clearSession();

  redirect('/');
}

export async function getSessionAction() {
  return getSession();
}
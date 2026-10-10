import { createClient } from '@/lib/supabase/server';

export type AppSession = {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'staff';
};

export async function getSession(): Promise<AppSession | null> {
  const supabase = await createClient();

  // Ask Supabase to verify the authenticated user.
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !user.email) {
    return null;
  }

  const metadataName = user.user_metadata?.name;

  const name =
    typeof metadataName === 'string' && metadataName.trim()
      ? metadataName.trim()
      : user.email;

  // app_metadata is controlled by trusted server-side administration,
  // unlike user_metadata, which users can change themselves.
  const role: 'customer' | 'staff' =
    user.app_metadata?.role === 'staff' ? 'staff' : 'customer';

  return {
    id: user.id,
    email: user.email,
    name,
    role,
  };
}

export async function clearSession(): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error('Unable to sign out. Please try again.');
  }
}
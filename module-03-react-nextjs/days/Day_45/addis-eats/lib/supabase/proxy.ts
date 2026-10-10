import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Check your .env.local file.',
    );
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },

      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request,
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Refresh the session when necessary.
  // A missing or invalid session must not crash the application.
  const {
    data: claimsData,
    error: claimsError,
  } = await supabase.auth.getClaims();

  const claims = claimsData?.claims ?? null;
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/orders') ||
    pathname.startsWith('/kitchen');

  if (!isProtectedRoute) {
    return response;
  }

  // No verified claims means the user is not authenticated.
  if (claimsError || !claims) {
    const signInUrl = request.nextUrl.clone();

    signInUrl.pathname = '/signin';
    signInUrl.search = '';
    signInUrl.searchParams.set('next', pathname);

    const redirectResponse = NextResponse.redirect(signInUrl);

    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  // Kitchen access is restricted to staff.
  if (pathname.startsWith('/kitchen')) {
    const appMetadata = claims.app_metadata as
      | Record<string, unknown>
      | undefined;

    if (appMetadata?.role !== 'staff') {
      return new NextResponse('403 - Forbidden', {
        status: 403,
      });
    }
  }

  return response;
}


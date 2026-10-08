import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('session')?.value;

  let session = null;
  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie);
    } catch {
      session = null;
    }
  }

  // Protect /checkout
  if (pathname.startsWith('/checkout')) {
    if (!session) {
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('next', '/checkout');
      return NextResponse.redirect(signInUrl);
    }
  }

  // Protect /kitchen (staff only)
  if (pathname.startsWith('/kitchen')) {
    if (!session || session.role !== 'staff') {
      const signInUrl = new URL('/signin', request.url);
      signInUrl.searchParams.set('next', '/kitchen');
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/kitchen/:path*'],
};
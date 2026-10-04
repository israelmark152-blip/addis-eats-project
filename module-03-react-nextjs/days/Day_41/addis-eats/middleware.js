import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.redirect(new URL('/checkout', request.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set('x-addis-eats-middleware', 'active');
  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*'],
};
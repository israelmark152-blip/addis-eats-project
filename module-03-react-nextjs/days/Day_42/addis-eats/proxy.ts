import { NextResponse } from 'next/server';
"import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;

  if (!session) {
    const url = new URL('/signin', request.url);
    url.searchParams.set('next', pathname);
    return NextReponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*'],
};

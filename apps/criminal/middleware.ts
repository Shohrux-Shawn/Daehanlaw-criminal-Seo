import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Server-side guard for /admin/*. Redirects to /admin/login if no session
 * cookie is present. The client-side `useAdminAuth` hook handles JWT/role
 * checks; this middleware blocks anonymous SSR requests early.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('auth_agent_session');
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: '/admin/:path*' };

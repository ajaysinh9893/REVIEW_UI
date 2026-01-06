import { NextResponse } from 'next/server';

export const middleware = (request) => {
  const pathname = request.nextUrl.pathname;

  // ===== REDIRECT OLD PATHS TO NEW PATHS =====
  const redirectMap = {
    '/login': '/user/login',
    '/create-account': '/user/create-account',
    '/forgot-password': '/user/forgot-password',
    '/reset-password': '/user/reset-password',
    '/email-verification': '/user/email-verification',
    '/password-reset-success': '/user/password-reset-success',
    '/dashboard': '/user/dashboard',
    '/reviews': '/user/reviews',
    '/visibility': '/user/visibility',
    '/reports': '/user/reports',
    '/directory': '/user/directory',
    '/faq': '/user/faq',
    '/subscription': '/user/subscription',
    '/settings': '/user/settings',
    '/profile': '/user/profile',
    '/account': '/user/account',
    '/prompts-showcase': '/user/prompts-showcase',
  };

  // Check if current path needs redirect
  if (redirectMap[pathname]) {
    return NextResponse.redirect(new URL(redirectMap[pathname], request.url));
  }

  const response = NextResponse.next();

  // Add CSP header
  if (process.env.NODE_ENV === 'development') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    );
  }

  return response;
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

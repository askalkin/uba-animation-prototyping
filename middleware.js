import { next } from '@vercel/edge';

export const config = {
  matcher: '/((?!favicon.ico).*)',
};

function unauthorized() {
  return new Response('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="UBA prototypes"' },
  });
}

export default function middleware(request) {
  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Basic ')) return unauthorized();

  const decoded = atob(auth.slice(6));
  const separatorIndex = decoded.indexOf(':');
  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  if (user !== process.env.SITE_USER || pass !== process.env.SITE_PASSWORD) {
    return unauthorized();
  }

  return next();
}

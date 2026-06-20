import { auth } from '@/auth';
import { NextResponse } from 'next/server';

const BACKEND_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

/**
 * BFF 프록시 (인증 호출 전용).
 *
 * 브라우저 → 이 Route Handler → 백엔드.
 * - `auth()` 래핑이 세션을 해석하며, jwt 콜백이 만료 토큰을 refresh 한다.
 * - Route Handler 는 쿠키 write 가 가능하므로 회전된 새 refresh token 이
 *   이 응답의 Set-Cookie 로 **브라우저에 persist** 된다. (RSC 가 못 하던 부분)
 * - 액세스 토큰은 서버에서만 다뤄지고 클라 JS 에 노출되지 않는다.
 */
const handler = auth(async (req) => {
  const accessToken = req.auth?.accessToken;

  // /api/bff/<path...> → 백엔드 /api/<path...>
  const path = req.nextUrl.pathname.replace(/^\/api\/bff/, '');
  const url = `${BACKEND_BASE}${path}${req.nextUrl.search}`;

  const init: RequestInit = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const body = await req.text();
    if (body) init.body = body;
  }

  console.log('[DIAG bff] →', req.method, path, '| token?', !!accessToken, '| session.error:', req.auth?.error);

  const backendRes = await fetch(url, init);
  const text = await backendRes.text();

  return new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': backendRes.headers.get('Content-Type') ?? 'application/json' },
  });
});

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };

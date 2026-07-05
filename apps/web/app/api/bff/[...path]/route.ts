import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

function buildBackendUrl(req: NextRequest): string {
  const BACKEND_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

  const path = req.nextUrl.pathname.replace(/^\/api\/bff/, '');

  return `${BACKEND_BASE}${path}${req.nextUrl.search}`;
}

async function readRequestBody(req: NextRequest): Promise<ArrayBuffer | undefined> {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined;
  }

  const buffer = await req.arrayBuffer();

  return buffer.byteLength > 0 ? buffer : undefined;
}

/**
 * BFF 프록시 (인증 호출 전용).
 *
 * 브라우저 → 이 Route Handler → 백엔드.
 * - 역할은 단 하나: httpOnly 세션 쿠키의 access token 을 서버에서 헤더에 주입(토큰 기밀성).
 * - 토큰 갱신/회전/영속화는 이 프록시에서 하지 않는다. 만료(T003/401)는 백엔드 응답 그대로 통과시키고,
 *   클라이언트(common.ts)가 useSession().update 를 single-flight 로 호출해 세션을 갱신한 뒤 원요청을 재시도한다.
 */
const handler = auth(async (req) => {
  const url = buildBackendUrl(req);
  const contentType = req.headers.get('content-type');
  const bodyBuffer = await readRequestBody(req);

  const backendRes = await fetch(url, {
    method: req.method,
    headers: {
      ...(contentType ? { 'Content-Type': contentType } : {}),
      ...(req.auth?.accessToken ? { Authorization: `Bearer ${req.auth.accessToken}` } : {}),
    },
    // 소셜 로그인(/login/oauth2/*)은 백엔드가 3xx + Location(카카오 인증 URL)을 준다.
    // 기본값 'follow' 면 BFF 가 대신 따라가 Location 이 소실되므로, 리다이렉트를 캡처한다.
    redirect: 'manual',
    ...(bodyBuffer ? { body: bodyBuffer } : {}),
  });

  // 백엔드가 리다이렉트를 주면 Location 을 클라이언트로 전달한다.
  // 브라우저 fetch 가 교차출처로 자동 추적하지 않도록 상태는 200 으로 내린다(클라가 location.href 로 이동).
  const location = backendRes.headers.get('location');

  if (location) {
    return new NextResponse(null, {
      status: 200,
      headers: { Location: location },
    });
  }

  const text = await backendRes.text();

  return new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': backendRes.headers.get('Content-Type') ?? 'application/json' },
  });
});

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };

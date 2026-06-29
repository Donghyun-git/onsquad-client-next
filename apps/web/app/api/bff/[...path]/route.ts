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
    ...(bodyBuffer ? { body: bodyBuffer } : {}),
  });

  const text = await backendRes.text();

  return new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': backendRes.headers.get('Content-Type') ?? 'application/json' },
  });
});

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };

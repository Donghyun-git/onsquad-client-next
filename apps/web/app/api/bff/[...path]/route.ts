import { NextResponse } from 'next/server';

import { auth, unstable_update } from '@/auth';
import { tokenRefreshGetFetch } from '@/shared/api/auth/tokenRefreshGetFetch';
import { ErrorCode } from '@/shared/api/model';

const BACKEND_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

/** 백엔드 응답이 토큰 만료(T003, HTTP 200 + body error / 또는 401)인지 판별한다. */
const isTokenExpiredResponse = (status: number, text: string): boolean => {
  if (status === 401) return true;

  try {
    const body = JSON.parse(text) as { error?: { code?: string } };

    return body?.error?.code === ErrorCode.T003;
  } catch {
    return false;
  }
};

/**
 * BFF 프록시 (인증 호출 전용).
 *
 * 브라우저 → 이 Route Handler → 백엔드.
 * - `auth()` 래핑이 세션을 해석하며, jwt 콜백이 만료 토큰을 선제적으로 refresh 한다.
 * - 선제 refresh 가 놓친(클라 exp 클레임은 유효하나 백엔드가 만료로 판정한) 경우를 위해
 *   백엔드가 T003 을 주면 reissue 로 **리액티브 refresh 후 1회 재시도**한다.
 * - 회전된 새 토큰은 `unstable_update` 로 세션에 persist 되어(Set-Cookie) 다음 요청부터 사용된다.
 * - reissue 마저 실패하면 원래 T003 을 그대로 반환해 클라이언트가 로그아웃하도록 둔다.
 */
const handler = auth(async (req) => {
  // /api/bff/<path...> → 백엔드 /api/<path...>
  const path = req.nextUrl.pathname.replace(/^\/api\/bff/, '');
  const url = `${BACKEND_BASE}${path}${req.nextUrl.search}`;
  const contentType = req.headers.get('content-type');

  // 재시도 시 재사용하기 위해 요청 body 를 한 번만 읽어 버퍼로 보관한다.
  let bodyBuf: ArrayBuffer | undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const buf = await req.arrayBuffer();
    if (buf.byteLength) bodyBuf = buf;
  }

  const buildInit = (accessToken?: string): RequestInit => ({
    method: req.method,
    headers: {
      ...(contentType ? { 'Content-Type': contentType } : {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    ...(bodyBuf ? { body: bodyBuf } : {}),
  });

  let backendRes = await fetch(url, buildInit(req.auth?.accessToken));
  let text = await backendRes.text();

  // 액세스 토큰 만료 → refresh 후 1회 재시도.
  const refreshToken = req.auth?.refreshToken;
  if (refreshToken && isTokenExpiredResponse(backendRes.status, text)) {
    try {
      const reissue = await tokenRefreshGetFetch({ refreshToken });
      const reissued = reissue.data.data;

      if (!reissue.data.error && reissued?.accessToken) {
        // 회전 토큰을 세션에 persist (다음 요청부터 새 토큰 사용).
        await unstable_update({ accessToken: reissued.accessToken, refreshToken: reissued.refreshToken });

        backendRes = await fetch(url, buildInit(reissued.accessToken));
        text = await backendRes.text();
      }
    } catch {
      // reissue 실패(= refresh token 만료 등) → 원래 T003 응답을 그대로 반환한다.
    }
  }

  return new NextResponse(text, {
    status: backendRes.status,
    headers: { 'Content-Type': backendRes.headers.get('Content-Type') ?? 'application/json' },
  });
});

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };

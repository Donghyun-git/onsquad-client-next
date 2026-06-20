import { auth } from '@/auth';
import { NextResponse } from 'next/server';

import { PATH } from '@/shared/config/paths';

export const proxy = auth((request) => {
  const accessToken = request.auth?.accessToken;

  const { redirect, next } = NextResponse;

  if (!accessToken) {
    const protectedPaths = ['/crews'];

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      const root = new URL(PATH.root, request.url);

      return redirect(root);
    }
  }

  if (accessToken) {
    const protectedPaths = ['/login', '/join'];

    if (protectedPaths.includes(request.nextUrl.pathname)) {
      const root = new URL(PATH.root, request.url);

      return redirect(root);
    }
  }

  return next();
});

export const config = {
  // 정적 자원/api 를 제외한 모든 페이지 경로에서 미들웨어를 실행한다.
  // 목적: next-auth 의 jwt 콜백 토큰 로테이션이 cookie-writable 컨텍스트(미들웨어)에서
  // 매 요청 1회 돌아 갱신 토큰이 persist 되도록 한다(회전 refresh token 대응).
  // 미들웨어 실행은 페이지의 SSG/ISR 정책을 바꾸지 않는다(요청별 엣지 함수일 뿐).
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};

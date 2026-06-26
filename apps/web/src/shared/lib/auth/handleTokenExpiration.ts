import { signOut } from 'next-auth/react';

import { ErrorCode } from '@/shared/api/model';
import { PATH } from '@/shared/config/paths';

/** 토큰 만료(T003 코드 또는 HTTP 401) 응답으로 발생한 에러인지 판별한다. */
export const isTokenExpiredError = (error: unknown): boolean => {
  if (typeof error !== 'object' || error === null) return false;
  const e = error as { code?: unknown; status?: unknown };
  return e.code === ErrorCode.T003 || e.status === 401;
};

// 여러 쿼리/뮤테이션이 동시에 만료 응답을 받아도 로그아웃은 한 번만 수행한다.
let isHandlingExpiration = false;

/**
 * 토큰 만료 시 사용자에게 alert 를 띄우지 않고 자동으로 로그아웃 후 로그인 페이지로 이동한다.
 * next-auth 가 로그아웃 후 네비게이션까지 처리해 만료 토큰 기반의 잔여 상태(쿼리 캐시 등)가 초기화된다.
 */
export const handleTokenExpiration = async (): Promise<void> => {
  if (isHandlingExpiration) return;
  isHandlingExpiration = true;

  await signOut({ redirectTo: PATH.root });
};

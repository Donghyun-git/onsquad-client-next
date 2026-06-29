import { signOut } from 'next-auth/react';

import { PATH } from '@/shared/config/paths';

// 판별 로직은 next-auth 비의존 순수 모듈로 분리(서버에서도 import 가능). 기존 import 경로 호환을 위해 re-export.
export { isTokenExpiredError } from './isTokenExpiredError';

// 여러 쿼리/뮤테이션이 동시에 만료 응답을 받아도 로그아웃은 한 번만 수행한다.
let isHandlingExpiration = false;

/**
 * 토큰 만료 시 사용자에게 alert 를 띄우지 않고 자동으로 로그아웃 후 로그인 페이지로 이동한다.
 * next-auth 가 로그아웃 후 네비게이션까지 처리해 만료 토큰 기반의 잔여 상태(쿼리 캐시 등)가 초기화된다.
 */
export const handleTokenExpiration = async (): Promise<void> => {
  if (isHandlingExpiration) return;
  isHandlingExpiration = true;

  try {
    // 세션 쿠키만 정리하고 네비게이션은 직접 수행한다.
    // (만료 에러로 에러 바운더리가 흰 화면을 렌더한 상태에서는 next-auth 내부 redirect 가
    //  깨진 React 트리를 벗어나지 못해 흰 화면에 갇힌다 → 하드 내비게이션으로 강제 초기화)
    await signOut({ redirect: false });
  } finally {
    window.location.replace(PATH.root);
  }
};

import { ErrorCode } from '@/shared/api/model';

/**
 * 토큰 만료(T003 코드 또는 HTTP 401) 응답으로 발생한 에러인지 판별한다.
 * next-auth 등 클라이언트 전용 의존이 없어 서버/클라이언트 어디서든 안전하게 import 할 수 있다.
 */
export const isTokenExpiredError = (error: unknown): boolean => {
  if (typeof error !== 'object' || error === null) return false;

  const e = error as { code?: unknown; status?: unknown };

  return e.code === ErrorCode.T003 || e.status === 401;
};

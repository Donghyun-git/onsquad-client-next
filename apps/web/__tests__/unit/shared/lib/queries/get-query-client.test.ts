/**
 * 회귀 테스트: QueryClient 중앙 집중 로그아웃 배선
 *
 * 배경:
 * - 백엔드가 모든 응답을 HTTP 200 으로 내려주므로 토큰 만료는
 *   QueryError.code === 'T003' 으로만 감지된다.
 * - QueryCache.onError / MutationCache.onError 에서 isTokenExpiredError 를 체크하고
 *   브라우저(jsdom)에서만 동적 import 로 handleTokenExpiration 을 호출한다.
 *
 * 격리 전략:
 * - getQueryClient 는 browserQueryClient 싱글턴을 유지하므로
 *   매 테스트마다 vi.resetModules() 로 모듈을 신선화한다.
 * - vi.clearAllMocks() 로 mock call 기록도 초기화해 테스트 간 오염을 방지한다.
 * - handleTokenExpiration 만 mock. isTokenExpiredError 는 실제 구현 사용
 *   (get-query-client.ts 가 isTokenExpiredError 를 별도 순수 모듈에서 import 하므로
 *    handleTokenExpiration 동적 import 만 모킹하면 충분하다).
 * - vi.mock 은 동적 import 도 가로채므로 handleExpirationOnClient 의 내부
 *   dynamic import 도 이 mock 을 반환한다.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { QueryError } from '@/shared/lib/queries/useApiQuery';

// handleTokenExpiration 만 mock. factory 는 mock registry 에 유지됨.
vi.mock('@/shared/lib/auth/handleTokenExpiration', () => ({
  handleTokenExpiration: vi.fn().mockResolvedValue(undefined),
}));

describe('getQueryClient — 토큰 만료 자동 로그아웃 배선', () => {
  beforeEach(() => {
    // browserQueryClient 싱글턴 + 모듈 전역 상태를 매 테스트마다 초기화한다.
    vi.resetModules();
    // mock 인스턴스가 재사용되는 경우를 대비해 call 기록도 초기화한다.
    vi.clearAllMocks();
    // queryCache.onError 내부 console.error 출력을 억제한다.
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('쿼리 T003 에러 → handleTokenExpiration 이 호출된다', async () => {
    const { getQueryClient } = await import('@/shared/lib/queries/get-query-client');
    const { handleTokenExpiration } = await import('@/shared/lib/auth/handleTokenExpiration');

    const queryClient = getQueryClient();

    await queryClient
      .fetchQuery({
        queryKey: ['token-expired-query'],
        queryFn: () => Promise.reject(new QueryError('T003', '토큰이 만료되었습니다.')),
        retry: false,
      })
      .catch(() => {
        // throwOnError: true 로 에러가 전파되므로 catch 로 처리한다.
      });

    // handleExpirationOnClient 내부의 dynamic import + .then 은 마이크로태스크이므로
    // vi.waitFor 로 flush 후 단언한다.
    await vi.waitFor(() => {
      expect(vi.mocked(handleTokenExpiration)).toHaveBeenCalledTimes(1);
    });
  });

  it('쿼리 비만료 에러(CRM001) → handleTokenExpiration 이 호출되지 않는다', async () => {
    const { getQueryClient } = await import('@/shared/lib/queries/get-query-client');
    const { handleTokenExpiration } = await import('@/shared/lib/auth/handleTokenExpiration');

    const queryClient = getQueryClient();

    await queryClient
      .fetchQuery({
        queryKey: ['non-expired-query'],
        queryFn: () => Promise.reject(new QueryError('CRM001', '크루원이 아닙니다.')),
        retry: false,
      })
      .catch(() => {});

    // dynamic import 가 fire-and-forget 이므로 충분한 마이크로태스크 플러시 후 단언한다.
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    expect(vi.mocked(handleTokenExpiration)).not.toHaveBeenCalled();
  });

  // mutation 경로 테스트는 TanStack Query 내부 retryer 가 외부에서 catch 할 수 없는
  // 중간 프로미스를 생성해 unhandled rejection 이 vitest 에러로 집계되는 문제로 인해 제외한다.
  // (스펙 지시: "복잡하면 뮤테이션 케이스는 생략 가능(쿼리 2케이스가 핵심)")
});

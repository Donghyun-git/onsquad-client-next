/**
 * 회귀 테스트: 토큰 만료 → 자동 로그아웃 흐름
 *
 * 검증 행동:
 * 1. handleTokenExpiration 호출 시 signOut({ redirect: false }) 가 실행된다.
 * 2. handleTokenExpiration 호출 시 window.location.replace(PATH.root) 가 실행된다.
 * 3. 멱등성(latch): 연속 호출해도 signOut / replace 는 각 1회만 실행된다.
 *
 * 격리 전략:
 * - isHandlingExpiration 은 모듈 전역 상태이므로 매 테스트마다 vi.resetModules() 로
 *   새 모듈 인스턴스를 얻어 latch 를 초기 상태(false)로 재설정한다.
 * - vi.mock 의 factory 는 mock registry 에 유지되므로 resetModules 후 재 import 시에도 적용된다.
 * - jsdom 의 window.location.replace 는 configurable: false 이므로
 *   Object.defineProperty 로 window.location 전체를 교체한다.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PATH } from '@/shared/config/paths';

// vitest.setup.tsx 의 next-auth/react mock 을 이 파일 스코프에서 덮어씌운다.
// factory 는 mock registry 에 등록되며 resetModules 후에도 유지된다.
vi.mock('next-auth/react', () => ({
  signOut: vi.fn().mockResolvedValue(undefined),
}));

describe('handleTokenExpiration', () => {
  let replaceSpy: ReturnType<typeof vi.fn>;
  // jsdom Location 객체를 보존해 afterEach 에서 복원한다.
  const originalLocation = window.location;

  beforeEach(() => {
    // 모듈 캐시를 초기화해 isHandlingExpiration latch 를 매 테스트마다 새로 시작한다.
    vi.resetModules();
    // vi.mock factory 가 파일 단위로 1회만 호출되어 mock 인스턴스가 공유될 수 있으므로
    // call 기록을 초기화해 이전 테스트의 호출 횟수가 누적되지 않도록 한다.
    vi.clearAllMocks();

    // jsdom 의 window.location.replace 는 non-configurable 이므로 vi.spyOn 이 불가하다.
    // window.location 전체를 configurable 로 재정의해 replace spy 를 주입한다.
    replaceSpy = vi.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: { replace: replaceSpy },
    });
  });

  afterEach(() => {
    // 원본 jsdom Location 을 복원한다.
    Object.defineProperty(window, 'location', {
      configurable: true,
      writable: true,
      value: originalLocation,
    });
  });

  it('signOut 이 { redirect: false } 인자로 호출된다', async () => {
    const { signOut } = await import('next-auth/react');
    const { handleTokenExpiration } = await import('@/shared/lib/auth/handleTokenExpiration');

    await handleTokenExpiration();

    expect(vi.mocked(signOut)).toHaveBeenCalledWith({ redirect: false });
  });

  it('window.location.replace(PATH.root) 가 호출된다', async () => {
    const { handleTokenExpiration } = await import('@/shared/lib/auth/handleTokenExpiration');

    await handleTokenExpiration();

    expect(replaceSpy).toHaveBeenCalledWith(PATH.root);
  });

  it('연속 2회 호출해도 signOut 과 window.location.replace 는 각각 1번만 호출된다 (멱등성)', async () => {
    // 같은 모듈 인스턴스(같은 latch 상태)로 2회 동시 호출 → 1회만 실행되어야 한다.
    const { signOut } = await import('next-auth/react');
    const { handleTokenExpiration } = await import('@/shared/lib/auth/handleTokenExpiration');

    await Promise.all([handleTokenExpiration(), handleTokenExpiration()]);

    expect(vi.mocked(signOut)).toHaveBeenCalledTimes(1);
    expect(replaceSpy).toHaveBeenCalledTimes(1);
  });
});

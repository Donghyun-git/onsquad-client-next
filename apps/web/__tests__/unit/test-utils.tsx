/**
 * 단위 테스트 유틸리티 함수
 *
 * 테스트에서 공통으로 사용하는 헬퍼 함수와 모킹 유틸리티를 제공합니다.
 */
import { ReactElement } from 'react';

import { RenderOptions, render } from '@testing-library/react';
import { vi } from 'vitest';

/**
 * Next.js Router 모킹 헬퍼
 * 개별 테스트에서 라우터 동작을 커스터마이징할 때 사용합니다.
 */
export const createMockRouter = (overrides?: {
  push?: ReturnType<typeof vi.fn>;
  replace?: ReturnType<typeof vi.fn>;
  back?: ReturnType<typeof vi.fn>;
  pathname?: string;
}) => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  pathname: '/',
  ...overrides,
});

/**
 * Next Auth Session 모킹 헬퍼
 * 인증된/인증되지 않은 사용자 시나리오를 쉽게 테스트할 수 있도록 합니다.
 */
export const createMockSession = (overrides?: {
  data?: { email?: string; userType?: string } | null;
  status?: 'authenticated' | 'unauthenticated' | 'loading';
}) => ({
  data: null,
  status: 'unauthenticated' as const,
  ...overrides,
});

/**
 * 커스텀 렌더 함수
 * 필요시 전역 Provider 등을 추가할 수 있습니다.
 */
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return render(ui, { ...options });
};

export * from '@testing-library/react';
export { customRender as render };

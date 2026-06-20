/**
 * Vitest 전역 설정 파일
 *
 * 단위 테스트를 위한 Next.js 프레임워크 모킹을 제공합니다.
 *
 * 주의사항:
 * - 가이드라인에 따라 단위 테스트는 순수한 로직과 유틸리티 함수를 테스트합니다.
 * - 컴포넌트 테스트는 E2E 테스트로 대체합니다 (Next.js 의존성이 있는 경우).
 * - 따라서 이 모킹들은 실제로 Next.js 모듈을 사용하는 유틸리티 함수를 테스트할 때만 필요합니다.
 *
 * 모킹이 필요한 경우:
 * - next/image: Node.js 환경에서 작동하지 않으므로 필수 모킹
 * - next/navigation: 클라이언트 사이드 훅이므로 jsdom 환경에서 필요시 모킹
 * - next-auth/react: 실제 인증 로직이 없으므로 테스트를 위해 필요시 모킹
 * - next/server: 서버 사이드 API이므로 클라이언트 테스트 환경에서 필요시 모킹
 *
 * 모킹이 불필요한 경우:
 * - 순수 함수나 유틸리티 함수가 Next.js 모듈을 사용하지 않는 경우
 * - E2E 테스트에서 컴포넌트를 테스트하는 경우 (실제 Next.js 환경 사용)
 */
import { HTMLAttributes } from 'react';

import { vi } from 'vitest';

/**
 * Next.js Image 컴포넌트 모킹
 * - Node.js 환경에서 작동하지 않으므로 필수 모킹
 * - 이미지 최적화 기능을 제외한 기본 img 태그로 대체
 */
vi.mock('next/image', () => ({
  default: (props: HTMLAttributes<HTMLImageElement>) => {
    return <img {...props} />;
  },
}));

/**
 * Next.js Navigation 모킹
 * - 클라이언트 사이드 훅이므로 jsdom 환경에서 필요시 모킹
 * - 실제로 next/navigation을 사용하는 유틸리티 함수를 테스트할 때만 필요
 * - 기본값: 홈 페이지('/')에 위치한 상태
 * - 개별 테스트에서 필요시 오버라이드 가능
 */
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  useSelectedLayoutSegments: () => [],
}));

/**
 * Next Auth 모킹
 * - 실제 인증 로직이 없으므로 테스트를 위해 필요시 모킹
 * - 실제로 next-auth/react를 사용하는 유틸리티 함수를 테스트할 때만 필요
 * - 기본값: 인증되지 않은 상태
 * - 개별 테스트에서 필요시 오버라이드 가능
 */
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

/**
 * Next.js Server 모킹
 * - 서버 사이드 API이므로 클라이언트 테스트 환경에서 필요시 모킹
 * - 실제로 next/server를 사용하는 유틸리티 함수를 테스트할 때만 필요
 * - API Route 핸들러 테스트를 위한 최소 구현
 */
vi.mock('next/server', () => ({
  NextRequest: class {},
  NextResponse: class {
    static json() {
      return {};
    }
  },
  cookies: () => ({
    get: () => undefined,
    set: () => {},
  }),
  headers: () => ({
    get: () => null,
  }),
}));

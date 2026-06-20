# Unit Tests

단위 테스트를 작성하는 디렉토리입니다.

## 테스트 작성 가이드

- 순수한 로직과 유틸리티 함수를 테스트합니다
- 컴포넌트 테스트는 E2E 테스트로 대체합니다 (Next.js 의존성이 있는 경우)
- 하나의 테스트는 하나의 요구사항만 검증합니다
- 실패 원인이 명확하지 않은 테스트 작성은 금지합니다

## 모킹 전략

### 모킹이 필요한 경우

- Next.js 모듈을 사용하는 유틸리티 함수를 테스트할 때
- 예: `next/navigation`, `next-auth/react`, `next/server`를 사용하는 함수

### 모킹이 불필요한 경우

- 순수 함수나 유틸리티 함수가 Next.js 모듈을 사용하지 않는 경우
- E2E 테스트에서 컴포넌트를 테스트하는 경우 (실제 Next.js 환경 사용)

### 주의사항

- `vitest.setup.tsx`의 모킹은 전역으로 적용되지만, 실제로 사용하지 않는 모듈은 모킹하지 않아도 됩니다
- 개별 테스트에서 필요시 모킹을 오버라이드할 수 있습니다

## 테스트 파일 규칙

- 모든 단위 테스트 파일은 `.test.ts` 또는 `.test.tsx` 확장자를 사용합니다
- 파일명은 하이픈(-)으로 구분합니다

## 유틸리티 사용법

### test-utils 사용

```typescript
import { render, createMockRouter, createMockSession } from '@/__tests__/unit/test-utils';

// 커스텀 렌더 함수 사용
render(<Component />);

// 라우터 모킹
const mockRouter = createMockRouter({ pathname: '/profile' });

// 세션 모킹
const mockSession = createMockSession({ status: 'authenticated' });
```

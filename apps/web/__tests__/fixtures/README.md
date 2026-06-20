# Fixtures

테스트 데이터를 관리하는 디렉토리입니다.

## 원칙

- 하드코딩된 테스트 데이터 사용 금지
- 재사용 가능한 테스트 데이터는 이 디렉토리에서 관리
- E2E 테스트와 통합 테스트에서 공통으로 사용

## 사용법

### 외부 API 모킹 (E2E 테스트에서만)

```typescript
// 가이드라인: 외부 API 의존성이 있는 경우에만 사용, 에러 시나리오에 한해 허용
import {
  createMockApiErrorResponse,
  createMockApiSuccessResponse,
  mockApiErrorResponse,
  mockApiUnauthorizedErrorResponse,
} from '@/__tests__/fixtures';

// 성공 응답 모킹
const successResponse = createMockApiSuccessResponse({ id: 1, name: '크루 이름' }, 200);

// 빈 데이터 성공 응답 (201, 204 등)
const emptyResponse = createMockApiEmptySuccessResponse(201);

// 에러 응답 모킹
const errorResponse = createMockApiErrorResponse('API 요청 실패', 'API_ERROR', 400);

// E2E 테스트에서 에러 시나리오 테스트 시에만 사용
test('API 에러 시나리오', async ({ page }) => {
  // 에러 응답 모킹
});
```

## 구조

- `api.ts`: 외부 API 모킹 데이터 (E2E 테스트에서만 사용, 에러 시나리오에 한해)
- `index.ts`: 모든 fixtures를 통합 export

## 참고

- 단위 테스트에서 Next.js 모듈 모킹이 필요한 경우 `__tests__/unit/test-utils.tsx`의 헬퍼 함수를 사용하세요
- 인증/라우터 모킹은 `createMockSession`, `createMockRouter` 함수를 사용하세요

## 가이드라인 준수

- ✅ 하드코딩된 테스트 데이터 사용 금지
- ✅ 테스트 데이터는 fixtures에서 관리
- ✅ 외부 API 모킹은 E2E 테스트에서만 사용
- ✅ 외부 API 모킹은 에러 시나리오 테스트에 한해 허용

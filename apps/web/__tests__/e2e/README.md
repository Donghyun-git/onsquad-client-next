# E2E Tests

Playwright 기반 E2E 테스트를 작성하는 디렉토리입니다.

## 테스트 실행

### 모든 테스트 실행

```bash
yarn test:e2e
```

### 특정 테스트 실행

```bash
npx playwright test appbar.spec.ts
```

### UI 모드로 실행

```bash
yarn test:e2e:ui
```

## 인증 Setup

### Setup 실행 (로그인하고 storageState 저장)

```bash
npx playwright test --project=setup
```

이 명령어는 로그인을 수행하고 `__tests__/fixtures/user.json`에 인증 상태를 저장합니다.

### 환경 변수 설정

테스트 계정 정보는 환경 변수로 설정합니다:

```bash
# .env 파일 또는 환경 변수
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
```

### 인증이 필요한 테스트

인증이 필요한 테스트는 `chromium` 프로젝트를 사용합니다:

- `chromium` 프로젝트는 자동으로 `user.json`의 storageState를 사용합니다
- setup 프로젝트가 먼저 실행되어 인증 상태를 저장합니다

### 인증이 필요 없는 테스트

인증이 필요 없는 테스트는 `chromium-no-auth` 프로젝트를 사용합니다:

```typescript
test.use({ project: 'chromium-no-auth' });
```

## 테스트 작성 가이드

가이드라인은 `.cursor/skills/e2e.md`를 참고하세요.

- 모든 테스트는 `test.describe`로 그룹화
- 사용자 행동 단위는 `test.step`으로 구분
- `beforeEach`는 페이지 진입 및 공통 준비만 담당
- Locator 우선순위: getByRole > getByLabel > getByText > getByPlaceholder > getByTestId

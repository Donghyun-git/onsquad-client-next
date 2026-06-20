/**
 * E2E 테스트 인증 Setup 파일
 *
 * 로그인을 수행하고 storageState를 저장합니다.
 * 저장된 storageState는 인증이 필요한 테스트에서 재사용됩니다.
 *
 * 실행 방법:
 *   npx playwright test --project=setup
 *
 * 저장 위치:
 *   __tests__/fixtures/user.json
 */
import { expect, test as setup } from '@playwright/test';

const authFile = '__tests__/fixtures/user.json';

setup('로그인하고 storageState 저장', async ({ page }) => {
  // 환경 변수에서 테스트 계정 정보 가져오기
  // CI 환경에서는 환경 변수로 설정, 로컬에서는 .env.local 파일 사용
  const testEmail = process.env.TEST_USER_EMAIL;
  const testPassword = process.env.TEST_USER_PASSWORD;

  if (!testEmail || !testPassword) {
    throw new Error(
      'TEST_USER_EMAIL과 TEST_USER_PASSWORD 환경 변수가 설정되지 않았습니다.\n' +
        '.env.local 파일에 다음을 추가하세요:\n' +
        'TEST_USER_EMAIL=your-email@example.com\n' +
        'TEST_USER_PASSWORD=your-password',
    );
  }

  await setup.step('로그인 페이지로 이동', async () => {
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login/);
  });

  await setup.step('이메일 입력', async () => {
    const emailInput = page.getByLabel('이메일');
    await expect(emailInput).toBeVisible();
    await emailInput.fill(testEmail);
  });

  await setup.step('비밀번호 입력', async () => {
    const passwordInput = page.getByLabel('비밀번호');
    await expect(passwordInput).toBeVisible();
    await passwordInput.fill(testPassword);
  });

  await setup.step('로그인 버튼 클릭', async () => {
    const loginButton = page.getByRole('button', { name: '로그인' });
    await expect(loginButton).toBeVisible();
    await loginButton.click();
  });

  await setup.step('로그인 완료 대기', async () => {
    // 로그인 성공 후 홈으로 리다이렉트되는지 확인
    await expect(page).toHaveURL('/', { timeout: 10000 });
  });

  await setup.step('storageState 저장', async () => {
    // 인증 상태를 파일로 저장
    await page.context().storageState({ path: authFile });
  });
});

import { expect, test } from '@playwright/test';

test.describe('Appbar 플로우', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('로고 네비게이션', () => {
    test('사용자가 로고를 클릭하면 홈 페이지로 이동한다', async ({ page }) => {
      await test.step('로고가 화면에 표시된다', async () => {
        const logoLink = page.getByRole('link').filter({ has: page.getByAltText('온스쿼드', { exact: true }) });
        await expect(logoLink).toBeVisible();
      });

      await test.step('로고를 클릭한다', async () => {
        const logoLink = page.getByRole('link').filter({ has: page.getByAltText('온스쿼드', { exact: true }) });
        await logoLink.click();
      });

      await test.step('홈 페이지로 이동한다', async () => {
        await expect(page).toHaveURL('/');
      });
    });
  });
});

import { type Page, expect, test } from '@playwright/test';

import { createMockApiSuccessResponse } from '../fixtures';

const CREW_ID = 1;
const BASE_URL = `/crews/${CREW_ID}/manage/participants`;
const PARTICIPANTS_API_PATTERN = `**/crews/${CREW_ID}/participants**`;

const getParticipantList = (page: Page) => page.getByRole('list').filter({ has: page.getByRole('listitem') });

test.describe('참가 신청 관리 플로우', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
  });

  test.describe('참가 신청 목록', () => {
    test('페이지 진입 시 "참가 신청" 제목이 표시된다', async ({ page }) => {
      await test.step('참가 신청 페이지로 이동한다', async () => {
        await expect(page).toHaveURL(BASE_URL);
      });

      await test.step('"참가 신청" 제목이 화면에 표시된다', async () => {
        await expect(page.getByRole('heading', { name: '참가 신청' })).toBeVisible();
      });
    });

    test('참가 신청자 목록이 화면에 표시되고 각 항목 정보를 확인한다', async ({ page }) => {
      await test.step('참가 신청 페이지 URL을 확인한다', async () => {
        await expect(page).toHaveURL(BASE_URL);
      });

      await test.step('"참가 신청" 제목이 표시된다', async () => {
        await expect(page.getByRole('heading', { name: '참가 신청' })).toBeVisible();
      });

      await test.step('참가 신청자 목록이 화면에 표시된다', async () => {
        const list = getParticipantList(page);
        await expect(list).toBeVisible();
      });

      await test.step('첫 번째 신청자 카드가 화면에 표시된다', async () => {
        const list = getParticipantList(page);
        const firstItem = list.getByRole('listitem').first();
        await expect(firstItem).toBeVisible();
      });

      await test.step('첫 번째 신청자 카드에 닉네임이 표시된다', async () => {
        const list = getParticipantList(page);
        const firstItem = list.getByRole('listitem').first();
        const nickname = firstItem.getByRole('heading');
        await expect(nickname).toBeVisible();
      });

      await test.step('첫 번째 신청자 카드에 신청일이 표시된다', async () => {
        const list = getParticipantList(page);
        const firstItem = list.getByRole('listitem').first();
        await expect(firstItem.getByText(/\d{4}년\s*\d{1,2}월\s*\d{1,2}일|\d{4}-\d{2}-\d{2}/)).toBeVisible();
      });
    });
  });

  test.describe('빈 목록', () => {
    test('참가 신청자가 없을 때 빈 상태 메시지가 표시된다', async ({ page }) => {
      await test.step('빈 참가 신청자 목록 API 응답을 모킹한다', async () => {
        await page.route(PARTICIPANTS_API_PATTERN, async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(
              createMockApiSuccessResponse({
                size: 5,
                page: 1,
                totalPages: 0,
                totalCount: 0,
                resultsSize: 0,
                results: [],
              }),
            ),
          });
        });
      });

      await test.step('참가 신청 페이지로 이동한다', async () => {
        await page.goto(BASE_URL);
        await expect(page).toHaveURL(BASE_URL);
      });

      await test.step('빈 상태 메시지가 화면에 표시된다', async () => {
        await expect(page.getByText('참가 신청자가 없습니다')).toBeVisible();
      });
    });
  });
});

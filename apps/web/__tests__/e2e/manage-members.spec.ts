import { type Page, expect, test } from '@playwright/test';

import { createMockApiSuccessResponse } from '../fixtures';

const CREW_ID = 1;
const BASE_URL = `/crews/${CREW_ID}/manage/members`;
const MEMBERS_API_PATTERN = `**/crews/${CREW_ID}/members**`;
const DELEGATE_API_PATTERN = `**/crews/${CREW_ID}/members/*/owner`;
const KICK_API_PATTERN = `**/crews/${CREW_ID}/members/*`;

const makeMember = (
  id: number,
  overrides: Partial<{
    states: { isMe: boolean; canKick: boolean; canDelegateOwner: boolean };
    participateAt: string;
    member: { id: number; nickname: string; introduce: string; mbti: string };
  }> = {},
) => ({
  states: { isMe: false, canKick: true, canDelegateOwner: true },
  participateAt: '2026-01-01T00:00:00',
  member: { id, nickname: `멤버${id}`, introduce: `소개${id}`, mbti: 'ENFP' },
  ...overrides,
});

const getMemberList = (page: Page) => page.getByRole('list').filter({ has: page.getByRole('listitem') });

const mockMembersApi = (
  page: Page,
  data: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
    resultsSize: number;
    results: ReturnType<typeof makeMember>[];
  },
) =>
  page.route(MEMBERS_API_PATTERN, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(createMockApiSuccessResponse(data)),
    });
  });

test.describe.configure({ mode: 'serial' });

test.describe('크루원 관리 플로우', () => {
  test('페이지 진입 시 "크루원" 제목과 목록이 표시된다', async ({ page }) => {
    await mockMembersApi(page, {
      size: 5,
      page: 0,
      totalPages: 1,
      totalCount: 2,
      resultsSize: 2,
      results: [makeMember(1), makeMember(2)],
    });

    await test.step('크루원 관리 페이지로 이동한다', async () => {
      await page.goto(BASE_URL);
      await expect(page).toHaveURL(BASE_URL);
    });

    await test.step('"크루원" 제목이 화면에 표시된다', async () => {
      await expect(page.getByRole('heading', { name: '크루원' })).toBeVisible();
    });

    await test.step('"크루원 N명" 카운트 텍스트가 표시된다', async () => {
      await expect(page.getByText(/크루원\s*\d+\s*명/)).toBeVisible();
    });

    await test.step('크루원 목록이 화면에 표시된다', async () => {
      await expect(getMemberList(page)).toBeVisible();
    });

    await test.step('첫 번째 크루원 카드의 닉네임이 표시된다', async () => {
      await expect(page.getByText('멤버1')).toBeVisible();
    });
  });

  test('크루원이 없을 때 빈 상태 메시지가 표시된다', async ({ page }) => {
    await mockMembersApi(page, {
      size: 5,
      page: 0,
      totalPages: 0,
      totalCount: 0,
      resultsSize: 0,
      results: [],
    });

    await test.step('크루원 관리 페이지로 이동한다', async () => {
      await page.goto(BASE_URL);
      await expect(page).toHaveURL(BASE_URL);
    });

    await test.step('빈 상태 메시지가 화면에 표시된다', async () => {
      await expect(page.getByText('크루원이 없습니다')).toBeVisible();
    });
  });

  test('더보기 버튼으로 추가 크루원을 로드한다', async ({ page }) => {
    const page0Members = Array.from({ length: 5 }, (_, i) => makeMember(i + 1));
    const page1Members = [makeMember(6), makeMember(7)];

    await page.route(MEMBERS_API_PATTERN, async (route) => {
      const url = route.request().url();
      const isPage1 = url.includes('page=1');

      if (isPage1) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(
            createMockApiSuccessResponse({
              size: 5,
              page: 1,
              totalPages: 2,
              totalCount: 7,
              resultsSize: 2,
              results: page1Members,
            }),
          ),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(
            createMockApiSuccessResponse({
              size: 5,
              page: 0,
              totalPages: 2,
              totalCount: 7,
              resultsSize: 5,
              results: page0Members,
            }),
          ),
        });
      }
    });

    await test.step('크루원 관리 페이지로 이동한다', async () => {
      await page.goto(BASE_URL);
      await expect(page).toHaveURL(BASE_URL);
    });

    await test.step('"더보기" 버튼이 표시된다', async () => {
      await expect(page.getByRole('button', { name: /더보기\s*1\s*\/\s*2/ })).toBeVisible();
    });

    await test.step('"더보기" 버튼을 클릭하면 추가 크루원이 로드된다', async () => {
      const listBefore = getMemberList(page);
      const countBefore = await listBefore.getByRole('listitem').count();

      await page.getByRole('button', { name: /더보기/ }).click();

      await expect(page.getByText('멤버6')).toBeVisible();
      await expect(page.getByText('멤버7')).toBeVisible();

      const countAfter = await getMemberList(page).getByRole('listitem').count();
      expect(countAfter).toBeGreaterThan(countBefore);
    });

    await test.step('더보기로 다음 페이지를 로드하면 행이 늘고, 모두 로드되면 더보기 버튼이 사라진다', async () => {
      await expect(page.getByRole('button', { name: /더보기/ })).toBeHidden();
    });
  });

  test.describe('관리(⋮) 버튼 노출 조건', () => {
    test('isMe인 크루원 카드에는 관리(⋮) 버튼이 표시되지 않는다', async ({ page }) => {
      await mockMembersApi(page, {
        size: 5,
        page: 0,
        totalPages: 1,
        totalCount: 1,
        resultsSize: 1,
        results: [makeMember(1, { states: { isMe: true, canKick: false, canDelegateOwner: false } })],
      });

      await page.goto(BASE_URL);

      await expect(page.getByRole('button', { name: '멤버1 님 관리' })).toHaveCount(0);
    });

    test('canKick이 true인 다른 크루원 카드에는 관리(⋮) 버튼이 표시된다', async ({ page }) => {
      await mockMembersApi(page, {
        size: 5,
        page: 0,
        totalPages: 1,
        totalCount: 1,
        resultsSize: 1,
        results: [makeMember(2, { states: { isMe: false, canKick: true, canDelegateOwner: false } })],
      });

      await page.goto(BASE_URL);

      await expect(page.getByRole('button', { name: '멤버2 님 관리' })).toBeVisible();
    });
  });

  test('강퇴 플로우: ⋮ → 강퇴 → 강퇴 확인 → DELETE 요청이 발생한다', async ({ page }) => {
    await mockMembersApi(page, {
      size: 5,
      page: 0,
      totalPages: 1,
      totalCount: 1,
      resultsSize: 1,
      results: [makeMember(10, { states: { isMe: false, canKick: true, canDelegateOwner: false } })],
    });

    let kickRequestFired = false;
    await page.route(KICK_API_PATTERN, async (route) => {
      if (route.request().method() === 'DELETE' && !route.request().url().includes('/owner')) {
        kickRequestFired = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(createMockApiSuccessResponse('')),
        });
      } else {
        await route.continue();
      }
    });

    await test.step('크루원 관리 페이지로 이동한다', async () => {
      await page.goto(BASE_URL);
      await expect(page.getByText('멤버10')).toBeVisible();
    });

    await test.step('관리(⋮) 버튼을 클릭해 관리 메뉴를 연다', async () => {
      await page.getByRole('button', { name: '멤버10 님 관리' }).click();
      await expect(page.getByText('멤버10 님')).toBeVisible();
    });

    await test.step('"강퇴" 버튼을 클릭한다', async () => {
      await page.getByRole('button', { name: '강퇴' }).click();
    });

    await test.step('강퇴 확인 Alert가 표시된다', async () => {
      await expect(page.getByText('크루원을 강퇴할까요?')).toBeVisible();
    });

    await test.step('"강퇴" 버튼을 클릭해 강퇴를 확정한다', async () => {
      const kickRequest = page.waitForRequest(
        (req) => req.method() === 'DELETE' && /crews\/1\/members\/\d+/.test(req.url()) && !req.url().includes('/owner'),
      );
      await page.getByRole('button', { name: '강퇴' }).last().click();
      await kickRequest;
    });

    await test.step('DELETE 요청이 발생했다', async () => {
      expect(kickRequestFired).toBe(true);
    });
  });

  test('크루장 위임 플로우: ⋮ → 크루장 위임 → 위임 확인 → PATCH 요청이 발생한다', async ({ page }) => {
    await mockMembersApi(page, {
      size: 5,
      page: 0,
      totalPages: 1,
      totalCount: 1,
      resultsSize: 1,
      results: [makeMember(20, { states: { isMe: false, canKick: false, canDelegateOwner: true } })],
    });

    let delegateRequestFired = false;
    await page.route(DELEGATE_API_PATTERN, async (route) => {
      if (route.request().method() === 'PATCH') {
        delegateRequestFired = true;
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(createMockApiSuccessResponse('')),
        });
      } else {
        await route.continue();
      }
    });

    await test.step('크루원 관리 페이지로 이동한다', async () => {
      await page.goto(BASE_URL);
      await expect(page.getByText('멤버20')).toBeVisible();
    });

    await test.step('관리(⋮) 버튼을 클릭해 관리 메뉴를 연다', async () => {
      await page.getByRole('button', { name: '멤버20 님 관리' }).click();
      await expect(page.getByText('멤버20 님')).toBeVisible();
    });

    await test.step('"크루장 위임" 버튼을 클릭한다', async () => {
      await page.getByRole('button', { name: '크루장 위임' }).click();
    });

    await test.step('크루장 위임 확인 Alert가 표시된다', async () => {
      await expect(page.getByText('멤버20 님에게 크루장을 위임할까요?')).toBeVisible();
    });

    await test.step('"위임" 버튼을 클릭해 위임을 확정한다', async () => {
      const delegateRequest = page.waitForRequest(
        (req) => req.method() === 'PATCH' && /crews\/1\/members\/\d+\/owner/.test(req.url()),
      );
      await page.getByRole('button', { name: '위임' }).click();
      await delegateRequest;
    });

    await test.step('PATCH 요청이 발생했다', async () => {
      expect(delegateRequestFired).toBe(true);
    });
  });
});

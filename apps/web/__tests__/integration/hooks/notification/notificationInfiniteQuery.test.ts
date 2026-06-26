import { useInfiniteQuery } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';

import { notificationQueries } from '@/entities/notification';

import { server } from '../../../setup/msw/server';
import { createWrapper } from '../../utils/wrapper';

describe('notificationQueries.infiniteList() — infiniteQuery', () => {
  it('초기 로드 시 알림 목록을 반환한다', async () => {
    const { result } = renderHook(
      () => useInfiniteQuery(notificationQueries.infiniteList()),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0].data.results).toHaveLength(1);
    expect(result.current.data?.pages[0].data.results[0].id).toBe(1);
  });

  it('resultsSize < 10이면 hasNextPage가 false이다', async () => {
    // 기본 핸들러: resultsSize=1 < 10 → hasNextPage=false
    const { result } = renderHook(
      () => useInfiniteQuery(notificationQueries.infiniteList()),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(false);
  });

  it('401 응답 시 isError가 true이다', async () => {
    server.use(
      http.get('http://localhost/api/bff/members/me/notifications', () =>
        HttpResponse.json(
          { success: false, status: 401, error: { code: 'UNAUTHORIZED', message: '인증이 필요합니다.' } },
          { status: 401 },
        ),
      ),
    );

    const { result } = renderHook(
      () => useInfiniteQuery(notificationQueries.infiniteList()),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

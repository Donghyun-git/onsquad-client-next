import { useInfiniteQuery } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, it } from 'vitest';

import { crewQueries } from '@/entities/crew';
import type { CrewListResponseProps } from '@/shared/api/crew';

import { mockCrewListResult } from '../../../setup/msw/handlers/crew.handlers';
import { server } from '../../../setup/msw/server';
import { createWrapper } from '../../utils/wrapper';

const makeCrewListResponse = (page: number, resultsSize: number): CrewListResponseProps => ({
  success: true,
  status: 200,
  data: {
    page,
    size: 10,
    totalPages: 3,
    totalCount: 25,
    resultsSize,
    results: Array.from({ length: resultsSize }, () => mockCrewListResult),
  },
});

describe('crewQueries.infiniteList() — infiniteQuery', () => {
  it('검색어가 없으면 첫 요청 page가 2이다', async () => {
    let requestedPage: string | null = null;
    server.use(
      http.get('http://localhost/api/bff/crews', ({ request }) => {
        const url = new URL(request.url);
        requestedPage = url.searchParams.get('page');
        return HttpResponse.json<CrewListResponseProps>(makeCrewListResponse(2, 10));
      }),
    );

    const { result } = renderHook(
      () => useInfiniteQuery(crewQueries.infiniteList()),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(requestedPage).toBe('2');
  });

  it('검색어가 있으면 첫 요청 page가 1이다', async () => {
    let requestedPage: string | null = null;
    server.use(
      http.get('http://localhost/api/bff/crews', ({ request }) => {
        const url = new URL(request.url);
        requestedPage = url.searchParams.get('page');
        return HttpResponse.json<CrewListResponseProps>(makeCrewListResponse(1, 10));
      }),
    );

    const { result } = renderHook(
      () => useInfiniteQuery(crewQueries.infiniteList({ crewName: '테스트' })),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(requestedPage).toBe('1');
  });

  it('resultsSize === 10이면 fetchNextPage 후 pages가 2개가 된다', async () => {
    // 기본 핸들러가 resultsSize: 10 반환 → hasNextPage: true
    const { result, rerender } = renderHook(
      () => useInfiniteQuery(crewQueries.infiniteList()),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(true);

    await act(async () => {
      await result.current.fetchNextPage();
    });
    rerender();

    await waitFor(() => expect(result.current.data?.pages.length).toBe(2));
  });

  it('resultsSize < 10이면 hasNextPage가 false이다', async () => {
    server.use(
      http.get('http://localhost/api/bff/crews', () =>
        HttpResponse.json<CrewListResponseProps>(makeCrewListResponse(2, 5)),
      ),
    );

    const { result } = renderHook(
      () => useInfiniteQuery(crewQueries.infiniteList()),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(false);
  });
});

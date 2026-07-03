import { useInfiniteQuery } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, it, vi } from 'vitest';

import { crewQueries } from '@/entities/crew';
import { useDelegateCrewOwnerMutation } from '@/features/crew/manage/members/model/useDelegateCrewOwnerMutation';
import { useKickCrewMemberMutation } from '@/features/crew/manage/members/model/useKickCrewMemberMutation';
import type { CrewMembersResponseProps } from '@/entities/crew/api/manage/members';

import { mockCrewMemberItem } from '../../../setup/msw/handlers/crew.handlers';
import { server } from '../../../setup/msw/server';
import { createWrapper } from '../../utils/wrapper';

vi.mock('@/shared/lib/hooks/useToast', () => ({
  useToast: () => ({ toast: vi.fn(), hide: vi.fn() }),
}));

vi.mock('@/shared/lib/auth/handleTokenExpiration', () => ({
  handleTokenExpiration: vi.fn(),
  isTokenExpiredError: vi.fn(() => false),
}));

const CREW_ID = 1;

const makeSuccessResponse = (resultsSize: number): CrewMembersResponseProps => ({
  success: true,
  status: 200,
  data: {
    size: 5,
    page: 0,
    totalPages: 1,
    totalCount: resultsSize,
    resultsSize,
    results: Array.from({ length: resultsSize }, (_, i) => ({
      ...mockCrewMemberItem,
      member: { ...mockCrewMemberItem.member, id: i + 1 },
    })),
  },
});

describe('crewQueries.members() — infiniteQuery', () => {
  it('초기 로드 시 첫 페이지 데이터를 반환한다', async () => {
    const { result } = renderHook(
      () => useInfiniteQuery(crewQueries.members({ crewId: CREW_ID })),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages[0].data.results).toHaveLength(1);
    expect(result.current.data?.pages[0].data.results[0].member.nickname).toBe('홍길동');
  });

  it('resultsSize < size이면 hasNextPage가 false이다', async () => {
    const { result } = renderHook(
      () => useInfiniteQuery(crewQueries.members({ crewId: CREW_ID })),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // 기본 핸들러: resultsSize=1, size=5 → 1 < 5 → hasNextPage=false
    expect(result.current.hasNextPage).toBe(false);
  });

  it('resultsSize === size이면 hasNextPage가 true이다', async () => {
    server.use(
      http.get('http://localhost/api/bff/crews/:crewId/members', () =>
        HttpResponse.json<CrewMembersResponseProps>(makeSuccessResponse(5)),
      ),
    );

    const { result } = renderHook(
      () => useInfiniteQuery(crewQueries.members({ crewId: CREW_ID })),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.hasNextPage).toBe(true);
  });
});

describe('useKickCrewMemberMutation', () => {
  it('강퇴 성공 후 크루원 목록이 재조회된다', async () => {
    let fetchCount = 0;
    server.use(
      http.get('http://localhost/api/bff/crews/:crewId/members', () => {
        fetchCount++;
        return HttpResponse.json<CrewMembersResponseProps>(makeSuccessResponse(1));
      }),
    );

    const wrapper = createWrapper();

    const { result: queryResult } = renderHook(
      () => useInfiniteQuery(crewQueries.members({ crewId: CREW_ID })),
      { wrapper },
    );
    await waitFor(() => expect(queryResult.current.isSuccess).toBe(true));
    expect(fetchCount).toBe(1);

    const { result: mutResult } = renderHook(
      () => useKickCrewMemberMutation(CREW_ID),
      { wrapper },
    );
    await act(async () => {
      await mutResult.current.mutateAsync(mockCrewMemberItem.member.id);
    });

    await waitFor(() => expect(fetchCount).toBe(2));
  });

  it('강퇴 실패(500) 시 크루원 목록이 재조회되지 않는다', async () => {
    let fetchCount = 0;
    server.use(
      http.get('http://localhost/api/bff/crews/:crewId/members', () => {
        fetchCount++;
        return HttpResponse.json<CrewMembersResponseProps>(makeSuccessResponse(1));
      }),
      http.delete('http://localhost/api/bff/crews/:crewId/members/:memberId', () =>
        HttpResponse.json({ success: false, status: 500 }, { status: 500 }),
      ),
    );

    const wrapper = createWrapper();

    const { result: queryResult } = renderHook(
      () => useInfiniteQuery(crewQueries.members({ crewId: CREW_ID })),
      { wrapper },
    );
    await waitFor(() => expect(queryResult.current.isSuccess).toBe(true));
    expect(fetchCount).toBe(1);

    const { result: mutResult } = renderHook(
      () => useKickCrewMemberMutation(CREW_ID),
      { wrapper },
    );
    await act(async () => {
      await mutResult.current.mutateAsync(mockCrewMemberItem.member.id).catch(() => {});
    });

    await waitFor(() => expect(mutResult.current.isError).toBe(true));
    expect(fetchCount).toBe(1);
  });
});

describe('useDelegateCrewOwnerMutation', () => {
  it('위임 성공 후 크루원 목록이 재조회된다', async () => {
    let fetchCount = 0;
    server.use(
      http.get('http://localhost/api/bff/crews/:crewId/members', () => {
        fetchCount++;
        return HttpResponse.json<CrewMembersResponseProps>(makeSuccessResponse(1));
      }),
    );

    const wrapper = createWrapper();

    const { result: queryResult } = renderHook(
      () => useInfiniteQuery(crewQueries.members({ crewId: CREW_ID })),
      { wrapper },
    );
    await waitFor(() => expect(queryResult.current.isSuccess).toBe(true));
    expect(fetchCount).toBe(1);

    const { result: mutResult } = renderHook(
      () => useDelegateCrewOwnerMutation(CREW_ID),
      { wrapper },
    );
    await act(async () => {
      await mutResult.current.mutateAsync(mockCrewMemberItem.member.id);
    });

    await waitFor(() => expect(fetchCount).toBe(2));
  });
});

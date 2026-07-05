import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import CrewSquadManageList from '@/features/crew/manage/squads/ui/CrewSquadManageList';

const handlePageMove = vi.fn();
vi.mock('@/shared/lib/hooks', () => ({
  usePageMove: () => ({ handlePageMove }),
}));

const fetchNextPage = vi.fn();
let infiniteReturn: Record<string, unknown>;
vi.mock('@tanstack/react-query', () => ({
  useInfiniteQuery: () => infiniteReturn,
}));

// SquadCard는 실제 컴포넌트 대신 최소 렌더러로 대체(자식 버튼 확인 목적)
vi.mock('@/entities/squad', () => ({
  squadQueries: { manageList: () => ({}) },
  SquadCard: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <span>{title}</span>
      {children}
    </div>
  ),
}));

afterEach(() => {
  cleanup();
  handlePageMove.mockClear();
  fetchNextPage.mockClear();
});

const makeItem = (id: number) => ({
  states: { isLeader: true, canDestroy: true },
  id,
  title: `스쿼드-${id}`,
  capacity: 8,
  remain: 1,
  categories: ['게임'],
  leader: { id: 1, nickname: '브레멘', introduce: '', mbti: '' },
});

describe('CrewSquadManageList', () => {
  it('스쿼드 개수와 카드 목록을 렌더한다', () => {
    infiniteReturn = {
      data: { pages: [{ data: { results: [makeItem(1), makeItem(2)], totalCount: 2, totalPages: 1 } }] },
      fetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
    render(<CrewSquadManageList crewId={3} />);

    expect(screen.getByText('스쿼드')).toBeDefined();
    expect(screen.getByText('2개')).toBeDefined();
    expect(screen.getByText('스쿼드-1')).toBeDefined();
    expect(screen.getByText('스쿼드-2')).toBeDefined();
  });

  it('참여자 목록 버튼 클릭 시 members 경로로 이동한다', () => {
    infiniteReturn = {
      data: { pages: [{ data: { results: [makeItem(7)], totalCount: 1, totalPages: 1 } }] },
      fetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
    render(<CrewSquadManageList crewId={3} />);

    fireEvent.click(screen.getByRole('button', { name: '참여자 목록' }));
    expect(handlePageMove).toHaveBeenCalledWith('/squads/7/members');
  });

  it('스쿼드 바로가기 버튼 클릭 시 detail 경로로 이동한다', () => {
    infiniteReturn = {
      data: { pages: [{ data: { results: [makeItem(7)], totalCount: 1, totalPages: 1 } }] },
      fetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
    render(<CrewSquadManageList crewId={3} />);

    fireEvent.click(screen.getByRole('button', { name: '스쿼드 바로가기' }));
    expect(handlePageMove).toHaveBeenCalledWith('/squads/7');
  });

  it('hasNextPage이면 더보기 버튼이 보이고 클릭 시 fetchNextPage 호출', () => {
    infiniteReturn = {
      data: { pages: [{ data: { results: [makeItem(1)], totalCount: 9, totalPages: 2 } }] },
      fetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    };
    render(<CrewSquadManageList crewId={3} />);

    const moreBtn = screen.getByRole('button', { name: /더보기/ });
    fireEvent.click(moreBtn);
    expect(fetchNextPage).toHaveBeenCalled();
  });

  it('결과가 없으면 빈 상태 문구를 표시한다', () => {
    infiniteReturn = {
      data: { pages: [{ data: { results: [], totalCount: 0, totalPages: 0 } }] },
      fetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    };
    render(<CrewSquadManageList crewId={3} />);

    expect(screen.getByText('아직 스쿼드가 없어요.')).toBeDefined();
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import SquadMembers from '@/features/squad/members/ui/SquadMembers';

vi.mock('next/navigation', () => ({ useRouter: () => ({ back: vi.fn() }) }));

const detail = {
  data: {
    states: { isLeader: false, canDelete: false },
    id: 7,
    title: '고정 겜팟',
    capacity: 8,
    remain: 3,
    categories: ['게임'],
    leader: { id: 1, nickname: '브레멘', introduce: '', mbti: '' },
  },
};
const membersData = { data: { results: [], totalCount: 5, totalPages: 1 } };

vi.mock('@tanstack/react-query', () => ({
  useQuery: (opts: { queryKey: unknown[] }) => {
    const key = opts.queryKey?.[1];
    if (key === 'detail') {
      return { data: detail };
    }
    return { data: membersData };
  },
}));

vi.mock('@/entities/squad', () => ({
  squadQueries: {
    root: () => ['squad'],
    detail: () => ({ queryKey: ['squad', 'detail', 7] }),
    members: () => ({ queryKey: ['squad', 'members', 7] }),
  },
}));

vi.mock('@/entities/squad/api', () => ({
  squadDeleteFetch: vi.fn(),
  squadDelegateLeaderFetch: vi.fn(),
  squadKickFetch: vi.fn(),
}));

vi.mock('@/shared/lib/queries', () => ({ useApiMutation: () => ({ mutateAsync: vi.fn() }) }));

afterEach(() => cleanup());

describe('SquadMembers 헤딩', () => {
  it('"참여자 목록" 헤딩과 참여자수/정원 카운트를 표시한다', () => {
    render(<SquadMembers squadId={7} />);

    expect(screen.getByText('참여자 목록')).toBeDefined();
    expect(screen.getByText('5/8')).toBeDefined();
  });
});

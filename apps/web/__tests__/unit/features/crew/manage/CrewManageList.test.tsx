import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import CrewManageList from '@/features/crew/manage/ui/CrewManageList';

const handlePageMove = vi.fn();
vi.mock('@/shared/lib/hooks', () => ({
  usePageMove: () => ({ handlePageMove }),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: { data: { states: { canModify: true, canDelete: false }, requestCnt: 1, squadCnt: 4, memberCnt: 7 } },
  }),
}));

vi.mock('@/entities/crew', () => ({
  crewQueries: { manage: () => ({}) },
}));

vi.mock('@/features/crew/manage/model/useDeleteCrewMutation', () => ({
  useDeleteCrewMutation: () => ({ mutate: vi.fn(), isPending: false }),
}));

afterEach(() => {
  cleanup();
  handlePageMove.mockClear();
});

describe('CrewManageList', () => {
  it('스쿼드 버튼 클릭 시 manage/squads 경로로 이동한다', () => {
    render(<CrewManageList crewId={3} />);

    fireEvent.click(screen.getByText('스쿼드').closest('button') as HTMLButtonElement);
    expect(handlePageMove).toHaveBeenCalledWith('/crews/3/manage/squads');
  });
});

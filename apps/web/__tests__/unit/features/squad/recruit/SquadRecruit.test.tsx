import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { MOCK_SQUAD_NOTICES } from '@/entities/squad';

import SquadRecruit from '@/features/squad/recruit/ui/SquadRecruit';

afterEach(() => cleanup());

describe('SquadRecruit', () => {
  it('"공지사항" heading이 렌더링된다', () => {
    render(<SquadRecruit />);

    expect(screen.getByRole('heading', { name: '공지사항' })).toBeDefined();
  });

  it('"공지 글쓰기" 버튼이 렌더링된다', () => {
    render(<SquadRecruit />);

    expect(screen.getByRole('button', { name: '공지 글쓰기' })).toBeDefined();
  });

  it('MOCK_SQUAD_NOTICES[0].title "크루 규정 안내(신규 크루원 필독)"이 렌더링된다', () => {
    render(<SquadRecruit />);

    expect(screen.getByText('크루 규정 안내(신규 크루원 필독)')).toBeDefined();
  });

  it(`MOCK_SQUAD_NOTICES의 모든 title(총 ${MOCK_SQUAD_NOTICES.length}개)이 렌더링된다`, () => {
    render(<SquadRecruit />);

    // MOCK_SQUAD_NOTICES 각 항목의 title을 화면에서 찾는다.
    // id=2,3,4가 동일한 title을 공유하므로 getAllByText로 복수 확인.
    expect(screen.getByText('크루 규정 안내(신규 크루원 필독)')).toBeDefined();

    const duplicateTitles = screen.getAllByText('스쿼드 모집 규정 안내');
    // id 2, 3, 4 모두 "스쿼드 모집 규정 안내"이므로 3개
    expect(duplicateTitles).toHaveLength(3);
  });
});

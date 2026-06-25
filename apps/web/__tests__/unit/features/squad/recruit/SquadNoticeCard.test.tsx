import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import type { SquadNotice } from '@/entities/squad';

import SquadNoticeCard from '@/features/squad/recruit/ui/SquadNoticeCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

const makeNotice = (overrides?: Partial<SquadNotice>): SquadNotice => ({
  id: '1',
  title: '공지 제목입니다',
  authorNickname: '홍길동',
  authorRole: '일반',
  authorProfileImageUrl: undefined,
  createdAt: '2024-01-01',
  isPinned: false,
  ...overrides,
});

describe('SquadNoticeCard', () => {
  it('notice.title이 화면에 표시된다', () => {
    render(<SquadNoticeCard notice={makeNotice({ title: '중요 공지사항' })} />);

    expect(screen.getByText('중요 공지사항')).toBeDefined();
  });

  it('notice.authorNickname이 화면에 표시된다', () => {
    render(<SquadNoticeCard notice={makeNotice({ authorNickname: '김철수' })} />);

    expect(screen.getByText('김철수')).toBeDefined();
  });

  it('notice.authorRole이 화면에 표시된다', () => {
    render(<SquadNoticeCard notice={makeNotice({ authorRole: '크루장' })} />);

    expect(screen.getByText('크루장')).toBeDefined();
  });

  it('notice.createdAt이 화면에 표시된다', () => {
    render(<SquadNoticeCard notice={makeNotice({ createdAt: '2024-06-25' })} />);

    expect(screen.getByText('2024-06-25')).toBeDefined();
  });

  it('isPinned=true이면 Star SVG 아이콘이 렌더링된다', () => {
    const { container } = render(<SquadNoticeCard notice={makeNotice({ isPinned: true })} />);

    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('isPinned=false이면 Star SVG 아이콘이 렌더링되지 않는다', () => {
    const { container } = render(<SquadNoticeCard notice={makeNotice({ isPinned: false })} />);

    expect(container.querySelector('svg')).toBeNull();
  });
});

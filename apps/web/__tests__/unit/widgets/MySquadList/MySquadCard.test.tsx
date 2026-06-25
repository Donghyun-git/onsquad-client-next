import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { SquadCardItem } from '@/widgets/MySquadList/MySquadCard';

import MySquadCard from '@/widgets/MySquadList/MySquadCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ className }: { className?: string }) => <div data-testid="avatar" className={className} />,
}));

vi.mock('@/shared/ui/Badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span data-testid="badge">{children}</span>,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    xl: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    xs: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    sm: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

const makeSquad = (overrides?: Partial<SquadCardItem>): SquadCardItem => ({
  id: 1,
  name: '테스트 스쿼드',
  description: '스쿼드 소개입니다.',
  ownerName: '홍길동',
  imageUrl: '/images/test.png',
  memberCount: 3,
  maxMemberCount: 10,
  hashtags: ['런닝', '아침'],
  ...overrides,
});

describe('MySquadCard', () => {
  it('squad.name이 렌더링된다', () => {
    render(<MySquadCard squad={makeSquad({ name: '런닝 스쿼드' })} />);

    expect(screen.getByText('런닝 스쿼드')).toBeDefined();
  });

  it('squad.description이 렌더링된다', () => {
    render(<MySquadCard squad={makeSquad({ description: '매일 아침 함께 달려요' })} />);

    expect(screen.getByText('매일 아침 함께 달려요')).toBeDefined();
  });

  it('squad.ownerName이 렌더링된다', () => {
    render(<MySquadCard squad={makeSquad({ ownerName: '김철수' })} />);

    expect(screen.getByText('김철수')).toBeDefined();
  });

  it('memberCount/maxMemberCount가 "3/10명" 형식으로 렌더링된다', () => {
    render(<MySquadCard squad={makeSquad({ memberCount: 3, maxMemberCount: 10 })} />);

    expect(screen.getByText('3/10명')).toBeDefined();
  });

  it('hashtags 배지가 렌더링된다', () => {
    render(<MySquadCard squad={makeSquad({ hashtags: ['런닝', '아침'] })} />);

    const badges = screen.getAllByTestId('badge');
    expect(badges).toHaveLength(2);
    expect(badges[0].textContent).toBe('런닝');
    expect(badges[1].textContent).toBe('아침');
  });

  it('onClick이 있을 때 클릭하면 콜백이 호출된다', () => {
    const onClick = vi.fn();
    render(<MySquadCard squad={makeSquad()} onClick={onClick} />);

    const button = screen.getByRole('button', { name: '테스트 스쿼드' });
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

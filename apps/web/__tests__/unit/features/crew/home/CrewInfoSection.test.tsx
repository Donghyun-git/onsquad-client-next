import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { CrewInfoSection } from '@/features/crew/home/ui/CrewInfoSection';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Article', () => ({
  Article: ({ slot }: { slot: React.ReactNode }) => <div>{slot}</div>,
}));

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ className }: { className?: string }) => <div data-testid="avatar" className={className} />,
}));

vi.mock('@/shared/ui/Badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span data-testid="badge">{children}</span>,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    lg: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    base: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    xs: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
}));

const makeCrew = () => ({
  name: '런닝크루',
  owner: { nickname: '홍길동' },
  introduce: '함께 달려요',
  detail: '매주 토요일 아침 6시에 모여서 달립니다.',
  hashtags: ['런닝', '아침'],
  memberCount: 5,
});

describe('CrewInfoSection', () => {
  it('crew.name이 렌더링된다', () => {
    render(<CrewInfoSection crew={makeCrew()} />);

    expect(screen.getByText('런닝크루')).toBeDefined();
  });

  it('crew.owner.nickname이 렌더링된다', () => {
    render(<CrewInfoSection crew={makeCrew()} />);

    expect(screen.getByText('홍길동')).toBeDefined();
  });

  it('crew.introduce가 렌더링된다', () => {
    render(<CrewInfoSection crew={makeCrew()} />);

    expect(screen.getByText('함께 달려요')).toBeDefined();
  });

  it('"멤버 수 5 명" 배지가 렌더링된다', () => {
    render(<CrewInfoSection crew={makeCrew()} />);

    const badges = screen.getAllByTestId('badge');
    const memberBadge = badges.find((b) => b.textContent?.includes('멤버 수') && b.textContent?.includes('5'));
    expect(memberBadge).toBeDefined();
  });

  it('hashtags 배지가 2개 렌더링된다', () => {
    render(<CrewInfoSection crew={makeCrew()} />);

    const badges = screen.getAllByTestId('badge');
    const hashtagBadges = badges.filter((b) => b.textContent === '런닝' || b.textContent === '아침');
    expect(hashtagBadges).toHaveLength(2);
  });

  it('crew가 undefined일 때 크래시 없이 렌더링된다', () => {
    expect(() => render(<CrewInfoSection crew={undefined} />)).not.toThrow();
  });
});

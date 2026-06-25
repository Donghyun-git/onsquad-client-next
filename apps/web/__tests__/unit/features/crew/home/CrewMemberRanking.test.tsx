import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { CrewMemberRanking } from '@/features/crew/home/ui/CrewMemberRanking';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Article', () => ({
  Article: ({ slot }: { slot: React.ReactNode }) => <div>{slot}</div>,
}));

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ className }: { className?: string }) => <div data-testid="avatar" className={className} />,
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

vi.mock('@/shared/ui/ui/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button className={className}>{children}</button>
  ),
}));

const makeMembers = () => [
  { rank: 1, nickname: '김달리기' },
  { rank: 2, nickname: '이뛰기' },
  { rank: 3, nickname: '박조깅' },
];

describe('CrewMemberRanking', () => {
  it('"크루원 활동 랭킹" 타이틀이 렌더링된다', () => {
    render(<CrewMemberRanking members={makeMembers()} />);

    expect(screen.getByText('크루원 활동 랭킹')).toBeDefined();
  });

  it('members가 있을 때 순위와 nickname이 렌더링된다', () => {
    render(<CrewMemberRanking members={makeMembers()} />);

    expect(screen.getByText('1위')).toBeDefined();
    expect(screen.getByText('2위')).toBeDefined();
    expect(screen.getByText('3위')).toBeDefined();
    expect(screen.getByText('김달리기')).toBeDefined();
    expect(screen.getByText('이뛰기')).toBeDefined();
    expect(screen.getByText('박조깅')).toBeDefined();
  });

  it('members가 undefined일 때 "등록된 크루원이 없어요."가 렌더링된다', () => {
    render(<CrewMemberRanking members={undefined} />);

    expect(screen.getByText('등록된 크루원이 없어요.')).toBeDefined();
  });

  it('members가 빈 배열일 때 "등록된 크루원이 없어요."가 렌더링된다', () => {
    render(<CrewMemberRanking members={[]} />);

    expect(screen.getByText('등록된 크루원이 없어요.')).toBeDefined();
  });

  it('"랭킹 더보기" 버튼이 렌더링된다', () => {
    render(<CrewMemberRanking members={makeMembers()} />);

    expect(screen.getByText('랭킹 더보기')).toBeDefined();
  });
});

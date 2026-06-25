import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { CrewAnnounceList } from '@/features/crew/home/ui/CrewAnnounceList';
import type { Mbti } from '@/shared/api/model';

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
    xl: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    base: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    xs: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    xxs: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
  },
}));

vi.mock('@/shared/ui/ui/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <button className={className}>{children}</button>
  ),
}));

vi.mock('@/shared/lib', () => ({
  getRoleText: (role: string) => role,
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

type AnnounceItem = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  pinned: boolean;
  writer: { id: number; nickname: string; introduce: string; mbti: Mbti | '' };
  states?: { role?: string };
};

const makeAnnounce = (overrides?: Partial<AnnounceItem>): AnnounceItem => ({
  id: 1,
  title: '공지 제목',
  content: '공지 내용입니다.',
  createdAt: '2024-01-01T00:00:00.000Z',
  pinned: false,
  writer: {
    id: 10,
    nickname: '홍길동',
    introduce: '안녕하세요',
    mbti: 'INFP',
  },
  states: { role: 'OWNER' },
  ...overrides,
});

describe('CrewAnnounceList', () => {
  it('"공지사항" 타이틀이 렌더링된다', () => {
    render(<CrewAnnounceList announces={[makeAnnounce()]} />);

    expect(screen.getByText('공지사항')).toBeDefined();
  });

  it('announces가 있을 때 title이 렌더링된다', () => {
    render(<CrewAnnounceList announces={[makeAnnounce({ title: '중요 공지' })]} />);

    expect(screen.getByText('중요 공지')).toBeDefined();
  });

  it('announces가 빈 배열일 때 "등록된 공지사항이 없어요."가 렌더링된다', () => {
    render(<CrewAnnounceList announces={[]} />);

    expect(screen.getByText('등록된 공지사항이 없어요.')).toBeDefined();
  });

  it('announces가 undefined일 때 "등록된 공지사항이 없어요."가 렌더링된다', () => {
    render(<CrewAnnounceList announces={undefined} />);

    expect(screen.getByText('등록된 공지사항이 없어요.')).toBeDefined();
  });

  it('writer.nickname이 렌더링된다', () => {
    render(<CrewAnnounceList announces={[makeAnnounce({ writer: { id: 10, nickname: '김달리기', introduce: '소개', mbti: 'ENTP' } })]} />);

    expect(screen.getByText('김달리기')).toBeDefined();
  });
});

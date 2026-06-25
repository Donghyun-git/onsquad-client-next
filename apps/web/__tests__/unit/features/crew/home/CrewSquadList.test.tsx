import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { CrewSquadList } from '@/features/crew/home/ui/CrewSquadList';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ className }: { className?: string }) => <div data-testid="avatar" className={className} />,
}));

vi.mock('@/shared/ui/Badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span data-testid="badge">{children}</span>,
}));

vi.mock('@/shared/ui/Card', () => ({
  Card: ({ children, title }: { children: React.ReactNode; title?: React.ReactNode; onClick?: () => void }) => (
    <div data-testid="squad-card">
      {title}
      {children}
    </div>
  ),
}));

vi.mock('@/shared/ui/PostButton', () => ({
  PostButton: ({ children, onPageMove }: { children: React.ReactNode; onPageMove?: () => void; className?: string }) => (
    <button onClick={onPageMove}>{children}</button>
  ),
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    lg: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <div className={className}>{children}</div>
    ),
    sm: ({ children, className }: { children: React.ReactNode; className?: string }) => (
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

vi.mock('@/shared/config/paths', () => ({
  PATH: {
    addSquad: '/squad/add',
    root: '/',
  },
  SQUAD_PATH: {
    detail: (id: number) => `/squad/${id}`,
  },
}));

interface Squad {
  id: number;
  title: string;
  categories: string[];
  remain: number;
  capacity: number;
  leader: { nickname: string };
  content: string;
}

const makeSquad = (overrides?: Partial<Squad>): Squad => ({
  id: 1,
  title: '축구 스쿼드',
  categories: ['축구', '풋살'],
  remain: 3,
  capacity: 10,
  leader: { nickname: '홍길동' },
  content: '같이 축구할 분을 구합니다.',
  ...overrides,
});

describe('CrewSquadList', () => {
  it('"모집중인 스쿼드" 타이틀이 렌더링된다', () => {
    render(<CrewSquadList crewId={1} squads={[makeSquad()]} />);

    expect(screen.getByText('모집중인 스쿼드')).toBeDefined();
  });

  it('squad.title이 렌더링된다', () => {
    render(<CrewSquadList crewId={1} squads={[makeSquad({ title: '런닝 스쿼드' })]} />);

    expect(screen.getByText('런닝 스쿼드')).toBeDefined();
  });

  it('leader.nickname이 렌더링된다', () => {
    render(<CrewSquadList crewId={1} squads={[makeSquad({ leader: { nickname: '김달리기' } })]} />);

    expect(screen.getByText('김달리기')).toBeDefined();
  });

  it('capacity - remain / capacity 명 형식으로 렌더링된다', () => {
    render(<CrewSquadList crewId={1} squads={[makeSquad({ remain: 3, capacity: 10 })]} />);

    expect(screen.getByText('7/10 명')).toBeDefined();
  });

  it('squads=undefined일 때 스쿼드 카드가 렌더링되지 않는다', () => {
    render(<CrewSquadList crewId={1} squads={undefined} />);

    expect(screen.queryAllByTestId('squad-card')).toHaveLength(0);
  });
});

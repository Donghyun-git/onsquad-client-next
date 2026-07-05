import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import SquadCard from '@/entities/squad/ui/SquadCard';

vi.mock('lucide-react', () => ({
  Zap: (props: Record<string, unknown>) => <svg data-testid="zap-icon" {...props} />,
}));

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ className }: { className?: string }) => <div data-testid="avatar" className={className} />,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    sm: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

afterEach(() => cleanup());

describe('SquadCard', () => {
  const baseProps = {
    leaderNickname: '브레멘',
    title: '고정 겜팟 구해요 선착순',
    categories: ['게임'],
    capacity: 8,
    remain: 1,
  };

  it('리더 닉네임과 "님의 스쿼드" 문구를 표시한다', () => {
    render(
      <SquadCard {...baseProps}>
        <button>스쿼드 바로가기</button>
      </SquadCard>,
    );
    expect(screen.getByText(/브레멘 님의 스쿼드/)).toBeDefined();
  });

  it('제목과 카테고리, 인원(capacity-remain/capacity)을 표시한다', () => {
    render(
      <SquadCard {...baseProps}>
        <button>스쿼드 바로가기</button>
      </SquadCard>,
    );
    expect(screen.getByText('고정 겜팟 구해요 선착순')).toBeDefined();
    expect(screen.getByText('게임')).toBeDefined();
    expect(screen.getByText('7/8 명')).toBeDefined();
  });

  it('isLeader가 true이면 ⚡ 아이콘이 렌더된다', () => {
    render(
      <SquadCard {...baseProps} isLeader>
        <button>스쿼드 바로가기</button>
      </SquadCard>,
    );
    expect(screen.getByTestId('zap-icon')).toBeDefined();
  });

  it('isLeader가 false(기본)이면 ⚡ 아이콘이 없다', () => {
    render(
      <SquadCard {...baseProps}>
        <button>스쿼드 바로가기</button>
      </SquadCard>,
    );
    expect(screen.queryByTestId('zap-icon')).toBeNull();
  });

  it('children(액션 버튼)을 렌더한다', () => {
    render(
      <SquadCard {...baseProps}>
        <button>참여자 목록</button>
        <button>스쿼드 바로가기</button>
      </SquadCard>,
    );
    expect(screen.getByRole('button', { name: '참여자 목록' })).toBeDefined();
    expect(screen.getByRole('button', { name: '스쿼드 바로가기' })).toBeDefined();
  });
});

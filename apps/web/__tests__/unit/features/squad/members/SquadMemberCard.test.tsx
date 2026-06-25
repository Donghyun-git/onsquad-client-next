import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { SquadParticipantItem } from '@/entities/squad';

import SquadMemberCard from '@/features/squad/members/ui/SquadMemberCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

const makeItem = (overrides?: {
  states?: Partial<SquadParticipantItem['states']>;
  member?: Partial<SquadParticipantItem['member']>;
  participateAt?: string;
}): SquadParticipantItem => ({
  states: { isMe: false, canKick: true, canDelegateLeader: true, ...overrides?.states },
  participateAt: overrides?.participateAt ?? '2024-01-01T00:00:00Z',
  member: { id: 1, nickname: '홍길동', introduce: '반갑습니다', mbti: 'INFP', ...overrides?.member },
});

describe('SquadMemberCard', () => {
  it('member.nickname이 화면에 표시된다', () => {
    render(
      <SquadMemberCard
        item={makeItem({ member: { nickname: '테스트유저' } })}
        canManage={false}
        onManage={vi.fn()}
      />,
    );

    expect(screen.getByText('테스트유저')).toBeDefined();
  });

  it('member.introduce가 화면에 표시된다', () => {
    render(
      <SquadMemberCard
        item={makeItem({ member: { introduce: '안녕하세요 반갑습니다' } })}
        canManage={false}
        onManage={vi.fn()}
      />,
    );

    expect(screen.getByText('안녕하세요 반갑습니다')).toBeDefined();
  });

  it('canManage=true일 때 멤버 관리 버튼이 화면에 표시된다', () => {
    render(
      <SquadMemberCard
        item={makeItem()}
        canManage={true}
        onManage={vi.fn()}
      />,
    );

    const btn = screen.queryByRole('button', { name: '멤버 관리' });
    expect(btn).toBeDefined();
    expect(btn).not.toBeNull();
  });

  it('canManage=false일 때 멤버 관리 버튼이 표시되지 않는다', () => {
    render(
      <SquadMemberCard
        item={makeItem()}
        canManage={false}
        onManage={vi.fn()}
      />,
    );

    expect(screen.queryByRole('button', { name: '멤버 관리' })).toBeNull();
  });

  it('관리 버튼 클릭 시 onManage가 호출된다', () => {
    const onManage = vi.fn();

    render(
      <SquadMemberCard
        item={makeItem()}
        canManage={true}
        onManage={onManage}
      />,
    );

    const btn = screen.getByRole('button', { name: '멤버 관리' });
    fireEvent.click(btn);

    expect(onManage).toHaveBeenCalledOnce();
  });
});

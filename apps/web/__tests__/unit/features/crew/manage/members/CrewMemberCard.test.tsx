import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { CrewMemberItem } from '@/shared/api/crew/manage/members';

import CrewMemberCard from '@/features/crew/manage/members/ui/CrewMemberCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

const makeItem = (overrides?: {
  states?: Partial<CrewMemberItem['states']>;
  member?: Partial<CrewMemberItem['member']>;
  participateAt?: string;
}): CrewMemberItem => ({
  states: { isMe: false, canKick: true, canDelegateOwner: true, ...overrides?.states },
  participateAt: overrides?.participateAt ?? '2024-01-01T00:00:00Z',
  member: { id: 1, nickname: '홍길동', introduce: '반갑습니다', mbti: 'INFP', ...overrides?.member },
});

describe('CrewMemberCard', () => {
  it('member.nickname이 화면에 표시된다', () => {
    render(
      <CrewMemberCard
        item={makeItem({ member: { nickname: '테스트유저' } })}
        onOpenMenu={vi.fn()}
        onOpenProfile={vi.fn()}
      />,
    );

    expect(screen.getByText('테스트유저')).toBeDefined();
  });

  it('member.introduce가 화면에 표시된다', () => {
    render(
      <CrewMemberCard
        item={makeItem({ member: { introduce: '안녕하세요 반갑습니다' } })}
        onOpenMenu={vi.fn()}
        onOpenProfile={vi.fn()}
      />,
    );

    expect(screen.getByText('안녕하세요 반갑습니다')).toBeDefined();
  });

  it('canKick=true, isMe=false인 경우 관리 버튼이 표시된다', () => {
    render(
      <CrewMemberCard
        item={makeItem({ states: { isMe: false, canKick: true, canDelegateOwner: false } })}
        onOpenMenu={vi.fn()}
        onOpenProfile={vi.fn()}
      />,
    );

    const btn = screen.queryByRole('button', { name: '홍길동 님 관리' });
    expect(btn).toBeDefined();
    expect(btn).not.toBeNull();
  });

  it('isMe=true인 경우 관리 버튼이 표시되지 않는다', () => {
    render(
      <CrewMemberCard
        item={makeItem({ states: { isMe: true, canKick: true, canDelegateOwner: true } })}
        onOpenMenu={vi.fn()}
        onOpenProfile={vi.fn()}
      />,
    );

    expect(screen.queryByRole('button', { name: '홍길동 님 관리' })).toBeNull();
  });

  it('canKick=false, canDelegateOwner=false인 경우 관리 버튼이 표시되지 않는다', () => {
    render(
      <CrewMemberCard
        item={makeItem({ states: { isMe: false, canKick: false, canDelegateOwner: false } })}
        onOpenMenu={vi.fn()}
        onOpenProfile={vi.fn()}
      />,
    );

    expect(screen.queryByRole('button', { name: '홍길동 님 관리' })).toBeNull();
  });

  it('관리 버튼 클릭 시 onOpenMenu가 호출된다', () => {
    const onOpenMenu = vi.fn();

    render(
      <CrewMemberCard
        item={makeItem()}
        onOpenMenu={onOpenMenu}
        onOpenProfile={vi.fn()}
      />,
    );

    const btn = screen.getByRole('button', { name: '홍길동 님 관리' });
    fireEvent.click(btn);

    expect(onOpenMenu).toHaveBeenCalled();
  });

  it('소개 영역 클릭 시 onOpenProfile이 호출된다', () => {
    const onOpenProfile = vi.fn();

    render(
      <CrewMemberCard
        item={makeItem({ member: { introduce: '클릭해보세요' } })}
        onOpenMenu={vi.fn()}
        onOpenProfile={onOpenProfile}
      />,
    );

    const profileBtn = screen.getByRole('button', { name: /클릭해보세요/ });
    fireEvent.click(profileBtn);

    expect(onOpenProfile).toHaveBeenCalled();
  });
});

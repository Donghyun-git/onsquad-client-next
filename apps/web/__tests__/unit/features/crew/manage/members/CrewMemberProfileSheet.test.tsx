import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { CrewMemberItem } from '@/entities/crew/api/manage/members';

import CrewMemberProfileSheet from '@/features/crew/manage/members/ui/CrewMemberProfileSheet';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

vi.mock('@/shared/ui/BottomSheet', () => ({
  BottomSheet: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) =>
    isOpen ? <div>{children}</div> : null,
}));

const makeItem = (overrides?: Partial<CrewMemberItem['member']>): CrewMemberItem => ({
  states: {
    isMe: false,
    canKick: false,
    canDelegateOwner: false,
  },
  participateAt: '2024-01-01T00:00:00Z',
  member: {
    id: 1,
    nickname: '테스트유저',
    introduce: '안녕하세요',
    mbti: 'INFP',
    ...overrides,
  },
});

describe('CrewMemberProfileSheet', () => {
  it('member.nickname이 화면에 표시된다', () => {
    render(
      <CrewMemberProfileSheet item={makeItem({ nickname: '홍길동' })} isOpen={true} onClose={vi.fn()} />,
    );

    expect(screen.getByText('홍길동')).toBeDefined();
  });

  it('member.introduce가 화면에 표시된다', () => {
    render(
      <CrewMemberProfileSheet item={makeItem({ introduce: '자기소개입니다' })} isOpen={true} onClose={vi.fn()} />,
    );

    expect(screen.getByText('자기소개입니다')).toBeDefined();
  });

  it('member.mbti가 빈 문자열이면 "신비주의"가 표시된다', () => {
    render(
      <CrewMemberProfileSheet item={makeItem({ mbti: '' })} isOpen={true} onClose={vi.fn()} />,
    );

    expect(screen.getByText('신비주의')).toBeDefined();
  });

  it('member.mbti가 "INFP"이면 "INFP"가 표시된다', () => {
    render(
      <CrewMemberProfileSheet item={makeItem({ mbti: 'INFP' })} isOpen={true} onClose={vi.fn()} />,
    );

    expect(screen.getByText('INFP')).toBeDefined();
  });

  it('"닫기" 버튼이 렌더링된다', () => {
    render(
      <CrewMemberProfileSheet item={makeItem()} isOpen={true} onClose={vi.fn()} />,
    );

    expect(screen.getByRole('button', { name: '닫기' })).toBeDefined();
  });

  it('"닫기" 버튼 클릭 시 onClose가 호출된다', () => {
    const onClose = vi.fn();

    render(
      <CrewMemberProfileSheet item={makeItem()} isOpen={true} onClose={onClose} />,
    );

    fireEvent.click(screen.getByRole('button', { name: '닫기' }));

    expect(onClose).toHaveBeenCalledOnce();
  });
});

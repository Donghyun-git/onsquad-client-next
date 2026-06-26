import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import type { MyCrewParticipantItem } from '@/entities/member';

import MyCrewCard from '@/pages/my/crews/ui/MyCrewCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    xl: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

const mockItem: MyCrewParticipantItem = {
  states: { isOwner: false },
  crew: {
    id: 10,
    name: '테스트 크루',
    imageUrl: '/crew.png',
    owner: {
      id: 1,
      nickname: '오너닉',
      introduce: '오너 소개',
      mbti: 'INTJ',
    },
  },
};

describe('MyCrewCard', () => {
  it('crew.name "테스트 크루" 텍스트가 렌더링된다', () => {
    render(<MyCrewCard item={mockItem} />);

    expect(screen.getByText('테스트 크루')).toBeDefined();
  });

  it('aria-label="테스트 크루 크루로 이동" 버튼이 존재한다', () => {
    render(<MyCrewCard item={mockItem} />);

    expect(screen.getByRole('button', { name: '테스트 크루 크루로 이동' })).toBeDefined();
  });

  it('states.isOwner=true일 때 "내 크루" 텍스트가 렌더링된다', () => {
    const ownerItem: MyCrewParticipantItem = {
      ...mockItem,
      states: { isOwner: true },
    };
    render(<MyCrewCard item={ownerItem} />);

    expect(screen.getByText('내 크루')).toBeDefined();
  });

  it('states.isOwner=false일 때 "내 크루" 텍스트가 없다', () => {
    render(<MyCrewCard item={mockItem} />);

    expect(screen.queryByText('내 크루')).toBeNull();
  });
});

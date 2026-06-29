import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import type { MySquadParticipantGroup } from '@/entities/member';

import MySquadGroup from '@/pages/my/crews/ui/MySquadGroup';

afterEach(() => cleanup());

vi.mock('@/shared/config/paths', () => ({
  SQUAD_PATH: {
    detail: (id: number) => `/squads/${id}`,
  },
}));

vi.mock('@/shared/ui/Text', () => {
  const Span = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={className}>{children}</span>
  );
  return {
    Text: { base: Span, sm: Span, xl: Span, xxs: Span },
  };
});

const mockLeader = {
  id: 2,
  nickname: '리더닉',
  introduce: '리더 소개',
  mbti: 'ENFP' as const,
};

const mockGroup: MySquadParticipantGroup = {
  states: { isOwner: false },
  crew: {
    id: 1,
    name: '테스트 크루',
    imageUrl: '/crew.png',
    owner: {
      id: 1,
      nickname: '오너',
      introduce: '오너 소개',
      mbti: 'INTJ' as const,
    },
    squads: [
      {
        states: { isLeader: false },
        participateAt: '2024-01-01',
        squad: {
          id: 10,
          title: '테스트 스쿼드',
          capacity: 10,
          remain: 7,
          categories: ['게임'],
          kakaoLink: 'https://open.kakao.com/test',
          leader: mockLeader,
        },
      },
    ],
  },
};

describe('MySquadGroup', () => {
  it('crew.name "테스트 크루" 텍스트가 렌더링된다', () => {
    render(<MySquadGroup group={mockGroup} />);

    expect(screen.getByText('테스트 크루')).toBeDefined();
  });

  it('squad.title "테스트 스쿼드" 텍스트가 렌더링된다', () => {
    render(<MySquadGroup group={mockGroup} />);

    expect(screen.getByText('테스트 스쿼드')).toBeDefined();
  });

  it('현재 인원(capacity - remain)/capacity "3/10 명" 텍스트가 렌더링된다', () => {
    render(<MySquadGroup group={mockGroup} />);

    expect(screen.getByText('3/10 명')).toBeDefined();
  });

  it('squad.kakaoLink가 있을 때 "오픈채팅" 버튼이 렌더링된다', () => {
    render(<MySquadGroup group={mockGroup} />);

    expect(screen.getByRole('button', { name: '오픈채팅' })).toBeDefined();
  });

  it('squad.kakaoLink가 없을 때 "오픈채팅" 버튼이 없다', () => {
    const groupWithoutKakao: MySquadParticipantGroup = {
      ...mockGroup,
      crew: {
        ...mockGroup.crew,
        squads: [
          {
            ...mockGroup.crew.squads[0],
            squad: {
              ...mockGroup.crew.squads[0].squad,
              kakaoLink: undefined,
            },
          },
        ],
      },
    };
    render(<MySquadGroup group={groupWithoutKakao} />);

    expect(screen.queryByRole('button', { name: '오픈채팅' })).toBeNull();
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import type { HashTag, Mbti } from '@/shared/api/model';
import type { CrewListResponseProps } from '@/shared/api/crew/crewListGetFetch';

import CommunityCrewList from '@/pages/community/ui/CommunityCrewList';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Card/CrewCard', () => ({
  CrewCard: ({
    title,
    tagSlot,
  }: {
    title: string;
    ownerName: string;
    description: string;
    crewImage: string;
    tagSlot: React.ReactNode;
    onClick: () => void;
  }) => (
    <div>
      <span>{title}</span>
      <div>{tagSlot}</div>
    </div>
  ),
}));

vi.mock('@/shared/ui/Badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    lg: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    sm: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

vi.mock('@/shared/lib', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

vi.mock('@/pages/community/config', () => ({
  COMMUNITY_CONTAINER_HEIGHT: 'calc(100dvh-35rem)',
}));

type CrewListItem = PropType<PropType<CrewListResponseProps, 'data'>, 'results'>[0];

const mockCrew: CrewListItem = {
  id: 1,
  name: '테스트 크루',
  introduce: '크루 소개',
  detail: '크루 상세',
  imageUrl: '/images/crew1.png',
  kakaoLink: 'https://open.kakao.com/test',
  hashtags: ['활발한'] as HashTag[],
  memberCount: 5,
  owner: {
    id: 10,
    nickname: '크루장닉네임',
    introduce: '크루장 소개',
    mbti: 'INTJ' as Mbti,
  },
};

describe('CommunityCrewList', () => {
  it('빈 리스트가 전달되면 "검색 결과가 없습니다." 텍스트가 렌더링된다', () => {
    render(<CommunityCrewList list={[]} />);

    expect(screen.getByText('검색 결과가 없습니다.')).toBeDefined();
  });

  it('리스트가 있으면 크루명 "테스트 크루"가 렌더링된다', () => {
    render(<CommunityCrewList list={[mockCrew]} />);

    expect(screen.getByText('테스트 크루')).toBeDefined();
  });

  it('크루 해시태그 "활발한"이 렌더링된다', () => {
    render(<CommunityCrewList list={[mockCrew]} />);

    expect(screen.getByText('활발한')).toBeDefined();
  });

  it('"멤버 수 5 명" 배지가 렌더링된다', () => {
    render(<CommunityCrewList list={[mockCrew]} />);

    expect(screen.getByText('멤버 수 5 명')).toBeDefined();
  });
});

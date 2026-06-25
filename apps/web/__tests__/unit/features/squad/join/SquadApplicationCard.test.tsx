import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { MySquadRequestItem } from '@/entities/member';

import SquadApplicationCard from '@/features/squad/join/ui/SquadApplicationCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: () => <div data-testid="avatar" />,
}));

const makeApplication = (overrides?: {
  crew?: Partial<MySquadRequestItem['crew']>;
  squad?: Partial<MySquadRequestItem['squad']>;
}): MySquadRequestItem => ({
  id: 1,
  requestAt: '2024-01-01T00:00:00Z',
  crew: {
    id: 10,
    name: '테스트 크루',
    introduce: '크루 소개입니다',
    kakaoLink: 'https://open.kakao.com/test',
    imageUrl: '',
    owner: { id: 100, nickname: '크루장', introduce: '크루장 소개', mbti: 'INFP' },
    ...overrides?.crew,
  },
  squad: {
    id: 20,
    title: '테스트 스쿼드',
    capacity: 10,
    remain: 3,
    categories: ['풋살', '게임'],
    kakaoLink: undefined,
    leader: { id: 200, nickname: '스쿼드리더', introduce: '리더 소개', mbti: 'ENTJ' },
    ...overrides?.squad,
  },
});

describe('SquadApplicationCard', () => {
  it('스쿼드 타이틀이 화면에 표시된다', () => {
    render(
      <SquadApplicationCard
        application={makeApplication({ squad: { title: '주말 풋살 모임' } })}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText('주말 풋살 모임')).toBeDefined();
  });

  it('리더 닉네임 + "님의 스쿼드" 텍스트가 화면에 표시된다', () => {
    render(
      <SquadApplicationCard
        application={makeApplication({
          squad: { leader: { id: 200, nickname: '홍길동', introduce: '소개', mbti: 'INFJ' } },
        })}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText('홍길동')).toBeDefined();
    expect(screen.getByText('님의 스쿼드')).toBeDefined();
  });

  it('카테고리 배지들이 화면에 표시된다', () => {
    render(
      <SquadApplicationCard
        application={makeApplication({ squad: { categories: ['배드민턴', '테니스'] } })}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText('배드민턴')).toBeDefined();
    expect(screen.getByText('테니스')).toBeDefined();
  });

  it('remain/capacity가 "X/Y 명" 형식으로 표시된다', () => {
    render(
      <SquadApplicationCard
        application={makeApplication({ squad: { remain: 3, capacity: 10 } })}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText('3/10 명')).toBeDefined();
  });

  it('취소하기 버튼 클릭 시 onCancel이 호출된다', () => {
    const onCancel = vi.fn();

    render(
      <SquadApplicationCard
        application={makeApplication()}
        onCancel={onCancel}
      />,
    );

    const btn = screen.getByRole('button', { name: '합류신청 취소하기' });
    fireEvent.click(btn);

    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('수락 대기중 버튼이 화면에 표시된다', () => {
    render(
      <SquadApplicationCard
        application={makeApplication()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: '수락 대기 상태 확인' })).toBeDefined();
    expect(screen.getByText('수락 대기중')).toBeDefined();
  });
});

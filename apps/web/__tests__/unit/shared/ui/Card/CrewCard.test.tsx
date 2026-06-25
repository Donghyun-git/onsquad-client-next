import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import type { CrewCardPropsType } from '@/shared/ui/Card/CrewCard/CrewCard';

import CrewCard from '@/shared/ui/Card/CrewCard/CrewCard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Avatar', () => ({
  Avatar: ({ className }: { className?: string }) => <div data-testid="avatar" className={className} />,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    xl: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    sm: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

const makeProps = (overrides?: Partial<CrewCardPropsType>): CrewCardPropsType => ({
  title: '테스트 크루',
  description: '크루 소개입니다.',
  ownerName: '홍길동',
  tagSlot: <span data-testid="tag-slot">태그</span>,
  crewImage: '/images/test.png',
  userImage: undefined,
  onClick: undefined,
  ...overrides,
});

describe('CrewCard', () => {
  it('title이 렌더링된다', () => {
    render(<CrewCard {...makeProps({ title: '런닝 크루' })} />);

    expect(screen.getByText('런닝 크루')).toBeDefined();
  });

  it('description이 렌더링된다', () => {
    render(<CrewCard {...makeProps({ description: '함께 달리는 크루입니다.' })} />);

    expect(screen.getByText('함께 달리는 크루입니다.')).toBeDefined();
  });

  it('ownerName이 렌더링된다', () => {
    render(<CrewCard {...makeProps({ ownerName: '김철수' })} />);

    expect(screen.getByText('김철수')).toBeDefined();
  });

  it('tagSlot 콘텐츠가 렌더링된다', () => {
    render(
      <CrewCard
        {...makeProps({
          tagSlot: <span data-testid="custom-tag">커스텀 태그</span>,
        })}
      />,
    );

    expect(screen.getByTestId('custom-tag')).toBeDefined();
    expect(screen.getByText('커스텀 태그')).toBeDefined();
  });

  it('onClick이 있을 때 클릭하면 콜백이 호출된다', () => {
    const onClick = vi.fn();
    render(<CrewCard {...makeProps({ onClick })} />);

    const card = screen.getByText('테스트 크루').closest('div');
    fireEvent.click(card as HTMLElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

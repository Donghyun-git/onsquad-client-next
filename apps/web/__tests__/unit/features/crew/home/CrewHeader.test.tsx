import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { CrewHeader } from '@/features/crew/home/ui/CrewHeader';

afterEach(() => cleanup());

vi.mock('@/shared/config', () => ({
  CREW_IMAGE_OVERLAY_CLASS: 'overlay',
}));

vi.mock('@/shared/config/paths', () => ({
  PATH: { crews: '/crews' },
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    base: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    xl: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

vi.mock('@/shared/ui/ui/button', () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));

const makeCrew = () => ({
  id: 1,
  name: '런닝크루',
  introduce: '함께 달려요',
  detail: '매주 토요일 아침 6시',
  imageUrl: '/images/crew.png',
  kakaoLink: 'https://open.kakao.com/test',
  hashtags: ['활발한' as const],
  memberCount: 10,
  owner: {
    id: 42,
    nickname: '홍길동',
    introduce: '안녕하세요',
    mbti: 'INFP' as const,
  },
});

describe('CrewHeader', () => {
  it('crew.name이 렌더링된다', () => {
    render(<CrewHeader crew={makeCrew()} />);

    expect(screen.getByText('런닝크루')).toBeDefined();
  });

  it('canManage=true이면 Settings 버튼이 렌더링된다', () => {
    render(<CrewHeader crew={makeCrew()} canManage={true} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('canManage=false이면 버튼이 렌더링되지 않는다', () => {
    render(<CrewHeader crew={makeCrew()} canManage={false} />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('crew가 undefined일 때 크래시 없이 렌더링된다', () => {
    expect(() => render(<CrewHeader crew={undefined} />)).not.toThrow();
  });
});

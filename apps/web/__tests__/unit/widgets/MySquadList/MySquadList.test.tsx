import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import MySquadList from '@/widgets/MySquadList/MySquadList';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Appbar', () => ({
  Appbar: () => <div data-testid="appbar" />,
}));

vi.mock('@/shared/ui/Text', () => ({
  Text: {
    lg: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    sm: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
    base: ({ children, className }: { children: React.ReactNode; className?: string }) => (
      <span className={className}>{children}</span>
    ),
  },
}));

vi.mock('@/widgets/MySquadList/MySquadCard', () => ({
  default: ({ squad }: { squad: { id: number; name: string } }) => (
    <div data-testid="my-squad-card">{squad.name}</div>
  ),
}));

describe('MySquadList', () => {
  it('"나의 스쿼드" 텍스트가 렌더링된다', () => {
    render(<MySquadList />);

    expect(screen.getByText('나의 스쿼드')).toBeDefined();
  });

  it('"총 3개" 텍스트가 렌더링된다', () => {
    render(<MySquadList />);

    expect(screen.getByText('총 3개')).toBeDefined();
  });

  it('첫 번째 스쿼드명 "기타 앙상블"이 렌더링된다', () => {
    render(<MySquadList />);

    expect(screen.getByText('기타 앙상블')).toBeDefined();
  });

  it('세 번째 스쿼드명 "드럼 비트메이킹"이 렌더링된다', () => {
    render(<MySquadList />);

    expect(screen.getByText('드럼 비트메이킹')).toBeDefined();
  });
});

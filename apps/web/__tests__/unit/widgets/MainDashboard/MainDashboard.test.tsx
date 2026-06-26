import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import MainDashboard from '@/widgets/MainDashboard/MainDashboard';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Article', () => ({
  Article: ({ slot }: { slot: React.ReactNode }) => <div data-testid="article">{slot}</div>,
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

vi.mock('@/shared/ui/ui/button', () => ({
  Button: ({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: string }) => (
    <button className={className} data-variant={variant}>
      {children}
    </button>
  ),
}));

describe('MainDashboard', () => {
  it('"크루 랭킹" heading이 렌더링된다', () => {
    render(<MainDashboard />);

    expect(screen.getByRole('heading', { name: '크루 랭킹' })).toBeDefined();
  });

  it('"크루에 합류하기" heading이 렌더링된다', () => {
    render(<MainDashboard />);

    expect(screen.getByRole('heading', { name: '크루에 합류하기' })).toBeDefined();
  });

  it('"크루 랭킹이 없습니다." 텍스트가 렌더링된다', () => {
    render(<MainDashboard />);

    expect(screen.getByText('크루 랭킹이 없습니다.')).toBeDefined();
  });

  it('"크루 개설하기" 버튼이 렌더링된다', () => {
    render(<MainDashboard />);

    expect(screen.getByRole('button', { name: '크루 개설하기' })).toBeDefined();
  });
});

import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

import { NotFound } from '@/widgets/NotFound';

afterEach(() => cleanup());

describe('NotFound', () => {
  it('안내 heading 이 렌더링된다', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: '페이지를 찾을 수 없어요' })).toBeDefined();
  });

  it('홈으로 가는 링크가 있다', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: '홈으로' });
    expect(link.getAttribute('href')).toBe('/');
  });
});

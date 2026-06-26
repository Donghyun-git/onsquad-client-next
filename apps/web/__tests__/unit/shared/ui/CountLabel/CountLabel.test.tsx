import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import CountLabel from '@/shared/ui/CountLabel/CountLabel';

afterEach(() => cleanup());

describe('CountLabel', () => {
  it('count=5 prop이 전달되면 "5" 텍스트가 렌더링된다', () => {
    render(<CountLabel count={5} />);

    expect(screen.getByText('5')).toBeDefined();
  });

  it('count prop이 없으면 기본값 "12"가 렌더링된다', () => {
    render(<CountLabel />);

    expect(screen.getByText('12')).toBeDefined();
  });
});

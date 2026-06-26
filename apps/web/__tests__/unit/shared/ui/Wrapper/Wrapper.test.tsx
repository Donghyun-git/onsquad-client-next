import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import Wrapper from '@/shared/ui/Wrapper/Wrapper';

afterEach(() => cleanup());

describe('Wrapper', () => {
  it('children이 렌더링된다', () => {
    render(<Wrapper>테스트 내용</Wrapper>);

    expect(screen.getByText('테스트 내용')).toBeDefined();
  });

  it('main 요소로 렌더링된다', () => {
    render(<Wrapper>내용</Wrapper>);

    expect(screen.getByRole('main')).toBeDefined();
  });
});

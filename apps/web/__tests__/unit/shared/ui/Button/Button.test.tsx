import { afterEach, describe, expect, it } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import { Button } from '@/shared/ui/Button/Button';

afterEach(() => cleanup());

describe('Button', () => {
  it('isLoading=false(기본값)일 때 children이 렌더링된다', () => {
    render(<Button>저장하기</Button>);

    expect(screen.getByText('저장하기')).toBeDefined();
  });

  it('isLoading=true일 때 children이 렌더링되지 않는다', () => {
    render(<Button isLoading={true}>저장하기</Button>);

    expect(screen.queryByText('저장하기')).toBeNull();
  });

  it('isLoading=true일 때 버튼이 disabled 상태이다', () => {
    render(<Button isLoading={true}>저장하기</Button>);

    const button = screen.getByRole('button');
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });
});

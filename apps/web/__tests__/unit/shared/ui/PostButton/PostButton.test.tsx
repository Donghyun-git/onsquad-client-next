import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import PostButton from '@/shared/ui/PostButton/PostButton';

afterEach(() => cleanup());

describe('PostButton', () => {
  it('children "글쓰기" 텍스트가 렌더링된다', () => {
    render(<PostButton onPageMove={vi.fn()}>글쓰기</PostButton>);

    expect(screen.getByText('글쓰기')).toBeDefined();
  });

  it('버튼을 클릭하면 onPageMove 콜백이 호출된다', () => {
    const onPageMove = vi.fn();
    render(<PostButton onPageMove={onPageMove}>글쓰기</PostButton>);

    fireEvent.click(screen.getByRole('button'));

    expect(onPageMove).toHaveBeenCalled();
  });

  it('버튼을 클릭하면 onPageMove가 정확히 1회 호출된다', () => {
    const onPageMove = vi.fn();
    render(<PostButton onPageMove={onPageMove}>글쓰기</PostButton>);

    fireEvent.click(screen.getByRole('button'));

    expect(onPageMove).toHaveBeenCalledTimes(1);
  });
});

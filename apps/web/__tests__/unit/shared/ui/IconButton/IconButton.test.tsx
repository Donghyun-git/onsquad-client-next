import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import IconButton from '@/shared/ui/IconButton/IconButton';

afterEach(() => cleanup());

describe('IconButton', () => {
  it('icon prop이 렌더링된다', () => {
    render(<IconButton icon={<span>아이콘</span>} />);

    expect(screen.getByText('아이콘')).toBeDefined();
  });

  it('children이 렌더링된다', () => {
    render(<IconButton icon={<span>아이콘</span>}>버튼 텍스트</IconButton>);

    expect(screen.getByText('버튼 텍스트')).toBeDefined();
  });

  it('클릭 시 onClick 콜백이 호출된다', () => {
    const onClick = vi.fn();
    render(<IconButton icon={<span>아이콘</span>} onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import LoginAlert from '@/shared/ui/LoginAlert/LoginAlert';

afterEach(() => cleanup());

vi.mock('@/shared/ui/Alert', () => ({
  Alert: ({
    isOpen,
    title,
    children,
    buttonSlot,
  }: {
    isOpen: boolean;
    title?: React.ReactNode;
    children: React.ReactNode;
    buttonSlot?: React.ReactNode;
  }) =>
    isOpen ? (
      <div>
        <h2>{title}</h2>
        {children}
        {buttonSlot}
      </div>
    ) : null,
}));

vi.mock('@/shared/lib/overlay', () => ({
  closeWithAnimation: vi.fn(),
}));

describe('LoginAlert', () => {
  const defaultProps = {
    isOpen: true,
    close: vi.fn(),
    unmount: vi.fn(),
  };

  it('isOpen=true이면 "로그인이 필요한 서비스에요." 제목이 렌더링된다', () => {
    render(<LoginAlert {...defaultProps} />);

    expect(screen.getByRole('heading', { name: '로그인이 필요한 서비스에요.' })).toBeDefined();
  });

  it('isOpen=true이면 "이전으로" 버튼이 렌더링된다', () => {
    render(<LoginAlert {...defaultProps} />);

    expect(screen.getByRole('button', { name: '이전으로' })).toBeDefined();
  });

  it('isOpen=true이면 "로그인" 버튼이 렌더링된다', () => {
    render(<LoginAlert {...defaultProps} />);

    expect(screen.getByRole('button', { name: '로그인' })).toBeDefined();
  });

  it('"이전으로" 버튼 클릭 시 closeWithAnimation이 호출된다', async () => {
    const { closeWithAnimation } = await import('@/shared/lib/overlay');

    render(<LoginAlert {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: '이전으로' }));

    expect(closeWithAnimation).toHaveBeenCalled();
  });
});

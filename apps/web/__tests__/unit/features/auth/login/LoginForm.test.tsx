import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import LoginForm from '@/features/auth/login/ui/LoginForm';

afterEach(() => cleanup());

vi.mock('@/shared/lib/hooks/useToast', () => ({
  useToast: () => ({
    toast: vi.fn(),
    hide: vi.fn(),
  }),
}));

describe('LoginForm', () => {
  it('이메일 input이 렌더링된다', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('이메일')).toBeDefined();
  });

  it('비밀번호 input이 렌더링된다', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('비밀번호')).toBeDefined();
  });

  it('"로그인" 버튼이 렌더링된다', () => {
    render(<LoginForm />);

    expect(screen.getByRole('button', { name: '로그인' })).toBeDefined();
  });

  it('"회원가입" 버튼이 렌더링된다', () => {
    render(<LoginForm />);

    expect(screen.getByRole('button', { name: '회원가입' })).toBeDefined();
  });
});

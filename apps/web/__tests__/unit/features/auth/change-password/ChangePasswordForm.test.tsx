import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, render, screen } from '@testing-library/react';

import ChangePasswordForm from '@/features/auth/change-password/ui/ChangePasswordForm';

afterEach(() => cleanup());

vi.mock('@/features/auth/change-password/model/useChangePasswordMutation', () => ({
  useChangePasswordMutation: () => ({
    mutateAsync: vi.fn().mockResolvedValue(undefined),
    isPending: false,
  }),
}));

describe('ChangePasswordForm', () => {
  it('"현재 비밀번호" input이 렌더링된다', () => {
    render(<ChangePasswordForm />);

    expect(screen.getByLabelText('현재 비밀번호')).toBeDefined();
  });

  it('"새로운 비밀번호" input이 렌더링된다', () => {
    render(<ChangePasswordForm />);

    expect(screen.getByLabelText('새로운 비밀번호')).toBeDefined();
  });

  it('"비밀번호 확인" input이 렌더링된다', () => {
    render(<ChangePasswordForm />);

    expect(screen.getByLabelText('비밀번호 확인')).toBeDefined();
  });

  it('"저장하기" 버튼이 렌더링된다', () => {
    render(<ChangePasswordForm />);

    expect(screen.getByRole('button', { name: '저장하기' })).toBeDefined();
  });
});

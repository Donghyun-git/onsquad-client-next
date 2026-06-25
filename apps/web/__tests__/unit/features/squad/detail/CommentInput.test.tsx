import { afterEach, describe, expect, it, vi } from 'vitest';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { CommentInput } from '@/features/squad/detail/ui/CommentInput';

afterEach(() => cleanup());

describe('CommentInput', () => {
  it('기본 placeholder "댓글을 입력해 보세요"가 표시된다', () => {
    render(<CommentInput onSubmit={vi.fn()} />);

    const input = screen.getByPlaceholderText('댓글을 입력해 보세요');
    expect(input).toBeDefined();
  });

  it('input이 비어있을 때 전송 버튼이 disabled 상태이다', () => {
    render(<CommentInput onSubmit={vi.fn()} />);

    const btn = screen.getByRole('button', { name: '전송' });
    expect((btn as HTMLButtonElement).disabled).toBe(true);
  });

  it('값을 입력하면 전송 버튼이 enabled 상태가 된다', () => {
    render(<CommentInput onSubmit={vi.fn()} />);

    const input = screen.getByPlaceholderText('댓글을 입력해 보세요');
    fireEvent.change(input, { target: { value: '테스트 댓글' } });

    const btn = screen.getByRole('button', { name: '전송' });
    expect((btn as HTMLButtonElement).disabled).toBe(false);
  });

  it('전송 버튼 클릭 시 onSubmit이 trimmed 값으로 호출되고 input이 초기화된다', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CommentInput onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('댓글을 입력해 보세요');
    fireEvent.change(input, { target: { value: '  안녕하세요  ' } });

    const btn = screen.getByRole('button', { name: '전송' });
    fireEvent.click(btn);

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('안녕하세요');
      expect((input as HTMLInputElement).value).toBe('');
    });
  });

  it('Enter 키 입력 시 onSubmit이 호출된다', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);

    render(<CommentInput onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('댓글을 입력해 보세요');
    fireEvent.change(input, { target: { value: '엔터 테스트' } });
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: false });

    await vi.waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('엔터 테스트');
    });
  });

  it('공백만 입력한 경우 전송 버튼 클릭 시 onSubmit이 호출되지 않는다', () => {
    const onSubmit = vi.fn();

    render(<CommentInput onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('댓글을 입력해 보세요');
    fireEvent.change(input, { target: { value: '   ' } });

    const btn = screen.getByRole('button', { name: '전송' });
    fireEvent.click(btn);

    expect(onSubmit).not.toHaveBeenCalled();
  });
});

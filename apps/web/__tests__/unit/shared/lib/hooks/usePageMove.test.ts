import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { describe, expect, it, vi } from 'vitest';

import { usePageMove } from '@/shared/lib/hooks/usePageMove';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('usePageMove', () => {
  it('handlePageMove를 반환한다', () => {
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });

    const { result } = renderHook(() => usePageMove());
    expect(typeof result.current.handlePageMove).toBe('function');
  });

  it('handlePageMove 호출 시 router.push가 지정 경로로 호출된다', () => {
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });

    const { result } = renderHook(() => usePageMove());
    result.current.handlePageMove('/crew/1');
    expect(mockPush).toHaveBeenCalledWith('/crew/1', { scroll: false });
  });

  it('scroll 옵션을 명시하면 그 값이 전달된다', () => {
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });

    const { result } = renderHook(() => usePageMove());
    result.current.handlePageMove('/home', { scroll: true });
    expect(mockPush).toHaveBeenCalledWith('/home', { scroll: true });
  });

  it('scroll 옵션 미전달 시 기본값 false로 호출된다', () => {
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });

    const { result } = renderHook(() => usePageMove());
    result.current.handlePageMove('/profile');
    expect(mockPush).toHaveBeenCalledWith('/profile', { scroll: false });
  });
});

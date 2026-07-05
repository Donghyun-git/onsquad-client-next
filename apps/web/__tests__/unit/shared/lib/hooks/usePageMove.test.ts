import { renderHook } from '@testing-library/react';
import { useTransitionRouter } from 'next-view-transitions';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { usePageMove } from '@/shared/lib/hooks/usePageMove';

vi.mock('next-view-transitions', () => ({
  useTransitionRouter: vi.fn(),
}));

describe('usePageMove', () => {
  const mockPush = vi.fn();
  const mockReplace = vi.fn();

  beforeEach(() => {
    mockPush.mockClear();
    mockReplace.mockClear();
    vi.mocked(useTransitionRouter).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  afterEach(() => {
    delete document.documentElement.dataset.vtDirection;
  });

  it('handlePageMove를 반환한다', () => {
    const { result } = renderHook(() => usePageMove());
    expect(typeof result.current.handlePageMove).toBe('function');
  });

  it('handlePageMove 호출 시 push가 지정 경로/scroll:false로 호출된다', () => {
    const { result } = renderHook(() => usePageMove());
    result.current.handlePageMove('/crews/1');
    expect(mockPush).toHaveBeenCalledWith('/crews/1', { scroll: false });
  });

  it('scroll 옵션을 명시하면 그 값이 전달된다', () => {
    const { result } = renderHook(() => usePageMove());
    result.current.handlePageMove('/home', { scroll: true });
    expect(mockPush).toHaveBeenCalledWith('/home', { scroll: true });
  });

  it('handlePageMove 호출 시 방향이 forward로 태깅된다', () => {
    const { result } = renderHook(() => usePageMove());
    result.current.handlePageMove('/crews/1');
    expect(document.documentElement.dataset.vtDirection).toBe('forward');
  });

  it('handleReplace 호출 시 replace가 지정 경로/scroll:false로 호출된다', () => {
    const { result } = renderHook(() => usePageMove());
    result.current.handleReplace('/crews/1');
    expect(mockReplace).toHaveBeenCalledWith('/crews/1', { scroll: false });
  });

  it('handleReplace 호출 시 방향이 forward로 태깅된다', () => {
    const { result } = renderHook(() => usePageMove());
    result.current.handleReplace('/crews/1');
    expect(document.documentElement.dataset.vtDirection).toBe('forward');
  });
});

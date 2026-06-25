import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { closeWithAnimation } from '@/shared/lib/overlay';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('closeWithAnimation', () => {
  it('close가 즉시 호출된다', () => {
    const close = vi.fn();
    const unmount = vi.fn();

    closeWithAnimation(close, unmount);

    expect(close).toHaveBeenCalledTimes(1);
  });

  it('unmount가 300ms 후 호출된다', () => {
    const close = vi.fn();
    const unmount = vi.fn();

    closeWithAnimation(close, unmount);

    expect(unmount).not.toHaveBeenCalled();
    vi.advanceTimersByTime(300);
    expect(unmount).toHaveBeenCalledTimes(1);
  });

  it('close가 undefined일 때 에러 없이 실행된다', () => {
    const unmount = vi.fn();

    expect(() => closeWithAnimation(undefined, unmount)).not.toThrow();
  });

  it('unmount가 undefined일 때 에러 없이 실행된다', () => {
    const close = vi.fn();

    expect(() => {
      closeWithAnimation(close, undefined);
      vi.advanceTimersByTime(300);
    }).not.toThrow();
  });

  it('300ms 이전에는 unmount가 호출되지 않는다', () => {
    const unmount = vi.fn();

    closeWithAnimation(undefined, unmount);

    vi.advanceTimersByTime(299);
    expect(unmount).not.toHaveBeenCalled();
  });
});

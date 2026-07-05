import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useSuppressViewTransitionAbort } from '@/shared/lib/hooks/useSuppressViewTransitionAbort';

afterEach(() => {
  cleanup();
});

const dispatchRejection = (reason: unknown) => {
  const event = new Event('unhandledrejection', { cancelable: true });
  Object.defineProperty(event, 'reason', { value: reason });
  window.dispatchEvent(event);

  return event;
};

describe('useSuppressViewTransitionAbort', () => {
  it('뷰 트랜지션 abort(InvalidStateError)는 preventDefault로 삼킨다', () => {
    renderHook(() => useSuppressViewTransitionAbort());

    const event = dispatchRejection({
      name: 'InvalidStateError',
      message: 'Transition was aborted because of invalid state',
    });

    expect(event.defaultPrevented).toBe(true);
  });

  it('무관한 rejection은 삼키지 않는다', () => {
    renderHook(() => useSuppressViewTransitionAbort());

    const event = dispatchRejection(new Error('boom'));

    expect(event.defaultPrevented).toBe(false);
  });

  it('언마운트 후에는 반응하지 않는다', () => {
    const { unmount } = renderHook(() => useSuppressViewTransitionAbort());
    unmount();

    const event = dispatchRejection({
      name: 'InvalidStateError',
      message: 'Transition was aborted because of invalid state',
    });

    expect(event.defaultPrevented).toBe(false);
  });
});

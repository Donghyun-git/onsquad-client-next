import { describe, expect, it } from 'vitest';

import { isViewTransitionAbort } from '@/shared/lib/utils/viewTransition';

describe('isViewTransitionAbort', () => {
  it('InvalidStateError + transition 메시지면 true (스킵된 트랜지션)', () => {
    const reason = { name: 'InvalidStateError', message: 'Transition was aborted because of invalid state' };

    expect(isViewTransitionAbort(reason)).toBe(true);
  });

  it('탭 hidden으로 스킵된 InvalidStateError도 true', () => {
    const reason = {
      name: 'InvalidStateError',
      message: 'View transition was skipped because document visibility state is hidden',
    };

    expect(isViewTransitionAbort(reason)).toBe(true);
  });

  it('InvalidStateError지만 트랜지션과 무관한 메시지는 false', () => {
    const reason = { name: 'InvalidStateError', message: 'The object is in an invalid state' };

    expect(isViewTransitionAbort(reason)).toBe(false);
  });

  it('다른 에러 이름이면 false', () => {
    const reason = { name: 'TypeError', message: 'transition failed' };

    expect(isViewTransitionAbort(reason)).toBe(false);
  });

  it('객체가 아니면 false', () => {
    expect(isViewTransitionAbort(null)).toBe(false);
    expect(isViewTransitionAbort(undefined)).toBe(false);
    expect(isViewTransitionAbort('InvalidStateError')).toBe(false);
  });
});

import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useNavDirectionTracker } from '@/shared/lib/hooks/useNavDirectionTracker';

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.vtDirection;
});

describe('useNavDirectionTracker', () => {
  it('popstate 발생 시 방향이 back으로 태깅된다', () => {
    renderHook(() => useNavDirectionTracker());

    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(document.documentElement.dataset.vtDirection).toBe('back');
  });

  it('언마운트 후에는 popstate에 반응하지 않는다', () => {
    const { unmount } = renderHook(() => useNavDirectionTracker());
    unmount();
    document.documentElement.dataset.vtDirection = 'forward';

    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(document.documentElement.dataset.vtDirection).toBe('forward');
  });
});

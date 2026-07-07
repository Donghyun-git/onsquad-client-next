import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useNavDirectionTracker } from '@/shared/lib/hooks/useNavDirectionTracker';
import { markIntentionalBack } from '@/shared/lib/utils/navDirection';

afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.vtDirection;
});

describe('useNavDirectionTracker', () => {
  it('window(네이티브 제스처) 뒤로가기 popstate는 back으로 태깅된다(CSS 슬라이드로 이전 페이지 노출)', () => {
    renderHook(() => useNavDirectionTracker());

    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(document.documentElement.dataset.vtDirection).toBe('back');
  });

  it('의도적 뒤로가기(markIntentionalBack) 직후 popstate도 back으로 태깅된다', () => {
    renderHook(() => useNavDirectionTracker());

    markIntentionalBack();
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

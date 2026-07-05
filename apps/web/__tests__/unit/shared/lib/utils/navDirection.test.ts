import { afterEach, describe, expect, it } from 'vitest';

import { resolveTabDirection, setNavDirection } from '@/shared/lib/utils/navDirection';

afterEach(() => {
  delete document.documentElement.dataset.vtDirection;
});

describe('resolveTabDirection', () => {
  it('오른쪽 탭(더 큰 인덱스)으로 이동하면 forward', () => {
    expect(resolveTabDirection(0, 1)).toBe('forward');
  });

  it('왼쪽 탭(더 작은 인덱스)으로 이동하면 back', () => {
    expect(resolveTabDirection(1, 0)).toBe('back');
  });

  it('같은 탭이면 null', () => {
    expect(resolveTabDirection(1, 1)).toBeNull();
  });
});

describe('setNavDirection', () => {
  it("'forward'를 설정하면 data-vt-direction이 forward가 된다", () => {
    setNavDirection('forward');
    expect(document.documentElement.dataset.vtDirection).toBe('forward');
  });

  it("'back'을 설정하면 data-vt-direction이 back이 된다", () => {
    setNavDirection('back');
    expect(document.documentElement.dataset.vtDirection).toBe('back');
  });
});

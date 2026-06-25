import { describe, expect, it } from 'vitest';

import { cn } from '@/shared/lib/utils';

describe('cn', () => {
  it('단일 클래스를 그대로 반환한다', () => {
    expect(cn('px-4')).toBe('px-4');
  });

  it('여러 클래스를 병합한다', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('Tailwind 충돌 클래스는 뒤의 것으로 덮어쓴다', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('falsy 값(undefined, false, null)은 무시한다', () => {
    expect(cn('px-4', undefined, false, null)).toBe('px-4');
  });

  it('조건부 클래스를 처리한다', () => {
    expect(cn('base', { active: true, disabled: false })).toBe('base active');
  });
});

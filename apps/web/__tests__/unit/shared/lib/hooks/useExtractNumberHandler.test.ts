import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useExtractNumberHandler } from '@/shared/lib/hooks/useExtractNumberHandler';

describe('useExtractNumberHandler', () => {
  const createEvent = (value: string) =>
    ({
      currentTarget: { value } as HTMLInputElement,
    }) as React.ChangeEvent<HTMLInputElement>;

  it('훅이 ChangeEventHandler를 반환한다', () => {
    const { result } = renderHook(() => useExtractNumberHandler<HTMLInputElement>());
    expect(typeof result.current).toBe('function');
  });

  it('문자열에서 숫자만 남기고 currentTarget.value를 갱신한다', () => {
    const { result } = renderHook(() => useExtractNumberHandler<HTMLInputElement>());
    const event = createEvent('abc123');
    result.current(event);
    expect(event.currentTarget.value).toBe('123');
  });

  it('숫자가 없으면 currentTarget.value를 빈 문자열로 갱신한다', () => {
    const { result } = renderHook(() => useExtractNumberHandler<HTMLInputElement>());
    const event = createEvent('abc');
    result.current(event);
    expect(event.currentTarget.value).toBe('');
  });

  it('이미 숫자만 있으면 그대로 유지한다', () => {
    const { result } = renderHook(() => useExtractNumberHandler<HTMLInputElement>());
    const event = createEvent('12345');
    result.current(event);
    expect(event.currentTarget.value).toBe('12345');
  });
});

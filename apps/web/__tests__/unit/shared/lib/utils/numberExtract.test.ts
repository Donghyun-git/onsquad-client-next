import { describe, expect, it } from 'vitest';

import { numberExtract } from '@/shared/lib/utils/numberExtract';

describe('numberExtract', () => {
  it('문자열에서 숫자만 추출한다', () => {
    expect(numberExtract('abc123def456')).toBe('123456');
  });

  it('숫자만 있는 문자열은 그대로 반환한다', () => {
    expect(numberExtract('12345')).toBe('12345');
  });

  it('빈 문자열은 빈 문자열을 반환한다', () => {
    expect(numberExtract('')).toBe('');
  });

  it('숫자가 없는 문자열은 빈 문자열을 반환한다', () => {
    expect(numberExtract('abc')).toBe('');
  });

  it('혼합 문자열에서 숫자 순서를 유지한다', () => {
    expect(numberExtract('1a2b3c')).toBe('123');
  });
});

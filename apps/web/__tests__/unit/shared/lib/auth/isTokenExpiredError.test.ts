import { describe, expect, it } from 'vitest';

import { isTokenExpiredError } from '@/shared/lib/auth/handleTokenExpiration';

describe('isTokenExpiredError', () => {
  it('code가 T003인 객체는 true를 반환한다', () => {
    expect(isTokenExpiredError({ code: 'T003' })).toBe(true);
  });

  it('code가 다른 값이면 false를 반환한다', () => {
    expect(isTokenExpiredError({ code: 'CRM001' })).toBe(false);
  });

  it('null이면 false를 반환한다', () => {
    expect(isTokenExpiredError(null)).toBe(false);
  });

  it('문자열이면 false를 반환한다', () => {
    expect(isTokenExpiredError('T003')).toBe(false);
  });

  it('code 필드가 없는 객체이면 false를 반환한다', () => {
    expect(isTokenExpiredError({ message: 'error' })).toBe(false);
  });
});

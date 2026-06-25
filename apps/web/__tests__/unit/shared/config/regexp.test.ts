import { describe, expect, it } from 'vitest';

import { LOGIN_REGEXP } from '@/shared/config/regexp';

describe('LOGIN_REGEXP', () => {
  describe('email', () => {
    it('유효한 이메일 형식은 match된다', () => {
      expect(LOGIN_REGEXP.email.test('user@example.com')).toBe(true);
    });

    it('@가 없는 문자열은 match되지 않는다', () => {
      expect(LOGIN_REGEXP.email.test('invalid-email')).toBe(false);
    });

    it('로컬 파트가 없는 이메일은 match되지 않는다', () => {
      expect(LOGIN_REGEXP.email.test('@missing-local.com')).toBe(false);
    });

    it('도메인 점 뒤에 TLD가 없는 이메일은 match되지 않는다', () => {
      expect(LOGIN_REGEXP.email.test('user@.com')).toBe(false);
    });
  });

  describe('password', () => {
    it('영문+숫자+특수문자 9자 조합은 match된다', () => {
      expect(LOGIN_REGEXP.password.test('Abc123!@#')).toBe(true);
    });

    it('7자 이하 비밀번호는 match되지 않는다', () => {
      expect(LOGIN_REGEXP.password.test('abc123!')).toBe(false);
    });

    it('대문자+숫자+특수문자 9자 조합은 match된다', () => {
      expect(LOGIN_REGEXP.password.test('ABCDEFG1!')).toBe(true);
    });

    it('특수문자가 없는 비밀번호는 match되지 않는다', () => {
      expect(LOGIN_REGEXP.password.test('abcdefgh1')).toBe(false);
    });

    it('숫자가 없는 비밀번호는 match되지 않는다', () => {
      expect(LOGIN_REGEXP.password.test('Abc!@#$%')).toBe(false);
    });
  });
});

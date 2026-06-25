import { describe, expect, it } from 'vitest';

import { loginSchema } from '@/features/auth/login/ui/validator';

const validLogin = {
  email: 'test@example.com',
  password: 'Password1!',
};

describe('loginSchema', () => {
  it('유효한 입력은 검증을 통과한다', async () => {
    await expect(loginSchema.validate(validLogin)).resolves.toEqual(validLogin);
  });

  describe('email 필드', () => {
    it('이메일이 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        loginSchema.validate({ ...validLogin, email: '' }),
      ).rejects.toMatchObject({ message: '이메일을 입력해주세요.' });
    });

    it('이메일 형식이 올바르지 않으면 에러가 발생한다', async () => {
      await expect(
        loginSchema.validate({ ...validLogin, email: 'invalid-email' }),
      ).rejects.toMatchObject({ message: '이메일 형식에 맞지 않습니다.' });
    });

    it('@가 없는 이메일이면 에러가 발생한다', async () => {
      await expect(
        loginSchema.validate({ ...validLogin, email: 'testexample.com' }),
      ).rejects.toMatchObject({ message: '이메일 형식에 맞지 않습니다.' });
    });
  });

  describe('password 필드', () => {
    it('패스워드가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        loginSchema.validate({ ...validLogin, password: '' }),
      ).rejects.toMatchObject({ message: '패스워드를 입력해주세요.' });
    });

    it('특수문자가 없는 패스워드는 에러가 발생한다', async () => {
      await expect(
        loginSchema.validate({ ...validLogin, password: 'Password1' }),
      ).rejects.toMatchObject({
        message: '패스워드는 영문, 숫자, 특수문자를 포함한 8자 이상입니다.',
      });
    });

    it('8자 미만 패스워드는 에러가 발생한다', async () => {
      await expect(
        loginSchema.validate({ ...validLogin, password: 'Pw1!' }),
      ).rejects.toMatchObject({
        message: '패스워드는 영문, 숫자, 특수문자를 포함한 8자 이상입니다.',
      });
    });

    it('숫자가 없는 패스워드는 에러가 발생한다', async () => {
      await expect(
        loginSchema.validate({ ...validLogin, password: 'Password!' }),
      ).rejects.toMatchObject({
        message: '패스워드는 영문, 숫자, 특수문자를 포함한 8자 이상입니다.',
      });
    });
  });
});

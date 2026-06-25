import { describe, expect, it } from 'vitest';

import { joinSchema } from '@/features/auth/join/ui/validator';

const validJoin = {
  email: 'test@example.com',
  authCode: '12345678',
  password: 'Password1!',
  passwordConfirm: 'Password1!',
  nickname: '테스트유저',
  address: '서울시 강남구',
  addressDetail: '101호',
};

describe('joinSchema', () => {
  it('유효한 입력은 검증을 통과한다', async () => {
    await expect(joinSchema.validate(validJoin)).resolves.toBeDefined();
  });

  it('addressDetail이 없어도 검증을 통과한다', async () => {
    const { addressDetail: _, ...withoutDetail } = validJoin;
    await expect(joinSchema.validate(withoutDetail)).resolves.toBeDefined();
  });

  describe('email 필드', () => {
    it('이메일이 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, email: '' }),
      ).rejects.toMatchObject({ message: '이메일을 입력해주세요,' });
    });

    it('이메일 형식이 올바르지 않으면 에러가 발생한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, email: 'invalid-email' }),
      ).rejects.toMatchObject({ message: '이메일 형식에 맞지 않습니다.' });
    });
  });

  describe('authCode 필드', () => {
    it('인증코드가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, authCode: '' }),
      ).rejects.toMatchObject({ message: '이메일 인증을 진행해주세요.' });
    });

    it('인증코드가 8자 미만이면 에러가 발생한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, authCode: '1234567' }),
      ).rejects.toMatchObject({ message: '인증번호는 최소 8자리입니다.' });
    });

    it('인증코드가 정확히 8자이면 통과한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, authCode: '12345678' }),
      ).resolves.toBeDefined();
    });
  });

  describe('password 필드', () => {
    it('비밀번호가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        joinSchema.validateAt('password', { ...validJoin, password: '' }),
      ).rejects.toMatchObject({ message: '비밀번호를 입력해주세요.' });
    });

    it('비밀번호가 패턴에 맞지 않으면 에러가 발생한다', async () => {
      await expect(
        joinSchema.validateAt('password', { ...validJoin, password: 'password1' }),
      ).rejects.toMatchObject({
        message: '영문, 숫자, 특수문자 1자를 포함한 8자리 이상입니다.',
      });
    });
  });

  describe('passwordConfirm 필드', () => {
    it('비밀번호 확인이 비어있으면 불일치 에러가 발생한다', async () => {
      await expect(
        joinSchema.validateAt('passwordConfirm', { ...validJoin, passwordConfirm: '' }),
      ).rejects.toMatchObject({ message: '비밀번호가 일치하지 않습니다.' });
    });

    it('비밀번호와 비밀번호 확인이 다르면 에러가 발생한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, passwordConfirm: 'Different1!' }),
      ).rejects.toMatchObject({ message: '비밀번호가 일치하지 않습니다.' });
    });
  });

  describe('nickname 필드', () => {
    it('닉네임이 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, nickname: '' }),
      ).rejects.toMatchObject({ message: '닉네임을 입력해주세요.' });
    });
  });

  describe('address 필드', () => {
    it('주소가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        joinSchema.validate({ ...validJoin, address: '' }),
      ).rejects.toMatchObject({ message: '주소를 검색해주세요.' });
    });
  });
});

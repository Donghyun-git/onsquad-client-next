import { describe, expect, it } from 'vitest';

import { changePasswordSchema } from '@/features/auth/change-password/model/changePasswordSchema';

const validChange = {
  currentPassword: 'Current1!',
  newPassword: 'NewPass1!',
  newPasswordConfirm: 'NewPass1!',
};

describe('changePasswordSchema', () => {
  it('유효한 입력은 검증을 통과한다', async () => {
    await expect(changePasswordSchema.validate(validChange)).resolves.toEqual(validChange);
  });

  describe('currentPassword 필드', () => {
    it('현재 비밀번호가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        changePasswordSchema.validate({ ...validChange, currentPassword: '' }),
      ).rejects.toMatchObject({ message: '현재 비밀번호를 입력해주세요.' });
    });

    it('현재 비밀번호가 패턴에 맞지 않으면 에러가 발생한다', async () => {
      await expect(
        changePasswordSchema.validate({ ...validChange, currentPassword: 'password1' }),
      ).rejects.toMatchObject({
        message: '영문, 숫자, 특수문자 1자를 포함한 8자리 이상입니다.',
      });
    });
  });

  describe('newPassword 필드', () => {
    it('새 비밀번호가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        changePasswordSchema.validateAt('newPassword', { ...validChange, newPassword: '' }),
      ).rejects.toMatchObject({ message: '새로운 비밀번호를 입력해주세요.' });
    });

    it('새 비밀번호가 패턴에 맞지 않으면 에러가 발생한다', async () => {
      await expect(
        changePasswordSchema.validateAt('newPassword', {
          ...validChange,
          newPassword: 'password1',
        }),
      ).rejects.toMatchObject({
        message: '영문, 숫자, 특수문자 1자를 포함한 8자리 이상입니다.',
      });
    });
  });

  describe('newPasswordConfirm 필드', () => {
    it('새 비밀번호 확인이 비어있으면 불일치 에러가 발생한다', async () => {
      await expect(
        changePasswordSchema.validateAt('newPasswordConfirm', {
          ...validChange,
          newPasswordConfirm: '',
        }),
      ).rejects.toMatchObject({ message: '비밀번호가 일치하지 않습니다.' });
    });

    it('newPassword와 newPasswordConfirm이 다르면 에러가 발생한다', async () => {
      await expect(
        changePasswordSchema.validate({ ...validChange, newPasswordConfirm: 'Different1!' }),
      ).rejects.toMatchObject({ message: '비밀번호가 일치하지 않습니다.' });
    });
  });
});

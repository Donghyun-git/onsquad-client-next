import { describe, expect, it } from 'vitest';

import { profileSchema } from '@/features/auth/profile/model/profileSchema';

const validProfile = {
  nickname: '테스트유저',
  introduce: '안녕하세요, 테스트 유저입니다.',
  kakaoLink: 'https://open.kakao.com/test',
  mbti: 'ISTJ',
  address: '서울시 강남구',
  addressDetail: '101호',
};

describe('profileSchema', () => {
  it('유효한 입력은 검증을 통과한다', async () => {
    await expect(profileSchema.validate(validProfile)).resolves.toBeDefined();
  });

  it('addressDetail이 없어도 검증을 통과한다', async () => {
    const { addressDetail: _, ...withoutDetail } = validProfile;
    await expect(profileSchema.validate(withoutDetail)).resolves.toBeDefined();
  });

  it('profileImage가 없어도 검증을 통과한다', async () => {
    await expect(
      profileSchema.validate({ ...validProfile, profileImage: undefined }),
    ).resolves.toBeDefined();
  });

  it('profileImageFile이 없어도 검증을 통과한다', async () => {
    await expect(
      profileSchema.validate({ ...validProfile, profileImageFile: undefined }),
    ).resolves.toBeDefined();
  });

  describe('nickname 필드', () => {
    it('닉네임이 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        profileSchema.validate({ ...validProfile, nickname: '' }),
      ).rejects.toMatchObject({ message: '닉네임을 입력해주세요.' });
    });
  });

  describe('introduce 필드', () => {
    it('소개가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        profileSchema.validate({ ...validProfile, introduce: '' }),
      ).rejects.toMatchObject({ message: '멋진 소개를 입력해주세요.' });
    });
  });

  describe('kakaoLink 필드', () => {
    it('카카오 링크가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        profileSchema.validate({ ...validProfile, kakaoLink: '' }),
      ).rejects.toMatchObject({ message: '오픈 카톡 프로필 링크를 입력해주세요.' });
    });
  });

  describe('mbti 필드', () => {
    it('유효한 MBTI 값이면 통과한다', async () => {
      await expect(
        profileSchema.validate({ ...validProfile, mbti: 'INFP' }),
      ).resolves.toBeDefined();
    });

    it('유효하지 않은 MBTI 값이면 에러가 발생한다', async () => {
      await expect(
        profileSchema.validate({ ...validProfile, mbti: 'XXXX' }),
      ).rejects.toMatchObject({ message: expect.stringContaining('must be one of') });
    });

    it('MBTI가 undefined이면 required 에러가 발생한다', async () => {
      await expect(
        profileSchema.validate({ ...validProfile, mbti: undefined }),
      ).rejects.toMatchObject({ message: 'MBTI를 선택해주세요.' });
    });
  });

  describe('address 필드', () => {
    it('주소가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        profileSchema.validate({ ...validProfile, address: '' }),
      ).rejects.toMatchObject({ message: '주소를 입력해주세요.' });
    });
  });
});

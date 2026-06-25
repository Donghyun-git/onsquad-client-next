import { describe, expect, it } from 'vitest';

import { addCrewSchema } from '@/features/crew/new/ui/validator';

const validCrew = {
  name: '테스트 크루',
  introduce: '크루 소개입니다.',
  detail: '크루 상세 정보입니다.',
  kakaoLink: 'https://open.kakao.com/test',
  hashtags: ['활발한'],
  file: null,
};

describe('addCrewSchema', () => {
  it('유효한 입력은 검증을 통과한다', async () => {
    await expect(addCrewSchema.validate(validCrew)).resolves.toBeDefined();
  });

  describe('name 필드', () => {
    it('name이 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, name: '' }),
      ).rejects.toMatchObject({ message: '사용하실 크루 이름을 입력해주세요.' });
    });

    it('name이 15자를 초과하면 max 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, name: '가'.repeat(16) }),
      ).rejects.toMatchObject({ message: '크루 이름은 최대 15자 입니다.' });
    });

    it('name이 정확히 15자이면 통과한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, name: '가'.repeat(15) }),
      ).resolves.toBeDefined();
    });
  });

  describe('introduce 필드', () => {
    it('introduce가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, introduce: '' }),
      ).rejects.toMatchObject({ message: '크루의 멋진 소개를 적어주세요.' });
    });

    it('introduce가 150자를 초과하면 max 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, introduce: '가'.repeat(151) }),
      ).rejects.toMatchObject({ message: '크루소개는 최대 150자로 입력해주세요.' });
    });

    it('introduce가 정확히 150자이면 통과한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, introduce: '가'.repeat(150) }),
      ).resolves.toBeDefined();
    });
  });

  describe('detail 필드', () => {
    it('detail이 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, detail: '' }),
      ).rejects.toMatchObject({ message: '신청자가 볼 크루에 대한 정보를 알려주세요.' });
    });

    it('detail이 150자를 초과하면 max 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, detail: '가'.repeat(151) }),
      ).rejects.toMatchObject({ message: '크루 상세정보는 최대 150자로 입력해주세요.' });
    });

    it('detail이 정확히 150자이면 통과한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, detail: '가'.repeat(150) }),
      ).resolves.toBeDefined();
    });
  });

  describe('kakaoLink 필드', () => {
    it('kakaoLink가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, kakaoLink: '' }),
      ).rejects.toMatchObject({ message: '소통방 링크를 입력해주세요.' });
    });

    it('kakaoLink가 URL 형식이 아니면 matches 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, kakaoLink: 'not-a-url' }),
      ).rejects.toMatchObject({ message: '유효한 URL을 입력해주세요.' });
    });

    it('http로 시작하는 URL도 통과한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, kakaoLink: 'http://open.kakao.com/test' }),
      ).resolves.toBeDefined();
    });
  });

  describe('hashtags 필드', () => {
    it('hashtags가 빈 배열이면 min 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, hashtags: [] }),
      ).rejects.toMatchObject({ message: '최소 1개의 해시태그가 필요합니다.' });
    });

    it('hashtags가 5개를 초과하면 max 에러가 발생한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, hashtags: ['a', 'b', 'c', 'd', 'e', 'f'] }),
      ).rejects.toMatchObject({ message: '해시태그는 최대 5개입니다.' });
    });

    it('hashtags가 정확히 5개이면 통과한다', async () => {
      await expect(
        addCrewSchema.validate({ ...validCrew, hashtags: ['a', 'b', 'c', 'd', 'e'] }),
      ).resolves.toBeDefined();
    });
  });
});

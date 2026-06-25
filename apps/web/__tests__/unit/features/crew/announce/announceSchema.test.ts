import { describe, expect, it } from 'vitest';

import { announceSchema } from '@/features/crew/announce/model/announceSchema';

const validAnnounce = {
  title: '공지사항 제목',
  content: '공지사항 내용입니다.',
};

describe('announceSchema', () => {
  it('유효한 입력은 검증을 통과한다', async () => {
    await expect(announceSchema.validate(validAnnounce)).resolves.toBeDefined();
  });

  describe('title 필드', () => {
    it('title이 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        announceSchema.validate({ ...validAnnounce, title: '' }),
      ).rejects.toMatchObject({ message: '제목을 입력해주세요.' });
    });
  });

  describe('content 필드', () => {
    it('content가 비어있으면 required 에러가 발생한다', async () => {
      await expect(
        announceSchema.validate({ ...validAnnounce, content: '' }),
      ).rejects.toMatchObject({ message: '공지사항 내용을 입력해주세요.' });
    });
  });
});

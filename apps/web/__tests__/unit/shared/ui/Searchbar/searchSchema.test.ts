import * as yup from 'yup';
import { describe, expect, it } from 'vitest';

import { searchSchema } from '@/shared/ui/Searchbar/validator';

describe('searchSchema', () => {
  it('2자 이상 검색어는 유효성 검사를 통과한다', async () => {
    await expect(searchSchema.validate({ search: '검색어' })).resolves.toBeDefined();
  });

  it('빈 문자열은 "검색어를 입력해주세요." 오류가 발생한다', async () => {
    await expect(searchSchema.validate({ search: '' })).rejects.toMatchObject({
      message: '검색어를 입력해주세요.',
    });
  });

  it('1자 검색어는 "검색어는 최소 2자 이상 입력해주세요." 오류가 발생한다', async () => {
    await expect(searchSchema.validate({ search: '검' })).rejects.toMatchObject({
      message: '검색어는 최소 2자 이상 입력해주세요.',
    });
  });

  it('정확히 2자 검색어는 유효성 검사를 통과한다 (경계값)', async () => {
    await expect(searchSchema.validate({ search: '검색' })).resolves.toBeDefined();
  });
});

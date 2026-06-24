import { describe, expect, it } from 'vitest';

import { getUpdateProfileCleansingData } from '@/features/auth/profile/lib/getUpdateProfileCleansingData';

describe('getUpdateProfileCleansingData', () => {
  it('모든 필드가 있을 때 그대로 반환한다', () => {
    const input = {
      nickname: '홍길동',
      introduce: '안녕하세요',
      mbti: 'INFP' as const,
      kakaoLink: 'https://open.kakao.com/test',
      address: '서울시',
      addressDetail: '강남구',
    };
    expect(getUpdateProfileCleansingData(input)).toEqual(input);
  });

  it('undefined 필드는 빈 문자열로 채운다', () => {
    const result = getUpdateProfileCleansingData({});
    expect(result).toEqual({
      nickname: '',
      introduce: '',
      mbti: '',
      kakaoLink: '',
      address: '',
      addressDetail: '',
    });
  });

  it('일부 필드만 있을 때 나머지는 빈 문자열이다', () => {
    const result = getUpdateProfileCleansingData({ nickname: '김철수', address: '부산시' });
    expect(result.nickname).toBe('김철수');
    expect(result.address).toBe('부산시');
    expect(result.introduce).toBe('');
    expect(result.kakaoLink).toBe('');
  });
});

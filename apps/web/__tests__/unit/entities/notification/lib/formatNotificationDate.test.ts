import { describe, expect, it } from 'vitest';

import { formatNotificationDate } from '@/entities/notification/lib/formatNotificationDate';

describe('formatNotificationDate', () => {
  it('ISO 날짜 문자열을 YYYY.MM.DD 형식으로 변환한다', () => {
    expect(formatNotificationDate('2024-03-15T10:30:00Z')).toBe('2024.03.15');
  });

  it('월과 일이 한 자리일 때 0으로 패딩한다', () => {
    expect(formatNotificationDate('2024-01-05T01:00:00Z')).toBe('2024.01.05');
  });

  it('연말 날짜를 올바르게 변환한다', () => {
    // 로컬 타임존(KST +9) 기준으로 날짜가 결정되므로
    // UTC 12:00은 모든 타임존에서 동일한 날짜를 보장한다
    expect(formatNotificationDate('2024-12-31T12:00:00Z')).toBe('2024.12.31');
  });

  it('Invalid Date 문자열은 원본을 반환한다', () => {
    expect(formatNotificationDate('not-a-date')).toBe('not-a-date');
  });
});

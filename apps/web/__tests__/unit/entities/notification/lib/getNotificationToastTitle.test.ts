import { describe, expect, it } from 'vitest';

import { getNotificationToastTitle } from '@/entities/notification/lib/getNotificationToastTitle';
import type { NotificationMessage } from '@/entities/notification';

const makeNotification = (payload?: NotificationMessage['payload']): NotificationMessage => ({
  topic: 'USER',
  detail: 'CREW_REQUEST',
  payload,
});

describe('getNotificationToastTitle', () => {
  it('payload.message가 있으면 해당 문자열을 반환한다', () => {
    const noti = makeNotification({ message: '홍길동 님이 크루 합류를 신청했습니다.' });
    expect(getNotificationToastTitle(noti)).toBe('홍길동 님이 크루 합류를 신청했습니다.');
  });

  it('payload.message가 공백만 있으면 null을 반환한다', () => {
    const noti = makeNotification({ message: '   ' });
    expect(getNotificationToastTitle(noti)).toBeNull();
  });

  it('payload.message가 undefined이면 null을 반환한다', () => {
    const noti = makeNotification({});
    expect(getNotificationToastTitle(noti)).toBeNull();
  });

  it('payload 자체가 없으면 null을 반환한다', () => {
    const noti = makeNotification(undefined);
    expect(getNotificationToastTitle(noti)).toBeNull();
  });
});

import { describe, expect, it, vi } from 'vitest';

import { notificationQueries } from '@/entities/notification/api/notification.queries';

vi.mock('@/shared/api/notification', () => ({
  notificationListGetFetch: vi.fn(),
}));

describe('notificationQueries', () => {
  describe('root', () => {
    it('root()는 ["notification"]을 반환한다', () => {
      expect(notificationQueries.root()).toEqual(['notification']);
    });
  });

  describe('infiniteList', () => {
    it('queryKey에 ["notification", "infinite", { size: 10 }]가 포함된다', () => {
      const opts = notificationQueries.infiniteList();
      expect(opts.queryKey).toEqual(['notification', 'infinite', { size: 10 }]);
    });

    it('initialPageParam이 0이다', () => {
      const opts = notificationQueries.infiniteList();
      expect(opts.initialPageParam).toBe(0);
    });
  });
});

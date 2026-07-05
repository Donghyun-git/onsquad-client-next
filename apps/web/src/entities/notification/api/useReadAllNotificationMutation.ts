import { notificationReadAllPatchFetch } from './notificationReadAllPatchFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

import { notificationQueries } from './notification.queries';

/**
 * 알림 전체 읽음 처리
 * - 성공 시 알림 목록 갱신(읽음/안읽음 표시 반영)
 */
export const useReadAllNotificationMutation = () =>
  useApiMutation({
    fetcher: () => notificationReadAllPatchFetch(),
    invalidateKey: notificationQueries.root(),
  });

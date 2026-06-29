import { notificationReadPatchFetch } from '@/shared/api/notification';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

import { notificationQueries } from './notification.queries';

/**
 * 알림 단건 읽음 처리
 * - 성공 시 알림 목록 갱신(읽음/안읽음 표시 반영)
 */
export const useReadNotificationMutation = () =>
  useApiMutation({
    fetcher: (notificationId: number) => notificationReadPatchFetch({ notificationId }),
    invalidateKey: notificationQueries.root(),
  });

import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export type NotificationReadAllPatchFetchResponseProps = ResponseModel;

/**
 * 알림 전체 읽음 처리
 * - PATCH /api/notifications/read-all
 */
export const notificationReadAllPatchFetch = () =>
  apiFetch.patch<NotificationReadAllPatchFetchResponseProps>('/notifications/read-all');

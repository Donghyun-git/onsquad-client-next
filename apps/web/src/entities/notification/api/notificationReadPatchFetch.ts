import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface NotificationReadPatchFetchParams {
  /** 읽음 처리할 알림 id */
  notificationId: number;
}

export type NotificationReadPatchFetchResponseProps = ResponseModel;

/**
 * 알림 단건 읽음 처리
 * - PATCH /api/notifications/{notificationId}/read
 */
export const notificationReadPatchFetch = ({ notificationId }: NotificationReadPatchFetchParams) =>
  apiFetch.patch<NotificationReadPatchFetchResponseProps>(`/notifications/${notificationId}/read`);

import type { NotificationListItem } from '../types/notification.types';

import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface NotificationListGetFetchParams {
  /** 페이지 번호 (0부터 시작) */
  page?: number;
  /** 한 페이지당 개수 */
  size?: number;
}

export interface NotificationListGetFetchResponseProps extends ResponseModel {
  data: {
    /** 한 페이지당 개수 */
    size: number;
    /** 현재 페이지 */
    page: number;
    /** 전체 페이지 수 */
    totalPages: number;
    /** 전체 개수 */
    totalCount: number;
    /** 현재 결과 개수 */
    resultsSize: number;
    /** 알림 목록 */
    results: NotificationListItem[];
  };
}

/**
 * 내 알림 목록 조회
 * - GET /api/members/me/notifications
 */
export const notificationListGetFetch = ({ page, size }: NotificationListGetFetchParams = {}) => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));
  const query = params.toString();

  return apiFetch.get<NotificationListGetFetchResponseProps>(`/members/me/notifications${query ? `?${query}` : ''}`);
};

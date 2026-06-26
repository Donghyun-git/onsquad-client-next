import { HttpResponse, http } from 'msw';

import type { NotificationListGetFetchResponseProps } from '@/shared/api/notification';
import type { NotificationListItem } from '@/shared/types/notification.types';

const BASE = 'http://localhost/api/bff';

export const mockNotificationItem: NotificationListItem = {
  id: 1,
  topic: 'USER',
  detail: 'CREW_ACCEPT',
  publisherId: 10,
  receiverId: 1,
  occurredAt: '2024-01-01T00:00:00Z',
  read: false,
  payload: { message: '크루 가입이 승인되었습니다.' },
};

export const notificationHandlers = [
  http.get(`${BASE}/members/me/notifications`, () =>
    HttpResponse.json<NotificationListGetFetchResponseProps>({
      success: true,
      status: 200,
      data: {
        size: 10,
        page: 0,
        totalPages: 1,
        totalCount: 1,
        resultsSize: 1,
        results: [mockNotificationItem],
      },
    }),
  ),
];

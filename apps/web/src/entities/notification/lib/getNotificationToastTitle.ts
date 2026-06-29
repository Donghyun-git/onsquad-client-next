import type { NotificationMessage } from '../types/notification.types';

/**
 * SSE 알림 → 토스트 문구.
 * - 백엔드가 `payload.message` 에 포맷 완료된 문구를 내려준다(8 케이스 전부).
 * - message 가 없는 이벤트(CONNECT/HEARTBEAT)는 null → 토스트 미표시.
 */
export const getNotificationToastTitle = (noti: NotificationMessage): string | null => {
  const message = noti.payload?.message?.trim();

  return message ? message : null;
};

/**
 * SSE 알림 이벤트명. (백엔드 SseTopic.USER.text)
 * - CONNECT/HEARTBEAT 포함 모든 알림이 이 named event 로 전송된다.
 */
export const NOTIFICATION_SSE_EVENT = 'user';

/**
 * 알림 detail 타입. (백엔드 NotificationDetail enum)
 * - CONNECT/HEARTBEAT 은 인프라 이벤트로 표시 문구가 없다.
 * - 나머지 8 케이스는 사용자에게 표시된다.
 */
export const NOTIFICATION_DETAIL = {
  CONNECT: 'CONNECT',
  HEARTBEAT: 'HEARTBEAT',
  CREW_REQUEST: 'CREW_REQUEST',
  CREW_ACCEPT: 'CREW_ACCEPT',
  CREW_REJECT: 'CREW_REJECT',
  SQUAD_REQUEST: 'SQUAD_REQUEST',
  SQUAD_ACCEPT: 'SQUAD_ACCEPT',
  SQUAD_REJECT: 'SQUAD_REJECT',
  COMMENT: 'COMMENT',
  COMMENT_REPLY: 'COMMENT_REPLY',
} as const;

export type NotificationDetail = ValueOf<typeof NOTIFICATION_DETAIL>;

export type NotificationTopic = 'USER';

/**
 * 알림 payload. (백엔드 detail 별 payload record)
 * - 모든 사용자 알림(8 케이스)은 서버가 포맷 완료한 표시 문구 `message` 를 포함한다.
 * - CONNECT/HEARTBEAT 은 payload 가 비어있다(`message` 없음).
 * - 그 외 필드는 detail 에 따라 선택적으로 존재한다(라우팅/표시에 활용).
 */
export interface NotificationPayload {
  message?: string;
  crewId?: number;
  crewName?: string;
  squadId?: number;
  squadTitle?: string;
  requestId?: number;
  commentId?: number;
  parentId?: number;
  replyId?: number;
}

/**
 * SSE 로 수신되는 알림 메시지. (백엔드 NotificationMessage, `@JsonInclude(NON_NULL)`)
 */
export interface NotificationMessage {
  id?: number;
  topic: NotificationTopic;
  detail: NotificationDetail | string;
  publisherId?: number;
  receiverId?: number;
  read?: boolean;
  payload?: NotificationPayload;
}

/**
 * 회원 알림 목록 API 항목. (GET /api/members/me/notifications)
 * - SSE 메시지와 달리 `occurredAt`(발생 시각) 을 포함한다.
 */
export interface NotificationListItem {
  id: number;
  topic: NotificationTopic;
  detail: NotificationDetail | string;
  publisherId?: number;
  receiverId?: number;
  occurredAt: string;
  read: boolean;
  payload?: NotificationPayload;
}

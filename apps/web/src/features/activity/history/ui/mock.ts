export type ActivityHistoryItem = {
  id: number;
  date: string;
  message: string;
};

export const MOCK_ACTIVITY_HISTORY: ActivityHistoryItem[] = [
  { id: 1, date: '2024.07.11', message: '스쿼드 합류를 요청하였습니다.' },
  { id: 2, date: '2024.07.11', message: '스쿼드 합류 요청을 취소하였습니다.' },
  { id: 3, date: '2024.07.11', message: '스쿼드 합류를 요청했습니다.' },
  { id: 4, date: '2024.07.08', message: '크루 합류 요청이 승인되었습니다.' },
  { id: 5, date: '2024.07.08', message: '크루 합류를 요청하였습니다.' },
  { id: 6, date: '2024.07.05', message: '크루 합류 요청이 거절되었습니다.' },
];

export type ActivityNotificationItem = {
  id: number;
  date: string;
  message: string;
  isRead: boolean;
};

export const MOCK_ACTIVITY_NOTIFICATIONS: ActivityNotificationItem[] = [
  { id: 1, date: '2024.07.11', message: '홍길동 님이 음악 크루에 합류를 요청하였습니다.', isRead: false },
  { id: 2, date: '2024.07.10', message: '공격적인 음악회 크루에 합류하였습니다. 지금 활동을 시작해보세요!', isRead: false },
  { id: 3, date: '2024.07.09', message: '이경학 님이 스쿼드에 댓글을 남겼습니다.', isRead: true },
  { id: 4, date: '2024.07.08', message: '스쿼드 크루 합류가 거절되었습니다.', isRead: true },
];

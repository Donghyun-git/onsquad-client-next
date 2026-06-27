import dayjs from 'dayjs';

/** 알림 발생 시각(occurredAt) → 날짜 그룹 라벨. (YYYY.MM.DD) */
export const formatNotificationDate = (occurredAt: string): string => {
  const d = dayjs(occurredAt);
  if (!d.isValid()) return occurredAt;
  return d.format('YYYY.MM.DD');
};

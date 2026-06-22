/**
 * 알림 발생 시각(occurredAt) → 날짜 그룹 라벨. (YYYY.MM.DD)
 */
export const formatNotificationDate = (occurredAt: string): string => {
  const date = new Date(occurredAt);

  if (Number.isNaN(date.getTime())) return occurredAt;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

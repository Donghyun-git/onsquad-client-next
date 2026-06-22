import { MoreVertical } from 'lucide-react';

import type { NotificationListItem } from '@/entities/notification';

interface NotificationCardProps {
  item: NotificationListItem;
}

const NotificationCard = ({ item }: NotificationCardProps) => {
  // 알림 대상(크루/스쿼드명) 과 서버가 포맷한 문구를 표시한다.
  const target = item.payload?.crewName ?? item.payload?.squadTitle ?? '';
  const message = item.payload?.message ?? '';

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-white p-3">
      <div className="flex flex-1 flex-col gap-1">
        {target && <p className="text-200 leading-130 font-medium tracking-[-0.28px] text-grayscale600">{target}</p>}
        <p className="text-200 leading-130 font-regular tracking-[-0.28px] text-grayscale900">{message}</p>
      </div>
      <button type="button" aria-label="알림 옵션" className="shrink-0">
        <MoreVertical size={20} className="text-grayscale500" />
      </button>
    </div>
  );
};

export default NotificationCard;

import { MoreVertical } from 'lucide-react';

import type { NotificationListItem } from '@/entities/notification';

import { ZapBadge } from '@/shared/ui/ZapBadge';

interface NotificationCardProps {
  item: NotificationListItem;
  onRead?: () => void;
  isReading?: boolean;
}

const NotificationCard = ({ item, onRead, isReading }: NotificationCardProps) => {
  // 알림 대상(크루/스쿼드명) 과 서버가 포맷한 문구를 표시한다.
  const target = item.payload?.crewName ?? item.payload?.squadTitle ?? '';
  const message = item.payload?.message ?? '';

  return (
    <div className="flex w-full items-center gap-s-20 rounded-xl bg-white p-s-30">
      {!item.read && <ZapBadge aria-label="안읽음" className="shrink-0" />}
      <button
        type="button"
        onClick={onRead}
        disabled={item.read || isReading}
        className="flex flex-1 flex-col gap-s-10 text-left disabled:cursor-default"
      >
        {target && <p className="text-200 font-medium leading-130 tracking-[-0.28px] text-grayscale600">{target}</p>}
        <p className="text-200 font-regular leading-130 tracking-[-0.28px] text-grayscale900">{message}</p>
      </button>
      <button type="button" aria-label="알림 옵션" className="shrink-0">
        <MoreVertical size={20} className="text-grayscale500" />
      </button>
    </div>
  );
};

export default NotificationCard;

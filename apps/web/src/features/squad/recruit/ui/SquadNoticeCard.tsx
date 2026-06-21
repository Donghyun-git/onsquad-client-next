import { Star } from 'lucide-react';

import type { SquadNotice } from '@/entities/squad';
import { Avatar } from '@/shared/ui/Avatar';

interface SquadNoticeCardProps {
  notice: SquadNotice;
  showDivider?: boolean;
}

const SquadNoticeCard = ({ notice, showDivider = true }: SquadNoticeCardProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-6 py-2">
        <p className="min-w-0 flex-1 text-300 font-bold leading-130 text-grayscale900 [word-break:break-word]">
          {notice.title}
        </p>
        {notice.isPinned && <Star size={20} className="shrink-0 fill-star text-star" />}
      </div>
      <div className={`flex items-center gap-6 py-2 ${showDivider ? 'border-b border-grayscale100' : ''}`}>
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <Avatar className="size-4" imageUrl={notice.authorProfileImageUrl} />
          <span className="text-300 font-medium leading-130 text-grayscale900 whitespace-nowrap">
            {notice.authorNickname}
          </span>
          <span className="rounded-lg bg-primary700 px-2 py-1 text-100 font-bold text-white leading-130">
            {notice.authorRole}
          </span>
        </div>
        <span className="shrink-0 text-100 font-medium text-grayscale300 leading-130 whitespace-nowrap">
          {notice.createdAt}
        </span>
      </div>
    </div>
  );
};

export default SquadNoticeCard;

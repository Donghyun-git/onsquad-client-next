import { ChevronRight } from 'lucide-react';

import type { SquadParticipantItem } from '@/entities/squad';

import { cn } from '@/shared/lib';
import { Avatar } from '@/shared/ui/Avatar';

interface SquadMemberCardProps {
  item: SquadParticipantItem;
  canManage: boolean;
  onManage: () => void;
}

const SquadMemberCard = ({ item, canManage, onManage }: SquadMemberCardProps) => {
  return (
    <div className={cn('flex flex-col justify-center rounded-xl bg-white p-3', item.member.introduce && 'gap-2')}>
      <div className="flex items-center gap-2">
        <Avatar className="size-6" />
        <span className="text-200 font-medium leading-130 tracking-[-0.28px] text-grayscale900">
          {item.member.nickname}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="flex-1 text-200 font-regular leading-130 tracking-[-0.28px] text-grayscale900 [word-break:break-word]">
          {item.member.introduce}
        </p>
        {canManage && (
          <button type="button" aria-label="멤버 관리" onClick={onManage}>
            <ChevronRight size={24} className="shrink-0 text-grayscale500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SquadMemberCard;

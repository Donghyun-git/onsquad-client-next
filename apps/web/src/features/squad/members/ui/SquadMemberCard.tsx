import { ChevronRight } from 'lucide-react';

import type { SquadMember } from '@/entities/squad';
import { Avatar } from '@/shared/ui/Avatar';

interface SquadMemberCardProps {
  member: SquadMember;
}

const SquadMemberCard = ({ member }: SquadMemberCardProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-white p-3">
      <div className="flex items-center gap-2">
        <Avatar className="size-6" imageUrl={member.profileImageUrl} />
        <span className="text-200 font-medium leading-130 text-grayscale900 tracking-[-0.28px]">
          {member.nickname}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="flex-1 text-200 font-regular leading-130 text-grayscale900 tracking-[-0.28px] [word-break:break-word]">
          {member.introduce}
        </p>
        <ChevronRight size={24} className="shrink-0 text-grayscale500" />
      </div>
    </div>
  );
};

export default SquadMemberCard;

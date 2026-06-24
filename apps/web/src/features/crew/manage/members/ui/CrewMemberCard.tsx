'use client';

import { ChevronRight, MoreVertical } from 'lucide-react';

import type { CrewMemberItem } from '@/shared/api/crew/manage/members';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';

interface CrewMemberCardProps {
  item: CrewMemberItem;
  onOpenMenu: () => void;
  onOpenProfile: () => void;
}

const CrewMemberCard = ({ item, onOpenMenu, onOpenProfile }: CrewMemberCardProps) => {
  const { states, member } = item;
  const canManage = !states.isMe && (states.canKick || states.canDelegateOwner);

  return (
    <li className="flex flex-col gap-2 rounded-xl bg-white p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="size-6 shrink-0" />
          <Text.sm className="font-medium tracking-tight text-grayscale900">{member.nickname}</Text.sm>
        </div>
        {canManage && (
          <button type="button" aria-label={`${member.nickname} 님 관리`} onClick={onOpenMenu}>
            <MoreVertical className="size-5 text-grayscale500" />
          </button>
        )}
      </div>

      <button type="button" className="flex items-center justify-between" onClick={onOpenProfile}>
        <Text.sm className="flex-1 text-left tracking-tight text-grayscale900">{member.introduce}</Text.sm>
        <ChevronRight className="size-6 shrink-0 text-grayscale900" />
      </button>
    </li>
  );
};

export default CrewMemberCard;

import { MoreVertical, Zap } from 'lucide-react';

import { MOCK_SQUAD, MOCK_SQUAD_MEMBERS } from '@/entities/squad';
import { Avatar } from '@/shared/ui/Avatar';

import SquadMemberCard from './SquadMemberCard';

const SquadMembers = () => {
  const squad = MOCK_SQUAD;
  const members = MOCK_SQUAD_MEMBERS;

  return (
    <div className="flex flex-col gap-4 bg-grayscale50 px-4 py-6 min-h-screen">
      {/* 스쿼드 정보 카드 (상단 요약) */}
      <div className="overflow-hidden rounded-lg border-t-2 border-primary700 bg-white">
        <div className="flex flex-col gap-1 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Zap size={18} className="fill-primary500 text-primary500" />
              <Avatar className="size-4" />
              <span className="text-200 font-regular leading-130 text-grayscale800 tracking-[-0.28px]">
                {squad.authorNickname}
              </span>
              <span className="text-200 font-regular leading-130 text-grayscale800 tracking-[-0.28px]">
                님의 스쿼드
              </span>
            </div>
            <button type="button" aria-label="더보기">
              <MoreVertical size={20} className="text-grayscale500" />
            </button>
          </div>
          <p className="text-200 font-medium leading-130 text-grayscale900 tracking-[-0.28px]">
            {squad.title}
          </p>
          <div className="flex items-center gap-1">
            <span className="rounded px-1 py-0 text-75 font-medium leading-150 text-white bg-primary700 tracking-[-0.2px]">
              {squad.category}
            </span>
            <span className="rounded px-1 py-0 text-75 font-medium leading-150 text-white bg-primary700 tracking-[-0.2px]">
              {squad.currentMembers}/{squad.maxMembers} 명
            </span>
          </div>
        </div>
      </div>

      {/* 스쿼드원 목록 */}
      <div className="flex flex-col gap-2.5">
        {members.map((member) => (
          <SquadMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default SquadMembers;

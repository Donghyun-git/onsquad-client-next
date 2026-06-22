'use client';

import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

import type { MySquadParticipantGroup } from '@/entities/member';
import { SQUAD_PATH } from '@/shared/config/paths';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';

interface MySquadGroupProps {
  group: MySquadParticipantGroup;
}

const MySquadGroup = ({ group }: MySquadGroupProps) => {
  const router = useRouter();
  const { crew, states } = group;
  const squads = [...crew.squads].sort((a, b) => b.participateAt.localeCompare(a.participateAt));

  return (
    <section className="flex flex-col gap-s-20">
      <div className="flex items-center gap-s-10">
        {states.isOwner && <Zap className="h-4 w-4 text-primary500" />}
        <Text.base className="font-semibold text-grayscale900">{crew.name}</Text.base>
      </div>

      {squads.map(({ squad }) => (
        <div key={squad.id} className="flex flex-col gap-s-20 rounded-2xl bg-white p-s-20">
          <div className="flex flex-col gap-s-10">
            <Text.xs className="text-grayscale500">{squad.leader.nickname} 님의 스쿼드</Text.xs>
            <Text.base className="font-semibold text-grayscale900">{squad.title}</Text.base>
          </div>
          <div className="flex items-center justify-between">
            <div className="no-scrollbar flex gap-s-10 overflow-x-auto whitespace-nowrap">
              {squad.categories.map((c) => (
                <Badge key={c}>{c}</Badge>
              ))}
            </div>
            <Text.xs className="shrink-0 text-grayscale500">
              {squad.remain}/{squad.capacity} 명
            </Text.xs>
          </div>
          <div className="flex gap-s-10">
            {squad.kakaoLink && (
              <button
                type="button"
                onClick={() => window.open(squad.kakaoLink, '_blank')}
                className="flex flex-1 items-center justify-center rounded-lg border border-grayscale200 py-2 text-300 font-medium text-grayscale700"
              >
                오픈채팅
              </button>
            )}
            <button
              type="button"
              onClick={() => router.push(SQUAD_PATH.detail(squad.id))}
              className="flex flex-1 items-center justify-center rounded-lg bg-primary500 py-2 text-300 font-medium text-white"
            >
              스쿼드 바로가기
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MySquadGroup;

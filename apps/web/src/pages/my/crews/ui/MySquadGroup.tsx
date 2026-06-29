'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

import type { MySquadParticipantGroup, MySquadParticipantItem } from '@/entities/member';
import { SQUAD_PATH } from '@/shared/config/paths';
import { Text } from '@/shared/ui/Text';

import CrewHeaderCard from './CrewHeaderCard';

interface MySquadGroupProps {
  group: MySquadParticipantGroup;
}

const SquadLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="shrink-0 rounded bg-primary700 px-s-10 text-[0.625rem] font-medium leading-150 text-white">
    {children}
  </span>
);

const MySquadCard = ({ item }: { item: MySquadParticipantItem }) => {
  const router = useRouter();
  const { squad, states } = item;

  return (
    <div className="border-t border-grayscale100">
      <div className="flex flex-col gap-s-10 p-s-20">
        <div className="flex items-center gap-s-10">
          {states.isLeader && <Zap className="h-[18px] w-[18px] shrink-0 fill-primary500 text-primary500" />}
          <Image
            src="/icons/no_profile.svg"
            alt=""
            width={16}
            height={16}
            className="h-4 w-4 shrink-0 rounded-full object-cover"
          />
          <Text.sm className="text-grayscale800">{squad.leader.nickname} 님의 스쿼드</Text.sm>
        </div>
        <Text.sm className="font-medium text-grayscale900">{squad.title}</Text.sm>
        <div className="flex flex-wrap items-center gap-s-10">
          {squad.categories.map((c) => (
            <SquadLabel key={c}>{c}</SquadLabel>
          ))}
          <SquadLabel>
            {squad.capacity - squad.remain}/{squad.capacity} 명
          </SquadLabel>
        </div>
      </div>

      <div className="flex gap-s-10 p-s-10">
        {squad.kakaoLink && (
          <button
            type="button"
            onClick={() => window.open(squad.kakaoLink, '_blank')}
            className="flex flex-1 items-center justify-center rounded border border-primary700 p-s-20 text-xs font-medium text-primary700"
          >
            오픈채팅
          </button>
        )}
        <button
          type="button"
          onClick={() => router.push(SQUAD_PATH.detail(squad.id))}
          className="flex flex-1 items-center justify-center rounded bg-primary500 p-s-20 text-xs font-medium text-white"
        >
          스쿼드 바로가기
        </button>
      </div>
    </div>
  );
};

const MySquadGroup = ({ group }: MySquadGroupProps) => {
  const router = useRouter();
  const { crew, states } = group;
  const squads = [...crew.squads].sort((a, b) => b.participateAt.localeCompare(a.participateAt));

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white">
      <button
        type="button"
        onClick={() => router.push(`/crews/${crew.id}`)}
        aria-label={`${crew.name} 크루로 이동`}
        className="flex w-full flex-col text-left"
      >
        <CrewHeaderCard
          name={crew.name}
          imageUrl={crew.imageUrl}
          ownerNickname={crew.owner.nickname}
          isOwner={states.isOwner}
        />
      </button>

      {squads.length > 0 ? (
        <div className="flex flex-col gap-s-10 p-s-10">
          {squads.map((item) => (
            <MySquadCard key={item.squad.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[60px] items-center justify-center px-s-40 py-s-10">
          <Text.base className="text-center text-grayscale600">참여중인 스쿼드가 없어요.</Text.base>
        </div>
      )}
    </div>
  );
};

export default MySquadGroup;

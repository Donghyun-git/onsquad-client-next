'use client';

import type { MySquadParticipantGroup, MySquadParticipantItem } from '@/entities/member';
import { SquadCard } from '@/entities/squad';
import { SQUAD_PATH } from '@/shared/config/paths';
import { usePageMove } from '@/shared/lib/hooks';
import { Text } from '@/shared/ui/Text';

import CrewHeaderCard from './CrewHeaderCard';

interface MySquadGroupProps {
  group: MySquadParticipantGroup;
}

const MySquadCard = ({ item }: { item: MySquadParticipantItem }) => {
  const { handlePageMove } = usePageMove();
  const { squad, states } = item;

  return (
    <SquadCard
      leaderNickname={squad.leader.nickname}
      title={squad.title}
      categories={squad.categories}
      capacity={squad.capacity}
      remain={squad.remain}
      isLeader={states.isLeader}
      showTopAccent={false}
      className="rounded-none border-t border-grayscale100"
    >
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
        onClick={() => handlePageMove(SQUAD_PATH.detail(squad.id))}
        className="flex flex-1 items-center justify-center rounded bg-primary500 p-s-20 text-xs font-medium text-white"
      >
        스쿼드 바로가기
      </button>
    </SquadCard>
  );
};

const MySquadGroup = ({ group }: MySquadGroupProps) => {
  const { handlePageMove } = usePageMove();
  const { crew, states } = group;
  const squads = [...crew.squads].sort((a, b) => b.participateAt.localeCompare(a.participateAt));

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-lg bg-white">
      <button
        type="button"
        onClick={() => handlePageMove(`/crews/${crew.id}`)}
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

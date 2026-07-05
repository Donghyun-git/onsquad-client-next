'use client';

import type { MyCrewParticipantItem } from '@/entities/member';
import { usePageMove } from '@/shared/lib/hooks';

import CrewHeaderCard from './CrewHeaderCard';

interface MyCrewCardProps {
  item: MyCrewParticipantItem;
}

const MyCrewCard = ({ item }: MyCrewCardProps) => {
  const { handlePageMove } = usePageMove();
  const { crew, states } = item;

  return (
    <button
      type="button"
      onClick={() => handlePageMove(`/crews/${crew.id}`)}
      aria-label={`${crew.name} 크루로 이동`}
      className="flex w-full flex-col overflow-hidden rounded-lg bg-white text-left transition-all duration-200 hover:shadow-md"
    >
      <CrewHeaderCard
        name={crew.name}
        imageUrl={crew.imageUrl}
        ownerNickname={crew.owner.nickname}
        isOwner={states.isOwner}
      />
    </button>
  );
};

export default MyCrewCard;

'use client';

import type { CrewListResponseProps } from '@/entities/crew/api/crewListGetFetch';
import { cn } from '@/shared/lib';
import { usePageMove } from '@/shared/lib/hooks';
import { Badge } from '@/shared/ui/Badge';
import { CrewCard } from '@/shared/ui/Card/CrewCard';
import { Text } from '@/shared/ui/Text';

import { COMMUNITY_CONTAINER_HEIGHT } from '../config';

interface CrewListDataProps {
  list: PropType<PropType<CrewListResponseProps, 'data'>, 'results'>;
}

const CommunityCrewList = ({ list: crewList }: CrewListDataProps) => {
  const { handlePageMove } = usePageMove();

  if (crewList.length === 0) {
    return (
      <div className={cn(`flex min-h-[${COMMUNITY_CONTAINER_HEIGHT}] flex-col items-center justify-center py-20`)}>
        <Text.lg className="text-grayscale500">검색 결과가 없습니다.</Text.lg>
        <Text.sm className="mt-2 text-grayscale400">다른 검색어로 시도해보세요.</Text.sm>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 place-items-center gap-3 pt-6 S2:grid-cols-1 SE:grid-cols-1 mobile:grid-cols-1 tablet:grid-cols-1">
      {crewList?.map((crew) => (
        <CrewCard
          key={crew.id}
          crewImage={crew.imageUrl || '/images/mock1.png'}
          ownerName={crew.owner.nickname}
          title={crew.name}
          description={crew.introduce}
          tagSlot={
            <>
              <Badge>멤버 수 {crew.memberCount} 명</Badge>
              {crew.hashtags.map((tag, i) => (
                <Badge key={i}>{tag}</Badge>
              ))}
            </>
          }
          onClick={() => handlePageMove(`/crews/${crew.id}`, { scroll: false })}
        />
      ))}
    </div>
  );
};

export default CommunityCrewList;

'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { SquadCard, squadQueries } from '@/entities/squad';

import { SQUAD_PATH } from '@/shared/config/paths';
import { usePageMove } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

interface CrewSquadManageListProps {
  crewId: number;
}

const CrewSquadManageList = ({ crewId }: CrewSquadManageListProps) => {
  const { handlePageMove } = usePageMove();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    squadQueries.manageList({ crewId }),
  );

  const squads = data?.pages.flatMap((page) => page.data.results) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;
  const totalPages = data?.pages[0]?.data.totalPages ?? 0;
  const loadedPages = data?.pages.length ?? 0;

  if (squads.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <Text.base className="text-grayscale600">아직 스쿼드가 없어요.</Text.base>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Text.lg className="font-bold text-grayscale900">스쿼드</Text.lg>
        <Text.base className="text-grayscale900">{totalCount}개</Text.base>
      </div>

      <ul className="flex flex-col gap-4">
        {squads.map((item) => (
          <li key={item.id}>
            <SquadCard
              leaderNickname={item.leader.nickname}
              title={item.title}
              categories={item.categories}
              capacity={item.capacity}
              remain={item.remain}
              isLeader={item.states.isLeader}
            >
              <button
                type="button"
                onClick={() => handlePageMove(SQUAD_PATH.members(item.id))}
                className="flex flex-1 items-center justify-center rounded border border-primary700 p-s-20 text-xs font-medium text-primary700"
              >
                참여자 목록
              </button>
              <button
                type="button"
                onClick={() => handlePageMove(SQUAD_PATH.detail(item.id))}
                className="flex flex-1 items-center justify-center rounded bg-primary500 p-s-20 text-xs font-medium text-white"
              >
                스쿼드 바로가기
              </button>
            </SquadCard>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <Button
          variant="ghost"
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="mx-auto h-auto rounded-full bg-primary50 px-4 py-2 text-sm font-medium text-primary700 hover:bg-primary50 hover:text-primary700"
        >
          더보기 {loadedPages}/{totalPages}
        </Button>
      )}
    </div>
  );
};

export default CrewSquadManageList;

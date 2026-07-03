import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { CommunityContainer } from '@/pages/community/ui';

import { crewQueries } from '@/entities/crew';

import { GlobalHeader } from '@/widgets/GlobalHeader';

import { getQueryClient } from '@/shared/lib/queries/get-query-client';

async function CommunityPage() {
  const queryClient = getQueryClient();

  // 서버 prefetch 는 베스트에포트: 백엔드가 느리거나 응답이 없어도 최대 3초만 대기하고
  // 렌더를 진행한다. 데이터가 없으면 클라이언트(useQuery)가 스켈레톤 후 재요청한다.
  // (prefetchQuery 는 에러를 throw 하지 않으므로 타임아웃만 처리하면 된다.)
  await Promise.race([
    queryClient.prefetchQuery(crewQueries.list()),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]);

  return (
    <div className="h-full w-full">
      <GlobalHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommunityContainer />
      </HydrationBoundary>
    </div>
  );
}

export default CommunityPage;

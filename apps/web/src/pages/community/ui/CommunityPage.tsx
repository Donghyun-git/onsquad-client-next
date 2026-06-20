import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { CommunityContainer } from '@/pages/community/ui';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { withAppbar } from '@/shared/lib/hoc/withAppbar';
import { getQueryClient } from '@/shared/lib/queries/get-query-client';

async function CommunityPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewQueries.list());

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommunityContainer />
      </HydrationBoundary>
    </>
  );
}

export default withAppbar(CommunityPage);

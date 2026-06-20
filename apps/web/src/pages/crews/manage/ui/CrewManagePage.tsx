import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { CrewManageList } from '@/features/crew/manage';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries';

const CrewManagePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  const crewId = parseInt(id, 10);

  await queryClient.prefetchQuery(
    crewQueries.manage({
      crewId,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CrewManageWrapper title="크루 관리">
        <CrewManageList crewId={crewId} />
      </CrewManageWrapper>
    </HydrationBoundary>
  );
};

export default CrewManagePage;

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { CrewManageList } from '@/features/crew/manage';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries';
import { getServerAccessToken } from '@/shared/lib/queries/getServerAccessToken';

const CrewManagePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  const crewId = parseInt(id, 10);

  const accessToken = await getServerAccessToken();

  await queryClient.prefetchQuery(
    crewQueries.manage({
      crewId,
      accessToken,
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

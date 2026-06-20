import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { ParticipantList } from '@/features/crew/manage/participants';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries';
import { getServerAccessToken } from '@/shared/lib/queries/getServerAccessToken';

const ManageParticipantsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  const crewId = parseInt(id, 10);

  const accessToken = await getServerAccessToken();

  await queryClient.prefetchQuery(crewQueries.participants({ crewId, accessToken }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CrewManageWrapper title="참가 신청">
        <ParticipantList crewId={crewId} />
      </CrewManageWrapper>
    </HydrationBoundary>
  );
};

export default ManageParticipantsPage;

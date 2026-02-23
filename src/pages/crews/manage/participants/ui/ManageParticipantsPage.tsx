import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { CrewManageWrapper } from '@/widgets/CrewManageWrapper';

import { getQueryClient } from '@/shared/lib/queries';

const ManageParticipantsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  const crewId = parseInt(id, 10);

  // await queryClient.prefetchQuery(crewParticipantsGetFetch({ crewId }));

  return (
    <CrewManageWrapper title="참가 신청">
      <div>ManageParticipantsPage</div>
    </CrewManageWrapper>
  );
};

export default ManageParticipantsPage;

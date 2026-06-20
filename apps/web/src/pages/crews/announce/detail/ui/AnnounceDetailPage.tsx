import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { AnnounceDetail } from '@/features/crew/announce-detail';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries';

interface AnnounceDetailPageProps {
  params: { id: string; announceId: string };
}

const AnnounceDetailPage = async ({ params }: AnnounceDetailPageProps) => {
  const { id, announceId } = await params;

  const crewId = parseInt(id, 10);
  const parsedAnnounceId = parseInt(announceId, 10);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewQueries.announceDetail({ crewId, announceId: parsedAnnounceId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnnounceDetail crewId={crewId} announceId={parsedAnnounceId} />
    </HydrationBoundary>
  );
};

export default AnnounceDetailPage;

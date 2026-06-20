import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { AnnounceList } from '@/features/crew/announce';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries';

interface AnnouncePageProps {
  params: { id: string };
}

export default async function AnnouncePage({ params }: AnnouncePageProps) {
  const { id } = await params;

  const crewId = parseInt(id, 10);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewQueries.announceList({ crewId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnnounceList crewId={crewId} />
    </HydrationBoundary>
  );
}

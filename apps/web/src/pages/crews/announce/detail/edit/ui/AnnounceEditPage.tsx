import React from 'react';

import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { WriteForm } from '@/features/crew/announce';

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { getQueryClient } from '@/shared/lib/queries';

const AnnounceEditPage = async ({ params }: { params: { id: string; announceId: string } }) => {
  const { id, announceId } = await params;

  const crewId = parseInt(id, 10);
  const parsedAnnounceId = parseInt(announceId, 10);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(crewQueries.announceDetail({ crewId, announceId: parsedAnnounceId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WriteForm crewId={crewId} announceId={parsedAnnounceId} mode="edit" />
    </HydrationBoundary>
  );
};

export default AnnounceEditPage;

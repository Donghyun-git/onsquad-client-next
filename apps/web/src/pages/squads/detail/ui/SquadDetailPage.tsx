import React from 'react';

import { SquadDetail } from '@/features/squad/detail';

import { Appbar } from '@/shared/ui/Appbar';

interface SquadDetailPageProps {
  params: { id: string };
}

export default async function SquadDetailPage({ params }: SquadDetailPageProps) {
  const { id } = await params;

  return (
    <>
      <Appbar isMenuHeader={false} title="강아지 귀여워" />
      <SquadDetail id={id} />
    </>
  );
}

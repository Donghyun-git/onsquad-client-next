import React from 'react';

import { SquadDetail } from '@/features/squad/detail';
import { MOCK_SQUAD } from '@/entities/squad';
import { Appbar } from '@/shared/ui/Appbar';

interface SquadDetailPageProps {
  params: { id: string };
}

export default async function SquadDetailPage({ params }: SquadDetailPageProps) {
  const { id } = await params;
  // TODO: id 기반 API 조회. 현재는 목업 사용
  const crewName = MOCK_SQUAD.crewName;

  return (
    <>
      <Appbar isMenuHeader={false} title={crewName} />
      <SquadDetail id={id} />
    </>
  );
}

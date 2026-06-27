'use client';

import { useQuery } from '@tanstack/react-query';

import { crewQueries } from '@/entities/crew';

import { Appbar } from '@/shared/ui/Appbar';

interface CrewDetailAppbarProps {
  crewId: number;
}

export const CrewDetailAppbar = ({ crewId }: CrewDetailAppbarProps) => {
  const { data: crewDetail } = useQuery({
    ...crewQueries.detail({ crewId }),
  });

  return <Appbar isMenuHeader={false} title={crewDetail?.data?.name} />;
};

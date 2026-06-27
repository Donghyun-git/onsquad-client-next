'use client';

import { useQuery } from '@tanstack/react-query';

import { squadQueries } from '@/entities/squad/api/squad.queries';

import { Appbar } from '@/shared/ui/Appbar';

interface SquadDetailAppbarProps {
  squadId: number;
}

export const SquadDetailAppbar = ({ squadId }: SquadDetailAppbarProps) => {
  const { data: squadDetail } = useQuery({
    ...squadQueries.detail({ squadId }),
  });

  const squadAppbarTitle = squadDetail?.data?.title;

  return <Appbar isMenuHeader={false} title={squadAppbarTitle} />;
};

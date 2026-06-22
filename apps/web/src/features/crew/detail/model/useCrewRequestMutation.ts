import { crewQueries } from '@/entities/crew';

import { type CrewRequestPostFetchParams, crewRequestPostFetch } from '@/shared/api/crew/detail/crewRequestPostFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

export const useCrewRequestMutation = ({ crewId }: { crewId: number }) => {
  return useApiMutation({
    fetcher: (crewId: PropType<CrewRequestPostFetchParams, 'crewId'>) => crewRequestPostFetch({ crewId }),
    invalidateKey: crewQueries.detail({ crewId }).queryKey,
  });
};

import { crewQueries } from '@/entities/crew';
import { memberQueries } from '@/entities/member';

import { type CrewRequestPostFetchParams, crewRequestPostFetch } from '@/shared/api/crew/detail/crewRequestPostFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

export const useCrewRequestMutation = ({ crewId }: { crewId: number }) => {
  return useApiMutation({
    fetcher: (crewId: PropType<CrewRequestPostFetchParams, 'crewId'>) => crewRequestPostFetch({ crewId }),
    invalidateKeys: [
      crewQueries.detail({ crewId }).queryKey,
      crewQueries.manage({ crewId }).queryKey,
      memberQueries.myCrewRequests().queryKey,
    ],
  });
};

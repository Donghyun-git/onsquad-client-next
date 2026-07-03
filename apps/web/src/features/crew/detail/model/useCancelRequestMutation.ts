import { crewQueries } from '@/entities/crew';
import { memberQueries } from '@/entities/member';

import {
  type CancelRequestDeleteFetchParams,
  cancelRequestDeleteFetch,
} from '@/entities/crew/api/detail/cancelRequestDeleteFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

export const useCancelRequestMutation = ({ crewId }: { crewId: number }) => {
  return useApiMutation({
    fetcher: (crewId: PropType<CancelRequestDeleteFetchParams, 'crewId'>) => cancelRequestDeleteFetch({ crewId }),
    invalidateKeys: [
      crewQueries.detail({ crewId }).queryKey,
      crewQueries.manage({ crewId }).queryKey,
      memberQueries.myCrewRequests().queryKey,
    ],
  });
};

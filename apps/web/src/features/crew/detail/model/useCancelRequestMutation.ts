import { crewQueries } from '@/entities/crew';

import {
  type CancelRequestDeleteFetchParams,
  cancelRequestDeleteFetch,
} from '@/shared/api/crew/detail/cancelRequestDeleteFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

export const useCancelRequestMutation = ({ crewId }: { crewId: number }) => {
  return useApiMutation({
    fetcher: (crewId: PropType<CancelRequestDeleteFetchParams, 'crewId'>) => cancelRequestDeleteFetch({ crewId }),
    invalidateKey: crewQueries.detail({ crewId }).queryKey,
  });
};

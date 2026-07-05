import { crewQueries } from '@/entities/crew';
import { crewUpdatePutFetch, type CrewUpdatePutFetchParams } from '@/entities/crew/api';

import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루 정보 수정 (이미지 제외)
 */
export const useUpdateCrewInfoMutation = ({ crewId }: { crewId: number }) =>
  useApiMutation({
    fetcher: (params: Omit<CrewUpdatePutFetchParams, 'crewId'>) => crewUpdatePutFetch({ crewId, ...params }),
    invalidateKey: crewQueries.root(),
  });

import { crewQueries } from '@/entities/crew/api/crew.queries';

import { type CrewAnnouncePostFetchParams, crewAnnouncePostFetch } from '@/shared/api/crew';
import { useApiMutation } from '@/shared/lib/queries';

/**
 * 크루 공지사항 등록
 */
export const useAnnounceRegisterMutation = ({ crewId }: { crewId: number }) => {
  return useApiMutation({
    fetcher: (params: Omit<CrewAnnouncePostFetchParams, 'crewId'>) => crewAnnouncePostFetch({ crewId, ...params }),
    invalidateKey: crewQueries.announceList({ crewId }).queryKey,
  });
};

import { crewQueries } from '@/entities/crew';

import { type CrewAnnouncePutFetchParams, crewAnnouncePutFetch } from '@/entities/crew/api';
import { useApiMutation } from '@/shared/lib/queries';

/**
 * 크루 공지사항 수정
 */
export const useAnnounceUpdateMutation = ({ crewId, announceId }: { crewId: number; announceId: number }) => {
  return useApiMutation({
    fetcher: (params: Omit<CrewAnnouncePutFetchParams, 'crewId' | 'announceId'>) =>
      crewAnnouncePutFetch({ crewId, announceId, ...params }),
    invalidateKeys: [
      crewQueries.announceList({ crewId }).queryKey,
      crewQueries.announceDetail({ crewId, announceId }).queryKey,
    ],
  });
};

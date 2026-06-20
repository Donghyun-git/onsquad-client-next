import { crewQueries } from '@/entities/crew/api/crew.queries';

import { type AnnouncePinPatchFetchParams, announcePinPatchFetch } from '@/shared/api/crew';
import { useApiMutation } from '@/shared/lib/queries';

/**
 * 공지사항 상단 고정
 */
export const useAnnouncePinMutation = ({ crewId, announceId }: { crewId: number; announceId: number }) => {
  return useApiMutation({
    fetcher: (params: AnnouncePinPatchFetchParams) => announcePinPatchFetch(params),
    invalidateKeys: [
      crewQueries.announceDetail({ crewId, announceId }).queryKey,
      crewQueries.announceList({ crewId }).queryKey,
    ],
  });
};

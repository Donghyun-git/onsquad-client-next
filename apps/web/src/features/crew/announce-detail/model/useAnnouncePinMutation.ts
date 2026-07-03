import { crewQueries } from '@/entities/crew';

import { type AnnouncePinPatchFetchParams, announcePinPatchFetch } from '@/entities/crew/api';
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

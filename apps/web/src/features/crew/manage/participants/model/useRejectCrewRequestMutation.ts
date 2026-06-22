import { crewQueries } from '@/entities/crew';

import { crewRequestRejectFetch } from '@/shared/api/crew/manage/participants/crewRequestRejectFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루 참가 신청 거절 (크루장)
 * - 성공 시 신청자 목록 및 관리 카운트 갱신
 */
export const useRejectCrewRequestMutation = (crewId: number) =>
  useApiMutation({
    fetcher: (requestId: number) => crewRequestRejectFetch({ crewId, requestId }),
    invalidateKeys: [
      [...crewQueries.lists(), 'participants', crewId],
      [...crewQueries.lists(), 'manage', crewId],
    ],
  });

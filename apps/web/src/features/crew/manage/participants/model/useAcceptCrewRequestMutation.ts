import { crewQueries } from '@/entities/crew';

import { crewRequestAcceptFetch } from '@/entities/crew/api/manage/participants/crewRequestAcceptFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루 참가 신청 수락 (크루장)
 * - 성공 시 신청자 목록 및 관리 카운트 갱신
 */
export const useAcceptCrewRequestMutation = (crewId: number) =>
  useApiMutation({
    fetcher: (requestId: number) => crewRequestAcceptFetch({ crewId, requestId }),
    invalidateKeys: [
      [...crewQueries.lists(), 'participants', crewId],
      [...crewQueries.lists(), 'manage', crewId],
    ],
  });

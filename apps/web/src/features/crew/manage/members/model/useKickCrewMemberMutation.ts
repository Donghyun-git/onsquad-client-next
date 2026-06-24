import { crewQueries } from '@/entities/crew';

import { crewMemberKickFetch } from '@/shared/api/crew/manage/members';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루원 강퇴
 * - 성공 시 크루원 목록 및 관리 카운트 갱신
 */
export const useKickCrewMemberMutation = (crewId: number) =>
  useApiMutation({
    fetcher: (targetMemberId: number) => crewMemberKickFetch({ crewId, targetMemberId }),
    invalidateKeys: [
      [...crewQueries.lists(), 'members', crewId],
      [...crewQueries.lists(), 'manage', crewId],
    ],
  });

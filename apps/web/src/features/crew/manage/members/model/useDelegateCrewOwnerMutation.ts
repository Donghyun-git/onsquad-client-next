import { crewQueries } from '@/entities/crew';

import { crewMemberDelegateOwnerFetch } from '@/entities/crew/api/manage/members';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 크루장 위임
 * - 성공 시 크루원 목록 및 관리 카운트 갱신
 */
export const useDelegateCrewOwnerMutation = (crewId: number) =>
  useApiMutation({
    fetcher: (targetMemberId: number) => crewMemberDelegateOwnerFetch({ crewId, targetMemberId }),
    invalidateKeys: [
      [...crewQueries.lists(), 'members', crewId],
      [...crewQueries.lists(), 'manage', crewId],
    ],
  });

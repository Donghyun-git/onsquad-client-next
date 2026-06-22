import { memberQueries } from '@/entities/member';

import { cancelRequestDeleteFetch } from '@/shared/api/crew/detail/cancelRequestDeleteFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 내 크루 합류 신청 취소 (본인)
 * - 성공 시 신청 내역 목록 갱신
 */
export const useCancelCrewRequestMutation = () =>
  useApiMutation({
    fetcher: (crewId: number) => cancelRequestDeleteFetch({ crewId }),
    invalidateKey: memberQueries.myCrewRequests().queryKey,
  });

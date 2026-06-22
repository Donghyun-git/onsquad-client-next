import { memberQueries } from '@/entities/member';

import { squadRequestCancelFetch } from '@/shared/api/squad/request/squadRequestCancelFetch';
import { useApiMutation } from '@/shared/lib/queries/useApiMutation';

/**
 * 내 스쿼드 합류 신청 취소 (본인)
 * - 성공 시 신청 내역 목록 갱신
 */
export const useCancelSquadRequestMutation = () =>
  useApiMutation({
    fetcher: (squadId: number) => squadRequestCancelFetch({ squadId }),
    invalidateKey: memberQueries.mySquadRequests().queryKey,
  });

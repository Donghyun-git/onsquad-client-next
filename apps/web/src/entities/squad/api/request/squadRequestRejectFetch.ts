import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface SquadRequestRejectFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 신청 pk
   */
  requestId: number;
}

export interface SquadRequestRejectFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 참여 신청 거절
 * - DELETE /api/squads/{squadId}/requests/{requestId}
 */
export const squadRequestRejectFetch = ({ squadId, requestId }: SquadRequestRejectFetchParams) =>
  apiFetch.delete<SquadRequestRejectFetchResponseProps>(`/squads/${squadId}/requests/${requestId}`);

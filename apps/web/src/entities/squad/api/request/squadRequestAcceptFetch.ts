import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface SquadRequestAcceptFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 신청 pk
   */
  requestId: number;
}

export interface SquadRequestAcceptFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 참여 신청 수락
 * - PATCH /api/squads/{squadId}/requests/{requestId}
 */
export const squadRequestAcceptFetch = ({ squadId, requestId }: SquadRequestAcceptFetchParams) =>
  apiFetch.patch<SquadRequestAcceptFetchResponseProps>(`/squads/${squadId}/requests/${requestId}`);

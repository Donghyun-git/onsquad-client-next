import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface SquadRequestCancelFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
}

export interface SquadRequestCancelFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 참여 신청 취소 (본인)
 * - DELETE /api/squads/{squadId}/requests/me
 */
export const squadRequestCancelFetch = ({ squadId }: SquadRequestCancelFetchParams) =>
  apiFetch.delete<SquadRequestCancelFetchResponseProps>(`/squads/${squadId}/requests/me`);

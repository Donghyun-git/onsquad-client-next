import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface SquadLeaveFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
}

export interface SquadLeaveFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 탈퇴 (본인)
 * - DELETE /api/squads/{squadId}/members/me
 */
export const squadLeaveFetch = ({ squadId }: SquadLeaveFetchParams) =>
  apiFetch.delete<SquadLeaveFetchResponseProps>(`/squads/${squadId}/members/me`);

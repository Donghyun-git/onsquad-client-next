import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';

export interface SquadRequestPostFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
}

export interface SquadRequestPostFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 참여 신청
 * - POST /api/squads/{squadId}/requests
 */
export const squadRequestPostFetch = ({ squadId }: SquadRequestPostFetchParams) =>
  apiFetch.post<SquadRequestPostFetchResponseProps>(`/squads/${squadId}/requests`);

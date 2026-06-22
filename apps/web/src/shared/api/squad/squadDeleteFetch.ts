import { apiFetch } from '../common';
import type { ResponseModel } from '../model';

export interface SquadDeleteFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
}

export interface SquadDeleteFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 삭제
 * - DELETE /api/squads/{squadId}
 */
export const squadDeleteFetch = ({ squadId }: SquadDeleteFetchParams) =>
  apiFetch.delete<SquadDeleteFetchResponseProps>(`/squads/${squadId}`);

import { apiFetch } from '../common';
import type { ResponseModel } from '../model';
import type { SquadDetailData } from '@/shared/types/squad.types';

export interface SquadDetailGetFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
}

export interface SquadDetailGetFetchResponseProps extends ResponseModel {
  /**
   * 스쿼드 상세 정보
   */
  data: SquadDetailData;
}

/**
 * 스쿼드 상세 조회
 * - GET /api/squads/{squadId}
 */
export const squadDetailGetFetch = ({ squadId }: SquadDetailGetFetchParams) =>
  apiFetch.get<SquadDetailGetFetchResponseProps>(`/squads/${squadId}`);

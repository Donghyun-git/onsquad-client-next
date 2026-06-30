import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import type { SquadDetailData } from '@/entities/squad/types/squad.types';

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

import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import type { CreateSquadBody } from '@/entities/squad/types/squad.types';

export interface SquadCreatePostFetchParams {
  /**
   * 크루 pk
   */
  crewId: number;
  /**
   * 스쿼드 생성 요청 바디
   */
  body: CreateSquadBody;
}

export interface SquadCreatePostFetchResponseProps extends ResponseModel {
  /**
   * 생성 완료 (201, 빈 응답)
   */
  data: '';
}

/**
 * 스쿼드 생성
 * - POST /api/crews/{crewId}/squads
 */
export const squadCreatePostFetch = ({ crewId, body }: SquadCreatePostFetchParams) =>
  apiFetch.post<SquadCreatePostFetchResponseProps>(`/crews/${crewId}/squads`, body);

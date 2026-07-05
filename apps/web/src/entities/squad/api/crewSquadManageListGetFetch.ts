import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import type { SquadManageListItem } from '@/entities/squad/types/squad.types';

export interface CrewSquadManageListGetFetchParams {
  /** 크루 pk */
  crewId: number;
  /** 페이지 번호 (0부터 시작) */
  page?: number;
  /** 한 페이지당 개수 */
  size?: number;
}

export interface CrewSquadManageListResponseProps extends ResponseModel {
  data: {
    size: number;
    page: number;
    totalPages: number;
    totalCount: number;
    resultsSize: number;
    results: SquadManageListItem[];
  };
}

/**
 * 크루 스쿼드 관리 목록 조회
 * - GET /api/crews/{crewId}/squads/manage
 */
export const crewSquadManageListGetFetch = ({ crewId, size = 5, page = 0 }: CrewSquadManageListGetFetchParams) =>
  apiFetch.get<CrewSquadManageListResponseProps>(`/crews/${crewId}/squads/manage?size=${size}&page=${page}`);

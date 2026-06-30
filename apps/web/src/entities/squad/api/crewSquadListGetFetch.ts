import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import type { SquadListItem } from '@/entities/squad/types/squad.types';

export interface CrewSquadListGetFetchParams {
  /**
   * 크루 pk
   */
  crewId: number;
  /**
   * 카테고리 필터 (옵셔널)
   */
  category?: string;
  /**
   * 페이지 번호 (0부터 시작)
   */
  page?: number;
  /**
   * 한 페이지당 개수
   */
  size?: number;
}

export interface CrewSquadListGetFetchResponseProps extends ResponseModel {
  data: {
    /** 한 페이지당 개수 */
    size: number;
    /** 현재 페이지 */
    page: number;
    /** 전체 페이지 수 */
    totalPages: number;
    /** 전체 개수 */
    totalCount: number;
    /** 현재 결과 개수 */
    resultsSize: number;
    /** 스쿼드 목록 */
    results: SquadListItem[];
  };
}

/**
 * 크루 스쿼드 목록 조회
 * - GET /api/crews/{crewId}/squads
 */
export const crewSquadListGetFetch = ({ crewId, category, page, size }: CrewSquadListGetFetchParams) => {
  const params = new URLSearchParams();
  if (category !== undefined) params.append('category', category);
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));
  const query = params.toString();
  return apiFetch.get<CrewSquadListGetFetchResponseProps>(`/crews/${crewId}/squads${query ? `?${query}` : ''}`);
};

import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';
import type { SquadRequestItem } from '@/entities/squad/types/squad.types';

export interface SquadRequestListGetFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 페이지 번호 (0부터 시작)
   */
  page?: number;
  /**
   * 한 페이지당 개수
   */
  size?: number;
}

export interface SquadRequestListGetFetchResponseProps extends ResponseModel {
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
    /** 신청 목록 */
    results: SquadRequestItem[];
  };
}

/**
 * 스쿼드 참여 신청 목록 조회
 * - GET /api/squads/{squadId}/requests
 */
export const squadRequestListGetFetch = ({ squadId, page, size }: SquadRequestListGetFetchParams) => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));
  const query = params.toString();
  return apiFetch.get<SquadRequestListGetFetchResponseProps>(`/squads/${squadId}/requests${query ? `?${query}` : ''}`);
};

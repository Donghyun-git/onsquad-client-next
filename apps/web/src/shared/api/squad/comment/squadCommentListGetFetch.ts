import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';
import type { SquadCommentItem } from '@/shared/types/squad.types';

export interface SquadCommentListGetFetchParams {
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

export interface SquadCommentListGetFetchResponseProps extends ResponseModel {
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
    /** 댓글 목록 */
    results: SquadCommentItem[];
  };
}

/**
 * 스쿼드 댓글 목록 조회
 * - GET /api/squads/{squadId}/comments
 */
export const squadCommentListGetFetch = ({ squadId, page, size }: SquadCommentListGetFetchParams) => {
  const params = new URLSearchParams();
  if (page !== undefined) params.append('page', String(page));
  if (size !== undefined) params.append('size', String(size));
  const query = params.toString();
  return apiFetch.get<SquadCommentListGetFetchResponseProps>(`/squads/${squadId}/comments${query ? `?${query}` : ''}`);
};

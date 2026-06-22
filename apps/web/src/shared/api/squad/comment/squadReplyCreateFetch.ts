import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';

export interface SquadReplyCreateFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 부모 댓글 pk
   */
  parentId: number;
  /**
   * 대댓글 내용
   */
  content: string;
}

export interface SquadReplyCreateFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 대댓글 작성
 * - POST /api/squads/{squadId}/replies/{parentId}
 */
export const squadReplyCreateFetch = ({ squadId, parentId, content }: SquadReplyCreateFetchParams) =>
  apiFetch.post<SquadReplyCreateFetchResponseProps>(`/squads/${squadId}/replies/${parentId}`, { content });

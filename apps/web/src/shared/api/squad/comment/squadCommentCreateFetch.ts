import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';

export interface SquadCommentCreateFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 댓글 내용
   */
  content: string;
}

export interface SquadCommentCreateFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 댓글 작성
 * - POST /api/squads/{squadId}/comments
 */
export const squadCommentCreateFetch = ({ squadId, content }: SquadCommentCreateFetchParams) =>
  apiFetch.post<SquadCommentCreateFetchResponseProps>(`/squads/${squadId}/comments`, { content });

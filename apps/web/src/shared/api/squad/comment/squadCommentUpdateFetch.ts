import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';

export interface SquadCommentUpdateFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 댓글 pk
   */
  commentId: number;
  /**
   * 수정할 댓글 내용
   */
  content: string;
}

export interface SquadCommentUpdateFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 댓글 수정
 * - PATCH /api/squads/{squadId}/comments/{commentId}
 */
export const squadCommentUpdateFetch = ({ squadId, commentId, content }: SquadCommentUpdateFetchParams) =>
  apiFetch.patch<SquadCommentUpdateFetchResponseProps>(`/squads/${squadId}/comments/${commentId}`, { content });

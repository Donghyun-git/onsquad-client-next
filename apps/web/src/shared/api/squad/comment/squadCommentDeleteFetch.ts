import { apiFetch } from '../../common';
import type { ResponseModel } from '../../model';

export interface SquadCommentDeleteFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 댓글 pk
   */
  commentId: number;
}

export interface SquadCommentDeleteFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 댓글 삭제
 * - DELETE /api/squads/{squadId}/comments/{commentId}
 */
export const squadCommentDeleteFetch = ({ squadId, commentId }: SquadCommentDeleteFetchParams) =>
  apiFetch.delete<SquadCommentDeleteFetchResponseProps>(`/squads/${squadId}/comments/${commentId}`);

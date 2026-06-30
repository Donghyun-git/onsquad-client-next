import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface SquadKickFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 강퇴 대상 멤버 pk
   */
  targetMemberId: number;
}

export interface SquadKickFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 멤버 강퇴
 * - DELETE /api/squads/{squadId}/members/{targetMemberId}
 */
export const squadKickFetch = ({ squadId, targetMemberId }: SquadKickFetchParams) =>
  apiFetch.delete<SquadKickFetchResponseProps>(`/squads/${squadId}/members/${targetMemberId}`);

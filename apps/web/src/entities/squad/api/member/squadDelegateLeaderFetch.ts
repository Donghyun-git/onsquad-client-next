import { apiFetch } from '@/shared/api/common';
import type { ResponseModel } from '@/shared/api/model';

export interface SquadDelegateLeaderFetchParams {
  /**
   * 스쿼드 pk
   */
  squadId: number;
  /**
   * 리더 위임 대상 멤버 pk
   */
  targetMemberId: number;
}

export interface SquadDelegateLeaderFetchResponseProps extends ResponseModel {
  data: '';
}

/**
 * 스쿼드 리더 위임
 * - PATCH /api/squads/{squadId}/members/{targetMemberId}/leader
 */
export const squadDelegateLeaderFetch = ({ squadId, targetMemberId }: SquadDelegateLeaderFetchParams) =>
  apiFetch.patch<SquadDelegateLeaderFetchResponseProps>(`/squads/${squadId}/members/${targetMemberId}/leader`);
